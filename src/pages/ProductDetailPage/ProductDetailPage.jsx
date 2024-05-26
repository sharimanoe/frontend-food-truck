import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Type: {product.type}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Status: {product.status}</p>
      <p>Promotion: {product.promotion}</p>
      {/* <Link to={`/products/edit/${product._id}`}>Edit</Link> */}
      <Link to="/products">
        <p>Come Back</p>
      </Link>
    </div>
  );
};

export default ProductDetails;
