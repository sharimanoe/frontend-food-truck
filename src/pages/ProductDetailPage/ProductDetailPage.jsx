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
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 flex items-center justify-center min-h-screen bg-black">
      <div className="rounded overflow-hidden shadow-lg flex flex-col justify-center w-1/2 p-0 bg-white">
        <div className="relative ">
          <img className="w-full" src={product.image} alt="product image" />
          <div class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            {product.promotion}
          </div>
          <div class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
            {product.type}
          </div>
          <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </div>
        {/* -------------------------- description section of the food -------------------------- */}
        <div className="px-6 py-4 mb-auto">
          <a
            href="#"
            className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
          >
            {product.name}
          </a>
          <p className="text-gray-500 text-sm">{product.description}</p>
        </div>
        {/* -------------------------- footer of the food -------------------------- */}
        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100 text-xs font-regular">
          <span className="py-1  text-gray-900 mr-1 flex flex-row items-center material-icons">
            euro_symbol
          </span>
          <span className="ml-1">{product.price}</span>
          <span className="py-1 text-gray-900 mr-1 flex flex-row items-center material-icons">
            check
          </span>
          <span className="ml-1">{product.status}</span>
        </div>
        {/* <img src={product.image} className="h-20" alt={product.name} /> */}
        {/* <h1>{product.name}</h1> */}
        {/* <p className="text-[#FFEDA3]">Type: {product.type}</p> */}
        {/* <p>Description: {product.description}</p> */}
        {/* <p>Price: {product.price}</p> */}
        {/* <p>Status: {product.status}</p> */}
        {/* <p>Promotion: {product.promotion}</p> */}
        {/* <Link to={`/products/edit/${product._id}`}>Edit</Link> */}
        <Link to="/products" className="hover:underline">
          <span className="material-icons mr-2">keyboard_arrow_left</span>
          <p>Come Back</p>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
