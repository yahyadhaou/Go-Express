const product = require("../dataBase/models/product.js");

module.exports = {
  // function to add Product
  AddProduct: function (req, res) {
    product.add(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.sellIerd,
      req.body.buyerId,
      req.body.name,
      req.body.category,
      req.body.price,
      req.body.description,
      req.body.photo,
      req.body.quantity,
      req.body.id_user,
      req.body.id_cart,
      req.body.productStatus,
      req.body.Published_at
    );
  },

  AddProductPhoto: function (req, res) {
    product.addProductPhoto(
      function (err, result) {
        if (err) res.status(500).send(err);
        else res.json(result);
      },
      req.body.photo1,
      req.body.photo2,
      req.body.photo3,
      req.body.idproduct
    );
  },

  GetProductPhoto: function (req, res) {
    product.getProductPhoto(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_product);
  },

  GetLastProductId: function (req, res) {
    product.getLastProductId(function (err, result) {
      if (err) res.status(500).send(err);
      else res.send(result);
    });
  },

//  res.send({ id: results[0].id });




  // function to get Product by categories

  GetProductBycategoy: function (req, res) {
    product.getProducts(function (err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    }, req.params.category);
  },
};
