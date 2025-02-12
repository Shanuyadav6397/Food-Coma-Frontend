import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";
import OrderPlaced from "../../assets/Images/ordered-success.png";

function OrderSuccess() {
    const navigate = useNavigate();
  return (
    <Layout>
        <div className="flex flex-col justify-center items-center py-28">
            <img src={OrderPlaced} width={400} height={400}/>
            <p className="text-lg font-semibold">
                Your order has been placed successfully. You will receive an email confirmation shortly
            </p>

            <button
            onClick={()=> navigate('/')}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md cursor-pointer">
                Go Back To Home
            </button>
        </div>
    </Layout>
  );
}

export default OrderSuccess;