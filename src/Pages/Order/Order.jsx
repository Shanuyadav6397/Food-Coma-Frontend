import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import toast from "react-hot-toast";
import { placeOrder } from "../../Redux/Slices/OrderSlice.js";
import Payment from "../../assets/Images/payment.svg";

function Order() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartsData } = useSelector((state) => state.cart);
    const [details, setDetails] = useState({
        paymentMethod: 'OFFLINE',
        address: ''
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value
        });
    }

    async function handleFormSumbit(e) {
        e.preventDefault();
        if (cartsData?.items?.length === 0) {
            toast.error('Please add items to cart');
            return;
        }
        if (details.paymentMethod === '') {
            toast.error('Please fill the payment method');
            return;
        }
        if (details.address === '') {
            toast.error('Please fill the address');
            return;
        }

        const order = await dispatch(placeOrder());

        if (order?.payload?.success) {
            toast.success('Order placed successfully');
            console.log("order1  ", navigate);
            navigate('/order/success');
        } else {
            toast.error('Something went wrong cannot place order');
        }
    }

    return (
        <Layout>
            <section className="text-gray-600 body-font min-h-56">

                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Thanks for Choosing Us {' '}</h1>

                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                            Total Price - {' '}
                            <span className="font-bold text-red-900">
                                ₹ {cartsData?.items?.length === 0
                                    ? ''
                                    : cartsData?.items?.reduce((acc, item) => acc + item?.quantity * item?.product?.price, 0)}
                            </span>
                        </p>
                    </div>

                    <form onSubmit={handleFormSumbit} className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="relative flex-grow w-full">
                            <div className="flex justify-center mb-4">
                                <img
                                    className="object-cover object-center rounded-lg shadow-md"
                                    src={Payment}
                                    alt="payment"
                                    width={200}
                                    height={200}
                                />
                            </div>
                            <label htmlFor="paymentMethod" className="text-2xl leading-7 text-gray-600">
                                Payment Method
                            </label>
                            <select
                                name="paymentMethod"
                                onChange={handleUserInput}
                                defaultValue=""
                                className="p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700 w-full">
                                <option value="" disabled>Select Payment Method</option>
                                <option value="COD">COD</option>
                                <option value="ONLINE">Online</option>
                            </select>
                        </div>

                        <div className="relative flex-grow w-full my-5">
                            <label htmlFor="address" className="leading-7 text-2xl text-gray-600">
                                Address
                            </label>
                            <textarea
                                name="address"
                                placeholder="Enter your address here..."
                                onChange={handleUserInput}
                                className="w-full p-2 border rounded-md focus:outline-none focus:border-primary-500 bg-white text-gray-700"
                            >
                            </textarea>
                        </div>

                        <button
                            className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-primary-600 rounded text-lg cursor-pointer"
                        >
                            Place Order
                        </button>
                    </form>
                </div>

            </section>
        </Layout>
    );
}


export default Order;