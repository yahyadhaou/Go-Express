const connection = require("../index.js");

module.exports = {
  addBookedService: function (
    callback,
    date,
    idUser,
    idService,
    idCart,
    time,
    fromPlace,
    toPlace
  ) {
    const sql = `INSERT INTO reservation (date,user_id_user,serves_id_serves,cart_id_cart,time,fromPlace,toPlace) VALUES("${date}","${idUser}",${idService},${idCart},"${time}","${fromPlace}","${toPlace}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
  getPrice: function (callback, idService) {
    const sql = `SELECT * FROM serves WHERE id_serves=${idService}`;
    connection.query(sql, function (err, res) {
      callback(res, err);
    });
  },
};
