import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");
  console.log(token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5005/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setOrders(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      setError("No token found");
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>My Orders: </h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <h2>Order ID: {order._id}</h2>
            <p>Status: {order.status}</p>
            <p>Order Total: ${order.orderTotal.toFixed(2)}</p>
            <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
            <h3>Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product._id}>
                  <img
                    src={product.productId.image}
                    alt={product.productId.name}
                    width="100"
                  />
                  <p>Product Name: {product.productId.name}</p>
                  {/* <p>Type: {product.productId.type}</p> */}
                  {/* <p>Description: {product.productId.description}</p> */}
                  <p>Product Price: ${product.productId.price.toFixed(2)}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Total Price: ${product.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <Link to="/">
        <p>Come Back</p>
      </Link>
    </div>
  );
};

export default OrderPage;
