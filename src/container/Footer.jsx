import React from 'react';

function Footer() {
  return (
    <div className="bg-dark text-white py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Your Company Name</p>
          </div>
          <div className="col-md-6 text-md-right">
            <a href="https://github.com/" className="text-white mr-3">
              Privacy Policy
            </a>
            <a href="https://github.com/" className="text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;