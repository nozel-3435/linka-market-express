import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, ShoppingBag, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'client' as 'client' | 'merchant' | 'driver',
    acceptTerms: false
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: "Erreur",
        description: "Le mot de passe doit contenir au moins 8 caractères",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await signUp(formData.email, formData.password, {
        full_name: formData.name,
        user_type: formData.userType,
        phone: formData.phone
      });
      
      if (error) {
        toast({
          title: "Erreur d'inscription",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Inscription réussie",
          description: "Vérifiez votre email pour confirmer votre compte",
        });
        navigate('/login');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const userTypes = [
    {
      id: 'client' as const,
      title: 'Client',
      description: 'Acheter et se faire livrer',
      icon: ShoppingBag,
      color: 'from-primary to-primary-glow'
    },
    {
      id: 'merchant' as const,
      title: 'Commerçant',
      description: 'Vendre mes produits',
      icon: Store,
      color: 'from-secondary to-secondary-light'
    },
    {
      id: 'driver' as const,
      title: 'Livreur',
      description: 'Effectuer des livraisons',
      icon: Truck,
      color: 'from-primary to-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-gradient">LinkaMarket</span>
            </div>
          </Link>
          <p className="text-muted-foreground">Créez votre compte</p>
        </div>

        <Card className="card-elevated p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Je veux devenir :</Label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => handleInputChange('userType', type.id)}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      formData.userType === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center`}>
                        <type.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-foreground">{type.title}</div>
                        <div className="text-sm text-muted-foreground">{type.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.userType === type.id
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}>
                        {formData.userType === type.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+228 XX XX XX XX"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 caractères"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmez votre mot de passe"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                J'accepte les{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  conditions d'utilisation
                </Link>{' '}
                et la{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  politique de confidentialité
                </Link>
              </Label>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="btn-primary w-full group"
              disabled={!formData.acceptTerms || loading}
            >
              {loading ? 'Création...' : 'Créer mon compte'}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Déjà un compte ?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-smooth">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;