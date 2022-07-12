(function($) {

    'use strict';

    var iwriter_app = {

        init: function() {
            this.nav_click();
            this.search_click();
            this.back_to_top();
            this.load_more();
        },

        nav_click: function() {

            var nav_active = 'nav-active';

            $('body').on('click', '.nav-button', function() {
                $('body').toggleClass(nav_active);
            });

            $('body').on('click', '.overlay', function() {
                $('body').removeClass(nav_active);
            });

            $(document).keyup(function(e) {
                if (e.keyCode == 27 && $('body').hasClass(nav_active)) {
                    $('body').removeClass(nav_active);
                }
            });

        },

        search_click: function() {

            var search_active = 'search-active';

            $('body').on('click', '.search-button', function() {
                $('body').toggleClass(search_active);
            });

            $(document).keyup(function(e) {
                if (e.keyCode == 27 && $('body').hasClass(search_active)) {
                    $('body').removeClass(search_active);
                }
            });

        },

        back_to_top: function() {
            var backtop_click = $('.backtotop');

            $(window).scroll(function() {
                if ($(window).scrollTop() >= 50) {
                    backtop_click.fadeIn();
                } else {
                    backtop_click.fadeOut();
                }
            });

            backtop_click.click(function() {
                $('html,body').animate({scrollTop: 0}, 500);
            });
        },

        load_more: function() {
            $('.pagination a').on('click', function(){
                $(this).addClass('loading').text('加载中');
                $.ajax({
                    type: 'POST',
                    url: $(this).attr('href'),
                    success: function(data){
                        var result = $(data).find('.posts .post');
                        var next_link = $(data).find('.pagination a').attr('href');
                        
                        $('.posts').append(result.fadeIn(300));
                        $('.pagination a').removeClass('pageloading').text('查看更多');

                        if ( next_link != undefined ) {
                            $('.pagination a').attr('href', next_link);
                        } else {
                            //$('.pagination a').addClass('disable').text('没有了');
                            //$('.pagination')[0].innerHTML = '<span class="next">全部加载完成</span>';
                            $('.pagination')[0].innerHTML = ''; // 全部加载完成清空分页内容
                        }
                    }
                });
                return false;
            });
        },

    };

    $(document).ready(function() {
        iwriter_app.init();
    });

})(jQuery);