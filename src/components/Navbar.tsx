import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { Menu, X } from 'lucide-react';
import logoImage from '../data/logo/Color logo - no background.png';

const Navbar = () => {
  const navigate = useNavigate();
  const isVisible = useScrollDirection();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoClick = () => {
    // Clear any stored selections when navigating home
    localStorage.removeItem('selectedAssistants');
    localStorage.removeItem('formData');
    localStorage.removeItem('specificRequest');
    navigate('/');
    setIsMenuOpen(false);
  };

  const scrollToFooter = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const footer = document.getElementById('contact');
        if (footer) {
          footer.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const footer = document.getElementById('contact');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed w-full z-50 bg-transparent transition-all duration-500 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      } ${mounted ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={handleLogoClick} 
            className="text-white hover:text-gray-300 transition-colors flex items-center"
          >
            <img src={logoImage} alt="Xerobro Logo" className="h-16" />
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavigation('/about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Om oss
            </button>
            <button 
              onClick={() => handleNavigation('/security')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Säkerhet
            </button>
            <button 
              onClick={scrollToFooter}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Kontakt
            </button>
            <button 
              onClick={() => handleNavigation('/ai-assistants')}
              className="bg-white/10 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/20"
            >
              Boka demo
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-4 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 px-4 mb-4">
            <button 
              onClick={() => handleNavigation('/about')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              Om oss
            </button>
            <button 
              onClick={() => handleNavigation('/security')}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              Säkerhet
            </button>
            <button 
              onClick={scrollToFooter}
              className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
            >
              Kontakt
            </button>
            <button 
              onClick={() => handleNavigation('/ai-assistants')}
              className="block w-full text-center bg-white/10 text-white px-6 py-2 rounded-full hover:bg-white/20 transition-colors border border-white/20"
            >
              Boka demo
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;