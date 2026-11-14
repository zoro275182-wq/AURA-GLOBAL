import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalStateContext';
import { CurrencyCode } from '../../types';
import {
  Sparkles,
  ShoppingBag,
  Moon,
  Sun,
  Menu,
  X,
  Compass,
  Box,
  Layers,
  Calculator,
  Navigation,
  User,
  Briefcase,
  LogOut
} from 'lucide-react';

export const GlobalNavbar: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    currency,
    setCurrency,
    theme,
    toggleTheme,
    cartCount,
    user,
    openAuthModal,
    setIsSellerModalOpen,
    logout
  } = useGlobalState();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: t.navHome, icon: Compass },
    {
      to: '/showroom',
      label: t.navShowroom,
      icon: Box,
      badge: t.navLive3D
    },
    { to: '/catalog', label: t.navCatalog, icon: Layers },
    { to: '/order', label: t.navOrder, icon: Calculator },
    { to: '/tracking', label: t.navTracking, icon: Navigation },
    {
      to: '/checkout',
      label: t.navCheckout,
      icon: ShoppingBag,
      cartBadge: true
    }
  ];

  const currencies: CurrencyCode[] = ['USD', 'EUR', 'UZS'];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav className="pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#090D17]/80 dark:bg-[#070911]/85 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
        
        {/* Brand / Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="relative w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-cyan-400 via-violet-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070911] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-[0.2em] text-sm sm:text-base font-display text-white">
              AURA <span className="text-cyan-400 font-light">GLOBAL</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5 hidden sm:block">
              {language === 'RU' ? 'Суверенный сейф активов' : 'Turnkey Asset Vault'}
            </span>
          </div>
        </NavLink>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white font-semibold shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 border border-cyan-400/40 -z-10 animate-shimmer" />
                )}
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{link.label}</span>

                {/* 3D LIVE Glowing Badge */}
                {link.badge && (
                  <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse">
                    {link.badge}
                  </span>
                )}

                {/* Live Cart Counter Badge */}
                {link.cartBadge && cartCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-full bg-pink-500 text-white shadow-[0_0_10px_rgba(236,72,153,0.8)]">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Right Controls: Language, Currency & Theme */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Language Toggle (EN / RU) */}
          <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
            {(['EN', 'RU'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === l
                    ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Switch language to ${l === 'RU' ? 'Русский' : 'English'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center p-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono">
            {currencies.map(c => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  currency === c
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Seller Portal Button */}
          <button
            onClick={() => setIsSellerModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 hover:bg-violet-500/20 border border-violet-400/30 text-violet-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            title={language === 'RU' ? 'Кабинет продавца / Заход как продавец' : 'Seller Portal / Partner Access'}
          >
            <Briefcase className="w-3.5 h-3.5 text-violet-400" />
            <span>{language === 'RU' ? 'Продавец' : 'Seller'}</span>
          </button>

          {/* User Auth Profile or Register Button */}
          {user ? (
            <div className="hidden sm:flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold">{user.name.split(' ')[0]}</span>
              <button
                onClick={logout}
                title={language === 'RU' ? 'Выйти из аккаунта' : 'Sign out'}
                className="ml-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal('register')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-600/20 hover:from-cyan-500/30 hover:to-violet-600/30 border border-cyan-400/40 text-cyan-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>{language === 'RU' ? 'Регистрация' : 'Register'}</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title={`Toggle Theme (Current: ${theme})`}
          >
            {theme === 'dark' ? (
              <Moon className="w-4 h-4 text-violet-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="pointer-events-auto fixed inset-x-4 top-20 z-50 p-5 rounded-3xl bg-[#090D17]/95 backdrop-blur-3xl border border-white/15 shadow-2xl flex flex-col gap-2 lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map(link => {
            const isActive = location.pathname === link.to;
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-pink-500/20 border border-cyan-400/30 text-white font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
                    {link.badge}
                  </span>
                )}
                {link.cartBadge && cartCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-mono rounded-full bg-pink-500 text-white">
                    {cartCount}
                  </span>
                )}
              </NavLink>
            );
          })}

          {/* Mobile Seller & Account Buttons */}
          <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                setIsSellerModalOpen(true);
              }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-violet-500/10 border border-violet-400/30 text-violet-300 text-sm font-mono"
            >
              <Briefcase className="w-4 h-4 text-violet-400" />
              <span>{language === 'RU' ? 'Кабинет продавца (Селлер)' : 'Seller Portal'}</span>
            </button>

            {user ? (
              <div className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-sm font-mono text-cyan-200">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span>{user.name}</span>
                </span>
                <button onClick={logout} className="text-slate-400 hover:text-white">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openAuthModal('register');
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-sm font-mono"
              >
                <User className="w-4 h-4" />
                <span>{language === 'RU' ? 'Вход / Регистрация' : 'Sign In / Register'}</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
