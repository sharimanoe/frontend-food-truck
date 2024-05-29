import lgbtqFlag from "../../assets/lgbtq-flag.jpg";

function Footer() {
  return (
    <footer className="bg-black p-4 border-t-2 border-[#FFEDA3]">
      <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
        <section className="mb-4">
          <h2 className="slabo-27px-small text-[#FFEDA3]">Contact Us</h2>
          <p className="slabo-27px-small text-[#FFEDA3]">
            Email: info@bife.com
          </p>
          <p className="slabo-27px-small text-[#FFEDA3]">
            Phone: (123) 456-7890
          </p>
          <p className="slabo-27px-small text-[#FFEDA3]">
            Follow us on social media for updates on our location and specials!
          </p>
        </section>
        <section className="mb-4">
          <p className="slabo-27px-small text-[#FFEDA3]">
            <a
              href="https://github.com/sharimanoe/frontend-food-truck"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit our GitHub
            </a>
          </p>
        </section>
        <section className="mb-4">
          <p className="slabo-27px-small text-[#FFEDA3]">
            &copy; 2024 BiFe - All Rights Reserved
          </p>
        </section>
        <section className="mt-4">
          <p className="slabo-27px-small text-[#FFEDA3] flex items-center justify-center">
            <img src={lgbtqFlag} alt="LGBTQ+ Flag" className="h-6 w-10 mr-2" />
            LGBTQ+ Friendly
          </p>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
