import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>Type: {product.type}</p>
      <p>Description: {product.description}</p>
      <p>Price: {product.price}</p>
      <p>Status: {product.status}</p>
      <p>Promotion: {product.promotion}</p>
      <Link to={`/products/edit/${product._id}`}>Edit</Link>
    </div>
  );
};

export default ProductDetails;
