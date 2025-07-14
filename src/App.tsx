import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Merchants from "./pages/Merchants";
import BecomeMerchant from "./pages/BecomeMerchant";
import BecomeDriver from "./pages/BecomeDriver";
import Support from "./pages/Support";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LinkaDrop from "./pages/LinkaDrop";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages clients
import ClientHome from "./pages/client/ClientHome";
import Cart from "./pages/client/Cart";
import Favorites from "./pages/client/Favorites";
import ClientOrders from "./pages/client/ClientOrders";
import ClientProfile from "./pages/client/ClientProfile";

// Pages commerçants
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/MerchantProducts";
import MerchantOrders from "./pages/merchant/MerchantOrders";
import MerchantStats from "./pages/merchant/MerchantStats";

// Pages livreurs
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverDeliveries from "./pages/driver/DriverDeliveries";
import DriverMap from "./pages/driver/DriverMap";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/merchants" element={<Merchants />} />
              <Route path="/become-merchant" element={<BecomeMerchant />} />
              <Route path="/become-driver" element={<BecomeDriver />} />
              <Route path="/support" element={<Support />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/linkadrop" element={<LinkaDrop />} />
              
              {/* Routes protégées */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              
              {/* Routes client */}
              <Route path="/client" element={<ProtectedRoute userType="client"><ClientHome /></ProtectedRoute>} />
              <Route path="/client/cart" element={<ProtectedRoute userType="client"><Cart /></ProtectedRoute>} />
              <Route path="/client/favorites" element={<ProtectedRoute userType="client"><Favorites /></ProtectedRoute>} />
              <Route path="/client/orders" element={<ProtectedRoute userType="client"><ClientOrders /></ProtectedRoute>} />
              <Route path="/client/profile" element={<ProtectedRoute userType="client"><ClientProfile /></ProtectedRoute>} />
              
              {/* Routes commerçant */}
              <Route path="/merchant" element={<ProtectedRoute userType="merchant"><MerchantDashboard /></ProtectedRoute>} />
              <Route path="/merchant/products" element={<ProtectedRoute userType="merchant"><MerchantProducts /></ProtectedRoute>} />
              <Route path="/merchant/orders" element={<ProtectedRoute userType="merchant"><MerchantOrders /></ProtectedRoute>} />
              <Route path="/merchant/stats" element={<ProtectedRoute userType="merchant"><MerchantStats /></ProtectedRoute>} />
              
              {/* Routes livreur */}
              <Route path="/driver" element={<ProtectedRoute userType="driver"><DriverDashboard /></ProtectedRoute>} />
              <Route path="/driver/deliveries" element={<ProtectedRoute userType="driver"><DriverDeliveries /></ProtectedRoute>} />
              <Route path="/driver/map" element={<ProtectedRoute userType="driver"><DriverMap /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
