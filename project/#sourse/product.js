;(function(){
	let catalog = document.querySelector('.catalog');

	if (catalog === null) {
		return;
	}

	let changeProductSize = function (target) {
		let product = myLib.closestItemByClass(target, 'product');
		let previousActiveBtn = product.querySelector('.product__size.is-active');
		previousActiveBtn.classList.remove('is-active');
		target.classList.add('is-active');
	}

	let changeProductOrderInfo = function (target) {
		let product = myLib.closestItemByClass(target, 'product');
		let productTitle = product.querySelector('.product__title').textContent;
		let productSize = product.querySelector('.product__size.is-active').textContent;
		let productPrice = product.querySelector('.product__price-value').textContent;
		let productCurrency = product.querySelector('.product__currency').textContent;
		let productImgSrc = product.querySelector('.product__img').getAttribute('src');
		// let productCurrency = product.querySelector('.product__currency').textContent;
		
		let order = document.querySelector('.popup-order');
		let orderTitle = order.querySelector('.order-product-title');
		let orderPrice = order.querySelector('.order-product-price');
		let orderSize = order.querySelector('.order__size');
		let orderImg = order.querySelector('.order__img');
		orderTitle.textContent = productTitle;
		orderPrice.textContent = productPrice;
		orderPrice.append(' ' + productCurrency)
		orderSize.textContent = productSize;
		orderImg.setAttribute('src', productImgSrc);
	}

	catalog.addEventListener('click', function(e){
		let target = e.target;

		if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
			console.log(target);
			e.preventDefault();
			changeProductSize(target);
		}

		if (target.classList.contains('product__btn')) {
			e.preventDefault();
			changeProductOrderInfo(target);
		}
	})
})();