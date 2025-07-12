-- Extension pour la géolocalisation
CREATE EXTENSION IF NOT EXISTS postgis;

-- Types d'enum pour les différents statuts
CREATE TYPE user_role_type AS ENUM ('client', 'merchant', 'driver', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'preparing', 'ready_for_pickup', 'picked_up', 'in_transit', 'delivered', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('tmoney', 'flooz', 'bank_card', 'cash');

-- Table des catégories de produits
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des boutiques/commerces
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  phone TEXT,
  email TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  opening_hours JSONB, -- Format: {"monday": {"open": "08:00", "close": "18:00"}, ...}
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des produits
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  image_urls TEXT[], -- Tableau d'URLs d'images
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  weight DECIMAL(8,2), -- en kg
  dimensions JSONB, -- {"length": 10, "width": 5, "height": 3}
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des paniers
CREATE TABLE carts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des articles dans le panier
CREATE TABLE cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(cart_id, product_id)
);

-- Table des favoris
CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Table des adresses des utilisateurs
CREATE TABLE user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  label TEXT NOT NULL, -- 'Domicile', 'Bureau', etc.
  address TEXT NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des méthodes de paiement des utilisateurs
CREATE TABLE user_payment_methods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  method_type payment_method NOT NULL,
  account_number TEXT NOT NULL,
  account_name TEXT,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des commandes
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
  delivery_address_id UUID REFERENCES user_addresses(id) ON DELETE SET NULL,
  status order_status DEFAULT 'pending',
  total_amount DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  payment_method payment_method,
  payment_status payment_status DEFAULT 'pending',
  notes TEXT,
  estimated_delivery_time TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des articles de commande
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table de l'historique des statuts de commande
CREATE TABLE order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status order_status NOT NULL,
  notes TEXT,
  changed_by UUID REFERENCES profiles(user_id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des avis/commentaires
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(user_id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Créer des index pour les performances
CREATE INDEX idx_shops_location ON shops USING GIST (location);
CREATE INDEX idx_user_addresses_location ON user_addresses USING GIST (location);
CREATE INDEX idx_products_shop_id ON products(shop_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_shop_id ON orders(shop_id);
CREATE INDEX idx_orders_driver_id ON orders(driver_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Activer RLS sur toutes les tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour les catégories (lecture publique)
CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Only admins can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND user_type = 'admin')
);

-- Politiques RLS pour les boutiques
CREATE POLICY "Shops are viewable by everyone" ON shops FOR SELECT USING (true);
CREATE POLICY "Shop owners can manage their shops" ON shops FOR ALL USING (owner_id = auth.uid());

-- Politiques RLS pour les produits
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Shop owners can manage their products" ON products FOR ALL USING (
  EXISTS (SELECT 1 FROM shops WHERE id = products.shop_id AND owner_id = auth.uid())
);

-- Politiques RLS pour les paniers
CREATE POLICY "Users can manage their own cart" ON carts FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Users can manage their own cart items" ON cart_items FOR ALL USING (
  EXISTS (SELECT 1 FROM carts WHERE id = cart_items.cart_id AND user_id = auth.uid())
);

-- Politiques RLS pour les favoris
CREATE POLICY "Users can manage their own favorites" ON favorites FOR ALL USING (user_id = auth.uid());

-- Politiques RLS pour les adresses
CREATE POLICY "Users can manage their own addresses" ON user_addresses FOR ALL USING (user_id = auth.uid());

-- Politiques RLS pour les méthodes de paiement
CREATE POLICY "Users can manage their own payment methods" ON user_payment_methods FOR ALL USING (user_id = auth.uid());

-- Politiques RLS pour les commandes
CREATE POLICY "Customers can view their own orders" ON orders FOR SELECT USING (customer_id = auth.uid());
CREATE POLICY "Shop owners can view orders for their shops" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM shops WHERE id = orders.shop_id AND owner_id = auth.uid())
);
CREATE POLICY "Drivers can view their assigned orders" ON orders FOR SELECT USING (driver_id = auth.uid());
CREATE POLICY "Customers can create orders" ON orders FOR INSERT WITH CHECK (customer_id = auth.uid());
CREATE POLICY "Shop owners and drivers can update orders" ON orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM shops WHERE id = orders.shop_id AND owner_id = auth.uid()) OR
  driver_id = auth.uid()
);

-- Politiques RLS pour les articles de commande
CREATE POLICY "Order items are viewable by related parties" ON order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.id = order_items.order_id AND (
      o.customer_id = auth.uid() OR 
      o.driver_id = auth.uid() OR
      EXISTS (SELECT 1 FROM shops WHERE id = o.shop_id AND owner_id = auth.uid())
    )
  )
);

-- Politiques RLS pour l'historique des statuts
CREATE POLICY "Order status history is viewable by related parties" ON order_status_history FOR ALL USING (
  EXISTS (
    SELECT 1 FROM orders o 
    WHERE o.id = order_status_history.order_id AND (
      o.customer_id = auth.uid() OR 
      o.driver_id = auth.uid() OR
      EXISTS (SELECT 1 FROM shops WHERE id = o.shop_id AND owner_id = auth.uid())
    )
  )
);

-- Politiques RLS pour les avis
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews" ON reviews FOR ALL USING (user_id = auth.uid());

-- Triggers pour updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_shops_updated_at BEFORE UPDATE ON shops FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_carts_updated_at BEFORE UPDATE ON carts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_addresses_updated_at BEFORE UPDATE ON user_addresses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_payment_methods_updated_at BEFORE UPDATE ON user_payment_methods FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insérer des catégories de base
INSERT INTO categories (name, description) VALUES
('Alimentation', 'Produits alimentaires et boissons'),
('Vêtements', 'Vêtements et accessoires de mode'),
('Électronique', 'Appareils électroniques et accessoires'),
('Maison & Jardin', 'Articles pour la maison et le jardin'),
('Santé & Beauté', 'Produits de santé et cosmétiques'),
('Artisanat', 'Produits artisanaux et traditionnels');