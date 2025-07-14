import { useState } from 'react';
import { Check, Truck, Clock, MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const BecomeDriver = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'Lomé',
    vehicleType: '',
    licenseNumber: '',
    experience: '',
    availability: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Form submitted:', formData);
  };

  const benefits = [
    {
      icon: CreditCard,
      title: 'Revenus attractifs',
      description: 'Gagnez jusqu\'à 150 000 FCFA par mois avec LinkaDrop'
    },
    {
      icon: Clock,
      title: 'Horaires flexibles',
      description: 'Travaillez quand vous voulez, selon votre disponibilité'
    },
    {
      icon: MapPin,
      title: 'Zone de livraison',
      description: 'Desservez Lomé et Kara avec notre réseau optimisé'
    },
    {
      icon: Truck,
      title: 'Support complet',
      description: 'Formation, assurance et maintenance incluses'
    }
  ];

  const requirements = [
    'Permis de conduire valide',
    'Véhicule en bon état (moto/tricycle/voiture)',
    'Âge minimum 21 ans',
    'Smartphone Android ou iOS',
    'Disponibilité minimum 20h/semaine',
    'Bonne connaissance de Lomé/Kara'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary/10 via-background to-primary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Devenez <span className="text-gradient">livreur</span> LinkaDrop
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Rejoignez notre équipe de livreurs et générez des revenus flexibles 
              en livrant pour LinkaMarket à Lomé et Kara.
            </p>
            <Button size="lg" className="gap-2">
              Postuler maintenant
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Pourquoi devenir livreur LinkaDrop ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements & Application */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Conditions requises
                </h2>
                <div className="space-y-4 mb-8">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-foreground">{requirement}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/10 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">Processus de recrutement</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    <li>Soumission du formulaire de candidature</li>
                    <li>Vérification des documents</li>
                    <li>Entretien téléphonique (15 min)</li>
                    <li>Formation en ligne (2h)</li>
                    <li>Test pratique sur le terrain</li>
                    <li>Activation du compte livreur</li>
                  </ol>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Formulaire de candidature</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="fullName">Nom complet</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({...prev, fullName: e.target.value}))}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                          placeholder="+228 XX XX XX XX"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville de service</Label>
                        <Select value={formData.city} onValueChange={(value) => setFormData(prev => ({...prev, city: value}))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lomé">Lomé</SelectItem>
                            <SelectItem value="Kara">Kara</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="vehicleType">Type de véhicule</Label>
                        <Select value={formData.vehicleType} onValueChange={(value) => setFormData(prev => ({...prev, vehicleType: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="moto">Moto</SelectItem>
                            <SelectItem value="tricycle">Tricycle</SelectItem>
                            <SelectItem value="voiture">Voiture</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="licenseNumber">Numéro de permis</Label>
                      <Input
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData(prev => ({...prev, licenseNumber: e.target.value}))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="availability">Disponibilité (heures/semaine)</Label>
                      <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({...prev, availability: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20-30">20-30 heures</SelectItem>
                          <SelectItem value="30-40">30-40 heures</SelectItem>
                          <SelectItem value="40+">Plus de 40 heures</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="experience">Expérience de livraison (optionnel)</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                        placeholder="Décrivez votre expérience..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Envoyer ma candidature
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BecomeDriver;