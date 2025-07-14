import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Contact form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: [
        '+228 90 10 93 97',
        '+228 91 55 95 00',
        '+228 97 61 63 71'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'imenanozel@gmail.com',
        'linkagrp@outlook.com'
      ]
    },
    {
      icon: MapPin,
      title: 'Localisation',
      details: [
        'Lomé, Togo',
        'Kara, Togo'
      ]
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: [
        'Lundi - Vendredi: 8h - 18h',
        'Samedi: 9h - 16h',
        'Dimanche: Fermé'
      ]
    }
  ];

  const offices = [
    {
      city: 'Lomé',
      address: 'Quartier Administratif, Lomé',
      phone: '+228 90 10 93 97',
      email: 'lome@linkamarket.com',
      hours: '8h - 18h (Lun-Ven)'
    },
    {
      city: 'Kara',
      address: 'Centre-ville, Kara',
      phone: '+228 91 55 95 00',
      email: 'kara@linkamarket.com',
      hours: '8h - 18h (Lun-Ven)'
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
              Contactez-<span className="text-gradient">nous</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans votre expérience LinkaMarket.
            </p>
          </div>
        </section>

        {/* Contact Info Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <info.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-3">{info.title}</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      {info.details.map((detail, idx) => (
                        <div key={idx}>{detail}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form & Offices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Envoyez-nous un message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                          required
                        />
                      </div>
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
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        placeholder="+228 XX XX XX XX"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Sujet</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                        rows={5}
                        placeholder="Dites-nous comment nous pouvons vous aider..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2">
                      <Send className="w-4 h-4" />
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Offices */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold mb-6">Nos bureaux</h3>
                {offices.map((office, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-lg mb-4 text-primary">
                        Bureau de {office.city}
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <a href={`tel:${office.phone}`} className="text-sm hover:text-primary transition-colors">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <a href={`mailto:${office.email}`} className="text-sm hover:text-primary transition-colors">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{office.hours}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Quick Actions */}
                <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4">Besoin d'aide immédiate ?</h4>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start gap-3" asChild>
                        <a href="tel:+22890109397">
                          <Phone className="w-4 h-4" />
                          Appeler maintenant
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-3" asChild>
                        <a href="mailto:imenanozel@gmail.com">
                          <Mail className="w-4 h-4" />
                          Envoyer un email
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start gap-3">
                        <MessageCircle className="w-4 h-4" />
                        Chat en direct
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nous trouver</h2>
              <p className="text-muted-foreground">
                Nos bureaux à Lomé et Kara sont ouverts pour vous accueillir
              </p>
            </div>
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">Carte interactive</p>
                <p className="text-muted-foreground">
                  Localisez nos bureaux à Lomé et Kara
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;