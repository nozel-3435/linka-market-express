import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Header
    'header.search.placeholder': 'Rechercher des produits...',
    'header.products': 'Produits',
    'header.merchants': 'Commerçants',
    'header.cart': 'Panier',
    'header.account': 'Mon compte',
    'header.login': 'Se connecter',
    'header.register': 'Créer un compte',
    
    // Hero
    'hero.badge': '#1 Marketplace au Togo',
    'hero.title.line1': 'Consomme local,',
    'hero.title.line2': 'livre en un clic',
    'hero.subtitle': 'Découvrez les meilleurs produits de vos commerçants togolais préférés. Livraison express avec LinkaDrop partout à Lomé en moins de 2h.',
    'hero.stats.merchants': 'Commerçants',
    'hero.stats.products': 'Produits',
    'hero.stats.delivery': 'Livraison max',
    'hero.cta.shop': 'Commencer mes achats',
    'hero.cta.demo': 'Voir la démo',
    'hero.app.download': 'Téléchargez l\'application Linka',
    
    // Popular Products
    'products.title': 'Nos produits populaires',
    'products.subtitle': 'Découvrez les articles les plus appréciés par notre communauté de clients togolais',
    'products.view.all': 'Voir tout',
    'products.view.all.mobile': 'Voir tous les produits',
    'products.stats.sold': 'Produits vendus',
    'products.stats.partners': 'Commerçants partenaires',
    'products.stats.rating': 'Note moyenne',
    'products.stats.delivery': 'Livraison express',
    
    // App Download
    'app.badge': 'Application mobile',
    'app.title': 'Téléchargez l\'application Linka',
    'app.subtitle': 'Accédez à LinkaMarket où que vous soyez ! Commandez en quelques clics, suivez vos livraisons en temps réel et profitez d\'offres exclusives.',
    'app.feature.orders': 'Commandes rapides et sécurisées',
    'app.feature.tracking': 'Suivi de livraison en temps réel',
    'app.feature.notifications': 'Notifications push pour vos commandes',
    'app.feature.offers': 'Offres exclusives pour l\'app mobile',
    'app.store.ios': 'App Store',
    'app.store.android': 'Google Play',
    'app.rating': '4.8/5 sur l\'App Store',
    
    // Testimonials
    'testimonials.badge': 'Témoignages',
    'testimonials.title': 'Ce que disent nos utilisateurs',
    'testimonials.subtitle': 'Découvrez pourquoi plus de 50 000 Togolais font confiance à LinkaMarket pour leurs achats quotidiens',
    'testimonials.trust.rating': '4.8/5 étoiles',
    'testimonials.trust.rating.desc': 'Note moyenne sur plus de 10 000 avis',
    'testimonials.trust.satisfaction': '95% satisfaits',
    'testimonials.trust.satisfaction.desc': 'Taux de satisfaction client',
    'testimonials.trust.local': '100% Togolais',
    'testimonials.trust.local.desc': 'Plateforme locale et fière de l\'être',
    
    // Footer
    'footer.description': 'La première marketplace togolaise qui connecte clients, commerçants et livreurs pour une expérience d\'achat local moderne et efficace.',
    'footer.products.title': 'Produits',
    'footer.products.popular': 'Produits populaires',
    'footer.products.categories': 'Catégories',
    'footer.products.merchants': 'Nos commerçants',
    'footer.company.title': 'Entreprise',
    'footer.company.about': 'À propos',
    'footer.company.careers': 'Carrières',
    'footer.company.press': 'Presse',
    'footer.support.title': 'Support',
    'footer.support.help': 'Centre d\'aide',
    'footer.support.contact': 'Nous contacter',
    'footer.support.faq': 'FAQ',
    'footer.download.title': 'Télécharger l\'app',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    // Header
    'header.search.placeholder': 'Search for products...',
    'header.products': 'Products',
    'header.merchants': 'Merchants',
    'header.cart': 'Cart',
    'header.account': 'My account',
    'header.login': 'Sign in',
    'header.register': 'Create account',
    
    // Hero
    'hero.badge': '#1 Marketplace in Togo',
    'hero.title.line1': 'Shop local,',
    'hero.title.line2': 'delivered with one click',
    'hero.subtitle': 'Discover the best products from your favorite Togolese merchants. Express delivery with LinkaDrop anywhere in Lomé in less than 2 hours.',
    'hero.stats.merchants': 'Merchants',
    'hero.stats.products': 'Products',
    'hero.stats.delivery': 'Max delivery',
    'hero.cta.shop': 'Start shopping',
    'hero.cta.demo': 'Watch demo',
    'hero.app.download': 'Download the Linka app',
    
    // Popular Products
    'products.title': 'Our popular products',
    'products.subtitle': 'Discover the most appreciated items by our community of Togolese customers',
    'products.view.all': 'View all',
    'products.view.all.mobile': 'View all products',
    'products.stats.sold': 'Products sold',
    'products.stats.partners': 'Partner merchants',
    'products.stats.rating': 'Average rating',
    'products.stats.delivery': 'Express delivery',
    
    // App Download
    'app.badge': 'Mobile app',
    'app.title': 'Download the Linka app',
    'app.subtitle': 'Access LinkaMarket wherever you are! Order with a few clicks, track your deliveries in real time and enjoy exclusive offers.',
    'app.feature.orders': 'Fast and secure orders',
    'app.feature.tracking': 'Real-time delivery tracking',
    'app.feature.notifications': 'Push notifications for your orders',
    'app.feature.offers': 'Exclusive offers for mobile app',
    'app.store.ios': 'App Store',
    'app.store.android': 'Google Play',
    'app.rating': '4.8/5 on the App Store',
    
    // Testimonials
    'testimonials.badge': 'Testimonials',
    'testimonials.title': 'What our users say',
    'testimonials.subtitle': 'Discover why more than 50,000 Togolese trust LinkaMarket for their daily shopping',
    'testimonials.trust.rating': '4.8/5 stars',
    'testimonials.trust.rating.desc': 'Average rating from over 10,000 reviews',
    'testimonials.trust.satisfaction': '95% satisfied',
    'testimonials.trust.satisfaction.desc': 'Customer satisfaction rate',
    'testimonials.trust.local': '100% Togolese',
    'testimonials.trust.local.desc': 'Local platform and proud of it',
    
    // Footer
    'footer.description': 'The first Togolese marketplace that connects customers, merchants and delivery drivers for a modern and efficient local shopping experience.',
    'footer.products.title': 'Products',
    'footer.products.popular': 'Popular products',
    'footer.products.categories': 'Categories',
    'footer.products.merchants': 'Our merchants',
    'footer.company.title': 'Company',
    'footer.company.about': 'About us',
    'footer.company.careers': 'Careers',
    'footer.company.press': 'Press',
    'footer.support.title': 'Support',
    'footer.support.help': 'Help center',
    'footer.support.contact': 'Contact us',
    'footer.support.faq': 'FAQ',
    'footer.download.title': 'Download the app',
    'footer.rights': 'All rights reserved.',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};