import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CurrencyCode, CurrencyRate, CartItem, TrackingOrder, UserProfile, AssetItem } from '../types';
import { TRACKING_DATABASE } from '../data/trackingData';
import { CATALOG_ITEMS } from '../data/catalogData';
import { Language, Translations, TRANSLATIONS } from '../i18n/translations';
import { getAssetPath } from '../utils/assetPath';

const CURRENCY_CONFIG: Record<CurrencyCode, CurrencyRate> = {
  USD: { symbol: '$', rate: 1.0, prefix: '$' },
  EUR: { symbol: '€', rate: 0.94, prefix: '€' },
  UZS: { symbol: 'soʻm', rate: 12850, prefix: '', suffix: ' UZS' }
};

interface GlobalStateContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  currency: CurrencyCode;
  setCurrency: (curr: CurrencyCode) => void;
  currencyConfig: CurrencyRate;
  formatPrice: (priceUsd: number) => string;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotalUsd: number;
  cartCount: number;
  selectedShowroomModel: 'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper';
  setSelectedShowroomModel: (model: 'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper') => void;
  isWireframeMode: boolean;
  setIsWireframeMode: React.Dispatch<React.SetStateAction<boolean>>;
  activeTrackingId: string;
  setActiveTrackingId: (id: string) => void;
  allTrackingOrders: Record<string, TrackingOrder>;
  addNewOrder: (order: TrackingOrder) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  // User Authentication & Roles
  user: UserProfile | null;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register' | 'seller';
  openAuthModal: (mode?: 'login' | 'register' | 'seller') => void;
  closeAuthModal: () => void;
  isSellerModalOpen: boolean;
  setIsSellerModalOpen: (open: boolean) => void;
  login: (email: string, role?: 'client' | 'seller') => void;
  register: (name: string, email: string, role?: 'client' | 'seller', company?: string, country?: string) => void;
  logout: () => void;
  // Dynamic Real-Time Catalog
  catalogItems: AssetItem[];
  addCatalogItem: (item: AssetItem) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('RU'); // default to Russian as requested
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'initial-sample',
      name: 'NVIDIA RTX 5090 Founders Edition',
      categoryLabel: 'Flagship PC Hardware',
      priceUsd: 2399,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      originHub: 'Silicon Valley Hub (SFO)',
      deliveryDays: '4-7 Days Air'
    }
  ]);
  const [selectedShowroomModel, setSelectedShowroomModel] = useState<'rtx5090' | 'iphone18' | 'cullinan' | 'gt3rs' | 'villa' | 'threadripper'>('rtx5090');
  const [isWireframeMode, setIsWireframeMode] = useState<boolean>(false);
  const [activeTrackingId, setActiveTrackingId] = useState<string>('AURA-5090-FE');
  const [allTrackingOrders, setAllTrackingOrders] = useState<Record<string, TrackingOrder>>(TRACKING_DATABASE);
  const [notification, setNotification] = useState<string | null>(null);

  // User Authentication & Roles
  const [user, setUser] = useState<UserProfile | null>({
    id: 'aura-vip-001',
    name: 'Alexander Volkov',
    email: 'a.volkov@aura-vault.ch',
    role: 'client',
    country: 'Switzerland / UAE',
    vipTier: 'Titanium Sovereign',
    balanceUsd: 1250000,
    escrowProtected: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'seller'>('login');
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);

  // Dynamic Real-Time Catalog (Initialized with the 52 items)
  const [catalogItems, setCatalogItems] = useState<AssetItem[]>(CATALOG_ITEMS);

  const addCatalogItem = (newItem: AssetItem) => {
    setCatalogItems(prev => [newItem, ...prev]);
    showNotification(
      language === 'RU'
        ? `Актив "${newItem.name}" опубликован в каталоге AURA!`
        : `Asset "${newItem.name}" published to AURA Catalog!`
    );
  };

  const openAuthModal = (mode: 'login' | 'register' | 'seller' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = (email: string, role: 'client' | 'seller' = 'client') => {
    setUser({
      id: `user-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      vipTier: role === 'seller' ? 'Titanium Sovereign' : 'Platinum',
      balanceUsd: role === 'seller' ? 2450000 : 500000,
      escrowProtected: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
    setIsAuthModalOpen(false);
    showNotification(
      language === 'RU'
        ? `Добро пожаловать в AURA, ${email.split('@')[0]}!`
        : `Welcome to AURA, ${email.split('@')[0]}!`
    );
  };

  const register = (
    name: string,
    email: string,
    role: 'client' | 'seller' = 'client',
    company?: string,
    country?: string
  ) => {
    setUser({
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      company,
      country: country || 'International',
      vipTier: 'Titanium Sovereign',
      balanceUsd: 1000000,
      escrowProtected: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    });
    setIsAuthModalOpen(false);
    showNotification(
      language === 'RU'
        ? `Аккаунт ${role === 'seller' ? 'продавца' : 'клиента'} успешно зарегистрирован!`
        : `Account registered and verified successfully!`
    );
  };

  const logout = () => {
    setUser(null);
    showNotification(language === 'RU' ? 'Сессия завершена' : 'Signed out');
  };

  const t = TRANSLATIONS[language];
  const currencyConfig = CURRENCY_CONFIG[currency];

  const formatPrice = (priceUsd: number): string => {
    const converted = priceUsd * currencyConfig.rate;
    if (currency === 'UZS') {
      return `${Math.round(converted).toLocaleString('ru-RU')}${currencyConfig.suffix}`;
    }
    return `${currencyConfig.prefix}${Math.round(converted).toLocaleString('en-US')}`;
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
      }
      return [...prev, item];
    });
    showNotification(language === 'RU' ? `Добавлено в сейф заказа: "${item.name}"` : `Added "${item.name}" to Order Vault`);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalUsd = cart.reduce((acc, item) => acc + item.priceUsd * item.quantity, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const addNewOrder = (order: TrackingOrder) => {
    setAllTrackingOrders(prev => ({
      [order.id]: order,
      ...prev
    }));
    setActiveTrackingId(order.id);
  };

  // Sync theme class to documentElement
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  return (
    <GlobalStateContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        currencyConfig,
        formatPrice,
        theme,
        setTheme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalUsd,
        cartCount,
        selectedShowroomModel,
        setSelectedShowroomModel,
        isWireframeMode,
        setIsWireframeMode,
        activeTrackingId,
        setActiveTrackingId,
        allTrackingOrders,
        addNewOrder,
        notification,
        showNotification,
        // User Auth
        user,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        isSellerModalOpen,
        setIsSellerModalOpen,
        login,
        register,
        logout,
        // Dynamic Catalog
        catalogItems,
        addCatalogItem
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateContext);
  if (!ctx) throw new Error('useGlobalState must be used within GlobalStateProvider');
  return ctx;
};
