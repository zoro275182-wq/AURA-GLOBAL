import React, { useState, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../context/GlobalStateContext';
import {
  Link as LinkIcon,
  Upload,
  Cpu,
  Car,
  Home as HomeIcon,
  Layers,
  Plane,
  Ship,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle
} from 'lucide-react';

export const OrderCalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, formatPrice, t, language } = useGlobalState();
  const assetValueInputId = useId();
  const weightInputId = useId();

  // Left Column: Paste Link & Notes State
  const [pasteUrl, setPasteUrl] = useState('');
  const [itemNotes, setItemNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Right Column: Calculator State
  const [category, setCategory] = useState<'pc' | 'auto' | 'materials' | 'house'>('pc');
  const [origin, setOrigin] = useState<'usa' | 'europe' | 'china' | 'uae'>('usa');
  const [speed, setSpeed] = useState<'air' | 'cargo'>('air');
  const [assetValue, setAssetValue] = useState<number>(3500);
  const [weightKg, setWeightKg] = useState<number>(5);

  // Dynamic Calculation Math
  const getCustomsPercent = () => {
    switch (category) {
      case 'pc': return 0.0;
      case 'auto': return 0.15;
      case 'materials': return 0.06;
      case 'house': return 0.04;
    }
  };

  const getShippingRatePerKg = () => {
    if (speed === 'air') {
      switch (origin) {
        case 'usa': return 18;
        case 'europe': return 14;
        case 'china': return 11;
        case 'uae': return 10;
      }
    } else {
      switch (origin) {
        case 'usa': return 4.5;
        case 'europe': return 3.2;
        case 'china': return 2.1;
        case 'uae': return 2.8;
      }
    }
  };

  const customsDutyPercent = getCustomsPercent();
  const shippingPerKg = getShippingRatePerKg();

  const baseCost = assetValue;
  const shippingFee = Math.max(speed === 'air' ? 45 : 120, weightKg * shippingPerKg);
  const customsFee = baseCost * customsDutyPercent;
  const insuranceFee = baseCost * 0.015;
  const handlingFee = 90;

  const totalTurnkeyPrice = Math.round(baseCost + shippingFee + customsFee + insuranceFee + handlingFee);

  const quickLinks = [
    { label: language === 'RU' ? 'Amazon США RTX 5090' : 'Amazon USA RTX 5090', url: 'https://amazon.com/dp/B0D99RTX5090-FE' },
    { label: language === 'RU' ? 'Mobile.de BMW M4 Competition' : 'Mobile.de BMW M4 Competition', url: 'https://suchen.mobile.de/fahrzeuge/details.html?id=389104' },
    { label: language === 'RU' ? 'Apple Store США iPhone 18' : 'Apple Store Cupertino US', url: 'https://apple.com/shop/buy-iphone/iphone-18-pro' },
    { label: language === 'RU' ? 'Alibaba Фасадное остекление' : 'Alibaba Architectural Facade', url: 'https://alibaba.com/product-detail/curtain-wall-facade' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleLockAndCheckout = () => {
    const categoryLabels = {
      pc: language === 'RU' ? 'Кастомный заказ: ПК / Серверный кремний' : 'Custom PC / Tech Hardware Order',
      auto: language === 'RU' ? 'Кастомный заказ: Автомобиль под ключ' : 'Custom Automobile Turnkey Import',
      materials: language === 'RU' ? 'Кастомный заказ: Стройматериалы под ключ' : 'Turnkey Construction Materials',
      house: language === 'RU' ? 'Кастомный заказ: Архитектурная вилла' : 'Architectural Prefab Villa Order'
    };

    addToCart({
      id: `custom-calc-${Date.now()}`,
      name: pasteUrl ? `${language === 'RU' ? 'Выкуп по ссылке' : 'Custom Order'}: ${pasteUrl.substring(0, 32)}...` : `${categoryLabels[category]} (${origin.toUpperCase()})`,
      categoryLabel: categoryLabels[category],
      priceUsd: totalTurnkeyPrice,
      quantity: 1,
      originHub: `${origin.toUpperCase()} Central Hub`,
      deliveryDays: speed === 'air' ? (language === 'RU' ? '4-7 дней авиафрахт' : '4-7 Days Air Freight') : (language === 'RU' ? '20-30 дней карго' : '20-30 Days Sea/Rail Cargo'),
      customUrl: pasteUrl,
      notes: `${itemNotes || (language === 'RU' ? 'Без пометок' : 'No notes')} | Weight: ${weightKg}kg | Speed: ${speed}`,
      isCustomOrder: true
    });

    navigate('/checkout');
  };

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Page Title */}
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-xs font-mono text-violet-300 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{t.calcTag}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          {t.calcTitle}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 font-light">
          {t.calcSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PASTE ANY LINK OR BLUEPRINT */}
        <div className="lg:col-span-5 rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {t.calcCol1Title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {t.calcCol1Subtitle}
                </p>
              </div>
            </div>

            {/* Quick Demo Links */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                {t.calcQuickLinks}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickLinks.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setPasteUrl(item.url);
                      if (item.label.includes('RTX') || item.label.includes('5090')) {
                        setCategory('pc');
                        setAssetValue(2400);
                        setWeightKg(3);
                      } else if (item.label.includes('BMW') || item.label.includes('Competition')) {
                        setCategory('auto');
                        setAssetValue(148000);
                        setWeightKg(1725);
                      } else if (item.label.includes('iPhone')) {
                        setCategory('pc');
                        setAssetValue(1999);
                        setWeightKg(1);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-cyan-300 hover:text-white transition-all text-left truncate max-w-[200px]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Link Input Field */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                {t.calcUrlLabel}
              </label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="https://amazon.com/... or https://mobile.de/..."
                  value={pasteUrl}
                  onChange={e => setPasteUrl(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
                />
              </div>
            </div>

            {/* Blueprint PDF / CAD Upload */}
            <div className="mb-5">
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                {t.calcUploadLabel}
              </label>
              <label className="border-2 border-dashed border-white/15 hover:border-cyan-500/50 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#070A12]/50 text-center">
                <Upload className="w-6 h-6 text-cyan-400 mb-2" />
                <span className="text-xs font-mono text-slate-300">
                  {uploadedFile ? uploadedFile : t.calcUploadHint}
                </span>
                <span className="text-[10px] font-mono text-slate-500 mt-1">
                  {t.calcUploadSize}
                </span>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.dwg,.cad,.zip,.png,.jpg"
                />
              </label>
              {uploadedFile && (
                <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{language === 'RU' ? 'Чертеж успешно прикреплен к паспорту заказа' : 'Blueprint successfully attached to order passport'}</span>
                </div>
              )}
            </div>

            {/* Item Custom Notes */}
            <div className="mb-4">
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                {t.calcNotesLabel}
              </label>
              <textarea
                rows={3}
                placeholder={t.calcNotesPlaceholder}
                value={itemNotes}
                onChange={e => setItemNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-xs font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{t.calcVideoNotice}</span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3-STEP IRIDESCENT CALCULATOR */}
        <div className="lg:col-span-7 rounded-3xl bg-[#0B0F1A]/85 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display">
                    {t.calcCol2Title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {t.calcCol2Subtitle}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                {language === 'RU' ? 'ТАРИФЫ ОНЛАЙН' : 'LIVE TARIFFS'}
              </span>
            </div>

            {/* STEP 1: SELECT CATEGORY */}
            <div className="mb-6">
              <label className="block text-xs font-mono uppercase text-slate-300 mb-2.5">
                {t.calcStep1Label}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'pc' as const, label: language === 'RU' ? 'ПК / Кремний' : 'PC Hardware', icon: Cpu },
                  { key: 'auto' as const, label: language === 'RU' ? 'Суперкар' : 'Automobile', icon: Car },
                  { key: 'materials' as const, label: language === 'RU' ? 'Материалы' : 'Materials', icon: Layers },
                  { key: 'house' as const, label: language === 'RU' ? 'Вилла под ключ' : 'Turnkey Villa', icon: HomeIcon }
                ].map(cat => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setCategory(cat.key)}
                      className={`p-3 rounded-2xl border text-xs font-mono flex flex-col items-center justify-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-gradient-to-b from-cyan-500/20 to-violet-600/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="font-semibold text-center">{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: ORIGIN & SPEED */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Origin Hub */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  {t.calcStep2Origin}
                </label>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                  {[
                    { key: 'usa' as const, label: '🇺🇸 USA', sub: 'SFO / NYC' },
                    { key: 'europe' as const, label: '🇪🇺 Europe', sub: 'FRA / LHR' },
                    { key: 'china' as const, label: '🇨🇳 China', sub: 'SZX / HKG' },
                    { key: 'uae' as const, label: '🇦🇪 UAE', sub: 'DXB Freezone' }
                  ].map(o => (
                    <button
                      key={o.key}
                      onClick={() => setOrigin(o.key)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        origin === o.key
                          ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div>{o.label}</div>
                      <div className="text-[10px] text-slate-500">{o.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Transit Speed */}
              <div>
                <label className="block text-xs font-mono uppercase text-slate-300 mb-2">
                  {t.calcStep2Speed}
                </label>
                <div className="flex flex-col gap-2 font-mono text-xs">
                  <button
                    onClick={() => setSpeed('air')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      speed === 'air'
                        ? 'bg-violet-500/20 border-violet-400 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Plane className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div>{t.calcSpeedAir}</div>
                        <div className="text-[10px] text-cyan-300">{t.calcSpeedAirDays}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">${shippingPerKg}/kg</span>
                  </button>

                  <button
                    onClick={() => setSpeed('cargo')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      speed === 'cargo'
                        ? 'bg-violet-500/20 border-violet-400 text-white font-bold'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Ship className="w-4 h-4 text-violet-400" />
                      <div>
                        <div>{t.calcSpeedCargo}</div>
                        <div className="text-[10px] text-violet-300">{t.calcSpeedCargoDays}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-400">${shippingPerKg}/kg</span>
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 3: SLIDERS FOR ASSET VALUE & WEIGHT */}
            <div className="space-y-5 mb-8 p-4 rounded-2xl bg-[#070A12]/80 border border-white/10">
              {/* Asset Value Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <label htmlFor={assetValueInputId} className="text-slate-300 cursor-pointer">{t.calcStep3Value}</label>
                  <span className="text-cyan-300 font-bold text-base">
                    ${assetValue.toLocaleString('en-US')} USD
                  </span>
                </div>
                <input
                  id={assetValueInputId}
                  aria-label="Estimated Asset Retail Value"
                  type="range"
                  min={200}
                  max={500000}
                  step={100}
                  value={assetValue}
                  onChange={e => setAssetValue(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>$200</span>
                  <span>$100,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <label htmlFor={weightInputId} className="text-slate-300 cursor-pointer">{t.calcStep3Weight}</label>
                  <span className="text-violet-300 font-bold text-base">
                    {weightKg.toLocaleString('en-US')} {language === 'RU' ? 'кг' : 'kg'}
                  </span>
                </div>
                <input
                  id={weightInputId}
                  aria-label="Total Asset Weight in kilograms"
                  type="range"
                  min={1}
                  max={20000}
                  step={1}
                  value={weightKg}
                  onChange={e => setWeightKg(Number(e.target.value))}
                  className="w-full h-2 rounded-lg bg-slate-800 appearance-none cursor-pointer accent-violet-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>1 {language === 'RU' ? 'кг' : 'kg'}</span>
                  <span>5,000 {language === 'RU' ? 'кг' : 'kg'}</span>
                  <span>20,000 {language === 'RU' ? 'кг' : 'kg'}</span>
                </div>
              </div>
            </div>

            {/* LIVE BREAKDOWN & TURNKEY TOTAL */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-[#131B2E] to-[#0A0E18] border border-cyan-500/30 mb-6">
              <div className="space-y-2 text-xs font-mono pb-4 border-b border-white/10">
                <div className="flex justify-between text-slate-300">
                  <span>{t.calcBaseCost}</span>
                  <span>{formatPrice(baseCost)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>
                    {t.calcShippingCost} ({weightKg} {language === 'RU' ? 'кг' : 'kg'} via {speed === 'air' ? 'Air' : 'Cargo'})
                  </span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t.calcCustomsCost} ({customsDutyPercent * 100}%)</span>
                  <span>{formatPrice(customsFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t.calcInsuranceCost} (1.5%)</span>
                  <span>{formatPrice(insuranceFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{t.calcHandlingCost}</span>
                  <span>{formatPrice(handlingFee)}</span>
                </div>
              </div>

              <div className="pt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
                    {t.calcTotalTurnkey}
                  </span>
                  <span className="text-3xl font-black text-white font-mono tracking-tight">
                    {formatPrice(totalTurnkeyPrice)}
                  </span>
                </div>
                <div className="text-right text-[10px] font-mono text-emerald-400">
                  {t.calcZeroHiddenFees}
                </div>
              </div>
            </div>
          </div>

          {/* LOCK PRICE & CHECKOUT CTA */}
          <button
            onClick={handleLockAndCheckout}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-bold font-mono text-sm tracking-wide shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>{t.calcLockBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
