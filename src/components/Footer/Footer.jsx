import lgbtqFlag from "../../assets/lgbtq-flag.jpg";

function Footer() {
  return (
    <footer class="bg-white shadow dark:bg-gray-900">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Bife
            </span>
          </a>
          <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a class="me-4 md:me-6">Email: info@bife.com</a>
            </li>
            <li>
              <a class="me-4 md:me-6">Phone: (123) 456-7890</a>
            </li>
            <li>
              <a
                href="https://github.com/sharimanoe/frontend-food-truck"
                class="hover:underline me-4 md:me-6"
              >
                Visit our GitHub
              </a>
            </li>
            <li className="flex items-center">
              <img src={lgbtqFlag} alt="LGBTQ+ Flag" className="h-4 w-8 mr-2" />
              <a class="me-4 md:me-6">LGBTQ+ Friendly</a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 <a>BiFe™</a>. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
