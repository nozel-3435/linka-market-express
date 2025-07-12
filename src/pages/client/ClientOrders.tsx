import { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, XCircle, MapPin, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const statusConfig = {
  pending: { label: 'En attente', color: 'secondary', icon: Clock },
  confirmed: { label: 'Confirmée', color: 'default', icon: CheckCircle },
  preparing: { label: 'En préparation', color: 'default', icon: Package },
  ready_for_pickup: { label: 'Prête pour collecte', color: 'default', icon: Package },
  picked_up: { label: 'Collectée', color: 'default', icon: Package },
  in_transit: { label: 'En livraison', color: 'default', icon: Package },
  delivered: { label: 'Livrée', color: 'default', icon: CheckCircle },
  cancelled: { label: 'Annulée', color: 'destructive', icon: XCircle }
};

export default function ClientOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        shops (name, address, phone),
        user_addresses (address, label),
        order_items (
          *,
          products (name, image_urls, price)
        ),
        profiles!orders_driver_id_fkey (full_name, email)
      `)
      .eq('customer_id', user?.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return !['delivered', 'cancelled'].includes(order.status);
    if (activeTab === 'completed') return order.status === 'delivered';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return true;
  });

  const getOrderTotal = (order) => {
    return order.order_items.reduce((total, item) => total + item.total_price, 0) + order.delivery_fee;
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
        <h1 className="text-3xl font-bold mb-8">Mes Commandes</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="active">En cours</TabsTrigger>
            <TabsTrigger value="completed">Livrées</TabsTrigger>
            <TabsTrigger value="cancelled">Annulées</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {activeTab === 'all' 
                    ? 'Vous n\'avez pas encore de commandes.'
                    : `Aucune commande ${activeTab === 'active' ? 'en cours' : activeTab === 'completed' ? 'livrée' : 'annulée'}.`
                  }
                </p>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status]?.icon || Clock;
                
                return (
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
                        <Badge 
                          variant={statusConfig[order.status]?.color as any}
                          className="flex items-center gap-1"
                        >
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[order.status]?.label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Informations boutique */}
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold">{order.shops.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {order.shops.address}
                          </p>
                          {order.shops.phone && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {order.shops.phone}
                            </p>
                          )}
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
                                Quantité: {item.quantity} × {item.unit_price.toLocaleString()} FCFA
                              </p>
                            </div>
                            <p className="font-semibold">
                              {item.total_price.toLocaleString()} FCFA
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Adresse de livraison */}
                      <div className="p-3 bg-muted rounded-lg">
                        <h5 className="font-medium mb-1">Adresse de livraison :</h5>
                        <p className="text-sm">
                          {order.user_addresses?.label} - {order.user_addresses?.address}
                        </p>
                      </div>

                      {/* Livreur assigné */}
                      {order.profiles && (
                        <div className="p-3 bg-primary/5 rounded-lg">
                          <h5 className="font-medium mb-1">Livreur assigné :</h5>
                          <p className="text-sm">{order.profiles.full_name}</p>
                          <p className="text-sm text-muted-foreground">{order.profiles.email}</p>
                        </div>
                      )}

                      {/* Total */}
                      <div className="flex justify-between items-center pt-4 border-t">
                        <span className="font-semibold">Total :</span>
                        <span className="text-lg font-bold text-primary">
                          {getOrderTotal(order).toLocaleString()} FCFA
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {order.status === 'pending' && (
                          <Button variant="destructive" size="sm">
                            Annuler la commande
                          </Button>
                        )}
                        {order.status === 'delivered' && (
                          <Button variant="outline" size="sm">
                            Laisser un avis
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          Suivre la commande
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}