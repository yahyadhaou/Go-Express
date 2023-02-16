const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  AddCart,
  AddProductToCart,
  GetIdCart,
  GetCartProduct,
  DeleteProductFromCart,
  ChangeCartStatusToDone,
  DeleteAll,
  GetCartHistorique,
  postReservation,
  getReservation,
  deleteReservations,
} = require("../contollers/cart.js");
const { deleteReservation } = require("../dataBase/models/cart.js");

router.get("/getIdCart/:id_user", GetIdCart);
router.get("/getCartProduct/:id_cart", GetCartProduct);
router.get("/getCartHistorique/:id_user", GetCartHistorique);

router.post("/addCart", AddCart);
router.post("/addProductTocart", AddProductToCart);

router.delete("/deleteProduct/:id_product", DeleteProductFromCart);
router.delete("/deleteALL/:id_cart", DeleteAll);

router.put("/updateStateToDone/:id_cart", ChangeCartStatusToDone);

router.post("/postReservation",postReservation)
router.get("/getReservation/:id_cart",getReservation)

router.delete("/deleteReservation",deleteReservations)

module.exports = router;
