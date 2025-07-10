import { Heart, ShoppingCart, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  merchant: string;
  rating: number;
  reviewCount: number;
  location: string;
  isNew?: boolean;
  isOnSale?: boolean;
  isFavorite?: boolean;
}

export const ProductCard = ({ 
  name, 
  price, 
  originalPrice, 
  image, 
  merchant, 
  rating, 
  reviewCount,
  location,
  isNew,
  isOnSale,
  isFavorite = false
}: ProductCardProps) => {
  return (
    <div className="group card-elevated hover:scale-[1.02] transition-spring cursor-pointer">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-cover transition-transform group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isNew && (
            <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
              Nouveau
            </Badge>
          )}
          {isOnSale && (
            <Badge className="bg-secondary text-secondary-foreground text-xs px-2 py-1">
              Promo
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          size="sm"
          variant="ghost"
          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-smooth ${
            isFavorite ? 'text-red-500' : 'text-muted-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
          <Button size="sm" className="btn-primary">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Ajouter au panier
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Merchant */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3 h-3" />
          <span>{merchant} • {location}</span>
        </div>

        {/* Product Name */}
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">({reviewCount} avis)</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {price.toLocaleString()} F
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {originalPrice.toLocaleString()} F
              </span>
            )}
          </div>
          
          {originalPrice && (
            <Badge variant="secondary" className="text-xs">
              -{Math.round(((originalPrice - price) / originalPrice) * 100)}%
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};