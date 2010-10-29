var descr;          // descriptions of toplevel sections (which behave like pages)
var sid;
var user;

function activate(descr){
    $("#content > section").hide();
    descr.section.show();
    $.each(descr.show, function(i, v) { v.show(); });
    $.each(descr.hide, function(i, v) { v.hide(); });
    descr.init();
}

$(document).ready(function(){
    window.onhashchange = function(){          // We have a new browser only
        hash = window.location.hash.substr(1); // remove # symbol
        if(hash && hash in descr){
            activate(descr[hash]);
        }
        else{
            window.location.hash = 'registration';
        }
    };
    $('.content-caller').click(function(){
        $(".section-nav-result").hide();
        $("div.section-nav-result[id^=content" + $(this).attr('id') + "]").show();
    });

    descr = {
        registration: {                         // key for anchor
            section: $('#registration'),        // what section to show (maybe move in 'show')
            hide: [$("#menu-wrapper")],         // elements to hide
            show: [],                           // elements to show
            init: function() {                  // actions to perform after showing
            }
        },
        main: {
            section: $('#main'),
            show: [$('#menu-wrapper')],
            hide: [],
            init: function() {
                $('#menu').html($('#main > .menu-content').html());
                $("#menu a[href='/#registration']").click(function(){
                    $.getJSON('/ajax', {
                        cmd: "unregister",
                        sid: sid
                    },
                    function(json){
                        if(json.status == 'ok'){
                            window.location.hash = 'registration';
                        }
                        else{
                            alert(json.message);
                        } // handle error situations
                    });
                    return false;
                });
            }
        },
        lobby: {
            section: $('#lobby'),
            show: [$('#menu-wrapper')],
            hide: [],
            init: function() {
                $('#menu').html($('#lobby > .menu-content').html());
            }
        }
    };

    window.onhashchange();        // adjust page by anchor

    $("#contentGames").show();
    $("form[name='register']").submit(function(obj){
        user = $("input[name='name']", this).val();
        var pass = $("input[name='password']", form).val()
        var form = $(this);
        $.getJSON('/ajax', {
                cmd: "register",
                username: user,
                password: pass
            },
            function(text){
                if (text.status == 'ok'){
                    window.location.hash = 'main';
                    sid = text.sid;
                    clearForm(form);
                }
                else{
                    var active_element, message = text.message;
                    $("#username_error, #password_error").fadeOut(500);
                    active_element = /.*username.*/i.test(message)
                        ? $("#username_error") : $("#password_error");
                    active_element.fadeIn(500);
                    $('span', active_element).text(message);
                }
            }
        );
        setUsername("#nameInMain");
        return false;       // don't allow form to send POST requests
    });

    $("form[name='lobby']").submit(function(obj){
        // do some ajax
        setUsername("#nameInLobby");
        window.location.hash = 'lobby';
        return false;
    });
});

function setUsername(obj){
    $(obj).html(user);
}

function clearForm(obj){
    var form = typeof obj == "string" ? $("form[name='" + obj + "']"): $(obj);
    $("input[type!='submit']", form).val('');
    $(".error", form).hide();
}
