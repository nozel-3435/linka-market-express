import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShoppingBag, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'client' | 'merchant' | 'driver'>('client');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Erreur de connexion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
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
          <p className="text-muted-foreground">Connectez-vous à votre compte</p>
        </div>

        <Card className="card-elevated p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type Selection */}
            <div className="space-y-4">
              <Label className="text-sm font-medium">Je suis un :</Label>
              <div className="grid grid-cols-1 gap-3">
                {userTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                      userType === type.id
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
                        userType === type.id
                          ? 'border-primary bg-primary'
                          : 'border-gray-300'
                      }`}>
                        {userType === type.id && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Forgot Password */}
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="btn-primary w-full group" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Pas encore de compte ?{' '}
              <Link to="/register" className="text-primary font-medium hover:underline">
                Créer un compte
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

export default Login;