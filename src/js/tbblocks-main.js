import Glide from '@glidejs/glide';
var clicked = false;
document.addEventListener('DOMContentLoaded', function () {
	/**
	 * Header Toggle
	 */

	let slideUp = (target, duration = 500) => {
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.boxSizing = 'border-box';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.style.display = 'none';
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			//alert("!");
		}, duration);
	};

	let slideDown = (target, duration = 500) => {
		target.style.removeProperty('display');
		let display = window.getComputedStyle(target).display;

		if (display === 'none') display = 'block';

		target.style.display = display;
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.boxSizing = 'border-box';
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
		}, duration);
	};
	let slideToggle = (target, duration = 500) => {
		if (window.getComputedStyle(target).display === 'none') {
			return slideDown(target, duration);
		} else {
			return slideUp(target, duration);
		}
	};

	window.addEventListener('resize', reportWindowSize);

	reportWindowSize();

	function reportWindowSize() {
		
		var screen_width = screen.width;
		if (screen_width <= 1140) {
			if (document.querySelector('#menu--btn') != null) {
				
				var menu_btn = document.getElementById('menu--btn');
				var menu = document.querySelector('.header--nav');
				var site_nav = document.querySelector('.site--nav');
				let header__container =
					document.querySelector('.header--container');
				let left_position = window
					.getComputedStyle(header__container, null)
					.getPropertyValue('padding-left');

				site_nav.style =
					'width:' + screen_width + 'px;left:-' + left_position + ';';

				let speedAnimation = 400;
				const sub_menu_trigger = document.querySelectorAll(
					'.menu-item-has-children svg'
				);
				menu_btn.addEventListener('click', (event) => {
					menu.classList.toggle('is--active');
					menu_btn.classList.toggle('is--active');

					if (!document.querySelectorAll('.is--active').length) {
						sub_menu_trigger.forEach((sub_menu) => {
							var parent_ele = sub_menu.closest('li');
							var target =
								parent_ele.getElementsByClassName('sub-menu');
							slideUp(target[0], speedAnimation);
						});
					}
				});

				sub_menu_trigger.forEach((sub_menu) => {
					sub_menu.addEventListener(
						'click',
						function handleClick(event) {
							event.preventDefault();
							var parent_ele = sub_menu.closest('li');
							var target =
								parent_ele.getElementsByClassName('sub-menu');
							slideToggle(target[0], speedAnimation);
						}
					);
				});
			}
		}else{
			document.querySelector('.site--nav').style = '';
		}
	}

	// header toggle ends

	// slider
	if (document.querySelector('.slider') != null) {
		var sliderselector = document.getElementsByClassName('slider');

		for (var i = 0; i < sliderselector.length; i++) {
			var tb__slider_attr = {
				type: 'carousel',
				perView: 1,
				hoverpause: false,
				animationDuration: 1000,
			};
			if (sliderselector[i].dataset.autoplay == 'true') {
				tb__slider_attr['autoplay'] = 8000;
			}
			var Slider = new Glide(sliderselector[i], tb__slider_attr);
			Slider.mount();
		}
	}

	// logo slider
	if (document.querySelector('.slider-logo') != null) {
		var logoselector = document.getElementsByClassName('slider-logo');

		for (var i = 0; i < logoselector.length; i++) {
			var tb__logo_slider_attr = { hoverpause: false };
			if (logoselector[i].dataset.autoplay == 'true') {
				tb__logo_slider_attr['autoplay'] = 8000;
			}
			var slidePerView = {};
			var xsperView = logoselector[i].dataset.xs;
			var smperView = logoselector[i].dataset.sm;
			var mdperView = logoselector[i].dataset.md;
			var lgperView = logoselector[i].dataset.lg;
			var xlperView = logoselector[i].dataset.xl;

			if (
				typeof xsperView != 'undefined' &&
				typeof smperView == 'undefined' &&
				typeof mdperView == 'undefined' &&
				typeof lgperView == 'undefined' &&
				typeof xlperView == 'undefined'
			) {
				tb__logo_slider_attr['perView'] = xsperView;
			} else if (
				typeof xsperView != 'undefined' &&
				typeof smperView != 'undefined' &&
				typeof mdperView == 'undefined' &&
				typeof lgperView == 'undefined' &&
				typeof xlperView == 'undefined'
			) {
				tb__logo_slider_attr['perView'] = smperView;
				slidePerView[460] = { perView: xsperView };
			} else if (
				typeof xsperView != 'undefined' &&
				typeof smperView != 'undefined' &&
				typeof mdperView != 'undefined' &&
				typeof lgperView == 'undefined' &&
				typeof xlperView == 'undefined'
			) {
				tb__logo_slider_attr['perView'] = mdperView;
				slidePerView[460] = { perView: xsperView };
				slidePerView[768] = { perView: smperView };
			} else if (
				typeof xsperView != 'undefined' &&
				typeof smperView != 'undefined' &&
				typeof mdperView != 'undefined' &&
				typeof lgperView != 'undefined' &&
				typeof xlperView == 'undefined'
			) {
				tb__logo_slider_attr['perView'] = lgperView;
				slidePerView[460] = { perView: xsperView };
				slidePerView[768] = { perView: smperView };
				slidePerView[960] = { perView: mdperView };
			} else {
				tb__logo_slider_attr['perView'] = xlperView;
				slidePerView[460] = { perView: xsperView };
				slidePerView[768] = { perView: smperView };
				slidePerView[960] = { perView: mdperView };
				slidePerView[1200] = { perView: lgperView };
			}
			tb__logo_slider_attr['gap'] = 40;
			tb__logo_slider_attr['breakpoints'] = slidePerView;
			tb__logo_slider_attr['startAt'] = 1;
			tb__logo_slider_attr['type'] = 'carousel';
			tb__logo_slider_attr['animationDuration'] = 1000;
			var LogoSlider = new Glide(logoselector[i], tb__logo_slider_attr);
			LogoSlider.mount();
		}
	}

	// Tab slider
	if (document.querySelector('.tabSlider') != null) {
		var tabSliderselector = document.getElementsByClassName('tabSlider');
		var tb__image_slider_attr = {
			type: 'carousel',
			perView: 1,
			hoverpause: false,
			gap: 0,
			animationDuration: 1000,
		};
		var tb__slider_attr = {
			type: 'carousel',
			perView: 5,
			hoverpause: false,
			focusAt: 'center',
			gap: 0,
			dragThreshold: 0,
		};

		for (var i = 0; i < tabSliderselector.length; i++) {
			var tabImage =
				tabSliderselector[i].querySelector('.tab--image-slider');
			var tabContent =
				tabSliderselector[i].querySelector('.tab--text-slider');
			var slidePerView = {};
			slidePerView[1400] = { perView: 3 };
			slidePerView[990] = { perView: 2, focusAt: 0 };
			slidePerView[460] = { perView: 1 };
			if (tabSliderselector[i].dataset.autoplay == 'true') {
				tb__image_slider_attr['autoplay'] = 8000;
				tb__slider_attr['autoplay'] = 8000;
			}
			tb__slider_attr['breakpoints'] = slidePerView;
			var tabImageSlider = new Glide(tabImage, tb__image_slider_attr);
			tabImageSlider.mount();
			var tabSlider = new Glide(tabContent, tb__slider_attr);
			tabSlider.mount();

			syncGlide(tabImageSlider, tabSlider);
			syncGlide(tabSlider, tabImageSlider);
		}

		for (
			var i = 0;
			i < document.getElementsByClassName('tabSlider').length;
			i++
		) {
			var slide = tabSliderselector[i].querySelectorAll(
				'.tab--text-slider .tab-slider__nav-item'
			);

			slide.forEach((item, index) => {
				// here
				item.addEventListener('click', (e) => {
					clicked = true;
					tabSlider.go('=' + item.dataset.index);
				});
			});
		}
	}
});

function syncGlide(master, slave) {
	var step = 0;
	master.on('run', function (e) {
		if (clicked == true && e.steps != 0) {
			step = e.steps;
			slave.go('=' + step);
		} else {
			slave.go(e.direction);
		}
	});
}
