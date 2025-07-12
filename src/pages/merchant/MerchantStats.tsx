import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Package, Users, Calendar } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

export default function MerchantStats() {
  const { user } = useAuth();
  const [shop, setShop] = useState(null);
  const [period, setPeriod] = useState('30');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topProducts: [],
    revenueByDay: [],
    ordersByStatus: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchShop();
    }
  }, [user]);

  useEffect(() => {
    if (shop) {
      fetchStats();
    }
  }, [shop, period]);

  const fetchShop = async () => {
    const { data } = await supabase
      .from('shops')
      .select('*')
      .eq('owner_id', user?.id)
      .single();

    if (data) setShop(data);
  };

  const fetchStats = async () => {
    if (!shop) return;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(period));

    // Récupérer les commandes de la période
    const { data: orders } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          products (name)
        )
      `)
      .eq('shop_id', shop.id)
      .gte('created_at', startDate.toISOString());

    if (orders) {
      // Calculer les statistiques
      const totalOrders = orders.length;
      const deliveredOrders = orders.filter(o => o.status === 'delivered');
      const totalRevenue = deliveredOrders.reduce((sum, order) => 
        sum + parseFloat(order.total_amount), 0
      );
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Commandes par statut
      const ordersByStatus = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      }, {});

      // Produits les plus vendus
      const productSales = {};
      orders.forEach(order => {
        order.order_items.forEach(item => {
          const productName = item.products.name;
          productSales[productName] = (productSales[productName] || 0) + item.quantity;
        });
      });

      const topProducts = Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([name, quantity]) => ({ name, quantity }));

      // Chiffre d'affaires par jour
      const revenueByDay = {};
      deliveredOrders.forEach(order => {
        const date = new Date(order.created_at).toLocaleDateString('fr-FR');
        revenueByDay[date] = (revenueByDay[date] || 0) + parseFloat(order.total_amount);
      });

      const revenueData = Object.entries(revenueByDay)
        .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
        .map(([date, revenue]) => ({ date, revenue }));

      setStats({
        totalRevenue,
        totalOrders,
        averageOrderValue,
        topProducts,
        revenueByDay: revenueData,
        ordersByStatus
      });
    }
    setLoading(false);
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Statistiques</h1>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 derniers jours</SelectItem>
              <SelectItem value="30">30 derniers jours</SelectItem>
              <SelectItem value="90">3 derniers mois</SelectItem>
              <SelectItem value="365">12 derniers mois</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="space-y-8">
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.totalRevenue.toLocaleString()} FCFA
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalOrders}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.averageOrderValue.toLocaleString()} FCFA
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Commandes livrées</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.ordersByStatus.delivered || 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques et tableaux */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Commandes par statut */}
              <Card>
                <CardHeader>
                  <CardTitle>Commandes par statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(stats.ordersByStatus).map(([status, count]) => (
                      <div key={status} className="flex justify-between items-center">
                        <span className="capitalize">{status}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Produits les plus vendus */}
              <Card>
                <CardHeader>
                  <CardTitle>Produits les plus vendus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.topProducts.map((product, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="truncate">{product.name}</span>
                        <span className="font-semibold">{product.quantity} vendus</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Évolution du chiffre d'affaires */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Chiffre d'affaires par jour
                </CardTitle>
              </CardHeader>
              <CardContent>
                {stats.revenueByDay.length === 0 ? (
                  <p className="text-muted-foreground">Aucune vente sur cette période.</p>
                ) : (
                  <div className="space-y-2">
                    {stats.revenueByDay.slice(-10).map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span>{item.date}</span>
                        <span className="font-semibold">{item.revenue.toLocaleString()} FCFA</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}