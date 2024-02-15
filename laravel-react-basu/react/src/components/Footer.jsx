// Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        {/* Left Section */}
        <div className="mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">APPTECH</h2>
          <p className="text-gray-400">Asya De Pacifico Soy Piratas Y Technolohias.</p>
        </div>

        {/* Middle Section */}
        <div className="mb-8 md:mb-0">
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <div className="flex items-center mb-4">
            {/* Social Media Icons */}
            <a href="https://ph.linkedin.com/in/hanzel-bernante-74988921a" className="flex items-center mr-4" target="_blank" rel="noopener noreferrer">
              <small>Hanzel Bernante</small>
              <img
                src="/images/linkedin1.png"
                alt="LinkedIn"
                className="w-6 h-6 ml-2"
              />
            </a>
            <a href="https://www.linkedin.com/in/lorenz-tobias-lim-41872021a/?originalSubdomain=ph" className="flex items-center mr-4" target="_blank" rel="noopener noreferrer">
              <small>Lorenz Tobias Lim</small>
              <img
                src="/images/linkedin1.png"
                alt="LinkedIn"
                className="w-6 h-6 ml-2"
              />
            </a>
            <a href="https://www.linkedin.com/in/cyriel-francis-san-jose-58059b21a/?originalSubdomain=ph" className="flex items-center" target="_blank" rel="noopener noreferrer">
              <small>Francis Cyriel San Jose</small>
              <img
                src="/images/linkedin1.png"
                alt="LinkedIn"
                className="w-6 h-6 ml-2"
              />
            </a>
          </div>

          {/* Contact Information */}
          <p className="text-gray-400">
            <br />
            Asia Pacific College<br />
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
        &copy; 2024 Company Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
