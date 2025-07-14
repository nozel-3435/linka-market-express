import { Truck, MapPin, Clock, Shield, Star, ArrowRight, Package, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const LinkaDrop = () => {
  const features = [
    {
      icon: Clock,
      title: 'Livraison rapide',
      description: 'Livraison en 30-60 minutes dans Lomé et Kara'
    },
    {
      icon: MapPin,
      title: 'Suivi en temps réel',
      description: 'Suivez votre commande en direct sur la carte'
    },
    {
      icon: Shield,
      title: 'Livraison sécurisée',
      description: 'Vos produits sont assurés et protégés'
    },
    {
      icon: Star,
      title: 'Service de qualité',
      description: 'Livreurs professionnels et courtois'
    }
  ];

  const stats = [
    {
      number: '2000+',
      label: 'Livraisons effectuées',
      icon: Package
    },
    {
      number: '150+',
      label: 'Livreurs actifs',
      icon: Users
    },
    {
      number: '98%',
      label: 'Taux de satisfaction',
      icon: Star
    },
    {
      number: '45min',
      label: 'Temps de livraison moyen',
      icon: Clock
    }
  ];

  const coverageAreas = [
    {
      city: 'Lomé',
      zones: [
        'Centre-ville',
        'Bè',
        'Aflao Gakli',
        'Adidogomé',
        'Nyékonakpoè',
        'Hédzranawoé',
        'Tokoin',
        'Agbalépédogan'
      ]
    },
    {
      city: 'Kara',
      zones: [
        'Centre-ville',
        'Katanga',
        'Kolokopé',
        'Lassa',
        'Sarakawa'
      ]
    }
  ];

  const deliveryProcess = [
    {
      step: 1,
      title: 'Commande confirmée',
      description: 'Le commerçant prépare votre commande'
    },
    {
      step: 2,
      title: 'Livreur assigné',
      description: 'Un livreur proche récupère votre commande'
    },
    {
      step: 3,
      title: 'En route',
      description: 'Suivez votre livreur en temps réel'
    },
    {
      step: 4,
      title: 'Livré !',
      description: 'Recevez votre commande et payez si nécessaire'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">
                  Service de livraison
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-gradient">LinkaDrop</span> Livraison
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Le service de livraison rapide et fiable qui connecte 
                  les commerçants aux clients à Lomé et Kara.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="gap-2">
                    <Truck className="w-5 h-5" />
                    Devenir livreur
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Package className="w-5 h-5" />
                    Commander maintenant
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                      <Truck className="w-16 h-16 text-white" />
                    </div>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <div className="text-3xl font-bold text-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Pourquoi choisir LinkaDrop ?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un service de livraison pensé pour les besoins des Togolais
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-muted-foreground">Le processus de livraison en 4 étapes simples</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {deliveryProcess.map((process, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                      {process.step}
                    </div>
                    <h3 className="font-semibold mb-2">{process.title}</h3>
                    <p className="text-muted-foreground text-sm">{process.description}</p>
                    {index < deliveryProcess.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full">
                        <ArrowRight className="w-6 h-6 text-primary mx-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Areas */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Zones de livraison</h2>
              <p className="text-muted-foreground">
                Nous livrons dans toutes ces zones à Lomé et Kara
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {coverageAreas.map((area, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold">{area.city}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {area.zones.map((zone, zoneIndex) => (
                        <Badge key={zoneIndex} variant="secondary" className="text-xs">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Que vous soyez client ou que vous souhaitiez devenir livreur, 
                rejoignez la famille LinkaDrop dès aujourd'hui.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2">
                  <Truck className="w-5 h-5" />
                  Devenir livreur
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Package className="w-5 h-5" />
                  Passer commande
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LinkaDrop;