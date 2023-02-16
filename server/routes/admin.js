const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  GetAllUsers,
  GetOneUser,
  GetAllProductsNotAccepted,
  GetOneProduct,
  UpdateProductState,
  DeleteProduct,
  UpdateProductPrice,
  GetAllFeedBack,
  DeleteProductPhoto,
  GetEmployers,
  GetOneProductPhoto,
  GetAllReservation,
  GetAllSales,
} = require("../contollers/admin.js");

// user route
router.get("/getalluser", GetAllUsers);
router.get("/getoneuser/:id_user", GetOneUser);

// product route
router.get("/getallproductnotaccepted", GetAllProductsNotAccepted);
router.get("/getoneproduct/:id_product", GetOneProduct);
router.get("/getoneproduct/photo/:id_product", GetOneProductPhoto);
router.get("/getallreservation", GetAllReservation);
router.get("/getallsales", GetAllSales);

router.put("/updateproductstate/:id_product", UpdateProductState);
router.put("/updateproductprice/:id_product", UpdateProductPrice);
router.delete("/deleteproduct/:id_product", DeleteProduct);
router.delete("/deleteproduct/photo/:product_id_product", DeleteProductPhoto);
// feedback route
router.get("/getallfeedback", GetAllFeedBack);

// employer  route
router.get("/getEmployers", GetEmployers);
module.exports = router;
