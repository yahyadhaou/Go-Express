// import the database connection
const connection = require("../index.js");

module.exports = {
  // function to add product
  add: function (
    callback,
    sellIerd,
    buyerId,
    product_name,
    category,
    price,
    description,
    photo,
    quantity,
    id_user,
    id_cart,
    productStatus,
    Published_at
  ) {
    const sql = `INSERT INTO product (sellIerd, buyerId,product_name,category,price, description,photo_product,quantity,user_id_user,cart_id_cart,productStatus,Published_at) VALUES("${sellIerd}", "${buyerId}", "${product_name}","${category}","${price}", "${description}" , "${photo}" ,"${quantity}","${id_user}","${id_cart}","${productStatus}","${Published_at}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  addProductPhoto: function (callback, photo1, photo2, photo3, id_product) {
    const sql = `INSERT INTO product_photo (photo1,photo2,photo3,product_id_product) VALUES(
    "${photo1}","${photo2}","${photo3}",${id_product})`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getProductPhoto: function (callback, id_product) {
    const sql = `SELECT * FROM product_photo WHERE product_id_product="${id_product}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getLastProductId: function (callback) {
    const sql =
      "SELECT id_product FROM product ORDER BY id_product DESC LIMIT 1";
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  // function to get products by categories
  getProducts: function (callback, category) {
    const sql = `SELECT * FROM product WHERE category="${category}"and productStatus ="Accepted"`;
    connection.query(sql, function (error, results) {
      callback(error, results.reverse());
    });
  },
};
