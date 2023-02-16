const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/user.js");
const adminRoute = require("./routes/admin.js");
const productRoute = require("./routes/product.js");
const cartRoute = require("./routes/cart.js");
const feedBackRoute = require("./routes/feedback.js");
const serviceRoute = require("./routes/service.js");

const employersRoute = require("./routes/Employer.js");
//

app.use("/users", usersRoute);
app.use("/admin", adminRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/feedback", feedBackRoute);
app.use("/service", serviceRoute);
app.use("/Employers", employersRoute);

module.exports = app;
