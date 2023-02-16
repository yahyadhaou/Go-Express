const express = require("express");
const router = express.Router();

// Require controller modules.
const {
  AddProduct,
  GetProductBycategoy,
  AddProductPhoto,
  GetProductPhoto,
  GetLastProductId,
} = require("../contollers/product.js");

router.post("/addProduct", AddProduct);
router.post("/addProduct/photo", AddProductPhoto);

router.get("/:category", GetProductBycategoy); // get all post by categorie
router.get("/getProductPhoto/:id_product", GetProductPhoto);
router.get("/getLastProductId", GetLastProductId);

module.exports = router;
