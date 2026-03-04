
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white sticky">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo width="120px" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Creating amazing experiences through innovative solutions. Join our community of creators and innovators.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'github', 'linkedin', 'facebook'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="text-lg">📱</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Blog', path: '/blog' },
                { name: 'About', path: '/about' },
                { name: 'Services', path: '/services' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-green-500"></span>
            </h3>
            <ul className="space-y-3">
              {[
                'Documentation',
                'Tutorials',
                'API Reference',
                'Community Forum',
                'Help Center'
              ].map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-2">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-purple-500"></span>
            </h3>
            <p className="text-gray-300 mb-4">
              Stay updated with our latest news and features.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {currentYear} Your Company. All rights reserved.</p>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 mb-2 md:mb-0"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center group"
        aria-label="Back to top"
      >
        <svg className="w-6 h-6 text-white transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </footer>
  )
}

export default Footer