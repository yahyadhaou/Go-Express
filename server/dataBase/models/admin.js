// import the database connection
const connection = require("../index.js");

module.exports = {
  // function to get all user
  getAllUser: function (callback) {
    const sql = `SELECT * FROM user`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  getOneUser: function (callback, id) {
    const sql = `SELECT * FROM user WHERE id_user ="${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getAllReservation: function (callback) {
    const sql = `SELECT * FROM reservation `;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getAllSales: function (callback) {
    const sql = `SELECT * FROM cart WHERE state="done" `;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getAllProductNotAccepted: function (callback) {
    const sql = `SELECT * FROM product WHERE productStatus="NotAccepted"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getOneProduct: function (callback, id) {
    // const sql = `SELECT * FROM product WHERE id_product ="${id}"`;
    const sql = `SELECT * FROM product INNER JOIN user ON product.user_id_user = user.id_user WHERE id_product="${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getOneProductPhoto: function (callback, id) {
    const sql = `SELECT * FROM product_photo WHERE product_id_product="${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  updateProductState: function (callback, id, productStatus) {
    const sql = `UPDATE product SET productStatus = "${productStatus}" WHERE id_product="${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  updateProductPrice: function (callback, price, id) {
    const sql = `UPDATE product SET price = "${price}" WHERE id_product="${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  deleteProduct: function (callback, id) {
    const sql = `DELETE FROM product WHERE id_product = "${id}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  deleteProductPhoto: function (callback, id_photo) {
    const sql = `DELETE FROM product_photo WHERE product_id_product = "${id_photo}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getAllFeedBack: function (callback) {
    const sql = `SELECT * FROM feedback  INNER JOIN user ON feedback.user_id_user = user.id_user`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  GetEmployers: function (callback) {
    const sql = `SELECT * FROM employer `;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
};
