{
    "cmd": "register",
    "username": "Gordon",
    "password": "Freeman"
}

{
    "cmd": "register",
    "username": "dog",
    "password": "bark"
}

{
    "cmd": "register",
    "username": "red",
    "password": "hourse"
}

{
    "cmd": "uploadMap",
    "sid": "GordonFreeman",
    "name": "de_dust",
    "terrain": ["1..", ".x.", "..2"]
}

{
    "cmd": "uploadFaction",
    "sid": "GordonFreeman",
    "factionName": "People",
    "units": [
        {
            "name": "first", 
            "HP": 1,
            "MP": 1,
            "defence": 1,
            "attack": 1,
            "range": 1,
            "damage": 1,
            "cost": 1
        }
    ]
}

{
    "cmd": "createGame",
    "sid": "redhourse",
    "playersCount": 2,
    "mapName": "de_dust",
    "factionName": "People",
    "totalCost": 100,
    "gameName": "catdog"
}

{
    "cmd": "joinGame",
    "sid": "dogbark",
    "gameName": "catdog"
}

{
    "cmd": "createGame",
    "sid": "GordonFreeman",
    "gameName": "Half-life",
    "mapName": "de_dust",
    "factionName": "People",
    "totalCost": 100,
    "playersCount": 10
}

{
    "cmd": "getPlayersListForGame",
    "sid": "GordonFreeman",
    "gameName": "catdog"
}
