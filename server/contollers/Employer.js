const Employers = require("../dataBase/models/Employer.js");
module.exports = {
  AddEmployer: function (req, res) {
    Employers.add(
      function (err, results) {
        if (err) res.status(500).send(err);
        else res.json(results);
      },
      req.body.first_name,
      req.body.gender,
      req.body.adress,
      req.body.photo,
      req.body.phone_number,
      req.body.work_position,
      req.body.last_name,
      req.body.serves_id_serves
    );
  },
};
