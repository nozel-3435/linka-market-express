import { useState, useEffect } from 'react';
import { Truck, MapPin, Clock, Package } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function DriverDashboard() {
  const { user } = useAuth();
  const [availableOrders, setAvailableOrders] = useState([]);
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    if (user) {
      fetchAvailableOrders();
      fetchMyOrders();
    }
  }, [user]);

  const fetchAvailableOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        shops (name, address),
        user_addresses (address)
      `)
      .eq('status', 'ready_for_pickup')
      .is('driver_id', null)
      .limit(10);

    if (data) setAvailableOrders(data);
  };

  const fetchMyOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        shops (name, address),
        user_addresses (address)
      `)
      .eq('driver_id', user?.id)
      .in('status', ['picked_up', 'in_transit'])
      .order('created_at', { ascending: false });

    if (data) setMyOrders(data);
  };

  const acceptOrder = async (orderId: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ driver_id: user?.id, status: 'picked_up' })
      .eq('id', orderId);

    if (!error) {
      fetchAvailableOrders();
      fetchMyOrders();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tableau de bord Livreur</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Commandes disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Commandes disponibles ({availableOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableOrders.map((order: any) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{order.shops.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        De: {order.shops.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Vers: {order.user_addresses.address}
                      </p>
                    </div>
                    <Badge>{order.total_amount} FCFA</Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => acceptOrder(order.id)}
                  >
                    Accepter la livraison
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Mes livraisons en cours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Mes livraisons ({myOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myOrders.map((order: any) => (
                <div key={order.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">#{order.id.slice(-8)}</h4>
                      <p className="text-sm text-muted-foreground">
                        Vers: {order.user_addresses.address}
                      </p>
                    </div>
                    <Badge variant={order.status === 'in_transit' ? 'default' : 'secondary'}>
                      {order.status === 'picked_up' ? 'Collectée' : 'En livraison'}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Voir sur la carte
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}