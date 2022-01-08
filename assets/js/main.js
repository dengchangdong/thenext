$(function() {
    var body = $("body");
    var theHeader = $(".header");
    var theNav = $(".nav");
    var theMenu = $(".nav ul");
    var theCover = $(".cover");
    var navButton = $(".menu-button");
    var searchButton = $(".search-button");
    var topButton = $(".backtop");
    var defaultHight = $(window).pageYOffset;
    var headerHight = theHeader.height();

    // Menu toggle
    navButton.click(function() {
        body.toggleClass("showMenu").removeClass("showSearch");
    }); 

    // Search toggle
    searchButton.click(function() {
        body.toggleClass("showSearch").removeClass("showMenu");
    }); 

    // Cover toggle 
    theCover.click(function() {
        body.removeClass("showMenu showSearch");
    }); 

    // Show/Hide Navbar
    $(window).bind("load resize").scroll(function(){
        var currentHight = $(this).scrollTop();
        var currentWidth = $(window).outerWidth();
        if (currentWidth < 769) {
            setTimeout(function(){
                if (currentHight > headerHight) {
                    if (currentHight > defaultHight) {
                        body.addClass("hideHeader");
                    } else {
                        body.removeClass("hideHeader");
                    }
                } else {
                    body.removeClass("hideHeader");
                }
                defaultHight = currentHight;
            }, 100);
        } else {
            body.removeClass("hideHeader showMenu showSearch");
        }
    });

    // Show/Hide backtop button
    $(window).scroll(function() {
        if ($(window).scrollTop() >= 50) {
            topButton.fadeIn();
        } else {
            topButton.fadeOut();
        }
    });
    topButton.click(function() {
        $("html,body").animate({scrollTop: 0}, 500);
    });
});