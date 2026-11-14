import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import { CategoryType, AssetItem } from '../types';
import {
  Search,
  Box,
  ShoppingCart,
  Eye,
  Check,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedShowroomModel, addToCart, formatPrice, t, language, catalogItems } = useGlobalState();
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories: { key: CategoryType; label: string }[] = [
    { key: 'all', label: t.catAll },
    { key: 'gpu', label: t.catGpu },
    { key: 'smartphone', label: t.catPhone },
    { key: 'car', label: t.catCar },
    { key: 'materials', label: t.catMaterials },
    { key: 'villas', label: t.catVillas }
  ];

  const filteredItems = catalogItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.originCountry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleInspectIn3D = (item: AssetItem) => {
    if (item.modelKey) {
      setSelectedShowroomModel(item.modelKey);
      navigate('/showroom');
    }
  };

  const handleAddToCart = (item: AssetItem) => {
    addToCart({
      id: `catalog-${item.id}-${Date.now()}`,
      assetId: item.id,
      name: item.name,
      categoryLabel: item.categoryLabel,
      priceUsd: item.priceUsd,
      quantity: 1,
      image: item.image,
      originHub: item.originHub,
      deliveryDays: item.deliveryDays
    });

    setAddedIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header & Subtitle */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.catalogTag}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          {t.catalogTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
          {t.catalogSubtitle}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3.5 py-2 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat.key
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t.catalogSearchPlaceholder}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full bg-[#0B0F1A]/90 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Grid of Catalog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {filteredItems.map(item => {
          const isAdded = addedIds[item.id];
          return (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-xl border border-white/10 overflow-hidden flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)] hover:-translate-y-1"
            >
              {/* Card Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A] via-transparent to-black/40" />

                {/* Origin Hub Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-cyan-300 flex items-center gap-1.5 shadow-md">
                  <span>{item.originFlag}</span>
                  <span>{item.originCountry}</span>
                </div>

                {/* Delivery Speed Pill */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  {item.deliveryDays}
                </div>

                {/* 3D Model Availability Tag */}
                {item.modelKey && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-violet-950/80 border border-violet-500/40 text-[10px] font-mono text-violet-300 flex items-center gap-1">
                    <Box className="w-3 h-3 text-cyan-400" />
                    <span>{language === 'RU' ? '3D Модель готова' : '3D Live Model Ready'}</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-violet-400 mb-1">
                    {item.categoryLabel}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors font-display line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-mono line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Spec Quick Chips */}
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/5">
                    {item.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="text-[11px] font-mono">
                        <span className="text-slate-500 block uppercase text-[9px]">
                          {spec.label}
                        </span>
                        <span className="text-slate-200 font-semibold truncate block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        {t.turnkeyPrice}
                      </span>
                      <span className="text-2xl font-black text-white font-mono tracking-tight">
                        {formatPrice(item.priceUsd)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{language === 'RU' ? 'Эскроу 100%' : 'Full Escrow'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Add to Order Cart */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-cyan-400/40'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>{t.addedToOrderBtn}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>{t.addToOrderBtn}</span>
                        </>
                      )}
                    </button>

                    {/* Inspect in 3D Showroom */}
                    {item.modelKey && (
                      <button
                        onClick={() => handleInspectIn3D(item)}
                        className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-violet-600/20 hover:from-cyan-500/30 hover:to-violet-600/30 border border-cyan-400/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        title="Open interactive 3D model in Showroom"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t.inspect3dBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
