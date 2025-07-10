import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gradient">LinkaMarket</span>
              <div className="text-xs text-muted-foreground">par LinkaDrop</div>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher des produits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-full border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-foreground hover:text-primary transition-smooth">
              Produits
            </Link>
            <Link to="/merchants" className="text-foreground hover:text-primary transition-smooth">
              Commerçants
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-smooth">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden lg:inline">Mon compte</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Créer un compte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 rounded-full"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link to="/products" className="block py-2 text-foreground hover:text-primary transition-smooth">
                  Produits
                </Link>
                <Link to="/merchants" className="block py-2 text-foreground hover:text-primary transition-smooth">
                  Commerçants
                </Link>
                <Link to="/cart" className="flex items-center py-2 text-foreground hover:text-primary transition-smooth">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Panier (3)
                </Link>
                <div className="pt-2 border-t border-border">
                  <Link to="/login" className="block py-2 text-foreground hover:text-primary transition-smooth">
                    Se connecter
                  </Link>
                  <Link to="/register" className="block py-2 text-foreground hover:text-primary transition-smooth">
                    Créer un compte
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};