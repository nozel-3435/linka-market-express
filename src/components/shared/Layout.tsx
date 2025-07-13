import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Sidebar } from './Sidebar';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ShoppingCart, 
  Heart, 
  Package, 
  User, 
  BarChart3, 
  Store, 
  MapPin,
  Truck,
  Clock,
  LucideIcon
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  userType: 'client' | 'merchant' | 'driver';
  title?: string;
  showSidebar?: boolean;
}

const sidebarItems = {
  client: [
    { label: 'Accueil', href: '/client', icon: Home },
    { label: 'Panier', href: '/client/cart', icon: ShoppingCart, badge: 3 },
    { label: 'Favoris', href: '/client/favorites', icon: Heart },
    { label: 'Mes commandes', href: '/client/orders', icon: Package },
    { label: 'Mon profil', href: '/client/profile', icon: User },
  ],
  merchant: [
    { label: 'Tableau de bord', href: '/merchant', icon: Home },
    { label: 'Mes produits', href: '/merchant/products', icon: Store },
    { label: 'Commandes', href: '/merchant/orders', icon: Package },
    { label: 'Statistiques', href: '/merchant/stats', icon: BarChart3 },
  ],
  driver: [
    { label: 'Tableau de bord', href: '/driver', icon: Home },
    { label: 'Livraisons', href: '/driver/deliveries', icon: Clock },
    { label: 'Carte', href: '/driver/map', icon: MapPin },
  ]
};

export function Layout({ children, userType, title, showSidebar = true }: LayoutProps) {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {showSidebar && (
          <aside className="w-64 min-h-[calc(100vh-4rem)] bg-card border-r border-border p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-foreground capitalize">
                {userType === 'client' && 'Espace Client'}
                {userType === 'merchant' && 'Espace Commerçant'}
                {userType === 'driver' && 'Espace Livreur'}
              </h2>
            </div>
            
            <Sidebar 
              items={sidebarItems[userType]}
              userType={userType}
              className="mb-6"
            />
            
            <div className="border-t border-border pt-6 mt-auto">
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="w-full"
              >
                Se déconnecter
              </Button>
            </div>
          </aside>
        )}
        
        <main className={cn(
          "flex-1 p-6",
          showSidebar ? "ml-0" : "ml-0"
        )}>
          {title && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            </div>
          )}
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}

function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}