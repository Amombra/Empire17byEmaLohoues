( function( $, elementor ) {
    "use strict";

    var Beautypress = {

        init: function() {

            var widgets = {
                'xs-testimonial.default' : Beautypress.Testimonial,
                'xs-team.default' : Beautypress.Team,
                'xs-faq.default' : Beautypress.Faq,
                'xs-portfolio.default' : Beautypress.Portfolio,
                'xs-slider.default' : Beautypress.Slider,
                'section' : Beautypress.Section,
                'xs-partner.default' : Beautypress.LogoCarousel,
                'xs-single-image.default' : Beautypress.SingleImage,
                'xs-image-comparison.default' : Beautypress.ImageComparison,
                'xs-maps.default' : Beautypress.Map,
            };

            $.each( widgets, function( widget, callback ) {
                elementor.hooks.addAction( 'frontend/element_ready/' + widget, callback );
            });

        },

        Testimonial: function( $scope ) {

            var carousel = $scope.find( '.beautypress-testimonial-slider' );

            if ( ! carousel.length ) {
                return;
            }

            carousel.owlCarousel({
                items: 1,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                dots: true,
                nav: false,
            });
        },

        Team: function( $scope ) {

            var carousel = $scope.find( '.beautypress-team-slider' );
            var hover_select = $scope.find( '.beautypress-single-team-v3' );

            if ( carousel.length > 0 ) {
                carousel.owlCarousel({
                    items: 1,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true,
                    dots: false,
                    nav: false,
                });
            }

            if(hover_select.length > 0){
                hover_select.hover(function() {
                    if (hover_select.hasClass('hover')) {
                        $(this).removeClass('hover');
                    }else {
                        hover_select.children().removeClass('hover');
                        $(this).addClass('hover');
                    }
                });
            }
        },

        Faq: function( $scope ) {

            var faq = $scope.find( '.beautypress-accordion .panel-heading' );

            if ( faq.length > 0 ) {
                faq.on('click', function(event) {
                    event.preventDefault();
                    $(this).parent().addClass('active').siblings().removeClass('active');
                });
            }
        },

        Slider: function( $scope){

            var slider = $scope.find( '.beautypress-welcome-slider' );
            var carousel = $scope.find( '.beautypress-image-slider' );

            var welcome_container = $scope.find('.welcome-height-calc-minus .beautypress-welcome-container'),
                header_height = $scope.find('.header-height-calc-minus.beautypress-header-section'),
                window_height = $(window).height(),
                height_minus = window_height - header_height.height();

            if (welcome_container.length > 0){
                
                if (window_height >= 600) {
                    welcome_container.css('height', height_minus);
                } else {
                    welcome_container.css('height', '600');
                }
            }

            if (slider.length > 0) {
                var settings = slider.data('settings');
                var xs_loop = true;
                var xs_nav = true;
                var xs_autoplay = true;
                if(settings.xs_loop === undefined || settings.xs_loop === '' || settings.xs_loop === null) {
                    xs_loop = false;
                }
                if(settings.xs_nav === undefined || settings.xs_nav === '' || settings.xs_nav === null) {
                   xs_nav = false;
                }
                if(settings.xs_autoplay === undefined || settings.xs_autoplay === '' || settings.xs_autoplay === null) {
                    xs_autoplay = false;
                }
                slider.owlCarousel({
                    items: 1,
                    loop: xs_loop,
                    mouseDrag: true,
                    touchDrag: true,
                    dots: false,
                    nav: xs_nav,
                    autoplay: xs_autoplay,
                    autoplayTimeout: 5000,
                    autoplayHoverPause: true,
                    navText: [
                        '<i class="xsicon icon-left-arrow"></i>',
                        '<i class="xsicon icon-right-arrow"></i>'
                    ],
                });
            }

            if (carousel.length > 0) {
                carousel.owlCarousel({
                    items: 1,
                    loop: true,
                    mouseDrag: true,
                    touchDrag: true,
                    dots: true,
                    nav: false,
                });
            }
        },

        LogoCarousel: function($scope){

             var carousel = $scope.find( '.beautypress-client-slider' );

             carousel.owlCarousel({
                items: 6,
                loop: true,
                mouseDrag: true,
                touchDrag: true,
                dots: false,
                nav: true,
                navText: [
                    '<a id="prev1" class="next-prev-btn small-btn welcome-prev"><i class="fas fa-angle-left"></i></a>',
                    '<a id="next1" class="next-prev-btn small-btn welcome-next"><i class="fas fa-angle-right"></i></a>'
                ],
            });
        },

        SingleImage:function( $scope ){

            if ($scope.find('.beautypress-3d-project-card').length > 0) {
                $('.beautypress-3d-project-card').tilt({
                    maxTilt:20,
                    perspective: 700,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale:1,
                    speed: 500,
                    transition: true,
                });
            }
        },

        ImageComparison:function( $scope ){

            var image_comparison = $scope.find( '.beautypress-before-after' );

            if (image_comparison.length > 0) {
                $(image_comparison).twentytwenty({
                    no_overlay: true ,
                    move_slider_on_hover: false ,
                    move_with_handle_only: true, 
                    click_to_move: false ,
                });
            }
        },

        Map: function( $scope ) {

            var $container = $scope.find( '.beautypress-maps' ),
                map,
                init,
                pins;

            if ( ! window.google ) {
                return;
            }

            init = $container.data( 'init' );
            pins = $container.data( 'pins' );
            map  = new google.maps.Map( $container[0], init );

            if ( pins ) {
                $.each( pins, function( index, pin ) {

                    var marker,
                        infowindow,
                        pinData = {
                            position: pin.position,
                            map: map
                        };

                    if ( '' !== pin.image ) {
                        pinData.icon = pin.image;
                    }

                    marker = new google.maps.Marker( pinData );

                    if ( '' !== pin.desc ) {
                        infowindow = new google.maps.InfoWindow({
                            content: pin.desc
                        });
                    }

                    marker.addListener( 'click', function() {
                        infowindow.open( map, marker );
                    });

                    if ( 'visible' === pin.state && '' !== pin.desc ) {
                        infowindow.open( map, marker );
                    }

                });
            }

        },

        Portfolio: function( $scope ) {
            //$(window).on('load', function() {
                var portfolio_3column = $scope.find( '.beautypress-photo-gallery-grid' );
                var portfolio_4column = $scope.find( '.beautypress-photo-gallery-grid-v3' );

                if ( portfolio_3column.length > 0 ) {

                    var $container = $scope.find('.beautypress-photo-gallery-grid'),
                   
                    colWidth = function() {
                        var w = $container.width(),
                            columnNum = 1,
                            columnWidth = 0;
                        if (w > 1200) {
                            columnNum = 3;
                        } else if (w > 900) {
                            columnNum = 3;
                        } else if (w > 600) {
                            columnNum = 3;
                        } else if (w > 450) {
                            columnNum = 2;
                        } else if (w > 385) {
                            columnNum = 1;
                        }
                        columnWidth = Math.floor(w / columnNum);
                        $container.find('.beautypress-photo-gallery-grid-item').each(function() {
                            var $item = $(this),
                                multiplier_w = $item.attr('class').match(/beautypress-photo-gallery-grid-item-w(\d)/),
                                multiplier_h = $item.attr('class').match(/beautypress-photo-gallery-grid-item-h(\d)/),
                                width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
                                height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
                            $item.css({
                            });
                        });
                        return columnWidth;
                    },
                    isotope = function() {
                        $('.beautypress-photo-gallery-grid').isotope({
                            resizable: false,
                            itemSelector: '.beautypress-photo-gallery-grid-item',
                            masonry: {
                                columnWidth: colWidth(),
                                gutterWidth: 3
                            }
                        });
                    };
                    isotope();
                    $(window).on('resize', isotope);
                    var $optionSets = $('.beautypress-portfolio-nav .option-set'),
                        $optionLinks = $optionSets.find('a');
                    $optionLinks.on('click', function() {
                        var $this = $(this);
                        var $optionSet = $this.parents('.option-set');
                        $optionSet.find('.selected').removeClass('selected');
                        $this.addClass('selected');

                        // make option object dynamically, i.e. { filter: '.my-filter-class' }
                        var options = {},
                            key = $optionSet.attr('data-option-key'),
                            value = $this.attr('data-option-value');
                        // parse 'false' as false boolean
                        value = value === 'false' ? false : value;
                        options[key] = value;
                        if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                            // changes in layout modes need extra logic
                            changeLayoutMode($this, options)
                        } else {
                            // creativewise, apply new options
                            $container.isotope(options);
                        }
                        return false;
                    });

                    if ($container.find('.beautypress-3d-project-card').length > 0) {
                        $('.beautypress-3d-project-card').tilt({
                            maxTilt:20,
                            perspective: 700,
                            easing: "cubic-bezier(.03,.98,.52,.99)",
                            scale:1,
                            speed: 500,
                            transition: true,
                        });
                    }
                }
            //});
            /**
             *
             * Grid 4 Column 
             *
            */
            
            if ( portfolio_4column.length > 0 ){

                var $container = $scope.find('.beautypress-photo-gallery-grid-v3'),
                
                colWidth = function() {
                    var w = $container.width(),
                        columnNum = 1,
                        columnWidth = 0;
                    if (w > 1200) {
                        columnNum = 4;
                    } else if (w > 900) {
                        columnNum = 4;
                    } else if (w > 600) {
                        columnNum = 2;
                    } else if (w > 450) {
                        columnNum = 2;
                    } else if (w > 385) {
                        columnNum = 1;
                    }
                    columnWidth = Math.floor(w / columnNum);
                    $container.find('.beautypress-photo-gallery-grid-v3-item').each(function() {
                        var $item = $(this),
                            multiplier_w = $item.attr('class').match(/beautypress-photo-gallery-grid-item-v3-w(\d)/),
                            multiplier_h = $item.attr('class').match(/beautypress-photo-gallery-grid-item-v3-h(\d)/),
                            width = multiplier_w ? columnWidth * multiplier_w[1] : columnWidth,
                            height = multiplier_h ? columnWidth * multiplier_h[1] * 0.4 - 12 : columnWidth * 0.5;
                        $item.css({
                            width: width
                        });
                    });
                    return columnWidth;
                },
                isotope = function() {
                    $container.isotope({
                        resizable: false,
                        itemSelector: '.beautypress-photo-gallery-grid-v3-item',
                        masonry: {
                            columnWidth: colWidth(),
                            gutterWidth: 3
                        }
                    });
                };
                isotope();
                $(window).on('resize', isotope);
                var $optionSets = $('.beautypress-portfolio-nav .option-set'),
                    $optionLinks = $optionSets.find('a');
                $optionLinks.on('click', function() {
                    var $this = $(this);
                    var $optionSet = $this.parents('.option-set');
                    $optionSet.find('.selected').removeClass('selected');
                    $this.addClass('selected');

                    // make option object dynamically, i.e. { filter: '.my-filter-class' }
                    var options = {},
                        key = $optionSet.attr('data-option-key'),
                        value = $this.attr('data-option-value');
                    // parse 'false' as false boolean
                    value = value === 'false' ? false : value;
                    options[key] = value;
                    if (key === 'layoutMode' && typeof changeLayoutMode === 'function') {
                        // changes in layout modes need extra logic
                        changeLayoutMode($this, options)
                    } else {
                        // creativewise, apply new options
                        $container.isotope(options);
                    }
                    return false;
                });
                
                if ($container.find('.beautypress-3d-project-card').length > 0) {
                    $('.beautypress-3d-project-card').tilt({
                        maxTilt:20,
                        perspective: 700,
                        easing: "cubic-bezier(.03,.98,.52,.99)",
                        scale:1,
                        speed: 500,
                        transition: true,
                    });
                }
            }
        },

    };

    $( window ).on( 'elementor/frontend/init', Beautypress.init );

}( jQuery, window.elementorFrontend ) );