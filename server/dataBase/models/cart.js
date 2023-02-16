// import the database connection
const { query } = require("express");
const connection = require("../index.js");

module.exports = {
  // function to add cart
  add: function (callback, payment_type, date, id_user, state) {
    const sql = `INSERT INTO cart (payment_type,date,user_id_user,state) VALUES("${payment_type}","${date}","${id_user}", "${state}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  addProductToCart: function (callback, id_product, id_cart) {
    const sql = `INSERT INTO products_cart (product_id_product,cart_id_cart) VALUES(${id_product},${id_cart})`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getIdCart: function (callback, id_user) {
    const sql = ` SELECT * FROM cart WHERE user_id_user = "${id_user}" AND state="not done" ORDER BY id_cart DESC LIMIT 1 `;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  //  const sql = `SELECT * FROM products_cart INNER JOIN product ON products_cart.product_id_product=product.id_product WHERE products_cart.cart_id_cart = "${id_cart}"`;

  getCartProduct: function (callback, id_cart) {
    const sql = `SELECT * FROM products_cart Inner JOIN product ON products_cart.product_id_product = product.id_product Inner JOIN cart ON products_cart.cart_id_cart = cart.id_cart WHERE products_cart.cart_id_cart ="${id_cart}"AND cart.state="not done"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  deleteProductFromCart: function (callback, id_product) {
    const sql = `DELETE FROM products_cart WHERE product_id_product= "${id_product}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  changeCartStatusToDone: function (callback, date, id_cart) {
    const sql = `UPDATE cart SET state="done" , date = "${date}" WHERE id_cart="${id_cart}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  deleteAll: function (callback, idcart) {
    const sql = `DELETE FROM products_cart WHERE cart_id_cart="${idcart}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getCartHistoryByUserId: function (callback, id_user) {
    // const sql = `select * from cart WHERE state="done" AND user_id_user="${id_user}"`;
    const sql = `SELECT * FROM products_cart Inner JOIN product ON products_cart.product_id_product = product.id_product Inner JOIN cart ON products_cart.cart_id_cart = cart.id_cart WHERE cart.user_id_user="${id_user}" AND cart.state="done"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  postReservation: function (callback, cart_id_cart , reservation_id_reservation){
    const sql = ` INSERT INTO cart_has_reservation VALUES (${cart_id_cart},${reservation_id_reservation})`
    connection.query(sql, function ( error , results ){
      callback (results,error)
    })
  },

  getReservation: function (callback, idCart){
    const sql = `SELECT * FROM cart_has_reservation
    JOIN reservation
    ON cart_has_reservation.reservation_id_reservation = reservation.id_reservation
    JOIN serves
    ON serves.id_serves = reservation.serves_id_serves
    WHERE cart_has_reservation.cart_id_cart=${idCart}
    `;
    connection.query(sql, function ( error , results ){
      callback (results,error)
    })
  },

  deleteReservation : function ( callback, idCart , idReservation){
    const sql = ` DELETE FROM cart_has_reservation WHERE reservation_id_reservation=${idReservation} AND cart_id_cart=${idCart}`
    connection.query(sql,function(err,result){
      callback(result,err)
    })
  }

};

 