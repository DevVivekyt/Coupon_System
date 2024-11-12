const mongoose = require("mongoose");
const { createSuccessResponse, createErrorResponse } = require("../middlewares/response");
const Coupon = require("../models/coupon.model");

const createCoupon = async (req, res) => {
    try {
        const { type, code, cashbackAmount, description } = req.body;
        const newCoupon = new Coupon({ type, code, cashbackAmount, description });
        await newCoupon.save();
        res.status(201).json(createSuccessResponse("Coupon created successfully", newCoupon));
    } catch (error) {
        res.status(500).json(createErrorResponse("Error creating coupon", error.message));
    }
};

const getAllCoupons = async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(createSuccessResponse("Coupons retrieved successfully", coupons));
    } catch (error) {
        res.status(500).json(createErrorResponse("Error retrieving coupons", error.message));
    }
};

const getCouponById = async (req, res) => {
    try {
        const { id } = req.params;
        const coupon = await Coupon.findById(id);
        if (!coupon) return res.status(404).json(createErrorResponse("Coupon not found"));
        res.status(200).json(createSuccessResponse("Coupon retrieved successfully", coupon));
    } catch (error) {
        res.status(500).json(createErrorResponse("Error retrieving coupon", error.message));
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, code, cashbackAmount, description } = req.body;
        const updatedCoupon = await Coupon.findByIdAndUpdate(
            id,
            { type, code, cashbackAmount, description },
            { new: true, runValidators: true }
        );
        if (!updatedCoupon) return res.status(404).json(createErrorResponse("Coupon not found"));
        res.status(200).json(createSuccessResponse("Coupon updated successfully", updatedCoupon));
    } catch (error) {
        res.status(500).json(createErrorResponse("Error updating coupon", error.message));
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCoupon = await Coupon.findByIdAndDelete(id);
        if (!deletedCoupon) return res.status(404).json(createErrorResponse("Coupon not found"));
        res.status(200).json(createSuccessResponse("Coupon deleted successfully", deletedCoupon));
    } catch (error) {
        res.status(500).json(createErrorResponse("Error deleting coupon", error.message));
    }
};

const revealCoupon = async (req, res) => {
    try {
        const userId = req.body.userId;


        const userObjectId = new mongoose.Types.ObjectId(userId);


        const totalRevealed = await Coupon.countDocuments({ userId: userObjectId, isRevealed: true });

        const isCashback = (totalRevealed + 1) % 6 === 0;
        console.log(`Total revealed: ${totalRevealed}, isCashback: ${isCashback}`);

        let coupon;
        if (isCashback) {
            coupon = await Coupon.findOneAndUpdate(
                { type: 'Cashback', isRevealed: false },
                { isRevealed: true, userId: userObjectId },
                { new: true }
            );
        }

        if (!coupon) {
            coupon = await Coupon.findOneAndUpdate(
                { type: 'CouponCode', isRevealed: false },
                { isRevealed: true, userId: userObjectId },
                { new: true }
            );
        }

        if (!coupon) {
            return res.json(createErrorResponse('No coupons available'));
        }

        res.status(200).json(createSuccessResponse("successfully", coupon));
    } catch (error) {
        console.error('Error revealing coupon:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createCoupon,
    getAllCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon,
    revealCoupon
};
