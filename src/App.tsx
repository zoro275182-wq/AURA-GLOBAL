import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GlobalNavbar } from './components/layout/GlobalNavbar';
import { Footer } from './components/layout/Footer';
import { PersistentCanvas } from './components/layout/PersistentCanvas';
import { HomePage } from './pages/HomePage';
import { ShowroomPage } from './pages/ShowroomPage';
import { CatalogPage } from './pages/CatalogPage';
import { OrderCalculatorPage } from './pages/OrderCalculatorPage';
import { LiveTrackingPage } from './pages/LiveTrackingPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AuthModal } from './components/auth/AuthModal';
import { SellerPortalModal } from './components/seller/SellerPortalModal';
import { useGlobalState } from './context/GlobalStateContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const location = useLocation();
  const { notification } = useGlobalState();
  const isShowroom = location.pathname === '/showroom';

  return (
    <div className="min-h-screen bg-[#07080E] text-slate-100 transition-colors duration-300 flex flex-col justify-between selection:bg-cyan-500 selection:text-black relative">
      
      {/* PERSISTENT 3D WEBGL BACKGROUND CANVAS */}
      <PersistentCanvas />

      {/* FLOATING FROSTED GLASS NAVBAR (Always Visible) */}
      <GlobalNavbar />

      {/* USER REGISTRATION & AUTH MODAL */}
      <AuthModal />

      {/* SELLER PORTAL & ASSET PUBLISHING MODAL */}
      <SellerPortalModal />

      {/* GLOBAL TOAST NOTIFICATION BANNER */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="px-4 py-3 rounded-2xl bg-[#090D17]/95 backdrop-blur-2xl border border-cyan-400/40 text-xs font-mono text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.4)] flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        </div>
      )}

      {/* MULTI-PAGE ROUTER WITH ANIMATE PRESENCE */}
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full"
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/order" element={<OrderCalculatorPage />} />
              <Route path="/tracking" element={<LiveTrackingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER (Rendered on standard pages; Showroom is full viewport) */}
      {!isShowroom && <Footer />}
    </div>
  );
};

export default App;
