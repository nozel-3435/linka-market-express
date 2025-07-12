import { useState, useEffect } from 'react';
import { User, MapPin, CreditCard, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function ClientProfile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);

  // États pour les formulaires
  const [profileData, setProfileData] = useState({
    full_name: '',
    email: ''
  });

  const [addressData, setAddressData] = useState({
    label: '',
    address: '',
    is_default: false
  });

  const [paymentData, setPaymentData] = useState({
    method_type: 'tmoney' as const,
    account_number: '',
    account_name: '',
    is_default: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchAddresses();
      fetchPaymentMethods();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (data) {
      setProfileData({
        full_name: data.full_name || '',
        email: data.email || ''
      });
    }
  };

  const fetchAddresses = async () => {
    const { data } = await supabase
      .from('user_addresses')
      .select('*')
      .eq('user_id', user?.id)
      .order('is_default', { ascending: false });

    if (data) setAddresses(data);
    setLoading(false);
  };

  const fetchPaymentMethods = async () => {
    const { data } = await supabase
      .from('user_payment_methods')
      .select('*')
      .eq('user_id', user?.id)
      .order('is_default', { ascending: false });

    if (data) setPaymentMethods(data);
  };

  const saveProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profileData.full_name,
        email: profileData.email
      })
      .eq('user_id', user?.id);

    if (!error) {
      await updateProfile();
      setEditingProfile(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées.",
      });
    }
  };

  const addAddress = async () => {
    if (!addressData.label || !addressData.address) return;

    const { error } = await supabase
      .from('user_addresses')
      .insert({
        ...addressData,
        user_id: user?.id
      });

    if (!error) {
      fetchAddresses();
      setAddressData({ label: '', address: '', is_default: false });
      toast({
        title: "Adresse ajoutée",
        description: "Votre nouvelle adresse a été ajoutée.",
      });
    }
  };

  const deleteAddress = async (addressId: string) => {
    const { error } = await supabase
      .from('user_addresses')
      .delete()
      .eq('id', addressId);

    if (!error) {
      fetchAddresses();
      toast({
        title: "Adresse supprimée",
        description: "L'adresse a été supprimée.",
      });
    }
  };

  const addPaymentMethod = async () => {
    if (!paymentData.account_number) return;

    const { error } = await supabase
      .from('user_payment_methods')
      .insert({
        ...paymentData,
        user_id: user?.id
      });

    if (!error) {
      fetchPaymentMethods();
      setPaymentData({
        method_type: 'tmoney',
        account_number: '',
        account_name: '',
        is_default: false
      });
      toast({
        title: "Méthode de paiement ajoutée",
        description: "Votre méthode de paiement a été ajoutée.",
      });
    }
  };

  const deletePaymentMethod = async (methodId: string) => {
    const { error } = await supabase
      .from('user_payment_methods')
      .delete()
      .eq('id', methodId);

    if (!error) {
      fetchPaymentMethods();
      toast({
        title: "Méthode de paiement supprimée",
        description: "La méthode de paiement a été supprimée.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">Chargement...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Informations</TabsTrigger>
            <TabsTrigger value="addresses">Adresses</TabsTrigger>
            <TabsTrigger value="payment">Paiements</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informations personnelles
                  </CardTitle>
                  <Button
                    variant="outline"
                    onClick={() => setEditingProfile(!editingProfile)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {editingProfile ? 'Annuler' : 'Modifier'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Nom complet</Label>
                  <Input
                    id="full_name"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, full_name: e.target.value }))}
                    disabled={!editingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!editingProfile}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Type de compte</Label>
                  <Badge variant="secondary">{profile?.user_type}</Badge>
                </div>
                {editingProfile && (
                  <Button onClick={saveProfile} className="w-full">
                    Sauvegarder
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Mes adresses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="flex justify-between items-start p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{address.label}</h4>
                          {address.is_default && (
                            <Badge variant="default">Par défaut</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{address.address}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteAddress(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter une adresse
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouvelle adresse</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="label">Nom de l'adresse</Label>
                          <Input
                            id="label"
                            placeholder="Ex: Domicile, Bureau..."
                            value={addressData.label}
                            onChange={(e) => setAddressData(prev => ({ ...prev, label: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Adresse complète</Label>
                          <Input
                            id="address"
                            placeholder="Ex: Rue, quartier, ville..."
                            value={addressData.address}
                            onChange={(e) => setAddressData(prev => ({ ...prev, address: e.target.value }))}
                          />
                        </div>
                        <Button onClick={addAddress} className="w-full">
                          Ajouter l'adresse
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="payment">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Méthodes de paiement
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex justify-between items-start p-4 border rounded-lg">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold capitalize">{method.method_type}</h4>
                          {method.is_default && (
                            <Badge variant="default">Par défaut</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">
                          {method.account_number} 
                          {method.account_name && ` - ${method.account_name}`}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePaymentMethod(method.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Ajouter un mode de paiement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Nouveau mode de paiement</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="method_type">Type</Label>
                          <Select 
                            value={paymentData.method_type} 
                            onValueChange={(value: any) => setPaymentData(prev => ({ ...prev, method_type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tmoney">T-Money</SelectItem>
                              <SelectItem value="flooz">Flooz</SelectItem>
                              <SelectItem value="bank_card">Carte bancaire</SelectItem>
                              <SelectItem value="cash">Espèces</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account_number">Numéro de compte</Label>
                          <Input
                            id="account_number"
                            placeholder="Ex: +228 XX XX XX XX"
                            value={paymentData.account_number}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, account_number: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account_name">Nom du titulaire (optionnel)</Label>
                          <Input
                            id="account_name"
                            placeholder="Nom sur le compte"
                            value={paymentData.account_name}
                            onChange={(e) => setPaymentData(prev => ({ ...prev, account_name: e.target.value }))}
                          />
                        </div>
                        <Button onClick={addPaymentMethod} className="w-full">
                          Ajouter le mode de paiement
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}