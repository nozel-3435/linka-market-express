import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function DriverMap() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Carte des livraisons</h1>
        <div className="bg-muted rounded-lg h-96 flex items-center justify-center">
          <p className="text-muted-foreground">Carte à implémenter avec Mapbox</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}