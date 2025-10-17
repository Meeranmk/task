"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const products = [
    { name: "Payments", href: "#" },
    { name: "Billing", href: "#" },
    { name: "Connect", href: "#" },
    { name: "Invoicing", href: "#" },
    { name: "Radar", href: "#" },
    { name: "Terminal", href: "#" },
    { name: "Tax", href: "#" },
    { name: "Treasury", href: "#" },
  ];

  const resources = [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Libraries", href: "#" },
    { name: "Plugins", href: "#" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="https://www.softsync.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors"
            >
              Softsync.ai
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-all duration-200 group-hover:bg-slate-50">
                <span>Products</span>
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 group-hover:translate-y-0 translate-y-2">
                {products.map((product, index) => (
                  <Link
                    key={product.name}
                    href={product.href}
                    className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg hover:pl-6"
                    style={{
                      transitionDelay: `${index * 20}ms`,
                    }}
                  >
                    {product.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-all duration-200 group-hover:bg-slate-50">
                <span>Resources</span>
                <ChevronDown
                  size={16}
                  className="transition-transform duration-300 group-hover:rotate-180"
                />
              </button>
              <div className="absolute left-0 mt-0 w-56 bg-white border border-slate-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 group-hover:translate-y-0 translate-y-2">
                {resources.map((resource, index) => (
                  <Link
                    key={resource.name}
                    href={resource.href}
                    className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg hover:pl-6"
                    style={{
                      transitionDelay: `${index * 20}ms`,
                    }}
                  >
                    {resource.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="#"
              className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-all duration-200 hover:bg-slate-50"
            >
              Pricing
            </Link>
            <Link
              href="#"
              className="text-slate-700 hover:text-slate-900 px-3 py-2 rounded-md transition-all duration-200 hover:bg-slate-50"
            >
              Company
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="#"
              className="text-slate-700 hover:text-slate-900 transition-colors font-medium px-3 py-2 rounded-md hover:bg-slate-50"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/30 transform hover:scale-105"
            >
              Start now
            </Link>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-slate-900 p-2 rounded-md hover:bg-slate-50 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="space-y-2 pt-4">
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "products" ? null : "products"
                  )
                }
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Products</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    openDropdown === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "products" && (
                <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top duration-200">
                  {products.map((product) => (
                    <Link
                      key={product.name}
                      href={product.href}
                      className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {product.name}
                    </Link>
                  ))}
                </div>
              )}

              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "resources" ? null : "resources"
                  )
                }
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Resources</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    openDropdown === "resources" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openDropdown === "resources" && (
                <div className="pl-4 space-y-2 animate-in fade-in slide-in-from-top duration-200">
                  {resources.map((resource) => (
                    <Link
                      key={resource.name}
                      href={resource.href}
                      className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="#"
                className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Pricing
              </Link>

              <Link
                href="#"
                className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Company
              </Link>

              <div className="pt-4 space-y-2 border-t border-slate-200">
                <Link
                  href="#"
                  className="block px-4 py-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-center transition-colors"
                >
                  Start now
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
