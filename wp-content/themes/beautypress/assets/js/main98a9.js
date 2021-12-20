(function($) {
	"use strict";

/*------------------------------------------------------------------
[Table of contents]


beautypress custom function
menu fixed function
email patern
prelaoder
beautypress portfolio grid
another beautypress portfolio grid 4 items
beautypress popular service grid
image comperasion
Date Picker
welcome section slider
welcome section slider version 2
testimonial slider
simple image slider
team slider
sync slider
video pop up
image pop up
Ajaxchimp init
Booking form init
Booking form select field focus
numeric number counter init
counter up appear init
back to top
button with mouse pointer
button pulse effect
contact form init
instagram feeds
beautypress accordion add class
beautypress hover add class
mouse over and add class remove class
flicker gallery
hover 3d init for tilt
mega menu
ScrollMagic
parallax bg
social tigger icon
input number increase
meun scroll and add class
snazzy maps 1
snazzy maps 2

-------------------------------------------------------------------*/


/*=============================================================
				beautypress custom function
=========================================================================*/
function beautypress_function() {
	var header_height = $('.beautypress-header-section'),
		welcome_container = $('.beautypress-welcome-container'),
		window_height = $(window).height(),
		height_minus = window_height - header_height.height(),
		comming_soon = $('.beautypress-comming-soon-content'),
		owl_prev = $('.beautypress-welcome-slider .owl-nav .owl-prev'),
		owl_next = $('.beautypress-welcome-slider .owl-nav .owl-next'),
		header_height_calc = (header_height.height()) / 2,
		welcome_wrapers = $('.beautypress-welcome-wraper');

		welcome_wrapers.css('margin-top', header_height.height());

		owl_prev.css('top', 'calc(50% + ' +header_height_calc+'px)');
		owl_next.css('top', 'calc(50% + ' +header_height_calc+'px)');


		if (window_height >= 600) {
			comming_soon.css('height', window_height);
		} else {
			comming_soon.css('height', '600px');
		}

		if (window_height >= 600) {
			welcome_container.css('height', window_height);
		} else {
			welcome_container.css('height', '600');
		}
}

//  email patern
function email_pattern(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	return regex.test(email);
}

// menu fixed function
function muneFixed() {

	var scroll = $(document).scrollTop(),
		this_item = $('.navbar-fixed'),
		headerHeight = this_item.outerHeight(),
		headerAnimation = $('.navbar-fixed.menu-skew'),
		classList = ['off-canvas', 'fixed', 'swingInX', 'swingOutX'];

		$(window).scroll(function() {

			var scrolled = $(document).scrollTop();

			if (scrolled > headerHeight) {
				this_item.addClass(classList[0]);
			} else {
				this_item.removeClass(classList[0]);
			}

			if (scrolled > scroll || headerAnimation.hasClass(classList[2][3])) {
				this_item.removeClass(classList[1]);
				headerAnimation.removeClass(classList[2]);
				headerAnimation.addClass(classList[3]);
			} else {
				this_item.addClass(classList[1]);
				headerAnimation.addClass(classList[2]);
				headerAnimation.removeClass(classList[3]);
			}
			scroll = $(document).scrollTop();
		});
}

// menu fixed anim class function
function menuFixedAnimClass() {

	var scroll = $(document).scrollTop(),
		this_item = $('.navbar-fixed'),
		headerHeight = this_item.outerHeight(),
		headerAnimation = $('.menu-skew'),
		classList = ['off-canvas', 'fixed', 'swingInX', 'swingOutX'];

		function animationClassAdd() {

			if (this_item.hasClass(classList[0][1]) || headerAnimation.hasClass(classList[2][3])) {
				this_item.addClass(classList[0]);
				this_item.removeClass(classList[1]);
				headerAnimation.removeClass(classList[2]);
				headerAnimation.addClass(classList[3]);
			} else {
				this_item.removeClass(classList[0]);
				this_item.addClass(classList[1]);
				headerAnimation.addClass(classList[2]);
				headerAnimation.removeClass(classList[3]);
			}
		}

		$(window).on('load', function() {
			animationClassAdd();
		});

		$(window).on('resize', function() {
			animationClassAdd();
		});
}


$(window).on('load', function() {
	// Beautypress custom function init
	beautypress_function();

	// menu fixed
	muneFixed();

	// menu fixed anim class function
	menuFixedAnimClass();

/*=============================================================
			prelaoder
=========================================================================*/

setTimeout(function() {
	$("#preloader").addClass('loaded')
}, 500);

/*=============================================================
			beautypress portfolio grid
=========================================================================*/
if ($('.beautypress-photo-gallery-grid').length > 0) {
	var $container = $('.beautypress-photo-gallery-grid'),
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
			$container.isotope({
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
}

/*=============================================================
			another beautypress portfolio grid 4 items
=========================================================================*/
if ($('.beautypress-photo-gallery-grid-v3').length > 0) {
	var $container = $('.beautypress-photo-gallery-grid-v3'),
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
			$container.find('.beautypress-photo-gallery-grid-item-v3').each(function() {
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
				itemSelector: '.beautypress-photo-gallery-grid-item-v3',
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
}

/*=============================================================
			beautypress popular service grid
=========================================================================*/
if ($('.beautypress-popular-service-grid').length > 0) {
	var $container = $('.beautypress-popular-service-grid'),
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
			$container.find('.beautypress-popular-service-grid-item').each(function() {
				var $item = $(this),
					multiplier_w = $item.attr('class').match(/beautypress-popular-service-grid-item-w(\d)/),
					multiplier_h = $item.attr('class').match(/beautypress-popular-service-grid-item-h(\d)/),
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
				itemSelector: '.beautypress-popular-service-grid-item',
				masonry: {
					columnWidth: colWidth(),
					gutterWidth: 3
				}
			});
		};
	isotope();
	$(window).on('resize', isotope);
}

/*=============================================================
				image comperasion
=========================================================================*/

if ($('.beautypress-before-after').length > 0) {
	$('.beautypress-before-after').twentytwenty({
		no_overlay: true ,
		move_slider_on_hover: false ,
		move_with_handle_only: true,
		click_to_move: false ,
	});
}

}); // end on.load event

$(document).ready(function() {
// Beautypress custom function init
beautypress_function();

// menu fixed anim class function
menuFixedAnimClass();

/*=============================================================
				Date Picker
=========================================================================*/
if ($('.datepicker').length > 0) {
	$('.datepicker').datepicker().on('changeDate', function() {
		$(this).datepicker('hide');
	});
}


/*=============================================================
				welcome section slider version 2
=========================================================================*/

if ($('.beautypress-welcome-slider-v2').length > 0) {
	var owl2 = $(".beautypress-welcome-slider-v2");
	owl2.owlCarousel({
		items: 1,
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		dots: false,
		nav: false,
		autoplay: true,
		autoplayTimeout: 5000,
		autoplayHoverPause: true,
	});

	$("#prev").on('click', function() {
		owl2.trigger('prev.owl.carousel');
	});

	$("#next").on('click', function() {
		owl2.trigger('next.owl.carousel');
	});
}

/*=============================================================
				sync slider
=========================================================================*/

if (($('.beautypress-sync-slider-preview').length > 0) && ($('.beautypress-sync-slider-thumb').length > 0)) {
	var sync1 = $(".beautypress-sync-slider-preview"),
		sync2 = $(".beautypress-sync-slider-thumb"),
		slidesPerPage = 3,
		syncedSecondary = true;

	sync1.owlCarousel({
		items: 1,
		slideSpeed: 2000,
		nav: true,
		autoplay: true,
		dots: true,
		loop: true,
		responsiveRefreshRate: 200,
		navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
	}).on('changed.owl.carousel', syncPosition);

	sync2
		.on('initialized.owl.carousel', function() {
			sync2.find(".owl-item").eq(0).addClass("current");
		})
		.owlCarousel({
			items: slidesPerPage,
			dots: true,
			nav: false,
			smartSpeed: 200,
			slideSpeed: 500,
			slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
			responsiveRefreshRate: 100
		}).on('changed.owl.carousel', syncPosition2);

	function syncPosition(el) {
		//if you set loop to false, you have to restore this next line

		//if you disable loop you have to comment this block
		var count = el.item.count - 1;
		var current = Math.round(el.item.index - (el.item.count / 2) - .5);

		if (current < 0) {
			current = count;
		}
		if (current > count)  {
			current = 0;
		}

		//end block

		sync2
			.find(".owl-item")
			.removeClass("current")
			.eq(current)
			.addClass("current");
		var onscreen = sync2.find('.owl-item.active').length - 1;
		var start = sync2.find('.owl-item.active').first().index();
		var end = sync2.find('.owl-item.active').last().index();

		if (current > end) {
			sync2.data('owl.carousel').to(current, 100, true);
		}
		if (current < start) {
			sync2.data('owl.carousel').to(current - onscreen, 100, true);
		}
	}

	function syncPosition2(el) {
		if (syncedSecondary) {
			var number = el.item.index;
			sync1.data('owl.carousel').to(number, 100, true);
		}
	}

	sync2.on("click", ".owl-item", function(e) {
		e.preventDefault();
		var number = $(this).index();
		sync1.data('owl.carousel').to(number, 300, true);
	});
}


/*=============================================================
				video pop up
=========================================================================*/
if ($('.beautypress-video-popup').length > 0) {
	$('.beautypress-video-popup').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false
	});
}
/*=============================================================
				image pop up
=========================================================================*/

if ($('.beautypress-image-popup').length > 0) {
	$('.beautypress-image-popup').magnificPopup({
		type: 'image',
		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = 'mfp-zoom-in';
			}
		},
		closeOnContentClick: true,
		midClick: true,
		gallery: {
			enabled: true,
		},
	});
}

/*=============================================================
				Ajaxchimp init
=========================================================================*/
if ($('.mc-form').length > 0) {
		var mailchimp_url = $('.beautypress-subscribe-wraper').data('url');
	$('.mc-form').ajaxChimp({
		url: mailchimp_url
	});
}

/*=============================================================
				Booking form select field focus
=========================================================================*/

$('#appointment-date ,#appointment-service, #appointment-time').on('focus', function() {
	$(this).parent().addClass('actives');
});
$('#appointment-date, #appointment-service, #appointment-time').on('blur', function() {
	$(this).parent().removeClass('actives');
});

/*=============================================================
				numeric number counter init
=========================================================================*/

var number_animate = $(".number-animate");

if (number_animate.length > 0) {
	number_animate.appear();
	$(document.body).on('appear', '.numeric-count', function() {
		number_animate.each(function() {
			$(this).animateNumbers($(this).attr("data-value"), true, parseInt($(this).attr("data-animation-duration"), 10));
		});
	});
} // End exists

/*=============================================================
				counter up appear init
=========================================================================*/

var appear = $('.appear');
appear.appear();
$.fn.animateNumbers = function(stop, commas, duration, ease) {
	return this.each(function() {
		var $this = $(this);
		var start = parseInt($this.text().replace(/,/g, ""), 10);
		commas = (commas === undefined) ? true : commas;
		$({
			value: start
		}).animate({
			value: stop
		}, {
			duration: duration == undefined ? 500 : duration,
			easing: ease == undefined ? "swing" : ease,
			step: function() {
				$this.text(Math.floor(this.value));
				if (commas) {
					$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
				}
			},
			complete: function() {
				if (parseInt($this.text(), 10) !== stop) {
					$this.text(stop);
					if (commas) {
						$this.text($this.text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
					}
				}
			}
		});
	});
};


/*=============================================================
				back to top
=========================================================================*/
if ($('.back-to-top').length > 0) {
	$('.back-to-top').on('click', function(event) {
		event.preventDefault();

		$('body, html').animate({
			scrollTop: 0
		}, 1000);
	});
}

/*=============================================================
				button with mouse pointer
=========================================================================*/
if ( $( '.xs-btn' ).length > 0 ) {
	$('.xs-btn' ).on( 'mouseenter', function ( e ) {

		var parentOffset = $( this ).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;

		if ( $( this ).find( 'span' ) ) {
			$( '.xs-btn span' ).css( {
				top: relY,
				left: relX,
			} );
		}
	} );
	$( '.xs-btn' ).on( 'mouseout', function ( e ) {

		var parentOffset = $( this ).offset(),
			relX = e.pageX - parentOffset.left,
			relY = e.pageY - parentOffset.top;

		if ( $( this ).find( 'span' ) ) {
			$( '.xs-btn span' ).css( {
				top: relY,
				left: relX,
			} );
		}
	} );
}

/*=============================================================
				button pulse effect
=========================================================================*/
$('.pulse-btn').hover(function(e) {
	e.preventDefault();

	var btns = $(this).addClass('active');

	setTimeout(function() {
		btns.removeClass('active');
	}, 500);
});

/*=============================================================
				mouse over and add class remove class
=========================================================================*/

if ($('.beautypress-single-new-pricing.beautypress-pricing-footer').length > 0) {
	$('.beautypress-single-new-pricing.beautypress-pricing-footer').on('mouseover', function(){
		$(this).parent().addClass('active');
	}).on('mouseout', function(){
		$(this).parent().removeClass('active');
	});
}

/*=============================================================
				mega menu
=========================================================================*/

if ($('.beautypress-mega-menu').length > 0) {
	$('.beautypress-mega-menu').xs_nav({
		mobileBreakpoint: 992,
	});
}
if ($('.xs_nav_2').length > 0) {
	$('.xs_nav_2').xs_nav({
		mobileBreakpoint: 992,
	});
}
if ($('.xs-navigation-middle-menu').length > 0) {
	$('.xs-navigation-middle-menu').xs_nav({
		mobileBreakpoint: 992,
	});
}

/*=============================================================
				ScrollMagic
=========================================================================*/

if ($('.beautypress-scoller-animation').length > 0) {
	var controller = new ScrollMagic.Controller();

	new ScrollMagic.Scene({triggerElement: ".beautypress-scoller-animation"})
		.setVelocity(".scoller-image-1 img", {opacity: 1, bottom: "0"}, 800)
		.triggerHook("onEnter")
		.addTo(controller);

	new ScrollMagic.Scene({triggerElement: ".beautypress-scoller-animation"})
		.setVelocity(".scoller-image-2 img", {opacity: 1, top: "270"}, 1000)
		.triggerHook(0.7)
		.addTo(controller);
}

/*=============================================================
				parallax bg
=========================================================================*/

if ($('.parallax-bg').length > 0) {
	$('.parallax-bg').parallax();
}

/*=============================================================
				social tigger icon
=========================================================================*/

$('.tigger-icon').on('click', function(event) {
	event.preventDefault();
	/* Act on the event */

	var this_item = $('.beautypress-social-tigger');

	if (this_item.hasClass('active')) {
		this_item.removeClass('active');
	} else {
		this_item.addClass('active');
	}

});

/*=============================================================
				input number increase
=========================================================================*/

var thiss = $('.beautypress_input_number');

	thiss.append('<span class="sub"><img src="img/minus-icon.png" alt="plus" /></span>');
	thiss.append('<span class="add"><img src="img/plus-icon.png" alt="minus" /></span>');

$('.beautypress_input_number').each(function() {

	var spinner = $(this),
		input = spinner.find('input[type="number"]'),
		add = spinner.find('.add'),
		sub = spinner.find('.sub');

		input.parent().on('click', '.sub', function(event) {
			event.preventDefault();
			/* Act on the event */
			if (input.val() > parseInt(input.attr('min')))
				input.val( function(i, oldval) { return --oldval; });

		});

		input.parent().on('click', '.add', function () {
			event.preventDefault();

			if (input.val() < parseInt(input.attr('max')))
				input.val( function(i, oldval) { return ++oldval; });
		});

});

});

$(window).on('scroll', function() {

/*=============================================================
				meun scroll and add class
=========================================================================*/

var w_height = $(window).height(),
	d_height = $(document).height(),
	h_calc = d_height - w_height;

var scrollTop = $(this).scrollTop();

if (scrollTop >= h_calc) {
	$('.beautypress-back-to-top-wraper.show-last-pos').addClass('active');
} else {
	$('.beautypress-back-to-top-wraper.show-last-pos').removeClass('active');
}

}); // END Scroll Function

$(window).on('resize', function() {
	// Beautypress custom function init
	beautypress_function();
}); // End Resize


if ($(".center-logo").length > 0){
	var logo_link = $( ".menulogolink" ).data('logo');
	$('.center-logo a').html('<img src="'+logo_link+'">');
}

})(jQuery);