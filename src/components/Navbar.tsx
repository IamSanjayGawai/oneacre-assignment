"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, DollarSign, Menu, X } from "lucide-react"; // Using Lucide React icons
import logo from "../../public/logo.avif";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="flex items-center lg:justify-around justify-between p-4 bg-white shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src={logo}
          alt="1acre.in logo"
          width={100}
          height={100}
          className="mr-2"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link href="#" className="text-gray-600 hover:text-gray-800">
          Agents
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-800">
          Land Owners
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-800">
          Developers
        </Link>
        <Link
          href="#"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <span className="mr-1">Services</span>
          <span className="text-yellow-500">•</span>
        </Link>
        <Link href="#" className="text-gray-600 hover:text-gray-800">
          All Lands
        </Link>
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center">
          Sell Land
          <DollarSign className="text-green-500 ml-1" size={18} />
        </button>
        <button className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 flex items-center">
          Login
          <ArrowRight className="ml-1" size={18} />
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-600 text-2xl"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 transition-all duration-300 md:hidden">
          <Link
            href="#"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Agents
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Land Owners
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Developers
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#"
            className="text-gray-600 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            All Lands
          </Link>
          <button
            className="border border-gray-300 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-100 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Sell Land
            <DollarSign className="text-green-500 ml-1" size={18} />
          </button>
          <button
            className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 flex items-center"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login
            <ArrowRight className="ml-1" size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
