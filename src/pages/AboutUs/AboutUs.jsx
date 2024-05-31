import React from "react";
import "./AboutUs.css";
import foodTruck from "../../assets/Argentinian_Food_Truck.png";

function AboutUs() {
  return (
    <div class="sm:flex items-center max-w-screen-xl">
      <div class="sm:w-1/2 p-10">
        <div class="image object-center text-center">
          <img src={foodTruck} />
        </div>
      </div>
      <div class="sm:w-1/2 p-5">
        <div class="text">
          <span class="text-gray-500 border-b-2 border-blue-700 uppercase">
            About us
          </span>
          <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">
            About <span class="text-blue-700">Our FoodTruck</span>
          </h2>
          <p class="text-gray-700">
            Welcome to <strong>BiFe</strong>, your go-to food truck for
            authentic Argentinian cuisine! We pride ourselves on delivering the
            most delicious and traditional dishes, from succulent steaks to
            mouth-watering empanadas. Our mission is to bring the taste of
            Argentina to your neighborhood with quality ingredients and a
            passion for cooking.
          </p>
          <p class="text-gray-700">
            At <strong>BiFe</strong>, we believe in the power of good food to
            bring people together. Our recipes are crafted with love and respect
            for our culinary heritage, ensuring every bite transports you to the
            vibrant streets of Argentina. Whether you're a meat lover or a fan
            of savory pastries, our menu has something for everyone.
          </p>
          <p class="text-gray-700">
            Thank you for choosing <strong>BiFe</strong>. We look forward to
            serving you and sharing our love for Argentinian food with you!
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
