import { ArrowRight, Download, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBanner from '@/assets/hero-banner.jpg';

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image avec overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroBanner} 
          alt="LinkaMarket Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 animate-slide-up">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">#1 Marketplace au Togo</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-slide-up leading-tight">
            <span className="block">Consomme local,</span>
            <span className="block text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              livre en un clic
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
            Découvrez les meilleurs produits de vos commerçants togolais préférés. 
            Livraison express avec <span className="font-semibold text-secondary">LinkaDrop</span> 
            partout à Lomé en moins de 2h.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm">Commerçants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">10k+</div>
              <div className="text-white/80 text-sm">Produits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-white">2h</div>
              <div className="text-white/80 text-sm">Livraison max</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="btn-hero group">
              Commencer mes achats
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
              <Play className="w-4 h-4 mr-2" />
              Voir la démo
            </Button>
          </div>

          {/* App Download Section */}
          <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <p className="text-white/80 mb-4 font-medium">Téléchargez l'application Linka</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <Download className="w-4 h-4 mr-2" />
                App Store
              </Button>
              <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm">
                <Download className="w-4 h-4 mr-2" />
                Google Play
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};