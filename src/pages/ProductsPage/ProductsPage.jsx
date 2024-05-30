import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import SuccessModal from "../../components/Modal/SuccessModal";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [orderTotal, setOrderTotal] = useState(0);
  const [orderSubTotal, setOrderSubTotal] = useState(0);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  console.log(token);

  useEffect(() => {
    axios
      .get("http://localhost:5005/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((productResponse) => {
        setProducts(productResponse.data);
        const initialQuantities = productResponse.data.reduce(
          (acc, product) => {
            acc[product._id] = 0;
            return acc;
          },
          {}
        );
        setQuantities(initialQuantities);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  const calculateTotals = (updatedQuantities) => {
    const selectedProducts = products
      .filter((product) => updatedQuantities[product._id] > 0)
      .map((product) => ({
        quantity: updatedQuantities[product._id],
        price: product.price,
      }));

    const newSubTotal = selectedProducts.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );

    const newTotal = newSubTotal + 4.99;

    setOrderSubTotal(newSubTotal);
    setOrderTotal(newTotal);
  };

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      calculateTotals(updatedQuantities);
      return updatedQuantities;
    });
  };

  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max(prevQuantities[productId] - 1, 0),
      };
      calculateTotals(updatedQuantities);
      return updatedQuantities;
    });
  };

  const handleCreateOrder = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5005/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = userResponse.data._id;

      console.log("Fetched user ID successfully:", userId);

      // Populate the orderModel to create an Order
      const selectedProducts = products
        .filter((product) => quantities[product._id] > 0)
        .map((product) => ({
          productId: product._id,
          quantity: quantities[product._id],
          price: product.price,
        }));

      const orderData = {
        userId,
        products: selectedProducts,
        orderTotal,
        status: "Created",
      };

      const orderResponse = await axios.post(
        "http://localhost:5005/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Order created successfully:", orderResponse.data);
      setMessage("Order created successfully!");
      setModalIsOpen(true);
      setTimeout(() => {
        setModalIsOpen(false);
        navigate("/orders"); // Redirect to the success page
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div class="h-screen bg-gray-100 pt-20">
      <h1 class="mb-10 text-center text-2xl font-bold">Select your Order: </h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="w-full md:w-2/3 overflow-y-auto max-h-[600px]">
          <ul>
            {products.map((product) => (
              <li key={product._id} class="rounded-lg w-full">
                <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img
                    src={product.image}
                    alt="product-image"
                    class="w-full rounded-lg sm:w-40"
                  />
                  <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div class="mt-5 sm:mt-0">
                      <Link
                        to={`/products/${product._id}`}
                        className="slabo-27px-small text-white "
                      >
                        <h2 class="text-lg font-bold text-gray-900">
                          {product.name}
                        </h2>
                      </Link>
                      <p class="mt-1 text-xs text-gray-700">{product.status}</p>
                    </div>
                    <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div class="flex items-center border-gray-100">
                        <span
                          class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleDecrement(product._id)}
                        >
                          {" "}
                          -{" "}
                        </span>
                        <input
                          class="h-8 w-8 border bg-white text-center text-xs outline-none"
                          type="number"
                          value={quantities[product._id]}
                          min="0"
                          readOnly
                        />
                        <span
                          class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                          onClick={() => handleIncrement(product._id)}
                        >
                          {" "}
                          +{" "}
                        </span>
                      </div>
                      <div class="flex items-center space-x-4">
                        <p class="text-sm">
                          Price: ${product.price.toFixed(2)} EU
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* <!-------------------- Sub total --------------------> */}
        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">${orderSubTotal.toFixed(2)}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Taxes</p>
            <p class="text-gray-700">$4.99</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">${orderTotal.toFixed(2)} EU</p>
              <p class="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            onClick={handleCreateOrder}
          >
            Create Order
          </button>
        </div>
      </div>
      {/* -----------//------- modal -----------//------- */}
      <SuccessModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        message={message}
      />
    </div>
  );
};

export default ProductPage;
