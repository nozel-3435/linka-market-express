import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Search, ShoppingCart, Menu, X, User, LogIn, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import linkaMarketLogo from '@/assets/linkamarket-logo.png';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage, t } = useLanguage();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={linkaMarketLogo} 
              alt="LinkaMarket Logo" 
              className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
            />
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
                placeholder={t('header.search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-full border-border focus:ring-primary"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/products" className="text-foreground hover:text-primary transition-smooth">
              {t('header.products')}
            </Link>
            <Link to="/merchants" className="text-foreground hover:text-primary transition-smooth">
              {t('header.merchants')}
            </Link>
            
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span className="hidden lg:inline">{language.toUpperCase()}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <DropdownMenuItem onClick={() => setLanguage('fr')} className={language === 'fr' ? 'bg-primary/10' : ''}>
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'bg-primary/10' : ''}>
                  🇬🇧 English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-muted rounded-lg transition-smooth">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">Mon compte</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Tableau de bord
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogIn className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="gap-2">
                    <LogIn className="w-4 h-4" />
                    <span className="hidden lg:inline">{t('header.login')}</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register" className="gap-2">
                    <User className="w-4 h-4" />
                    <span className="hidden lg:inline">{t('header.register')}</span>
                  </Link>
                </Button>
              </div>
            )}
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
                  placeholder={t('header.search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 rounded-full"
                />
              </div>
              
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link to="/products" className="block py-2 text-foreground hover:text-primary transition-smooth">
                  {t('header.products')}
                </Link>
                <Link to="/merchants" className="block py-2 text-foreground hover:text-primary transition-smooth">
                  {t('header.merchants')}
                </Link>
                <Link to="/cart" className="flex items-center py-2 text-foreground hover:text-primary transition-smooth">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t('header.cart')} (3)
                </Link>
                <div className="pt-2 border-t border-border">
                  <Link to="/login" className="block py-2 text-foreground hover:text-primary transition-smooth">
                    {t('header.login')}
                  </Link>
                  <Link to="/register" className="block py-2 text-foreground hover:text-primary transition-smooth">
                    {t('header.register')}
                  </Link>
                  <div className="flex items-center gap-2 py-2">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <button
                      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
                      className="text-foreground hover:text-primary transition-smooth"
                    >
                      {language === 'fr' ? 'English' : 'Français'}
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};