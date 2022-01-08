"use strict";

const slider = tns({
    container: '.testimonial-carousel',
    loop: true,
    items: 4,
    responsive: {
	    0:{
            items:1,
        },
        768:{
            items:2,
        },
        1200: {
	        items:4,
        }

	},
    slideBy: 'page',
    nav: true,    
    autoplay: true,
    autoplayButtonOutput: false,
    mouseDrag: true,
    lazyload: true,
    gutter: 30,
    navPosition: 'bottom',
    mouseDrag: true,
    controls: false,
    speed: 800,
});