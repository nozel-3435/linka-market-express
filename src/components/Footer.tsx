import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">LinkaMarket</span>
                <div className="text-sm text-background/70">par LinkaDrop</div>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed">
              La première plateforme e-commerce togolaise qui connecte les clients aux commerçants locaux avec une livraison express garantie.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-background/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Lomé, Togo</span>
              </div>
              <div className="flex items-center gap-2 text-background/80">
                <Phone className="w-4 h-4 text-primary" />
                <span>+228 XX XX XX XX</span>
              </div>
              <div className="flex items-center gap-2 text-background/80">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@linkamarket.tg</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/products" className="text-background/80 hover:text-white transition-smooth">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/merchants" className="text-background/80 hover:text-white transition-smooth">
                  Nos commerçants
                </Link>
              </li>
              <li>
                <Link to="/delivery" className="text-background/80 hover:text-white transition-smooth">
                  LinkaDrop Livraison
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-white transition-smooth">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-background/80 hover:text-white transition-smooth">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Nos services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/become-merchant" className="text-background/80 hover:text-white transition-smooth">
                  Devenir commerçant
                </Link>
              </li>
              <li>
                <Link to="/become-driver" className="text-background/80 hover:text-white transition-smooth">
                  Devenir livreur
                </Link>
              </li>
              <li>
                <span className="text-background/60">LinkaPharma (bientôt)</span>
              </li>
              <li>
                <span className="text-background/60">LinkaPay (bientôt)</span>
              </li>
              <li>
                <Link to="/support" className="text-background/80 hover:text-white transition-smooth">
                  Support client
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Restez connecté</h3>
            <div className="space-y-4">
              <p className="text-background/80 text-sm">
                Inscrivez-vous pour recevoir nos dernières offres et nouveautés.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-background/10 border border-background/30 rounded-lg text-white placeholder-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="btn-primary px-4 py-2">
                  OK
                </button>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-smooth"
                >
                  <Globe className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="py-6 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-background/60 text-sm text-center md:text-left">
              © 2024 LinkaMarket. Tous droits réservés. Fait avec ❤️ au Togo.
            </div>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-background/60 hover:text-white transition-smooth">
                Confidentialité
              </Link>
              <Link to="/terms" className="text-background/60 hover:text-white transition-smooth">
                CGU
              </Link>
              <Link to="/cookies" className="text-background/60 hover:text-white transition-smooth">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};