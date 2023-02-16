const admin = require("../dataBase/models/admin.js");

module.exports = {
  // function to get all user
  GetAllUsers: function (req, res) {
    admin.getAllUser(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },

  // function to get one user
  GetOneUser: function (req, res) {
    admin.getOneUser(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_user);
  },

  // function to all product pusplished by the user wher status is "not accepted"
  GetAllProductsNotAccepted: function (req, res) {
    admin.getAllProductNotAccepted(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },

  GetAllReservation: function (req, res) {
    admin.getAllReservation(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },

  GetAllSales: function (req, res) {
    admin.getAllSales(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },

  // function to get one Product
  GetOneProduct: function (req, res) {
    admin.getOneProduct(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_product);
  },

  GetOneProductPhoto: function (req, res) {
    admin.getOneProductPhoto(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_product);
  },

  // function to change the product status
  UpdateProductState: function (req, res) {
    admin.updateProductState(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.params.id_product,
      req.body.productStatus
    );
  },

  // function to update the product price
  UpdateProductPrice: function (req, res) {
    admin.updateProductPrice(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },

      req.body.price,
      req.params.id_product
    );
  },
  // function to delete product
  DeleteProduct: function (req, res) {
    admin.deleteProduct(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.id_product);
  },
  DeleteProductPhoto: function (req, res) {
    admin.deleteProductPhoto(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.product_id_product);
  },

  GetAllFeedBack: function (req, res) {
    admin.getAllFeedBack(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },

  GetEmployers: function (req, res) {
    admin.GetEmployers(function (err, results) {
      if (err) res.status(500).send(err);
      else res.json(results);
    });
  },
};
