// import the database connection
const connection = require("../index.js");

module.exports = {
  // function to add Employer
  add: function (
    callback,
    first_name,
    gender,
    adress,
    photo,
    phone_number,
    work_position,
    last_name,
    serves_id_serves
  ) {
    const sql = `INSERT INTO employer (first_name,gender,adress,photo,phone_number,work_position,last_name,serves_id_serves) VALUES("${first_name}","${gender}","${adress}","${photo}","${phone_number}","${work_position}","${last_name}","${serves_id_serves}")`;
    connection.query(sql, function (error, results) {
      callback(error, results);
    });
  },
};
