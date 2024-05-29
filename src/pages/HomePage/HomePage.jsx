import React from "react";
// import "./HomePage.css";
import logo from "../../assets/logo.png";

function HomePage() {
  return (
    <div className="bg-black">
      <header className="home-header">
        <img src={logo} className="h-20" alt="BiFe logo" />
        <h1 className="slabo-27px-extra-large text-[#39A9CB]">
          Welcome to BIFE
        </h1>
        <p className="slabo-27px-medium text-[#39A9CB]">
          Your go-to place for authentic Argentinian cuisine on wheels!
        </p>
      </header>
      <section className="home-about">
        <h2 className="slabo-27px-medium text-[#39A9CB]">A little About Us</h2>
        <p className="slabo-27px-medium text-[#39A9CB]">
          At <strong>BiFe</strong>, we pride ourselves on delivering the most
          delicious and traditional dishes, from succulent steaks to
          mouth-watering empanadas. Our mission is to bring the taste of
          Argentina to your neighborhood with quality ingredients and a passion
          for cooking.
        </p>
      </section>
      <section className="slabo-27px-medium text-[#39A9CB]">
        <h2>Our Menu</h2>
        <div className="menu-items">
          <div className="menu-item">
            <h3 className="slabo-27px-medium text-[#39A9CB]">Asado</h3>
            <p className="slabo-27px-medium text-[#39A9CB]">
              Grilled beef ribs served with chimichurri sauce.
            </p>
          </div>
          <div className="menu-item">
            <h3 className="slabo-27px-medium text-[#39A9CB]">Empanadas</h3>
            <p className="slabo-27px-medium text-[#39A9CB]">
              Traditional Argentinian pastries filled with beef, chicken, or
              cheese.
            </p>
          </div>
          <div className="menu-item">
            <h3 className="slabo-27px-medium text-[#39A9CB]">Milanesa</h3>
            <p className="slabo-27px-medium text-[#39A9CB]">
              Breaded and fried beef or chicken cutlet served with a side of
              fries.
            </p>
          </div>
          <div className="menu-item">
            <h3 className="slabo-27px-medium text-[#39A9CB]">Choripán</h3>
            <p className="slabo-27px-medium text-[#39A9CB]">
              Grilled chorizo sausage sandwich topped with chimichurri.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
