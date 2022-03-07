$(function() {
    var body = $("body");
    var header = $(".header");
    var menu = $(".nav");
    var topToggle = $(".backtop");
    var menuToggle = $(".menu-toggle");
    var searchToggle = $(".search-toggle");
    var searchClose = $(".btn-close");
    var searchFormInput = $(".search-form .local-search-input");
    var searchPopupInput = $(".search-popup .local-search-input");
    var pageHight = $(window).pageYOffset;
    var headerHight = header.height();

    // Menu toggle
    menuToggle.click(function() {
        body.toggleClass("menu-active").removeClass("search-active");
        menu.css("top", (header.outerHeight() - 1));
    }); 

    // Search toggle
    searchToggle.click(function() {
        body.toggleClass("search-active").removeClass("menu-active");
    }); 
    searchClose.click(function() {
        body.removeClass("search-active");
    }); 

    // Show/Hide Navbar
    $(window).bind("load resize").scroll(function(){
        var currentHight = $(this).scrollTop();
        var currentWidth = $(window).outerWidth();
        if (currentWidth < 769) {
            setTimeout(function(){
                if (currentHight > headerHight) {
                    if (currentHight > pageHight) {
                        body.addClass("hide-header");
                    } else {
                        body.removeClass("hide-header");
                    }
                } else {
                    body.removeClass("hide-header");
                }
                pageHight = currentHight;
            }, 100);
        } else {
            body.removeClass("hide-header menu-active search-active");
        }
    });

    // Delay submission of search
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 500;
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                $el.is(':input') && $el.on('keyup keypress',function(e){
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    doneTyping(el);
                });
            });
        }
    });
    searchFormInput.donetyping(function(){
        body.addClass("search-active");
        searchPopupInput.val(searchFormInput.val());
    });

    // Show/Hide backtop button
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 50) {
            topToggle.fadeIn();
        } else {
            topToggle.fadeOut();
        }
    });
    topToggle.click(function() {
        $("html,body").animate({scrollTop: 0}, 500);
    });
});