import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
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

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(prevQuantities[productId] - 1, 0),
    }));
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

      const orderTotal = selectedProducts.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );

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
    <div>
      <h1>Product List</h1>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>{message}</h2>
      </Modal>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/products/${product._id}`}>{product.name}</Link>
            <button onClick={() => handleIncrement(product._id)}> + </button>
            <p>{quantities[product._id]}</p>
            <button onClick={() => handleDecrement(product._id)}> - </button>
          </li>
        ))}
      </ul>
      <button onClick={handleCreateOrder}> Create Order </button>
    </div>
  );
};

export default ProductPage;
