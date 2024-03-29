const getDB = require("../util/database").getDB;
const mongodb = require("mongodb");

class Product {
	constructor(title, price, description, imageUrl, id, userId) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.imageUrl = imageUrl;
		this._id = id ? new mongodb.ObjectId(id) : null;
		this.userId = userId
	}

	save() {
		const db = getDB();
		let dbOb;
		if (this._id) {
			dbOb = db
				.collection("proucts")
				.updateOne(
					{ _id: this._id },
					{ $set: this }
				);
		} else {
			dbOb = db.collection("products").insertOne(this);
		}
		return dbOb
			.then((result) => console.log(result))
			.catch((err) => console.log(err));
	}

	static fetchAll() {
		const db = getDB();
		return db
			.collection("products")
			.find()
			.toArray()
			.then((products) => {
				console.log(products);
				return products;
			})
			.catch((err) => console.log(err));
	}

	static findById(prodId) {
		const db = getDB();
		return db
			.collection("products")
			.find({ _id: new mongodb.ObjectId(prodId) })
			.next()
			.then((product) => {
				console.log(product);
				return product;
			})
			.catch((err) => console.log(err));
	}

  static deleteById(prodId) {
    const db = getDB();
    return db.collection('products').deleteOne({_id : new mongodb.ObjectId(prodId)}).then(result => {
      console.log('Deleted');
    }).catch(err => {console.log(err)})
  }
}

module.exports = Product;
