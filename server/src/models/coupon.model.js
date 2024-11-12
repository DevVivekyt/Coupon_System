const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    type: { type: String, enum: ['CouponCode', 'Cashback'], required: true },
    code: { type: String },
    cashbackAmount: { type: Number },
    description: { type: String },
    isRevealed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coupon', couponSchema);
