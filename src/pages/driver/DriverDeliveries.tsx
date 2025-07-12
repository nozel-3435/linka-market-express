import { useState, useEffect } from 'react';
import { Package, MapPin, Clock } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function DriverDeliveries() {
  const { user } = useAuth();
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    if (user) {
      fetchDeliveries();
    }
  }, [user]);

  const fetchDeliveries = async () => {
    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        shops (name, address),
        user_addresses (address),
        profiles!orders_customer_id_fkey (full_name)
      `)
      .eq('driver_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) setDeliveries(data);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Historique des livraisons</h1>

        <div className="space-y-4">
          {deliveries.map((delivery: any) => (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>Livraison #{delivery.id.slice(-8)}</CardTitle>
                  <Badge>{delivery.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold">Client</h4>
                    <p className="text-sm">{delivery.profiles?.full_name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Boutique</h4>
                    <p className="text-sm">{delivery.shops.name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Montant</h4>
                    <p className="text-sm">{delivery.total_amount} FCFA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}