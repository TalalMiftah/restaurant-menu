'use client';

import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-surface dark:bg-surface-dark shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-bold text-primary dark:text-primary-dark">
            Restaurant Menu
          </Link>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark transition-colors"
            >
              Home
            </Link>
            <DarkModeToggle />
          </div>
          {/* Mobile burger */}
          <button
            className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <span className="sr-only">Open menu</span>
            <svg
              className={`h-7 w-7 text-primary dark:text-primary-dark transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-surface dark:bg-surface-dark shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ borderTopLeftRadius: '1rem', borderBottomLeftRadius: '1rem' }}
        aria-hidden={!open}
      >
        <div className="flex flex-col h-full p-6 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-bold text-primary dark:text-primary-dark">Menu</span>
            <button
              className="p-2 rounded hover:bg-accent/20 transition-colors"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <svg className="h-6 w-6 text-primary dark:text-primary-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <Link
            href="/"
            className="text-text-secondary dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary-dark text-lg font-medium transition-colors"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <div className="mt-auto">
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
} 