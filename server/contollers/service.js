const service = require("../dataBase/models/service.js");

module.exports = {
  addBookedService: function (req, res) {
    service.addBookedService(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.date,
      req.body.idUser,
      req.body.idService,
      req.body.idCart,
      req.body.time,
      req.body.fromPlace,
      req.body.toPlace
    );
  },
  getPrice: function (req, res) {
    service.getPrice(function (results, err) {
      if (err) res.status(500).send(err);
      else res.json(results);
    }, req.params.idService);
  },
};
