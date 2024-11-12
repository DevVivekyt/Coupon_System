const express = require("express");
const cors = require("cors");
const dbConnection = require("./src/connection/db-connection");
const couponRouter = require("./src/routes/coupon.route");


const app = express();
const PORT = 8800;

app.use(cors());
app.use(express.json());


app.use("/api", couponRouter);

app.listen(PORT, () => {
    dbConnection();
    console.log(`App is running on Port ${PORT}`);
});