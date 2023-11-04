const fs = require("fs");
const path = require("path");

const p = path.join(
	path.dirname(process.mainModule.filename),
	"data",
	"cart.json"
);

module.exports = class Cart {
	static addProduct(id, productPrice) {
		// Fetch the previous cart
		fs.readFile(p, (err, fileContent) => {
			let cart = { products: [], totalPrice: 0 };
			if (!err) {
				cart = JSON.parse(fileContent);
			}
			// Analyse the cart => find existing product
			const existingProductIndex = cart.products.findIndex(
				(p) => p.id === id
			);
			const existingProduct = cart.products[existingProductIndex];

			// Add new product/increase the quantity
			let updatedProduct;
			if (existingProduct) {
				console.log("here");
				updatedProduct = { ...existingProduct };
				updatedProduct.qty = updatedProduct.qty + 1;
				cart.products = [...cart.products];
			} else {
				updatedProduct = { id: id, qty: 1 };
				cart.products = [...cart.products, updatedProduct];
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
			fs.writeFile(p, JSON.stringify(cart), (err) => {
				console.log(err);
			});
		});
	}

	static deleteProduct(id, productPrice) {
		fs.readFile(p, (err, fileContent) => {
			if (err) {
				return;
			}
			const updatedCart = { ...JSON.parse(fileContent) };
			const product = updatedCart.products.findIndex(
				(prod) => prod.id === id
			);
			const productQty = product.qty;
			updatedCart.products = updatedCart.products.filter(
				(prod) => prod.id !== id
			);
			updatedCart.totalPrice =
				updatedCart.totalPrice - productQty * productPrice;

			fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
				console.log(err);
			});
		});
	}
};
