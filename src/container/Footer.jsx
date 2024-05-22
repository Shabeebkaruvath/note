import React from 'react';

function Footer() {
  return (
    <div className="bg-dark text-white py-3 mt-auto footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2023 Prometheus.</p>
          </div>
          <div className="col-md-6 text-md-right">
            <a href=" " className="text-white mr-3">
              Privacy Policy
            </a>
            <a href=" " className="text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;