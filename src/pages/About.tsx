import { Users, Target, Award, Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion',
      description: 'Nous mettons notre cœur à connecter les communautés locales'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Nous croyons en la force des relations humaines et du commerce local'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Nous utilisons la technologie pour simplifier la vie quotidienne'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Nous nous efforçons d\'offrir le meilleur service possible'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Naissance de LinkaDrop',
      description: 'Création de l\'entreprise avec une vision claire : révolutionner le commerce local au Togo'
    },
    {
      year: '2024',
      title: 'Lancement de LinkaMarket',
      description: 'Ouverture de notre plateforme e-commerce à Lomé avec nos premiers commerçants partenaires'
    },
    {
      year: '2024',
      title: 'Expansion à Kara',
      description: 'Extension de nos services à Kara pour servir davantage de Togolais'
    },
    {
      year: '2025',
      title: 'Croissance continue',
      description: 'Développement de nouvelles fonctionnalités et expansion dans d\'autres villes'
    }
  ];

  const team = [
    {
      name: 'Imen Anozel',
      role: 'Fondatrice & CEO',
      description: 'Passionnée par l\'innovation et le développement économique local'
    },
    {
      name: 'Équipe LinkaDrop',
      role: 'Développeurs & Opérations',
      description: 'Une équipe dédiée à créer les meilleures solutions pour nos utilisateurs'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              À propos de <span className="text-gradient">LinkaMarket</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Nous connectons les commerçants locaux aux consommateurs togolais 
              à travers une plateforme moderne et accessible.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Notre mission</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  LinkaMarket est née de la volonté de digitaliser le commerce local au Togo. 
                  Nous créons un pont entre les commerçants traditionnels et les consommateurs 
                  modernes, en offrant une plateforme facile d'utilisation qui respecte 
                  nos valeurs africaines.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Notre objectif est de démocratiser l'accès au commerce électronique 
                  pour tous les Togolais, tout en soutenant l'économie locale et 
                  en créant des emplois durables.
                </p>
                <Button className="gap-2">
                  Rejoindre notre mission
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary mb-4">1000+</div>
                    <div className="text-lg text-muted-foreground">Commandes livrées</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nos valeurs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident notre action au quotidien
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <value.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre parcours</h2>
              <p className="text-muted-foreground">Les étapes clés de notre développement</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-px h-16 bg-border mt-4"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="bg-card rounded-lg p-6 group-hover:shadow-lg transition-shadow">
                        <div className="text-primary font-semibold mb-2">{milestone.year}</div>
                        <h3 className="font-semibold mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Notre équipe</h2>
              <p className="text-muted-foreground">
                Les personnes passionnées qui rendent LinkaMarket possible
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Rejoignez l'aventure LinkaMarket</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Que vous soyez client, commerçant ou livreur, il y a une place pour vous 
              dans notre écosystème.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2">
                Commencer maintenant
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline">
                Nous contacter
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;