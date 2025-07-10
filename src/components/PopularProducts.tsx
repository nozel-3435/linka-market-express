import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from './ProductCard';

const popularProducts = [
  {
    id: '1',
    name: 'Riz jasmin parfumé Premium',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&h=300&fit=crop',
    merchant: 'Marché Central',
    rating: 4.8,
    reviewCount: 124,
    location: 'Lomé Centre',
    isOnSale: true,
  },
  {
    id: '2',
    name: 'Huile de palme rouge artisanale',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop',
    merchant: 'Coopérative Bio Togo',
    rating: 4.9,
    reviewCount: 87,
    location: 'Kpalimé',
    isNew: true,
  },
  {
    id: '3',
    name: 'Tissu wax authentique',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=400&h=300&fit=crop',
    merchant: 'Atelier Kente',
    rating: 4.7,
    reviewCount: 156,
    location: 'Lomé Tokoin',
  },
  {
    id: '4',
    name: 'Mangues Kent fraîches (1kg)',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1553279828-0c52d16a4eb3?w=400&h=300&fit=crop',
    merchant: 'Fruits du Plateau',
    rating: 4.6,
    reviewCount: 92,
    location: 'Plateau',
    isNew: true,
  },
  {
    id: '5',
    name: 'Gari blanc premium (2kg)',
    price: 4500,
    originalPrice: 5200,
    image: 'https://images.unsplash.com/photo-1597306013323-4b6ea8e2ed3e?w=400&h=300&fit=crop',
    merchant: 'Tradition Togolaise',
    rating: 4.8,
    reviewCount: 203,
    location: 'Agoè',
    isOnSale: true,
  },
  {
    id: '6',
    name: 'Sandales en cuir fait main',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    merchant: 'Artisan Cuir Togo',
    rating: 4.5,
    reviewCount: 67,
    location: 'Sokodé',
  },
];

export const PopularProducts = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Nos produits populaires
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Découvrez les articles les plus appréciés par notre communauté de clients togolais
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex items-center gap-2 group">
            Voir tout
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
          {popularProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="flex justify-center md:hidden">
          <Button className="btn-primary group w-full max-w-sm">
            Voir tous les produits
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10k+</div>
            <div className="text-muted-foreground">Produits vendus</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Commerçants partenaires</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2h</div>
            <div className="text-muted-foreground">Livraison express</div>
          </div>
        </div>
      </div>
    </section>
  );
};