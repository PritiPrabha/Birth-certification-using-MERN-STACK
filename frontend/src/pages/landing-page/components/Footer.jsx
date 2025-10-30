import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react'; // Only Shield remains from lucide-react
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'; // Import specific social icons
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com' },
  ];

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
    ],
    resources: [
      { label: 'Pricing', href: '#' },
      { label: 'Features', href: '#' },
      { label: 'Partners', href: '#' },
      { label: 'Sitemap', href: '#' },
    ],
  };

  return (
    <footer className="footer bg-background text-text-general pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-lg-4 mb-4">
            <Link to="/" className="d-inline-flex align-items-center mb-3 text-decoration-none">
              <Shield size={30} className="text-primary-button me-2" /> {/* Use Shield as a placeholder for logo */}
              <span className="h4 fw-bold text-headings mb-0">LifeCert</span>
            </Link>

            <p className="text-text-general mb-3">
              The most trusted digital birth certificate platform, serving
              families nationwide with secure, government-approved certificates
              since 2025.
            </p>

            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-telephone-fill text-primary-button me-2"></i> 
              <span className="text-text-general">+91 8797667205</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <i className="bi bi-envelope-fill text-primary-button me-2"></i> 
              <span className="text-text-general">support@lifecert.com</span>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-geo-alt-fill text-primary-button me-2"></i> 
              <span className="text-text-general">Available in all 28 states</span>
            </div>

            {/* Social Links */}
            <div className="d-flex gap-2">
              {socialLinks.map(({ name, icon: Icon, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary-button btn-sm rounded-circle d-flex align-items-center justify-content-center text-primary-button hover-bg-accent-color hover-text-white"
                  style={{ width: '36px', height: '36px' }}
                  aria-label={name}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Groups */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div className="col-6 col-lg-2 mb-4" key={section}>
              <h3 className="h6 fw-bold text-headings mb-3">{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
              <ul className="list-unstyled">
                {links.map((link) => (
                  <li key={link.label} className="mb-2">
                    <a href={link.href} className="text-text-general text-decoration-none hover-text-accent-color">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Security & Trust Section */}
        <div className="border-top border-borders-cards pt-4 mt-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center small text-muted">
            <div className="d-flex gap-3">
              <div className="d-flex align-items-center gap-2">
                <Shield size={16} className="text-success-confirm" />
                <span className="text-text-general">SSL Secured</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Shield size={16} className="text-success-confirm" /> {/* Replaced Award with Shield for consistency */}
                <span className="text-text-general">Government Approved</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Shield size={16} className="text-success-confirm" /> {/* Replaced Lock with Shield for consistency */}
                <span className="text-text-general">HIPAA Compliant</span>
              </div>
            </div>
            <div className="d-flex gap-3 text-text-general">
              <span>SOC 2 Type II</span> • <span>ISO 27001</span> • <span>PCI DSS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center pt-3 mt-4 border-top border-borders-cards">
          <p className="small text-text-general mb-0">
            © {currentYear} LifeCert. All rights reserved.
            <span className="ms-3 me-3">|</span> 
            Made with <i className="bi bi-heart-fill text-alerts-error mx-1"></i> for families nationwide
            <span className="ms-3 me-3">|</span> 
            <Shield size={14} className="text-text-general me-1" /> United States
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
