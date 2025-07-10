import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { PopularProducts } from '@/components/PopularProducts';
import { AppDownload } from '@/components/AppDownload';
import { Testimonials } from '@/components/Testimonials';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PopularProducts />
        <AppDownload />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
