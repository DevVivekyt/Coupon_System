import React, { useState } from 'react';
import axios from 'axios';

const CouponForm = () => {
    const [form, setForm] = useState({
        type: 'CouponCode',
        code: '',
        cashbackAmount: 0,
        description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8800/api/coupons', form);
            alert('Coupon created successfully!');
            setForm({ type: 'CouponCode', code: '', cashbackAmount: 0, description: '' });
        } catch (error) {
            console.error('Error creating coupon:', error);
            alert('Failed to create coupon');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-gray-800 text-center">Create a New Coupon</h2>

                {/* Coupon Type */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Coupon Type</label>
                    <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                    >
                        <option value="CouponCode">Coupon Code</option>
                        <option value="Cashback">Cashback</option>
                    </select>
                </div>

                {/* Conditional Input Fields */}
                {form.type === 'CouponCode' && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Coupon Code</label>
                        <input
                            type="text"
                            placeholder="Enter coupon code"
                            value={form.code}
                            onChange={(e) => setForm({ ...form, code: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                )}

                {form.type === 'Cashback' && (
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Cashback Amount</label>
                        <input
                            type="number"
                            placeholder="Enter cashback amount"
                            value={form.cashbackAmount}
                            onChange={(e) => setForm({ ...form, cashbackAmount: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                )}

                {/* Description */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                        placeholder="Enter coupon description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                        rows="4"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg shadow focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
                >
                    Create Coupon
                </button>
            </form>
        </div>
    );
};

export default CouponForm;
