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