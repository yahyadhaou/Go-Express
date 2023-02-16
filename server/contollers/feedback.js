const feedback = require("../dataBase/models/feedback.js");

module.exports = {
  AddFeedback: function (req, res) {
    feedback.add(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.details,
      req.body.id_user,
      req.body.etoile
    );
  },
};
