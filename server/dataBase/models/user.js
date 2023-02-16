// import the database connection
const connection = require("../index.js");

module.exports = {
  // function to add user
  add: function (callback, id_user, name, email) {
    const sql = `INSERT INTO user (id_user,name,email) VALUES("${id_user}","${name}","${email}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  // function to update user
  update: function (
    callback,
    photo,
    name,
    ville,
    adress,
    phoneNumber,
    id_user
  ) {
    const sql = `UPDATE user SET name="${name}",adress="${adress}",photo="${photo}",ville="${ville}", phone_number="${phoneNumber}" WHERE id_user="${id_user}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  updateAdress: function (callback, ville, adress, id_user) {
    const sql = `UPDATE user SET adress="${adress}", ville="${ville}" WHERE id_user="${id_user}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },

  getUserProfile: function (callback, id_user) {
    const sql = `SELECT * FROM user WHERE id_user="${id_user}"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  getUserProduct: function (callback, id_user) {
    const sql = `SELECT * FROM product INNER JOIN user ON product.user_id_user = user.id_user  WHERE id_user="${id_user}" AND productStatus ="Accepted"`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
};
