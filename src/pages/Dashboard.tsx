import { useState } from 'react';
import { Package, Users, Truck, TrendingUp, ShoppingCart, Star, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - would come from Supabase in real app
const mockData = {
  client: {
    stats: {
      orders: 23,
      spent: 245000,
      saved: 45000,
      favorites: 12
    },
    recentOrders: [
      {
        id: '1',
        merchant: 'Marché Central',
        items: 'Riz jasmin, Huile de palme',
        total: 20500,
        status: 'delivered',
        date: '2024-01-15'
      },
      {
        id: '2',
        merchant: 'Fruits du Plateau',
        items: 'Mangues Kent (2kg)',
        total: 7000,
        status: 'in_transit',
        date: '2024-01-16'
      }
    ]
  },
  merchant: {
    stats: {
      products: 45,
      orders: 156,
      revenue: 1250000,
      rating: 4.8
    },
    recentOrders: [
      {
        id: '1',
        customer: 'Akosua M.',
        items: 'Riz jasmin x2',
        total: 25000,
        status: 'pending',
        date: '2024-01-16'
      },
      {
        id: '2',
        customer: 'Kwame A.',
        items: 'Huile de palme x1',
        total: 8000,
        status: 'confirmed',
        date: '2024-01-16'
      }
    ]
  },
  driver: {
    stats: {
      deliveries: 89,
      rating: 4.9,
      earnings: 450000,
      distance: 1250
    },
    activeDeliveries: [
      {
        id: '1',
        customer: 'Fatou D.',
        address: 'Tokoin, Rue 125',
        items: 'Riz jasmin, Gari',
        total: 18000,
        distance: '2.5 km',
        eta: '15 min'
      },
      {
        id: '2',
        customer: 'Emmanuel K.',
        address: 'Agoè-Nyivé',
        items: 'Mangues x3',
        total: 10500,
        distance: '4.1 km',
        eta: '25 min'
      }
    ]
  }
};

const Dashboard = () => {
  const [userType] = useState<'client' | 'merchant' | 'driver'>('client'); // Would come from auth context

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'in_transit': return 'En transit';
      case 'pending': return 'En attente';
      case 'confirmed': return 'Confirmé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard {userType === 'client' ? 'Client' : userType === 'merchant' ? 'Commerçant' : 'Livreur'}
          </h1>
          <p className="text-muted-foreground">
            {userType === 'client' && 'Gérez vos commandes et découvrez de nouveaux produits'}
            {userType === 'merchant' && 'Gérez votre boutique et vos commandes'}
            {userType === 'driver' && 'Gérez vos livraisons et vos revenus'}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="orders">
              {userType === 'client' ? 'Mes commandes' : userType === 'merchant' ? 'Commandes reçues' : 'Livraisons'}
            </TabsTrigger>
            <TabsTrigger value="settings">Paramètres</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userType === 'client' && (
                <>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Commandes</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.client.stats.orders}</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-primary" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Dépensé</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.client.stats.spent.toLocaleString()} F</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-secondary" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Économisé</p>
                        <p className="text-2xl font-bold text-green-600">{mockData.client.stats.saved.toLocaleString()} F</p>
                      </div>
                      <Badge className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">%</Badge>
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Favoris</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.client.stats.favorites}</p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                  </Card>
                </>
              )}

              {userType === 'merchant' && (
                <>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Produits</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.merchant.stats.products}</p>
                      </div>
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Commandes</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.merchant.stats.orders}</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-secondary" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenus</p>
                        <p className="text-2xl font-bold text-green-600">{mockData.merchant.stats.revenue.toLocaleString()} F</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Note</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.merchant.stats.rating}/5</p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                  </Card>
                </>
              )}

              {userType === 'driver' && (
                <>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Livraisons</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.driver.stats.deliveries}</p>
                      </div>
                      <Truck className="w-8 h-8 text-primary" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Note</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.driver.stats.rating}/5</p>
                      </div>
                      <Star className="w-8 h-8 text-yellow-500" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenus</p>
                        <p className="text-2xl font-bold text-green-600">{mockData.driver.stats.earnings.toLocaleString()} F</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </Card>
                  <Card className="card-elevated p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Distance</p>
                        <p className="text-2xl font-bold text-foreground">{mockData.driver.stats.distance} km</p>
                      </div>
                      <MapPin className="w-8 h-8 text-secondary" />
                    </div>
                  </Card>
                </>
              )}
            </div>

            {/* Recent Activity */}
            <Card className="card-elevated p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                {userType === 'client' && 'Commandes récentes'}
                {userType === 'merchant' && 'Commandes récentes'}
                {userType === 'driver' && 'Livraisons actives'}
              </h3>
              <div className="space-y-4">
                {userType === 'client' && mockData.client.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{order.merchant}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.total.toLocaleString()} F</p>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </div>
                ))}

                {userType === 'merchant' && mockData.merchant.recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{order.total.toLocaleString()} F</p>
                      <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </Badge>
                    </div>
                  </div>
                ))}

                {userType === 'driver' && mockData.driver.activeDeliveries.map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{delivery.customer}</p>
                      <p className="text-sm text-muted-foreground">{delivery.address}</p>
                      <p className="text-xs text-muted-foreground">{delivery.items}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{delivery.total.toLocaleString()} F</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{delivery.distance}</span>
                        <Clock className="w-3 h-3" />
                        <span>{delivery.eta}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card className="card-elevated p-6">
              <p className="text-muted-foreground">Section des commandes en cours de développement...</p>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="card-elevated p-6">
              <p className="text-muted-foreground">Paramètres en cours de développement...</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;