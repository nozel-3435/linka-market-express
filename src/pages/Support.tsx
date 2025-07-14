import { useState } from 'react';
import { MessageCircle, Phone, Mail, Clock, Search, HelpCircle, User, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: ''
  });

  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Support request:', formData);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Téléphone',
      description: 'Appelez-nous directement',
      value: '+228 90 10 93 97',
      action: 'tel:+22890109397'
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'Envoyez-nous un message',
      value: 'imenanozel@gmail.com',
      action: 'mailto:imenanozel@gmail.com'
    },
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      description: 'Assistance immédiate',
      value: 'Disponible 9h-18h',
      action: '#'
    }
  ];

  const faqItems = [
    {
      category: 'Général',
      icon: HelpCircle,
      questions: [
        {
          question: 'Comment créer un compte sur LinkaMarket ?',
          answer: 'Cliquez sur "S\'inscrire" en haut de la page, choisissez votre type de compte (client, commerçant, livreur) et remplissez le formulaire.'
        },
        {
          question: 'Dans quelles villes LinkaMarket est-il disponible ?',
          answer: 'LinkaMarket est actuellement disponible à Lomé et Kara. Nous prévoyons d\'étendre nos services à d\'autres villes bientôt.'
        }
      ]
    },
    {
      category: 'Commandes',
      icon: Package,
      questions: [
        {
          question: 'Comment passer une commande ?',
          answer: 'Parcourez les produits, ajoutez-les à votre panier, puis procédez au paiement. Vous recevrez une confirmation par email.'
        },
        {
          question: 'Quels sont les modes de paiement acceptés ?',
          answer: 'Nous acceptons TMoney, Flooz, les cartes bancaires et le paiement à la livraison.'
        },
        {
          question: 'Puis-je annuler ma commande ?',
          answer: 'Oui, vous pouvez annuler votre commande tant qu\'elle n\'a pas été préparée par le commerçant.'
        }
      ]
    },
    {
      category: 'Livraison',
      icon: Truck,
      questions: [
        {
          question: 'Quels sont les délais de livraison ?',
          answer: 'Les livraisons s\'effectuent généralement sous 30-60 minutes selon votre localisation et la disponibilité du produit.'
        },
        {
          question: 'Comment suivre ma livraison ?',
          answer: 'Vous pouvez suivre votre commande en temps réel depuis votre compte ou via le lien envoyé par SMS.'
        }
      ]
    },
    {
      category: 'Commerçants',
      icon: User,
      questions: [
        {
          question: 'Comment devenir commerçant partenaire ?',
          answer: 'Remplissez le formulaire de candidature sur notre page "Devenir commerçant". Notre équipe vous contactera sous 48h.'
        },
        {
          question: 'Quelles sont les commissions ?',
          answer: 'Nos commissions sont compétitives et varient selon le type de produit. Contactez-nous pour plus de détails.'
        }
      ]
    }
  ];

  const filteredFaq = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Support <span className="text-gradient">client</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider. Trouvez des réponses à vos questions 
              ou contactez-nous directement.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Comment nous contacter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <method.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{method.description}</p>
                    <p className="font-medium mb-4">{method.value}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={method.action}>Contacter</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Questions fréquentes</h2>
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Rechercher dans la FAQ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {filteredFaq.map((category, categoryIndex) => (
                <Card key={categoryIndex} className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-primary" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {category.questions.map((item, index) => (
                        <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}

              {filteredFaq.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucune question trouvée</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Nous contacter</h2>
                <p className="text-muted-foreground">
                  Vous ne trouvez pas votre réponse ? Envoyez-nous un message
                </p>
              </div>

              <Card>
                <CardContent className="p-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Catégorie</Label>
                        <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="commande">Problème de commande</SelectItem>
                            <SelectItem value="livraison">Problème de livraison</SelectItem>
                            <SelectItem value="paiement">Problème de paiement</SelectItem>
                            <SelectItem value="compte">Problème de compte</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                        placeholder="Décrivez votre problème en détail..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      Envoyer le message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="text-center mt-8 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 inline mr-2" />
                Nous répondons généralement sous 24h
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Support;