import { useState } from 'react';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/Header';
import { ProductCard } from '@/components/ProductCard';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock products data
const products = [
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
    category: 'alimentaire'
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
    category: 'alimentaire'
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
    category: 'mode'
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
    category: 'alimentaire'
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
    category: 'alimentaire'
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
    category: 'mode'
  },
  {
    id: '7',
    name: 'Savon noir artisanal',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1584305574647-0cc949a2bb9c?w=400&h=300&fit=crop',
    merchant: 'Beauté Naturelle',
    rating: 4.4,
    reviewCount: 89,
    location: 'Kara',
    category: 'beaute'
  },
  {
    id: '8',
    name: 'Café robusta torréfié',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop',
    merchant: 'Café des Plateaux',
    rating: 4.9,
    reviewCount: 145,
    location: 'Plateau de Dayes',
    category: 'alimentaire'
  }
];

const categories = [
  { id: 'all', name: 'Tous les produits', count: products.length },
  { id: 'alimentaire', name: 'Alimentaire', count: products.filter(p => p.category === 'alimentaire').length },
  { id: 'mode', name: 'Mode & Style', count: products.filter(p => p.category === 'mode').length },
  { id: 'beaute', name: 'Beauté & Soin', count: products.filter(p => p.category === 'beaute').length },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.merchant.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default: // popular
        return b.reviewCount - a.reviewCount;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tous nos produits
          </h1>
          <p className="text-lg text-muted-foreground">
            Découvrez plus de {products.length} produits de qualité de nos commerçants togolais
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "secondary"}
                className={`cursor-pointer transition-smooth ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-primary/10'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>

          {/* Filters and View Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                  <SelectItem value="newest">Plus récents</SelectItem>
                  <SelectItem value="price_asc">Prix croissant</SelectItem>
                  <SelectItem value="price_desc">Prix décroissant</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                </SelectContent>
              </Select>

              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }>
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Aucun produit trouvé
            </h3>
            <p className="text-muted-foreground mb-4">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button className="btn-secondary">
              Charger plus de produits
            </Button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Products;