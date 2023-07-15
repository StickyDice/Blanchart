let slides,
	eventSlide,
	gallerySpace,
	eventSpace,
	projectSpace,
	group;

let viewWidth = window.innerWidth;
if (viewWidth > 1690) {
	eventSlide = 3;
	slides = 3;
	group = 3;
	gallerySpace = 50;
	eventSpace = 50;
	projectSpace = 50;
} else if (viewWidth > 1124) {
	eventSlide = 3;
	slides = 2;
	group = 2;
	gallerySpace = 50;
	eventSpace = 50;
	projectSpace = 50;
} else if (viewWidth > 900) {
	eventSlide = 3;
	slides = 2;
	group = 2;
	gallerySpace = 34;
	eventSpace = 27;
	projectSpace = 50;
} else if (viewWidth > 624) {
	eventSlide = 2;
	slides = 2;
	group = 2;
	gallerySpace = 34;
	eventSpace = 34;
	projectSpace = 34;
} else if (viewWidth > 470) {
	eventSlide = 2;
	slides = 2;
	group = 1;
	gallerySpace = 34;
	eventSpace = 34;
	projectSpace = 34;
} else {
	eventSlide = 1;
	slides = 1;
	group = 1;
	gallerySpace = 34;
	eventSpace = 34;
	projectSpace = 34;
}



// header dropdown
const dropdownButtons = document.querySelectorAll('.dropdown__button');

for (let drop of dropdownButtons) {
	drop.addEventListener('click', function () {
		let dropdownItem = drop.parentElement;
		dropdownItem.classList.toggle('active');
		let activeExist = document.querySelectorAll('.dropdown__item.active');
		if (activeExist.length == 2) {
			if (activeExist[0] == dropdownItem) {
				activeExist[1].classList.remove('active');
			} else {
				activeExist[0].classList.remove('active');
			}
		}
	});
}

// gallery
const gallerySwiper = new Swiper(".gallery__swiper", {
	direction: "horizontal",
	loop: true,
	slidesPerGroup: group,
	slidesPerView: slides,
	spaceBetween: gallerySpace,

	slideClass: "gallery__slide",

	pagination: {
		el: '.gallery__pagination',
		type: 'fraction',
	},

	navigation: {
		nextEl: ".gallery__navigation_next",
		prevEl: ".gallery__navigation_prev",
	}
});

const element = document.querySelector(".gallery__select");
const choices = new Choices(element, {
	searchEnabled: false,
	allowHTML: true,
	renderSelectedChoices: "always",
	itemSelectText: '',
});

// catalog
const accordion = new Accordion('.accordion');

const artistLinks = document.querySelectorAll('.ac__artist-link');
let artistActive = document.querySelector('.catalog__artist_active');
for (let link of artistLinks) {
	link.addEventListener('click', () => {
		artistActive.classList.remove('catalog__artist_active');
		if (link.dataset.exist == 'true') {
			artistActive = document.getElementById(link.dataset.artist);
		} else {
			artistActive = document.getElementById('not-found');
		}
		artistActive.classList.add('catalog__artist_active');
	})
}

// event
const eventsSwiper = new Swiper(".events__swiper", {
	direction: "horizontal",
	slidesPerGroup: eventSlide,
	slidesPerView: eventSlide,
	spaceBetween: eventSpace,

	navigation: {
		nextEl: '.events__navigation_next',
		prevEl: '.events__navigation_prev',
	},

	pagination: {
		el: '.events__pagination',
		type: 'bullets',
	}
});

// projects
tippy("[data-tippy-content]", {
	theme: 'tomato',
	arrow: true,
	trigger: 'click',
});

const projectsSwiper = new Swiper(".projects__swiper", {
	loop: true,
	slidesPerGroup: group,
	slidesPerView: slides,
	spaceBetween: projectSpace,

	navigation: {
		nextEl: ".projects__next-btn",
		prevEl: ".projects__prev-btn",
	}
})

// contact
const selector = document.querySelector(".contact__input_phone");
const phoneMask = new Inputmask("+7 (999) 999-99-99");
phoneMask.mask(selector);


const validator = new JustValidate(".contact__form", {
	errorLabelStyle: {
		marginLeft: '30px',
		fontSize: '12px',
		fontWeight: '400',
		lineHeight: '16px',
		color: '#D11616'
	},
});

validator.addField("#name", [
	{
		rule: "required",
		errorMessage: "Введите имя",
	},
	{
		rule: "minLength",
		value: 3,
		errorMessage: "Имя слишком короткое",
	},
	{
		rule: "maxLength",
		value: 30,
		errorMessage: "Имя слишком длинное",
	},
	{
		rule: "customRegexp",
		value: /[а-я]/,
		errorMessage: "Недопустимый формат",
	}
])

validator.addField("#tel", [
	{
		rule: "required",
		errorMessage: "Введите телефон",
	},
	{
		validator: (name, value) => {
			const phone = selector.inputmask.unmaskedvalue();
			return Boolean(Number(phone) && phone.length === 10);
		},
		errorMessage: "Недопустимый формат",
	},
])

// map
ymaps.ready(init);
function init() {
	const newMap = new ymaps.Map("map", {
		center: [59.902774, 30.488759],
		zoom: 13,
	});

	const newGeoObject = new ymaps.Placemark([59.902774, 30.488759], {}, {
		iconLayout: 'default#image',
		iconImageHref: './img/placemark.svg',
		iconImageSize: [20, 20],
		iconImageOffset: [0, 0],
	});

	newMap.geoObjects.add(newGeoObject);

	newMap.controls.remove('geolocationControl');
	newMap.controls.remove('searchControl');
	newMap.controls.remove('fullscreenControl');
	newMap.controls.remove('zoomControl');
	newMap.controls.remove('rulerControl');
	newMap.controls.remove('typeSelector');
	newMap.controls.remove('trafficControl');
	newMap.controls.remove('gotomaps');
};

// burger
const burgerButton = document.querySelector('.header__burger');
const headerNav = document.querySelector('.header__nav');
const burgerClose = document.querySelector('.burger__close');
burgerButton.addEventListener('click', function () {
	headerNav.classList.add('active');
	document.body.style.overflow = 'hidden';
});

burgerClose.addEventListener('click', function () {
	headerNav.classList.remove('active');
	document.body.style.overflow = 'scroll';
});

// searchDrop
const searchDrop = document.querySelector('.header__open-search');
const searchClose = document.querySelector('.small-search__close');
const searchForm = document.querySelector('.header__small-search');
searchDrop.addEventListener('click', function () {
	searchForm.classList.add('dropped');
})

searchClose.addEventListener('click', function (btn) {
	btn.preventDefault();
	searchForm.classList.remove('dropped');
})

