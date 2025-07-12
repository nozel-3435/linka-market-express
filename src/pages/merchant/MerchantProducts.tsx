import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function MerchantProducts() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shop, setShop] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    original_price: '',
    category_id: '',
    stock_quantity: '',
    weight: '',
    image_urls: []
  });

  useEffect(() => {
    if (user) {
      fetchShop();
      fetchCategories();
    }
  }, [user]);

  useEffect(() => {
    if (shop) {
      fetchProducts();
    }
  }, [shop]);

  const fetchShop = async () => {
    const { data } = await supabase
      .from('shops')
      .select('*')
      .eq('owner_id', user?.id)
      .single();

    if (data) setShop(data);
  };

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data) setCategories(data);
  };

  const fetchProducts = async () => {
    if (!shop) return;

    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        categories (name)
      `)
      .eq('shop_id', shop.id)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  };

  const saveProduct = async () => {
    if (!productData.name || !productData.price || !productData.category_id) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const productToSave = {
      ...productData,
      shop_id: shop.id,
      price: parseFloat(productData.price),
      original_price: productData.original_price ? parseFloat(productData.original_price) : null,
      stock_quantity: parseInt(productData.stock_quantity) || 0,
      weight: productData.weight ? parseFloat(productData.weight) : null
    };

    let result;
    if (editingProduct) {
      result = await supabase
        .from('products')
        .update(productToSave)
        .eq('id', editingProduct.id);
    } else {
      result = await supabase
        .from('products')
        .insert(productToSave);
    }

    if (!result.error) {
      fetchProducts();
      setIsDialogOpen(false);
      resetForm();
      toast({
        title: editingProduct ? "Produit modifié" : "Produit ajouté",
        description: `Le produit a été ${editingProduct ? 'modifié' : 'ajouté'} avec succès.`,
      });
    }
  };

  const toggleProductStatus = async (productId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('products')
      .update({ is_active: !currentStatus })
      .eq('id', productId);

    if (!error) {
      fetchProducts();
      toast({
        title: currentStatus ? "Produit désactivé" : "Produit activé",
        description: `Le produit a été ${currentStatus ? 'désactivé' : 'activé'}.`,
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (!error) {
      fetchProducts();
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé.",
      });
    }
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setProductData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      original_price: product.original_price?.toString() || '',
      category_id: product.category_id,
      stock_quantity: product.stock_quantity.toString(),
      weight: product.weight?.toString() || '',
      image_urls: product.image_urls || []
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setProductData({
      name: '',
      description: '',
      price: '',
      original_price: '',
      category_id: '',
      stock_quantity: '',
      weight: '',
      image_urls: []
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!shop) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <p>Vous devez d'abord créer votre boutique.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mes Produits</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau produit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du produit *</Label>
                  <Input
                    id="name"
                    value={productData.name}
                    onChange={(e) => setProductData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Select 
                    value={productData.category_id} 
                    onValueChange={(value) => setProductData(prev => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={productData.description}
                    onChange={(e) => setProductData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Prix (FCFA) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData(prev => ({ ...prev, price: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="original_price">Prix original (FCFA)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={productData.original_price}
                    onChange={(e) => setProductData(prev => ({ ...prev, original_price: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={productData.stock_quantity}
                    onChange={(e) => setProductData(prev => ({ ...prev, stock_quantity: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Poids (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={productData.weight}
                    onChange={(e) => setProductData(prev => ({ ...prev, weight: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={saveProduct} className="w-full">
                {editingProduct ? 'Modifier' : 'Ajouter'} le produit
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtres */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des produits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Liste des produits */}
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any) => (
              <Card key={product.id}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{product.categories?.name}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleProductStatus(product.id, product.is_active)}
                      >
                        {product.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-lg text-primary">
                      {product.price.toLocaleString()} FCFA
                    </p>
                    {product.original_price && (
                      <p className="text-sm text-muted-foreground line-through">
                        {product.original_price.toLocaleString()} FCFA
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant={product.is_active ? 'default' : 'secondary'}>
                      {product.is_active ? 'Actif' : 'Inactif'}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Stock: {product.stock_quantity}
                    </p>
                  </div>
                  {product.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun produit trouvé.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}