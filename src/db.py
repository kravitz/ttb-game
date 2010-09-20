#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from exceptions import *

DEBUG = True # should be moved out

class Database:
    instance = None

    def __init__(self):
        self.users = {}
        self.sids = {}

    def clear(self):
        self.instance = None
        DatabaseInstance()

    def generate_sid(self, username, password):
        if DEBUG:
            sid = username + password
        else:
            sid = 0 # change it to a SHA-1 applied to a shuffled date+username+password-hash
        self.sids[sid] = username
        return sid

    def get_username(self, sid):
        if sid not in self.sids:
            raise BadSid('Unknown sid')
        return self.sids[sid]

    def register_user(self, username, password):
        if username in self.users:
            if self.users[username] == password:
                return self.sids[username]
            raise BadPassword('User already exists, but passwords doesn\'t match')
        self.users[username] = password
        return self.generate_sid(username, password)

    def unregister_user(self, sid):
        username = self.get_username(sid)
        self.users.pop(username)
        self.sids.pop(sid)

    def change_password(self, sid, password):
        username = self.get_username(sid)
        self.users[username] = password

def DatabaseInstance():
    if Database.instance is None:
        Database.instance = Database()
    return Database.instance
