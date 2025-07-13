import { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, MapPin, CreditCard } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function Cart() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchCartItems();
      fetchAddresses();
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchCartItems = async () => {
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    if (cart) {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            *,
            shops (name, address)
          )
        `)
        .eq('cart_id', cart.id);

      if (!error && data) {
        setCartItems(data);
      }
    }
    setLoading(false);
  };

  const fetchAddresses = async () => {
    const { data } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user?.id)
      .order('is_default', { ascending: false });

    if (data) {
      setAddresses(data);
      const defaultAddress = data.find(addr => addr.is_default);
      if (defaultAddress) setSelectedAddress(defaultAddress.id);
    }
  };

  const fetchPaymentMethods = async () => {
    const { data } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user?.id)
      .order('is_default', { ascending: false });

    if (data) {
      setPaymentMethods(data);
      const defaultMethod = data.find(method => method.is_default);
      if (defaultMethod) setSelectedPayment(defaultMethod.id);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      await removeItem(itemId);
      return;
    }

    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: newQuantity })
      .eq('id', itemId);

    if (!error) {
      setCartItems((items: any[]) =>
        items.map((item: any) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = async (itemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', itemId);

    if (!error) {
      setCartItems((items: any[]) => items.filter((item: any) => item.id !== itemId));
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier.",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => 
      total + (parseFloat(item.products.price) * item.quantity), 0
    );
  };

  const handleCheckout = async () => {
    if (!selectedAddress || !selectedPayment) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez sélectionner une adresse et un mode de paiement.",
        variant: "destructive"
      });
      return;
    }

    // Grouper les articles par boutique
    const ordersByShop = cartItems.reduce((acc: any, item: any) => {
      const shopId = item.products.shop_id;
      if (!acc[shopId]) {
        acc[shopId] = [];
      }
      acc[shopId].push(item);
      return acc;
    }, {});

    // Créer une commande pour chaque boutique
    for (const [shopId, items] of Object.entries(ordersByShop)) {
      const totalAmount = (items as any[]).reduce((sum: number, item: any) => 
        sum + (parseFloat(item.products.price) * item.quantity), 0
      );

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: user?.id,
          shop_id: shopId,
          delivery_address_id: selectedAddress,
          total_amount: totalAmount,
          delivery_fee: 1500, // Frais de livraison fixe
          payment_method: paymentMethods.find(p => p.id === selectedPayment)?.method_type,
          status: 'pending'
        })
        .select()
        .single();

      if (!orderError && order) {
        // Ajouter les articles à la commande
        const orderItems = (items as any[]).map((item: any) => ({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          unit_price: parseFloat(item.products.price),
          total_price: parseFloat(item.products.price) * item.quantity
        }));

        await supabase.from('order_items').insert(orderItems);
      }
    }

    // Vider le panier
    const { data: cart } = await supabase
      .from('carts')
      .select('id')
      .eq('user_id', user?.id)
      .single();

    if (cart) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('cart_id', cart.id);
    }

    toast({
      title: "Commande passée",
      description: "Votre commande a été envoyée aux commerçants.",
    });

    setCartItems([]);
  };

  if (loading) {
    return <div className="min-h-screen bg-background"><Header /><div className="container mx-auto px-4 py-8">Chargement...</div><Footer /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon Panier</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Votre panier est vide.</p>
            <Button className="mt-4" onClick={() => window.location.href = '/client'}>
              Continuer mes achats
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles du panier */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={item.products.image_urls?.[0] || '/placeholder.svg'}
                        alt={item.products.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.products.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.products.shops?.name}
                        </p>
                        <p className="font-semibold text-primary">
                          {item.products.price.toLocaleString()} FCFA
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Résumé de commande */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Adresse de livraison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedAddress} onValueChange={setSelectedAddress}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une adresse" />
                    </SelectTrigger>
                    <SelectContent>
                      {addresses.map((address) => (
                        <SelectItem key={address.id} value={address.id}>
                          {address.label} - {address.address}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Mode de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedPayment} onValueChange={setSelectedPayment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method.id} value={method.id}>
                          {method.method_type} - {method.account_number}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Résumé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livraison</span>
                    <span>1 500 FCFA</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{(calculateTotal() + 1500).toLocaleString()} FCFA</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-4" 
                    onClick={handleCheckout}
                    disabled={!selectedAddress || !selectedPayment}
                  >
                    Confirmer la commande
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}