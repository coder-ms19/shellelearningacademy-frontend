
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "../assets/logo1.png";

export const Footer = () => {
  const footerLinks = {
    Company: [
      { name: "About Us", path: "/about" },
      { name: "Services", path: "/services" },
      { name: "Contact", path: "/contact" },

    ],
    Programs: [
      { name: "All Courses", path: "/all-courses" },
      // { name: "Certifications", path: "/certifications" },

    ],
    Support: [
      { name: "Help Center", path: "/help-center" },
      { name: "Contact Us", path: "/contact" },
      // { name: "Community", path: "/community" },
      // { name: "FAQ", path: "/faq" },
      // { name: "Student Support", path: "/student-support" },
    ],
    Legal: [
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" },
      // { name: "Cookie Policy", path: "/cookies" },
      // { name: "Refund Policy", path: "/refund-policy" },
      // { name: "Licenses", path: "/licenses" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61583112636861&mibextid=wwXIfr&rdid=XJJPGaN0Ttkd5y2I", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/shellelearning", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/shellelearningacademy", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/shell-e-learning-academy-1180a538a/", label: "LinkedIn" },
    { icon: Youtube, href: "https://www.youtube.com/@shellelearningacademy", label: "YouTube" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@shellelearning.com", href: "mailto:support@shellelearning.com" },
    { icon: Phone, text: "+919406688303", href: "tel:+919406688303" },
    { icon: MapPin, text: "Vijay Nagar, Scheme No. 78, New Road, Indore MP 452010", href: "https://maps.app.goo.gl/pjFpAL8tVE7F9EAg7?g_st=ipc" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        {/* Main Footer Content */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-3 sm:mb-4 flex items-center gap-2">
              <img src={logo} alt="Shell E-learning Academy" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-foreground">Shell E-learning Academy</span>
                <span className="text-xs text-muted-foreground">MSME Verified</span>
              </div>
            </Link>
            <p className="mb-3 sm:mb-4 text-sm text-muted-foreground">
              Empowering learners worldwide with quality education, certifications, and career opportunities.
            </p>

            {/* Contact Info */}
            <div className="mb-3 sm:mb-4 space-y-1.5 sm:space-y-2">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <contact.icon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span className="break-words">{contact.text}</span>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-border smooth-transition hover:border-primary hover:bg-primary/5"
                  aria-label={social.label}
                >
                  <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Wrapper */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h3 className="mb-3 sm:mb-4 font-display text-sm font-semibold">{category}</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.path}
                          className="text-sm text-muted-foreground smooth-transition hover:text-primary block py-0.5"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

      

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 sm:pt-6 border-t border-border pt-4">
          <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 sm:flex-row">
            <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 text-center sm:text-left">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Shell E-learning Academy. All rights reserved.
              </p>
              <div className="flex gap-3 sm:gap-4">
                <Link to="/sitemap" className="text-xs text-muted-foreground hover:text-primary">
                  Sitemap
                </Link>
                <Link to="/accessibility" className="text-xs text-muted-foreground hover:text-primary">
                  Accessibility
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Made with ❤️ for learners worldwide
              </p>
              <ExternalLink className="h-3 w-3 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};