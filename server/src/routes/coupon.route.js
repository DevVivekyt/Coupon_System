const express = require("express");
const {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    revealCoupon
} = require("../controllers/coupon.controller");

const router = express.Router();

router.post("/coupons", createCoupon);

router.get("/coupons", getAllCoupons);

router.get("/coupons/:id", getCouponById);

router.put("/coupons/:id", updateCoupon);

router.delete("/coupons/:id", deleteCoupon);

router.post("/coupons/reveal", revealCoupon);

module.exports = router;
