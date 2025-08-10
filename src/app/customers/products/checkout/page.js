"use client"
import Header from '@/components/Header';
import OrderStore from '@/Store/CartStore';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // <-- added

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const {
        orderItems,
        subtotal,
        taxAmount,
        shippingCost,
        discountAmount,
        totalAmount,
        billingAddress,
        shippingAddress,
        paymentMethod,
        loading,
        error,
        clientSecret,
        updateBillingAddress,
        updateShippingAddress,
        saveAddress,
        createPaymentIntent,
        createOrder,
        calculateShipping,
        applyDiscount,
        clearError
    } = OrderStore();

    const [cardholderName, setCardholderName] = useState('');
    const [saveShippingAddress, setSaveShippingAddress] = useState(false);
    const [saveBillingAddress, setSaveBillingAddress] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [processingPayment, setProcessingPayment] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false); // <-- added

    // Helpers to validate addresses
    const isShippingComplete = () =>
        !!(shippingAddress.line1 && shippingAddress.city && shippingAddress.state && shippingAddress.postalCode);

    const isBillingComplete = () =>
        !!(billingAddress.address && billingAddress.city && billingAddress.state && billingAddress.zipCode &&
            billingAddress.email && billingAddress.firstName && billingAddress.lastName);

    const addressReady = isShippingComplete() && isBillingComplete();

    // Create payment intent on component mount
    useEffect(() => {
        if (orderItems.length > 0 && !clientSecret) {
            createPaymentIntent();
        }
    }, [orderItems, clientSecret, createPaymentIntent]);

    // Auto prompt user if addresses incomplete
    useEffect(() => {
        if (orderItems.length > 0 && !addressReady) {
            setShowAddressModal(true);
        } else {
            setShowAddressModal(false);
        }
    }, [orderItems, shippingAddress, billingAddress]); // <-- added dependency check

    // Calculate shipping when address changes
    useEffect(() => {
        if (shippingAddress.city && shippingAddress.state && shippingAddress.postalCode) {
            calculateShipping(shippingAddress);
        }
    }, [shippingAddress, calculateShipping]);

    const handleBillingAddressChange = (field, value) => {
        updateBillingAddress({ [field]: value });
    };

    const handleShippingAddressChange = (field, value) => {
        updateShippingAddress({ [field]: value });
    };

    const handleSaveAddress = async (type) => {
        try {
            const addressData = type === 'shipping' ? shippingAddress : {
                line1: billingAddress.address,
                city: billingAddress.city,
                state: billingAddress.state,
                postalCode: billingAddress.zipCode,
                country: billingAddress.country,
                email: billingAddress.email,
                firstName: billingAddress.firstName,
                lastName: billingAddress.lastName
            };

            await saveAddress(addressData, type);
            alert(`${type === 'shipping' ? 'Shipping' : 'Billing'} address saved successfully!`);
        } catch (error) {
            alert('Failed to save address: ' + error.message);
        }
    };

    const handleApplyDiscount = async () => {
        if (!couponCode.trim()) return;

        try {
            await applyDiscount(couponCode);
            alert('Discount applied successfully!');
        } catch (error) {
            alert('Invalid coupon code');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Block submit if address incomplete
        if (!addressReady) {
            setShowAddressModal(true);
            return;
        }

        if (!stripe || !elements) return;

        clearError();
        setProcessingPayment(true);

        try {
            // Create order first
            const order = await createOrder({
                paymentIntentId: clientSecret?.split('_secret_')[0]
            });

            // Confirm payment with Stripe
            const cardElement = elements.getElement(CardElement);

            const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: cardholderName,
                        email: billingAddress.email,
                        address: {
                            line1: billingAddress.address,
                            city: billingAddress.city,
                            state: billingAddress.state,
                            postal_code: billingAddress.zipCode,
                            country: billingAddress.country
                        }
                    }
                }
            });

            if (stripeError) {
                throw new Error(stripeError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                // Save addresses if requested
                if (saveShippingAddress) {
                    await handleSaveAddress('shipping');
                }
                if (saveBillingAddress) {
                    await handleSaveAddress('billing');
                }

                // Redirect to success page
                router.push(`/order-confirmation/${order._id}`);
            }
        } catch (error) {
            console.error('Payment failed:', error);
            alert('Payment failed: ' + error.message);
        } finally {
            setProcessingPayment(false);
        }
    };

    if (orderItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">No items in checkout</h2>
                    <p className="text-gray-600 mb-6">Please add items to your cart first.</p>
                    <button
                        onClick={() => router.push('/products')}
                        className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            {/* Address required modal */}
            {showAddressModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Address Required</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Please add both your shipping and billing addresses before completing checkout.
                        </p>
                        <ul className="text-xs text-gray-500 mb-4 list-disc ml-5 space-y-1">
                            {!isShippingComplete() && <li>Shipping address is incomplete.</li>}
                            {!isBillingComplete() && <li>Billing address is incomplete.</li>}
                        </ul>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setShowAddressModal(false)}
                                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Close
                            </button>
                            <Link
                                href="/profile"
                                className="px-5 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 font-medium"
                            >
                                Go to Profile
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Order</h1>
                        <p className="text-gray-600">Secure checkout powered by Stripe</p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Form Section */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Shipping Address */}
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold">Shipping Address</h2>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="saveShipping"
                                                checked={saveShippingAddress}
                                                onChange={(e) => setSaveShippingAddress(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="saveShipping" className="text-sm text-gray-600">Save address</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Address Line 1"
                                            value={shippingAddress.line1}
                                            onChange={(e) => handleShippingAddressChange('line1', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Address Line 2 (Optional)"
                                            value={shippingAddress.line2}
                                            onChange={(e) => handleShippingAddressChange('line2', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={shippingAddress.city}
                                                onChange={(e) => handleShippingAddressChange('city', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={shippingAddress.state}
                                                onChange={(e) => handleShippingAddressChange('state', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="ZIP Code"
                                                value={shippingAddress.postalCode}
                                                onChange={(e) => handleShippingAddressChange('postalCode', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {saveShippingAddress && (
                                        <button
                                            type="button"
                                            onClick={() => handleSaveAddress('shipping')}
                                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save Shipping Address'}
                                        </button>
                                    )}
                                </div>

                                {/* Billing Address */}
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-xl font-semibold">Billing Address</h2>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="saveBilling"
                                                checked={saveBillingAddress}
                                                onChange={(e) => setSaveBillingAddress(e.target.checked)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="saveBilling" className="text-sm text-gray-600">Save address</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            value={billingAddress.email}
                                            onChange={(e) => handleBillingAddressChange('email', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                            required
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="First Name"
                                                value={billingAddress.firstName}
                                                onChange={(e) => handleBillingAddressChange('firstName', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="Last Name"
                                                value={billingAddress.lastName}
                                                onChange={(e) => handleBillingAddressChange('lastName', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            value={billingAddress.address}
                                            onChange={(e) => handleBillingAddressChange('address', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                            required
                                        />
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                placeholder="City"
                                                value={billingAddress.city}
                                                onChange={(e) => handleBillingAddressChange('city', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="State"
                                                value={billingAddress.state}
                                                onChange={(e) => handleBillingAddressChange('state', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                            <input
                                                type="text"
                                                placeholder="ZIP Code"
                                                value={billingAddress.zipCode}
                                                onChange={(e) => handleBillingAddressChange('zipCode', e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {saveBillingAddress && (
                                        <button
                                            type="button"
                                            onClick={() => handleSaveAddress('billing')}
                                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                            disabled={loading}
                                        >
                                            {loading ? 'Saving...' : 'Save Billing Address'}
                                        </button>
                                    )}
                                </div>

                                {/* Payment Method */}
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder="Cardholder Name"
                                            value={cardholderName}
                                            onChange={(e) => setCardholderName(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500"
                                            required
                                        />

                                        <div className="p-4 border border-gray-300 rounded-xl">
                                            <CardElement
                                                options={{
                                                    style: {
                                                        base: {
                                                            fontSize: '16px',
                                                            color: '#424770',
                                                            '::placeholder': {
                                                                color: '#aab7c4',
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl shadow-xl p-6">
                                    <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

                                    <div className="space-y-4 mb-6">
                                        {orderItems.map((item, index) => (
                                            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-sm text-gray-900">{item.productName}</h4>
                                                    <p className="text-xs text-gray-500">SKU: {item.productSku}</p>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                                                        <span className="font-semibold text-gray-900">${item.totalPrice}</span>
                                                    </div>
                                                    {item.selectedOptions && (
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {item.selectedOptions.color && `Color: ${item.selectedOptions.color} `}
                                                            {item.selectedOptions.memory && `Memory: ${item.selectedOptions.memory}`}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Discount Code */}
                                    <div className="mb-6">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Discount code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleApplyDiscount}
                                                className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600"
                                                disabled={loading}
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-3 border-t pt-4">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal</span>
                                            <span>${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-600">
                                            <span>Shipping</span>
                                            <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                                                {shippingCost === 0 ? 'Free' : `${shippingCost.toFixed(2)}`}
                                            </span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="flex justify-between text-gray-600">
                                                <span>Discount</span>
                                                <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between text-gray-600">
                                            <span>Tax</span>
                                            <span>${taxAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex justify-between text-xl font-bold text-gray-900">
                                                <span>Total</span>
                                                <span>${totalAmount.toFixed(2)} USD</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-semibold text-green-800">Secure Checkout</span>
                                    </div>
                                    <p className="text-sm text-green-700">Your payment is protected by Stripe's industry-leading security.</p>
                                </div>

                                {/* Complete Order Button */}
                                <button
                                    type="submit"
                                    disabled={!stripe || processingPayment || loading || !addressReady}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg
                                               hover:from-indigo-700 hover:to-purple-700 transition-all duration-300
                                               transform hover:scale-105 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {processingPayment ? 'Processing...' : `Complete Order - ${totalAmount.toFixed(2)}`}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default Checkout;