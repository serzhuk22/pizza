// @prepros-append myLib.js
// @prepros-append header.js
// @prepros-append popup.js
// @prepros-append scrollTo.js
// @prepros-append catalog.js

;(function(){
	window.myLib = {};

	window.myLib.body = document.querySelector('body');

	window.myLib.closestAttr = function(item, attr) {
		let node = item;
		while(node){
			let attrValue = node.getAttribute(attr);
			if(attrValue) {
				return attrValue;
			}

			node = node.parentElement;
		}

		return null;
	};

	window.myLib.closestItemByClass = function(item, className) {
		let node = item;
		while(node){
			if (node.classList.contains(className)) {
				return node;
			}

			node = node.parentElement;
		}

		return null;
	};

	window.myLib.toggleScroll = function(){
		myLib.body.classList.toggle('no-scroll');
	};

	window.myLib.showPopup = function(target){
		target.classList.add('is-active');
	};

	window.myLib.closePopup = function(target){
		target.classList.remove('is-active');
	};


})();
;(function(){
	if (window.matchMedia('(max-width: 992px)').matches) {
		return;
	}
	let headerPage = document.querySelector('.header-page');

	window.addEventListener('scroll', function(){
		if (window.pageYOffset > 20) {
			headerPage.classList.add('is-active');
		} else {
			headerPage.classList.remove('is-active');
		}
	});

})();
;(function(){

	

	

	myLib.body.addEventListener('click', function(e){
		let target = e.target;
		let popupClass = myLib.closestAttr(target, 'data-popup');

		if(popupClass == null){
			return;
		}

		e.preventDefault();
		let popup = document.querySelector('.' + popupClass);
		
		if(popup){
			window.myLib.showPopup(popup);
			myLib.toggleScroll();
		}
		
	});

	myLib.body.addEventListener('click', function(e) {
		let target = e.target;

		if (target.classList.contains('popup-close') ||
		target.classList.contains('popup__inner')) {
			let popup = myLib.closestItemByClass(target, 'popup');
			if (popup) {
				window.myLib.closePopup(popup);
				window.myLib.toggleScroll();
			}
		}
	});

	myLib.body.addEventListener('keydown', function(e){
		if (e.keyCode !== 27) {
			return;
		}

		let popup = document.querySelector('.popup.is-active');
		if (popup) {
			window.myLib.closePopup(popup);
		}
		
	});
})();
;(function(){

	

	let scroll = function(target){
		let targetTop = target.getBoundingClientRect().top;
		let scrollTop = window.pageYOffset;
		let headerPage = document.querySelector('.header-page');
		let headerOffset = headerPage.clientHeight;
		let targetOffsetTop = targetTop + scrollTop;
		let scrollToOffsetY = targetOffsetTop - headerOffset;
		if (!headerPage.classList.contains('is-active') && !window.matchMedia('(max-width: 992px)').matches){
			scrollToOffsetY += 8 ;
		}
		
		window.scrollTo({
			top: scrollToOffsetY,
			behavior: "smooth"
		});
		
	}

	myLib.body.addEventListener('click', function(e) {
		let target = e.target;
		let scrollToItemClass = myLib.closestAttr(target, 'data-scroll-to');

		if(scrollToItemClass === null) {
			return;
		}

		e.preventDefault();
		let scrollToItem = document.querySelector('.' +scrollToItemClass);

		if (scrollToItem) {
			scroll(scrollToItem);
		}
	});
})();
;(function(){
	let catalogSection = document.querySelector('.section-catalog');

	if (catalogSection === null) {
		return;
	}

	let removeChildren = function(item) {
		while (item.firstChild) {
			item.removeChild(item.firstChild);
		}
	};

	let updateChildren = function(item, children){
		removeChildren(item);
		for (let i = 0; i < children.length; i+=1){
			item.appendChild(children[i]);
		}
	};

	let catalog = catalogSection.querySelector('.catalog');
	let catalogNav = catalogSection.querySelector('.catalog-nav');
	let catalogItems = catalogSection.querySelectorAll('.catalog__item');

	catalogNav.addEventListener('click', function(e){
		let target = e.target;
		let item = myLib.closestItemByClass(target, 'catalog-nav__btn')

		if (item === null || item.classList.contains('is-active')) {
			return;
		}

		e.preventDefault();
		let filterValue = item.getAttribute('data-filter');
		let previousBtnActive = catalogNav.querySelector('.catalog-nav__btn.is-active');
		previousBtnActive.classList.remove('is-active');
		item.classList.add('is-active');

		if(filterValue === 'all') {
			updateChildren(catalog, catalogItems);
			return;
		}

		var filteredItems = [];
		for (let i = 0; i < catalogItems.length; i+=1){
			let current = catalogItems[i];
			if (current.getAttribute('data-category') === filterValue){
				filteredItems.push(current);
			}
		}

		updateChildren(catalog, filteredItems);


	})
	
})();
