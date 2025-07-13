import { useState, useEffect } from 'react';
import { Package, DollarSign, ShoppingCart, TrendingUp, Plus, Bell } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function MerchantDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [shop, setShop] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchShopInfo();
      fetchStats();
      fetchRecentOrders();
    }
  }, [user]);

  const fetchShopInfo = async () => {
    const { data } = await supabase
      .from('shops')
      .select('*')
      .eq('owner_id', user?.id)
      .single();

    if (data) setShop(data);
  };

  const fetchStats = async () => {
    if (!user) return;

    // Récupérer les commandes
    const { data: orders } = await supabase
      .from('orders')
      .select('total_amount, status')
      .eq('shop_id', shop?.id || '');

    // Récupérer les produits
    const { data: products } = await supabase
      .from('products')
      .select('id')
      .eq('shop_id', shop?.id || '');

    if (orders) {
      const totalOrders = orders.length;
      const pendingOrders = orders.filter((o: any) => ['pending', 'confirmed', 'preparing'].includes(o.status)).length;
      const totalRevenue = orders
        .filter((o: any) => o.status === 'delivered')
        .reduce((sum: number, order: any) => sum + parseFloat(order.total_amount.toString()), 0);

      setStats({
        totalOrders,
        pendingOrders,
        totalRevenue,
        totalProducts: products?.length || 0
      });
    }
    setLoading(false);
  };

  const fetchRecentOrders = async () => {
    if (!shop) return;

    const { data } = await supabase
      .from('orders')
      .select(`
        *,
        user_addresses (address),
        profiles!orders_customer_id_fkey (full_name)
      `)
      .eq('shop_id', shop.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (data) setRecentOrders(data);
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

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Créer votre boutique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Vous devez d'abord créer votre boutique pour accéder au tableau de bord.
              </p>
              <Button>Créer ma boutique</Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">{shop.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouveau produit
            </Button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes totales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes en attente</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} FCFA</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits actifs</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>
        </div>

        {/* Commandes récentes */}
        <Card>
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground">Aucune commande récente.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order: any) => (
                  <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">
                        Commande #{order.id.slice(-8)}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {order.profiles?.full_name} • {order.user_addresses?.address}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{parseFloat(order.total_amount).toLocaleString()} FCFA</p>
                      <Badge variant={order.status === 'pending' ? 'destructive' : 'default'}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}