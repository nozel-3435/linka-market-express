import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, User, MapPin, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const statusConfig = {
  pending: { label: 'En attente', color: 'secondary', next: 'confirmed' },
  confirmed: { label: 'Confirmée', color: 'default', next: 'preparing' },
  preparing: { label: 'En préparation', color: 'default', next: 'ready_for_pickup' },
  ready_for_pickup: { label: 'Prête pour collecte', color: 'default', next: null },
  picked_up: { label: 'Collectée', color: 'default', next: null },
  in_transit: { label: 'En livraison', color: 'default', next: null },
  delivered: { label: 'Livrée', color: 'default', next: null },
  cancelled: { label: 'Annulée', color: 'destructive', next: null }
};

export default function MerchantOrders() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchShop();
    }
  }, [user]);

  useEffect(() => {
    if (shop) {
      fetchOrders();
    }
  }, [shop]);

  const fetchShop = async () => {
    const { data } = await supabase
      .from('shops')
      .select('*')
      .eq('owner_id', user?.id)
      .single();

    if (data) setShop(data);
  };

  const fetchOrders = async () => {
    if (!shop) return;

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        profiles!orders_customer_id_fkey (full_name, email),
        user_addresses (address, label),
        order_items (
          *,
          products (name, image_urls, price)
        ),
        profiles!orders_driver_id_fkey (full_name, email)
      `)
      .eq('shop_id', shop.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus as any })
      .eq('id', orderId);

    if (!error) {
      // Ajouter l'entrée dans l'historique
      await supabase
        .from('order_status_history')
        .insert({
          order_id: orderId,
          status: newStatus as any,
          changed_by: user?.id,
          notes: `Statut mis à jour par le commerçant`
        });

      fetchOrders();
      toast({
        title: "Statut mis à jour",
        description: `La commande est maintenant ${(statusConfig as any)[newStatus]?.label}.`,
      });
    }
  };

  const filteredOrders = orders.filter((order: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return ['pending', 'confirmed'].includes(order.status);
    if (activeTab === 'preparing') return order.status === 'preparing';
    if (activeTab === 'ready') return order.status === 'ready_for_pickup';
    if (activeTab === 'completed') return ['delivered'].includes(order.status);
    return true;
  });

  const getOrderTotal = (order: any) => {
    return order.order_items.reduce((total: number, item: any) => total + parseFloat(item.total_price), 0) + parseFloat(order.delivery_fee || 0);
  };

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Vous devez d'abord créer votre boutique.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Commandes</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="preparing">En préparation</TabsTrigger>
            <TabsTrigger value="ready">Prêtes</TabsTrigger>
            <TabsTrigger value="completed">Terminées</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {loading ? (
              <div>Chargement...</div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Aucune commande dans cette catégorie.
                </p>
              </div>
            ) : (
              filteredOrders.map((order: any) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Commande #{order.id.slice(-8)}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={statusConfig[order.status]?.color as any}>
                          {statusConfig[order.status]?.label}
                        </Badge>
                        {(statusConfig as any)[order.status]?.next && (
                          <Button
                            size="sm"
                            onClick={() => updateOrderStatus(order.id, (statusConfig as any)[order.status].next)}
                          >
                            Suivant
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Informations client */}
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{order.profiles?.full_name}</h4>
                        <p className="text-sm text-muted-foreground">{order.profiles?.email}</p>
                      </div>
                    </div>

                    {/* Adresse de livraison */}
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h5 className="font-medium">Adresse de livraison :</h5>
                        <p className="text-sm text-muted-foreground">
                          {order.user_addresses?.label} - {order.user_addresses?.address}
                        </p>
                      </div>
                    </div>

                    {/* Articles commandés */}
                    <div className="space-y-2">
                      <h5 className="font-medium">Articles commandés :</h5>
                      {order.order_items.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 border rounded">
                          <img
                            src={item.products.image_urls?.[0] || '/placeholder.svg'}
                            alt={item.products.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.products.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Quantité: {item.quantity} × {parseFloat(item.unit_price).toLocaleString()} FCFA
                            </p>
                          </div>
                          <p className="font-semibold">
                            {parseFloat(item.total_price).toLocaleString()} FCFA
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Livreur assigné */}
                    {order.profiles && order.driver_id && (
                      <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                        <Package className="h-5 w-5 text-primary" />
                        <div>
                          <h5 className="font-medium">Livreur assigné :</h5>
                          <p className="text-sm text-muted-foreground">
                            {order.profiles.full_name} - {order.profiles.email}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Mode de paiement */}
                    <div className="p-3 bg-muted rounded-lg">
                      <h5 className="font-medium mb-1">Mode de paiement :</h5>
                      <p className="text-sm capitalize">{order.payment_method}</p>
                      <Badge variant={order.payment_status === 'paid' ? 'default' : 'secondary'}>
                        {order.payment_status}
                      </Badge>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">Total :</span>
                      <span className="text-lg font-bold text-primary">
                        {getOrderTotal(order).toLocaleString()} FCFA
                      </span>
                    </div>

                    {/* Actions spéciales */}
                    {order.status === 'ready_for_pickup' && (
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => toast({
                            title: "Notification envoyée",
                            description: "Les livreurs ont été notifiés que la commande est prête.",
                          })}
                        >
                          Notifier les livreurs
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}