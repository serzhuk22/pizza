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