import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlobalState } from '../../context/GlobalStateContext';
import { AssetItem, CategoryType } from '../../types';
import {
  X,
  Briefcase,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
  Package,
  Plane,
  Sparkles,
  Upload,
  CheckCircle2,
  DollarSign,
  MapPin,
  Clock,
  ExternalLink
} from 'lucide-react';

export const SellerPortalModal: React.FC = () => {
  const {
    isSellerModalOpen,
    setIsSellerModalOpen,
    addCatalogItem,
    formatPrice,
    language
  } = useGlobalState();

  const [activeTab, setActiveTab] = useState<'overview' | 'new-listing'>('overview');

  // Form states for creating a new listing
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('gpu');
  const [priceUsd, setPriceUsd] = useState(2990);
  const [originCountry, setOriginCountry] = useState('Germany');
  const [originHub, setOriginHub] = useState('Munich Air Hub (MUC)');
  const [originFlag, setOriginFlag] = useState('🇩🇪');
  const [deliveryDays, setDeliveryDays] = useState('4-7 Days Priority Air');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80'
  );
  const [description, setDescription] = useState(
    'Certified turnkey luxury lot inspected by certified engineers. Direct insured flight delivery.'
  );
  const [weightKg, setWeightKg] = useState(5.0);

  if (!isSellerModalOpen) return null;

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: AssetItem = {
      id: `seller-${Date.now()}`,
      modelKey: null,
      name: title || (language === 'RU' ? 'Элитный партнерский лот' : 'Elite Partner Asset'),
      subtitle: subtitle || 'Certified Turnkey Partner Allocation',
      category,
      categoryLabel:
        category === 'gpu'
          ? 'Flagship PC Hardware'
          : category === 'smartphone'
          ? 'Smartphones & Mobile Silicon'
          : category === 'car'
          ? 'Luxury & Exotic Automobiles'
          : category === 'materials'
          ? 'Turnkey Construction Materials'
          : 'Turnkey Home Construction',
      priceUsd: Number(priceUsd),
      originCountry,
      originHub,
      originFlag,
      deliveryDays,
      rating: 5.0,
      featured: true,
      image: imageUrl,
      description,
      specs: [
        { label: 'Merchant Provenance', value: 'AURA Tier-1 Partner Escrow Verified' },
        { label: 'Condition', value: 'Brand New / Sealed Factory Escort' },
        { label: 'Dispatch Speed', value: deliveryDays },
        { label: 'Customs Clearance', value: '100% Turnkey Handover Included' }
      ],
      warranty: '3-Year Complete Escrow Guarantee',
      customsDutyPercent: 0,
      weightKg: Number(weightKg)
    };

    addCatalogItem(newItem);
    setActiveTab('overview');
  };

  const samplePhotoPresets = [
    {
      label: 'GPU Rig',
      url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      cat: 'gpu' as CategoryType
    },
    {
      label: 'Supercar',
      url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80',
      cat: 'car' as CategoryType
    },
    {
      label: 'Villa Plot',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      cat: 'villas' as CategoryType
    },
    {
      label: 'Titanium Phone',
      url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=1000&q=80',
      cat: 'smartphone' as CategoryType
    }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        <div className="fixed inset-0" onClick={() => setIsSellerModalOpen(false)} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#080C16]/98 border border-violet-500/30 shadow-[0_0_60px_rgba(139,92,246,0.3)] z-10 overflow-hidden my-auto"
        >
          {/* Top Iridescent Accent Header */}
          <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500" />

          {/* Modal Header */}
          <div className="p-6 sm:p-8 pb-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {language === 'RU'
                      ? 'Кабинет продавца AURA Merchant'
                      : 'AURA Certified Merchant Vault'}
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[10px] font-mono flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Tier 1 Verified</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {language === 'RU'
                    ? 'Международный шлюз размещения и продажи премиальных активов'
                    : 'International Turnkey Asset Distribution & Escrow Settlement'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSellerModalOpen(false)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-3 px-6 sm:px-8 pt-4 border-b border-white/5 text-xs font-mono">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 font-bold transition-all ${
                activeTab === 'overview'
                  ? 'border-violet-400 text-violet-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              {language === 'RU' ? 'Сводка и показатели' : 'Merchant Overview'}
            </button>
            <button
              onClick={() => setActiveTab('new-listing')}
              className={`pb-3 border-b-2 font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'new-listing'
                  ? 'border-cyan-400 text-cyan-300'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{language === 'RU' ? 'Разместить новый актив' : 'Publish New Asset'}</span>
            </button>
          </div>

          {/* Modal Body with Scroll */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {activeTab === 'overview' ? (
              <>
                {/* 4 KPI Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                      <span>{language === 'RU' ? 'Баланс в эскроу' : 'Escrow Balance'}</span>
                      <DollarSign className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                      $4,820,000
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 mt-1 block">
                      +18.4% {language === 'RU' ? 'за месяц' : 'this month'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                      <span>{language === 'RU' ? 'Активные лоты' : 'Active Lots'}</span>
                      <Package className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">12</div>
                    <span className="text-[10px] font-mono text-cyan-400 mt-1 block">
                      52 {language === 'RU' ? 'в глобальной сети' : 'network wide'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                      <span>{language === 'RU' ? 'Средняя доставка' : 'Avg Delivery'}</span>
                      <Plane className="w-4 h-4 text-violet-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">
                      5.2 {language === 'RU' ? 'Дня' : 'Days'}
                    </div>
                    <span className="text-[10px] font-mono text-violet-400 mt-1 block">
                      Priority Airfreight
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
                      <span>{language === 'RU' ? 'Рейтинг сделок' : 'Deal Rating'}</span>
                      <ShieldCheck className="w-4 h-4 text-pink-400" />
                    </div>
                    <div className="text-xl sm:text-2xl font-bold font-mono text-white">99.9%</div>
                    <span className="text-[10px] font-mono text-pink-400 mt-1 block">
                      100% Lloyds Insured
                    </span>
                  </div>
                </div>

                {/* Banner Call to Action */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-violet-900/40 via-cyan-900/30 to-pink-900/40 border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display">
                      {language === 'RU'
                        ? 'Готовы продать суперкар, партию GPU или недвижимость?'
                        : 'Ready to distribute supercars, GPU batches, or luxury villas?'}
                    </h3>
                    <p className="text-xs text-slate-300 font-mono mt-1 max-w-xl">
                      {language === 'RU'
                        ? 'Размещенный актив сразу появится в глобальном каталоге AURA с автоматическим расчетом таможни и логистики.'
                        : 'Your asset is instantly listed on the AURA Global Catalog with automated customs, freight, and escrow.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('new-listing')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold text-xs font-mono whitespace-nowrap shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:opacity-95 transition-all cursor-pointer"
                  >
                    {language === 'RU' ? '+ Разместить лот' : '+ List New Asset'}
                  </button>
                </div>
              </>
            ) : (
              /* New Listing Form */
              <form onSubmit={handleCreateListing} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Название актива' : 'Asset Title'}
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="e.g. Porsche 911 GT3 RS Weissach / NVIDIA Cluster"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Подзаголовок / Спецификация' : 'Subtitle / Key Highlight'}
                    </label>
                    <input
                      type="text"
                      value={subtitle}
                      onChange={e => setSubtitle(e.target.value)}
                      placeholder="e.g. 525 HP • Carbon Aero • Mint Sealed"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Категория' : 'Category'}
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as CategoryType)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#090D17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    >
                      <option value="gpu">PC Hardware & Silicon</option>
                      <option value="smartphone">Smartphones & Gadgets</option>
                      <option value="car">Luxury Automobiles</option>
                      <option value="materials">Construction Materials</option>
                      <option value="villas">Turnkey Villas & Real Estate</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Цена продажи ($ USD)' : 'Turnkey Price ($ USD)'}
                    </label>
                    <input
                      type="number"
                      required
                      value={priceUsd}
                      onChange={e => setPriceUsd(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Вес груза (кг)' : 'Cargo Weight (kg)'}
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={e => setWeightKg(Number(e.target.value))}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Страна отправления' : 'Origin Country'}
                    </label>
                    <input
                      type="text"
                      value={originCountry}
                      onChange={e => setOriginCountry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Логистический хаб' : 'Origin Hub'}
                    </label>
                    <input
                      type="text"
                      value={originHub}
                      onChange={e => setOriginHub(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      {language === 'RU' ? 'Срок доставки' : 'Delivery Estimate'}
                    </label>
                    <input
                      type="text"
                      value={deliveryDays}
                      onChange={e => setDeliveryDays(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Photo URL & Quick Presets */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {language === 'RU' ? 'Ссылка на фото высокого разрешения' : 'High-Res Photo URL'}
                  </label>
                  <input
                    type="url"
                    required
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400 mb-2"
                  />
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <span>{language === 'RU' ? 'Быстрый выбор пресета:' : 'Quick Presets:'}</span>
                    {samplePhotoPresets.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setImageUrl(p.url);
                          setCategory(p.cat);
                        }}
                        className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 hover:text-white"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    {language === 'RU' ? 'Описание лота' : 'Asset Description'}
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs cursor-pointer"
                  >
                    {language === 'RU' ? 'Отмена' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-bold font-mono text-xs shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:opacity-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {language === 'RU'
                        ? 'Опубликовать актив в каталог AURA'
                        : 'Publish to AURA Global'}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
