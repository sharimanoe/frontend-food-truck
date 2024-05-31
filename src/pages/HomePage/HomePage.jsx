import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import logo from "../../assets/logo1.png";
import logoTest2 from "../../assets/Argentinian_Food_Truck.png";

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handlePrev = () => {
    setActiveSlide(activeSlide === 1 ? 3 : activeSlide - 1);
  };

  const handleNext = () => {
    setActiveSlide(activeSlide === 3 ? 1 : activeSlide + 1);
  };

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    axios
      .get("http://localhost:5005/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((productResponse) => {
        setProducts(productResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [token]);

  return (
    <>
      <div
        className="carousel relative container mx-auto mb-8"
        style={{ maxWidth: "1600px" }}
      >
        <div className="carousel-inner relative overflow-hidden w-full">
          {/* <!--Slide 1--> */}
          <input
            className="carousel-open"
            type="radio"
            id="carousel-1"
            name="carousel"
            aria-hidden="true"
            hidden
            checked={activeSlide === 1}
            onChange={() => setActiveSlide(1)}
          />
          <div
            className={`carousel-item absolute ${
              activeSlide === 1 ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "50vh" }}
          >
            <div
              className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
              style={{
                backgroundImage: `url(${logoTest2})`,
              }}
            >
              <div className="container mx-auto">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <p className="text-black text-2xl my-4">
                    Stripy Zig Zag Jigsaw Pillow and Duvet Set
                  </p>
                  <a
                    className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                    href="#"
                  >
                    view product
                  </a>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="carousel-3"
            className="prev control-1 block w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
            onClick={handlePrev}
          >
            ‹
          </label>
          <label
            htmlFor="carousel-2"
            className="next control-1 block w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
            onClick={handleNext}
          >
            ›
          </label>

          {/* <!--Slide 2--> */}
          <input
            className="carousel-open"
            type="radio"
            id="carousel-2"
            name="carousel"
            aria-hidden="true"
            hidden
            checked={activeSlide === 2}
            onChange={() => setActiveSlide(2)}
          />
          <div
            className={`carousel-item absolute ${
              activeSlide === 2 ? "opacity-100" : "opacity-0"
            } bg-cover bg-right`}
            style={{ height: "50vh" }}
          >
            <div
              className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-right"
              style={{
                backgroundImage: `url(${logo})`,
              }}
            >
              <div className="container mx-auto">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <p className="text-black text-2xl my-4">
                    Real Bamboo Wall Clock
                  </p>
                  <a
                    className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                    href="#"
                  >
                    view product
                  </a>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="carousel-1"
            className="prev control-2 block w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
            onClick={handlePrev}
          >
            ‹
          </label>
          <label
            htmlFor="carousel-3"
            className="next control-2 block w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
            onClick={handleNext}
          >
            ›
          </label>

          {/* <!--Slide 3--> */}
          <input
            className="carousel-open"
            type="radio"
            id="carousel-3"
            name="carousel"
            aria-hidden="true"
            hidden
            checked={activeSlide === 3}
            onChange={() => setActiveSlide(3)}
          />
          <div
            className={`carousel-item absolute ${
              activeSlide === 3 ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "50vh" }}
          >
            <div
              className="block h-full w-full mx-auto flex pt-6 md:pt-0 md:items-center bg-cover bg-bottom"
              style={{
                backgroundImage: `url(${logoTest2})`,
              }}
            >
              <div className="container mx-auto">
                <div className="flex flex-col w-full lg:w-1/2 md:ml-16 items-center md:items-start px-6 tracking-wide">
                  <p className="text-black text-2xl my-4">
                    Brown and blue hardbound book
                  </p>
                  <a
                    className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
                    href="#"
                  >
                    view product
                  </a>
                </div>
              </div>
            </div>
          </div>
          <label
            htmlFor="carousel-2"
            className="prev control-3 block w-10 h-10 ml-2 md:ml-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 left-0 my-auto"
            onClick={handlePrev}
          >
            ‹
          </label>
          <label
            htmlFor="carousel-1"
            className="next control-3 block w-10 h-10 mr-2 md:mr-10 absolute cursor-pointer text-3xl font-bold text-black hover:text-white rounded-full bg-white hover:bg-gray-900 leading-tight text-center z-10 inset-y-0 right-0 my-auto"
            onClick={handleNext}
          >
            ›
          </label>

          {/* <!-- Add additional indicators for each slide--> */}
          <ol className="carousel-indicators">
            <li className="inline-block mr-3">
              <label
                htmlFor="carousel-1"
                className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
                onClick={() => setActiveSlide(1)}
              >
                •
              </label>
            </li>
            <li className="inline-block mr-3">
              <label
                htmlFor="carousel-2"
                className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
                onClick={() => setActiveSlide(2)}
              >
                •
              </label>
            </li>
            <li className="inline-block mr-3">
              <label
                htmlFor="carousel-3"
                className="carousel-bullet cursor-pointer block text-4xl text-gray-400 hover:text-gray-900"
                onClick={() => setActiveSlide(3)}
              >
                •
              </label>
            </li>
          </ol>
        </div>
      </div>
      {/* --------------//-------------- List of products section --------//----------------*/}
      <div class="flex items-center justify-center w-full">
        <div class="text-center p-5">
          <div class="text ">
            <span class="text-blue-700 text-5xl">Welcome to BiFe</span>
            <p class="text-gray-700">
              Your go-to place for authentic Argentinian cuisine on wheels!
            </p>
            <p class="text-gray-700">
              At <strong>BiFe</strong>, we believe in the power of good food to
              bring people together. Our recipes are crafted with love and
              respect for our culinary heritage, ensuring every bite transports
              you to the vibrant streets of Argentina. Whether you're a meat
              lover or a fan of savory pastries, our menu has something for
              everyone.
            </p>
          </div>
        </div>
      </div>
      {/* --------------//-------------- List of products section --------//----------------*/}

      <section className="bg-white py-8 ">
        <span class="text-gray-500 border-b-2 border-blue-700 uppercase">
          Take a look to our options:
        </span>
        <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12 m-2">
          {products.map((product) => (
            <div className="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col bg-gray-100">
              <img
                className="hover:grow hover:shadow-lg rounded-lg w-[85%] mx-auto h-[60%]"
                src={product.image}
                alt="product"
              />
              <div className="pt-3 flex items-center justify-between p-3 text-gray-700">
                <p className="">{product.name}</p>
                <p className="">Price: ${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
