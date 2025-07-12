import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductCard } from './ProductCard';

// Import des images locales avec des personnes togolaises et marque LinkaMarket
import productRice from '@/assets/product-rice-togo.jpg';
import productPalmOil from '@/assets/product-palm-oil-togo.jpg';
import productWaxFabric from '@/assets/product-wax-fabric-togo.jpg';
import productMangoes from '@/assets/product-mangoes-togo.jpg';
import productGari from '@/assets/product-gari-togo.jpg';
import productSandals from '@/assets/product-sandals-togo.jpg';

const popularProducts = [
  {
    id: '1',
    name: 'Riz jasmin parfumé Premium',
    price: 12500,
    originalPrice: 15000,
    image: productRice,
    merchant: 'Marché Central LinkaMarket',
    rating: 4.8,
    reviewCount: 124,
    location: 'Lomé Centre',
    isOnSale: true,
  },
  {
    id: '2',
    name: 'Huile de palme rouge artisanale',
    price: 8000,
    image: productPalmOil,
    merchant: 'Coopérative Bio Togo - LinkaMarket',
    rating: 4.9,
    reviewCount: 87,
    location: 'Kpalimé',
    isNew: true,
  },
  {
    id: '3',
    name: 'Tissu wax authentique',
    price: 25000,
    image: productWaxFabric,
    merchant: 'Atelier Kente LinkaMarket',
    rating: 4.7,
    reviewCount: 156,
    location: 'Lomé Tokoin',
  },
  {
    id: '4',
    name: 'Mangues Kent fraîches (1kg)',
    price: 3500,
    image: productMangoes,
    merchant: 'Fruits du Plateau - LinkaMarket',
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
    image: productGari,
    merchant: 'Tradition Togolaise LinkaMarket',
    rating: 4.8,
    reviewCount: 203,
    location: 'Agoè',
    isOnSale: true,
  },
  {
    id: '6',
    name: 'Sandales en cuir fait main',
    price: 18000,
    image: productSandals,
    merchant: 'Artisan Cuir Togo - LinkaMarket',
    rating: 4.5,
    reviewCount: 67,
    location: 'Sokodé',
  },
];

export const PopularProducts = () => {
  const { t } = useLanguage();
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
                {t('products.title')}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t('products.subtitle')}
            </p>
          </div>

          <Button variant="outline" className="hidden md:flex items-center gap-2 group">
            {t('products.view.all')}
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
            {t('products.view.all.mobile')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-16 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10k+</div>
            <div className="text-muted-foreground">{t('products.stats.sold')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">{t('products.stats.partners')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
            <div className="text-muted-foreground">{t('products.stats.rating')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2h</div>
            <div className="text-muted-foreground">{t('products.stats.delivery')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};