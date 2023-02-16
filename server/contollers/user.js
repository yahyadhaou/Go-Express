const users = require("../dataBase/models/user.js");

module.exports = {
  // function to add user
  AddUser: function (req, res) {
    users.add(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.id_user,
      req.body.name,
      req.body.email
    );
  },
  // function to update user
  UpdateUser: function (req, res) {
    users.update(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.photo,
      req.body.name,
      req.body.ville,
      req.body.adress,
      req.body.phoneNumber,
      req.params.id_user
    );
  },

  UpdateUserAdress: function (req, res) {
    users.updateAdress(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.ville,
      req.body.adress,
      req.params.id_user
    );
  },

  GetUserProfile: function (req, res) {
    users.getUserProfile(function (err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    }, req.params.id_user);
  },

  GetUserProduct: function (req, res) {
    users.getUserProduct(function (err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    }, req.params.id_user);
  },
};
