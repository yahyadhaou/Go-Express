const connection = require("../index.js");
module.exports = {
  //function to add feedback
  add: function (callback, details, user_id_user, etoile) {
    const sql = `INSERT INTO feedback (details,user_id_user,etoile)VALUES("${details}","${user_id_user}","${etoile}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
};
