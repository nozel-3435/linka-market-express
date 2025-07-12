import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Favorites() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        *,
        products (
          *,
          shops (name, address),
          categories (name)
        )
      `)
      .eq('user_id', user?.id);

    if (!error && data) {
      setFavorites(data);
    }
    setLoading(false);
  };

  const removeFavorite = async (productId: string) => {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user?.id)
      .eq('product_id', productId);

    if (!error) {
      setFavorites(favorites.filter(fav => fav.product_id !== productId));
      toast({
        title: "Retiré des favoris",
        description: "Le produit a été retiré de vos favoris.",
      });
    }
  };

  const addToCart = async (productId: string) => {
    // Obtenir ou créer le panier de l'utilisateur
    let { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    if (!cart) {
      const { data: newCart } = await supabase
        .from('carts')
        .insert({ user_id: user?.id })
        .select()
        .single();
      cart = newCart;
    }

    if (cart) {
      // Vérifier si le produit est déjà dans le panier
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('cart_id', cart.id)
        .eq('product_id', productId)
        .single();

      if (existingItem) {
        // Augmenter la quantité
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
      } else {
        // Ajouter nouveau produit
        await supabase
          .from('cart_items')
          .insert({
            cart_id: cart.id,
            product_id: productId,
            quantity: 1
          });
      }

      toast({
        title: "Ajouté au panier",
        description: "Le produit a été ajouté à votre panier.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">Chargement...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Heart className="h-8 w-8 text-red-500" fill="currentColor" />
          <h1 className="text-3xl font-bold">Mes Favoris</h1>
          <span className="text-muted-foreground">({favorites.length})</span>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore de produits favoris.
            </p>
            <Button onClick={() => window.location.href = '/client'}>
              Découvrir des produits
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="relative">
                <ProductCard
                  id={favorite.products.id}
                  name={favorite.products.name}
                  price={favorite.products.price}
                  originalPrice={favorite.products.original_price}
                  image={favorite.products.image_urls?.[0] || '/placeholder.svg'}
                  merchant={favorite.products.shops?.name || 'Boutique inconnue'}
                  rating={4.5}
                  reviewCount={Math.floor(Math.random() * 100)}
                  location={favorite.products.shops?.address || 'Lomé'}
                  isNew={false}
                  isOnSale={!!favorite.products.original_price}
                  isFavorite={true}
                />
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFavorite(favorite.products.id)}
                  >
                    <Heart className="h-4 w-4" fill="currentColor" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => addToCart(favorite.products.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}