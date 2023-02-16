const cart = require("../dataBase/models/cart.js");

module.exports = {
  // function to add user
  AddCart: function (req, res) {
    cart.add(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.payment_type,
      req.body.date,
      req.body.id_user,
      req.body.state
    );
  },

  AddProductToCart: function (req, res) {
    cart.addProductToCart(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.id_product,
      req.body.id_cart
    );
  },
  GetIdCart: function (req, res) {
    cart.getIdCart(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_user);
  },
  GetCartProduct: function (req, res) {
    cart.getCartProduct(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_cart);
  },
  DeleteProductFromCart: function (req, res) {
    cart.deleteProductFromCart(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_product);
  },
  ChangeCartStatusToDone: function (req, res) {
    cart.changeCartStatusToDone(
      function (err, result) {
        if (err) result.send(err);
        else res.json(result);
      },
      req.body.date,
      req.params.id_cart
    );
  },

  DeleteAll: function (req, res) {
    cart.deleteAll(function (err, result) {
      if (err) result.send(err);
      else res.json(result);
    }, req.params.id_cart);
  },

  GetCartHistorique: function (req, res) {
    cart.getCartHistoryByUserId(function (err, result) {
      if (err) result.send(err);
      else res.json(result);
    }, req.params.id_user);
  },

  postReservation: function (req, res) {
    cart.postReservation(function (result, err) {
      if (err) result.send(err);
      else res.json(result);
    }, req.body.cart_id_cart , req.body.reservation_id_reservation);
  },


  getReservation: function (req, res) {
    cart.getReservation(function (result, err) {
      if (err) res.send(err);
      else res.json(result.reverse());
    }, req.params.id_cart);
  },

  deleteReservations: function (req , res){
    cart.deleteReservation(function (result,err){
      if ( err ) res.send(err);
      else res.json(result)
    },req.body.idCart,req.body.idReservation)
  },
};
