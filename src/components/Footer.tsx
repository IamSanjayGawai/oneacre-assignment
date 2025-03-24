"use client";

import Link from "next/link";
import { Instagram, Youtube, Linkedin } from "lucide-react"; // Lucide icons

const Footer = () => {
  return (
    <footer className="mt-auto">
      {/* Main Footer Section */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between">
          {/* Services Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="font-bold text-lg mb-2">Services</h2>
            <ul>
              <li className="mb-1">Hand Holding</li>
              <li className="mb-1">Land Monitoring</li>
              <li className="mb-1">Thorough Legal Verification</li>
              <li className="mb-1">Get Your Land Surveyed</li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="mb-6 md:mb-0">
            <h2 className="font-bold text-lg mb-2">Company</h2>
            <ul>
              <li className="mb-1">
                <Link href="#">Terms and Conditions</Link>
              </li>
              <li className="mb-1">
                <Link href="#">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="font-bold text-lg mb-2">Contact Us</h2>
            <ul>
              <li className="mb-1">+918341149011</li>
              <li className="mb-1">Email: support@1acre.in</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-black hover:text-gray-600">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-black hover:text-gray-600">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-black hover:text-gray-600">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-yellow-400 py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-black">© 2023 - 1acre.in - All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
