import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { 
//   Facebook, 
//   Twitter, 
//   Instagram, 
//   Linkedin 
// } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' }
  ];

  const socialLinks = [
    { icon: <FaFacebook />, path: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, path: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, path: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, path: 'https://linkedin.com', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-primary-100 text-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Masqani</h2>
            <p className="text-primary-700">
              Simplifying real estate management with innovative technology and user-centric solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-primary-600 hover:text-primary-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.path}
                  href={social.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-900 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-primary-200 text-center">
          <p className="text-primary-700">
            © {currentYear} Masqani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;