import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../../context/GlobalStateContext';
import {
  X,
  ShieldCheck,
  User,
  Mail,
  Lock,
  Sparkles,
  ArrowRight,
  Briefcase,
  Globe,
  CheckCircle2,
  KeyRound
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authMode,
    openAuthModal,
    setIsSellerModalOpen,
    login,
    register,
    language
  } = useGlobalState();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(
    authMode === 'register' ? 'register' : 'login'
  );

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('Switzerland');
  const [role, setRole] = useState<'client' | 'seller'>('client');
  const [escrowAgreed, setEscrowAgreed] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'login') {
      login(email || 'alexander.v@aura.ch', role);
    } else {
      register(name || 'Alexander Volkov', email || 'a.volkov@aura.ch', role, company, country);
    }
  };

  const fillDemoClient = () => {
    setName('Alexander Volkov');
    setEmail('vip.client@aura-vault.ch');
    setPassword('••••••••••••');
    setRole('client');
    setCountry('Switzerland / UAE');
  };

  const fillDemoSeller = () => {
    setName('Bavarian Precision Motors GmbH');
    setEmail('merchant.munich@aura-partners.de');
    setPassword('••••••••••••');
    setRole('seller');
    setCompany('Bavarian Motorsport Exotics');
    setCountry('Germany');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={closeAuthModal} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg rounded-3xl bg-[#090D17]/95 border border-cyan-400/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Top Iridescent Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500" />

          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {activeTab === 'login'
                  ? language === 'RU'
                    ? 'Вход в AURA GLOBAL'
                    : 'AURA Vault Sign In'
                  : language === 'RU'
                  ? 'Регистрация аккаунта'
                  : 'Create Sovereign Account'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {language === 'RU'
                  ? 'Международный эскроу-протокол покупки и доставки'
                  : 'International Turnkey Escrow Protocol'}
              </p>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 mb-6 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'login'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'RU' ? 'Вход в аккаунт' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`py-2 rounded-xl transition-all ${
                activeTab === 'register'
                  ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {language === 'RU' ? 'Регистрация' : 'Register'}
            </button>
          </div>

          {/* Quick Demo Autofill Pills */}
          <div className="flex items-center gap-2 mb-6 text-[11px] font-mono text-slate-400 overflow-x-auto pb-1">
            <span className="text-slate-500 whitespace-nowrap">
              {language === 'RU' ? 'Тестовый доступ:' : 'Quick Demo:'}
            </span>
            <button
              type="button"
              onClick={fillDemoClient}
              className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 whitespace-nowrap transition-all"
            >
              VIP Клиент
            </button>
            <button
              type="button"
              onClick={fillDemoSeller}
              className="px-2.5 py-1 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 border border-violet-400/30 text-violet-300 whitespace-nowrap transition-all"
            >
              Продавец (Селлер)
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  {language === 'RU' ? 'Полное имя / Организация' : 'Full Name / Entity'}
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={language === 'RU' ? 'Александр Волков' : 'Alexander Volkov'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                {language === 'RU' ? 'Рабочий или персональный Email' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="client@aura-vault.ch"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                {language === 'RU' ? 'Пароль' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Role Switcher in Registration */}
            {activeTab === 'register' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  {language === 'RU' ? 'Тип учетной записи' : 'Account Type'}
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setRole('client')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      role === 'client'
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>{language === 'RU' ? 'Покупатель (VIP)' : 'VIP Buyer'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                      role === 'seller'
                        ? 'bg-violet-500/20 border-violet-400 text-violet-200'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    <span>{language === 'RU' ? 'Продавец (Селлер)' : 'Partner Merchant'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Escrow Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="escrow-agreement"
                checked={escrowAgreed}
                onChange={e => setEscrowAgreed(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 bg-white/10 border-white/20 focus:ring-0"
              />
              <label htmlFor="escrow-agreement" className="text-xs text-slate-400 font-mono">
                {language === 'RU'
                  ? 'Согласен с условиями 100% безопасной сделки Lloyds Escrow'
                  : 'I agree to the 100% Lloyds Escrow Deal Protection Terms'}
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 hover:opacity-95 text-white font-bold font-mono text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer"
            >
              <span>
                {activeTab === 'login'
                  ? language === 'RU'
                    ? 'Войти в защищенный кабинет'
                    : 'Access Protected Vault'
                  : language === 'RU'
                  ? 'Завершить регистрацию'
                  : 'Complete VIP Registration'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Seller Direct Portal Link */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">
              {language === 'RU' ? 'Поставляете элитные активы?' : 'Supplying luxury assets?'}
            </span>
            <button
              type="button"
              onClick={() => {
                closeAuthModal();
                setIsSellerModalOpen(true);
              }}
              className="text-cyan-300 hover:text-cyan-200 underline flex items-center gap-1 font-semibold"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{language === 'RU' ? 'Кабинет продавца →' : 'Seller Portal →'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
