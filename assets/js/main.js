$(function() {
    var body = $("body");
    var header = $(".header");
    var menu = $(".nav");
    var topTrigger = $(".backtop");
    var menuTrigger = $(".menu-trigger");
    var searchTrigger = $(".popup-trigger");
    var searchClick = $(".search-click");
    var searchClose = $(".search-close");
    var pageHight = $(window).pageYOffset;
    var headerHight = header.height();

    // Menu toggle
    menuTrigger.click(function() {
        body.toggleClass("menu-active").removeClass("search-active");
        menu.css("top", (header.outerHeight() - 1));
    }); 

    // Search toggle
    searchTrigger.click(function() {
        body.toggleClass("search-active").removeClass("menu-active");
    }); 
    searchClick.click(function() {
        body.addClass("search-active");
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

    // Show/Hide backtop button
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 50) {
            topTrigger.fadeIn();
        } else {
            topTrigger.fadeOut();
        }
    });
    topTrigger.click(function() {
        $("html,body").animate({scrollTop: 0}, 500);
    });
});