import { Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    id: 1,
    name: 'Akosua Mensah',
    role: 'Cliente fidèle',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b494?w=100&h=100&fit=crop&crop=face',
    content: 'LinkaMarket a révolutionné ma façon de faire mes courses ! Je trouve tous mes produits togolais favoris et la livraison est toujours rapide.',
    rating: 5,
    location: 'Lomé Centre'
  },
  {
    id: 2,
    name: 'Kwame Asante',
    role: 'Commerçant partenaire',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    content: 'Grâce à LinkaMarket, mes ventes ont augmenté de 200% ! La plateforme est facile à utiliser et me connecte avec de nouveaux clients chaque jour.',
    rating: 5,
    location: 'Marché Central'
  },
  {
    id: 3,
    name: 'Fatou Diallo',
    role: 'Livreuse LinkaDrop',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    content: 'Travailler avec LinkaDrop me permet d\'avoir des revenus stables. L\'application livreur est intuitive et je peux optimiser mes tournées facilement.',
    rating: 5,
    location: 'Agoè-Nyivé'
  },
  {
    id: 4,
    name: 'Emmanuel Koffi',
    role: 'Client régulier',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    content: 'La qualité des produits est excellente et les prix sont très compétitifs. J\'ai recommandé LinkaMarket à toute ma famille !',
    rating: 5,
    location: 'Tokoin'
  }
];

export const Testimonials = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Témoignages</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ce que disent nos utilisateurs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez pourquoi plus de 50 000 Togolais font confiance à LinkaMarket pour leurs achats quotidiens
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id} 
              className="card-elevated hover:scale-[1.02] transition-spring p-6 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full transform translate-x-16 -translate-y-16"></div>

              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-primary/30" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <blockquote className="text-foreground mb-6 leading-relaxed relative z-10">
                "{testimonial.content}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary">{testimonial.location}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">4.8/5 étoiles</h3>
            <p className="text-muted-foreground">Note moyenne sur plus de 10 000 avis</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">95% satisfaits</h3>
            <p className="text-muted-foreground">Taux de satisfaction client</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">TG</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">100% Togolais</h3>
            <p className="text-muted-foreground">Plateforme locale et fière de l'être</p>
          </div>
        </div>
      </div>
    </section>
  );
};