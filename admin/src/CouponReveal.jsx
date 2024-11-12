import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CouponReveal = () => {
    const [coupon, setCoupon] = useState(null);
    const [message, setMessage] = useState(null);
    const [count, setCount] = useState(0);
    const [balance, setBalance] = useState(0); // State for the user's balance

    const revealCoupon = async () => {
        try {
            const response = await axios.post('https://couponsystem-production.up.railway.app/api/coupons/reveal', {
                userId: '64ae0b9c1234567890abcdef',
            });
            console.log("response", response);

            if (response.data.status === 1) {
                const revealedCoupon = response.data.result;
                setCoupon(revealedCoupon);
                setMessage(null);
                setCount((prev) => prev + 1);

                // If the coupon is a cashback, add the cashback amount to the user's balance
                if (revealedCoupon.type === 'Cashback') {
                    setBalance((prevBalance) => prevBalance + revealedCoupon.cashbackAmount);
                }
            } else {
                setCoupon(null);
                setMessage(response.data.message || "Something went wrong, try again.");
            }
        } catch (error) {
            console.error('Error revealing coupon:', error);
            setCoupon(null);
            setMessage("An error occurred while revealing the coupon.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-8 p-6">
            {/* Display User Balance on the Top Right */}
            <div className="absolute top-6 right-6 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg">
                Balance: ${balance}
            </div>

            <h1 className="text-4xl font-bold text-gray-800">Reveal Your Coupon</h1>

            <Link
                to="/form"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg transition duration-300"
            >
                Add Coupon
            </Link>

            <button
                onClick={revealCoupon}
                className="bg-green-500 hover:bg-green-600 text-white py-4 px-12 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
            >
                Reveal Coupon
            </button>

            {coupon ? (
                <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-lg w-full">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        {coupon.type === 'CouponCode' ? `${coupon.code} Coupon Code` : `$${coupon.cashbackAmount} Cashback`}
                    </h2>
                    <p className="text-gray-600">{coupon.description}</p>
                </div>
            ) : message && (
                <div className="bg-red-100 p-6 rounded-lg shadow-xl text-center max-w-lg w-full">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">{message}</h2>
                </div>
            )}

            <p className="text-gray-700 text-lg">
                Coupons Revealed: <span className="font-bold">{count}</span>
            </p>
        </div>
    );
};

export default CouponReveal;
