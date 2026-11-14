import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useGlobalState } from '../context/GlobalStateContext';
import { Card3D } from '../components/3d/Card3D';
import { TrackingOrder } from '../types';
import {
  CreditCard,
  QrCode,
  Building2,
  Trash2,
  Plus,
  Minus,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Lock,
  Compass
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    cartTotalUsd,
    removeFromCart,
    updateQuantity,
    clearCart,
    formatPrice,
    addNewOrder,
    t,
    language
  } = useGlobalState();

  // Payment method tab
  const [paymentTab, setPaymentTab] = useState<'card' | 'crypto' | 'wire'>('card');
  const [cardBrand, setCardBrand] = useState<'VISA' | 'MASTERCARD' | 'UZCARD' | 'HUMO'>('VISA');

  // Interactive Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);

  // Buyer Info
  const [fullName, setFullName] = useState(language === 'RU' ? 'Александр Вэнс' : 'Alexander Vance');
  const [email, setEmail] = useState('vance.private@aura-vip.com');
  const [phone, setPhone] = useState('+998 (90) 890-4421');
  const [address, setAddress] = useState(language === 'RU' ? 'ул. Амира Темура, 107, Резиденция 4' : '742 Evergreen Diplomatic Enclave');
  const [city, setCity] = useState(language === 'RU' ? 'Ташкент' : 'Tashkent');
  const [country, setCountry] = useState(language === 'RU' ? 'Узбекистан' : 'Uzbekistan');

  // Success Modal
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [generatedTrackingId, setGeneratedTrackingId] = useState('');

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(raw);
  };

  // Format Expiry MM/YY
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setExpiry(raw);
  };

  // Launch Payment
  const handlePayAndLaunch = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert(language === 'RU' ? 'Ваш сейф заказа пуст.' : 'Your cart is empty. Add an asset first.');
      return;
    }

    // Celebratory Confetti Wave
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#8B5CF6', '#EC4899', '#F59E0B']
    });

    // Generate real unique tracking number
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newTrackingId = `AURA-VIP-${randomDigits}`;
    setGeneratedTrackingId(newTrackingId);

    // Build new tracking order
    const primaryItem = cart[0];
    const newOrder: TrackingOrder = {
      id: newTrackingId,
      assetName: primaryItem.name,
      category: primaryItem.categoryLabel,
      originCity: primaryItem.originHub || (language === 'RU' ? 'Кремниевая Долина (SFO)' : 'Silicon Valley (SFO)'),
      originCoords: [37.7749, -122.4194],
      customsHub: language === 'RU' ? 'Франкфурт Авиа-Хаб (FRA)' : 'Frankfurt Air Hub (FRA)',
      customsCoords: [50.1109, 8.6821],
      destinationCity: `${city} (${country})`,
      destinationCoords: [41.2995, 69.2401],
      statusText: language === 'RU' ? 'Эскроу подтвержден — Предрейсовый осмотр' : 'Escrow Confirmed — Pre-Dispatch Transit Inspection',
      percentComplete: 15,
      eta: language === 'RU' ? 'Через 4-6 дней авиафрахт' : 'In 5-7 Days Priority Air',
      carrier: 'Lufthansa / Emirates Cargo Sovereign Transit',
      flightCode: `AURA-VIP-${randomDigits}`,
      temperature: '+20.1°C (Pressurized Climate Vault)',
      pressure: '1014 hPa',
      securitySeal: `CRYPTOGRAPHIC-LLOYDS-SEAL #${randomDigits}-ALPHA`,
      totalTurnkeyUsd: cartTotalUsd,
      steps: [
        {
          title: language === 'RU' ? 'Эскроу-депозит заблокирован и подтвержден' : 'Escrow Payment Locked & Verified',
          location: language === 'RU' ? 'Сейф AURA Custody' : 'AURA Custody Vault',
          timestamp: language === 'RU' ? 'Только что' : 'Just Now',
          completed: true,
          current: false,
          details: language === 'RU'
            ? `Сумма под ключ ${formatPrice(cartTotalUsd)} заблокирована в мультисиг-эскроу под гарантией Lloyds.`
            : `Full turnkey sum of ${formatPrice(cartTotalUsd)} placed in multi-sig custody under Lloyds underwriting.`
        },
        {
          title: language === 'RU' ? 'Подготовка актива и 4K видеопроверка' : 'Physical Asset Staging & 4K Video Benchmark',
          location: primaryItem.originHub || 'SFO Air Logistics City',
          timestamp: language === 'RU' ? 'Запланировано на завтра, 08:00' : 'Scheduled for Tomorrow, 08:00',
          completed: false,
          current: true,
          details: language === 'RU'
            ? 'Серийные номера и стресс-тесты будут загружены в личный кабинет телеметрии.'
            : 'Serial numbers and diagnostic test will be streamed to client telemetry dashboard.'
        },
        {
          title: language === 'RU' ? 'Экспортная таможня и дипломатический авиапаллет' : 'Export Customs Clearance & Diplomatic Air Pallet',
          location: language === 'RU' ? 'Международный Авиахаб' : 'International Air Hub',
          timestamp: language === 'RU' ? 'Ожидание погрузки' : 'Pending Handover',
          completed: false,
          current: false,
          details: language === 'RU'
            ? 'Классификация ТН ВЭД и выпуск дипломатической авианакладной.'
            : 'HS Code classification and export airway bill issuance.'
        },
        {
          title: language === 'RU' ? 'Вручение в белых перчатках у вашей двери' : 'White-Glove Armored Doorstep Handover',
          location: address,
          timestamp: language === 'RU' ? 'Финальный этап' : 'Final Milestone',
          completed: false,
          current: false,
          details: language === 'RU'
            ? `Прямая доставка клиенту ${fullName} с актом приема-передачи и ключами.`
            : `Direct delivery to ${fullName} with title transfer & unboxing ceremony.`
        }
      ]
    };

    addNewOrder(newOrder);
    clearCart();
    setIsSuccessModalOpen(true);
  };

  const handleGoToTracking = () => {
    navigate('/tracking');
  };

  return (
    <div className="relative pt-28 sm:pt-36 pb-24 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      
      {/* Header */}
      <div className="max-w-3xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-xs font-mono text-pink-300 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.checkoutTag}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          {t.checkoutTitle}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-300 font-light">
          {t.checkoutSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ORDER SUMMARY & BUYER DETAILS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Order Summary Box */}
          <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
              <h3 className="text-base font-bold text-white font-display">
                {t.checkoutSummaryTitle} ({cart.length})
              </h3>
              <span className="text-xs font-mono text-cyan-300">
                {t.showroomInsured}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-10 text-center font-mono text-slate-400">
                <p>{t.checkoutCartEmpty}</p>
                <button
                  onClick={() => navigate('/catalog')}
                  className="mt-4 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-bold"
                >
                  {t.checkoutExploreBtn}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover bg-slate-800 shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-cyan-900 to-violet-900 flex items-center justify-center text-xs font-mono text-cyan-300 shrink-0">
                          {language === 'RU' ? 'КАСТОМ' : 'CUSTOM'}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-violet-400 uppercase">
                          {item.categoryLabel}
                        </div>
                        <h4 className="text-xs font-bold text-white truncate font-display">
                          {item.name}
                        </h4>
                        <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">
                          {formatPrice(item.priceUsd)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-white font-bold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-500 hover:text-pink-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Subtotals & Total */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>{t.checkoutEscrowFreeAir}</span>
                    <span className="text-emerald-400">{language === 'RU' ? 'ВКЛЮЧЕНО' : 'INCLUDED (FREE)'}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>{t.checkoutCustomsPrepaid}</span>
                    <span className="text-emerald-400">{language === 'RU' ? '100% ОПЛАЧЕНО' : '100% PRE-PAID'}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 text-white">
                    <span className="text-sm font-bold">{t.checkoutTotalTurnkey}</span>
                    <span className="text-2xl font-black text-cyan-300">
                      {formatPrice(cartTotalUsd)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Buyer Details Inputs */}
          <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white font-display mb-2">
              {t.checkoutBuyerTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  {t.checkoutFullName}
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    setCardHolder(e.target.value.toUpperCase());
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  {t.checkoutEmail}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  {t.checkoutPhone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                  {t.checkoutCountry}
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                {t.checkoutAddress}
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#070A12] border border-white/15 text-xs text-white font-mono focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE 3D FLIPPING CARD & PAYMENT */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Payment Method Selector Tabs */}
          <div className="p-1.5 rounded-2xl bg-[#0B0F1A]/90 border border-white/10 flex items-center gap-1 font-mono text-xs">
            <button
              onClick={() => setPaymentTab('card')}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                paymentTab === 'card'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{t.checkoutTabCard}</span>
            </button>

            <button
              onClick={() => setPaymentTab('crypto')}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                paymentTab === 'crypto'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>{t.checkoutTabCrypto}</span>
            </button>

            <button
              onClick={() => setPaymentTab('wire')}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all ${
                paymentTab === 'wire'
                  ? 'bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t.checkoutTabWire}</span>
            </button>
          </div>

          {/* BANK CARD TAB CONTENT (WITH 3D CARD) */}
          {paymentTab === 'card' && (
            <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl">
              
              {/* INTERACTIVE 3D FLIPPING CARD COMPONENT */}
              <div className="mb-6">
                <Card3D
                  cardNumber={cardNumber}
                  cardHolder={cardHolder || fullName}
                  expiry={expiry}
                  cvv={cvv}
                  isFlipped={isFlipped}
                  brand={cardBrand}
                />
                <p className="text-center text-[10px] font-mono text-slate-500 mt-2">
                  {t.checkoutTiltNotice}
                </p>
              </div>

              {/* Card Brand Selector Pills */}
              <div className="flex items-center justify-center gap-2 mb-5">
                {(['VISA', 'MASTERCARD', 'UZCARD', 'HUMO'] as const).map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setCardBrand(b)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                      cardBrand === b
                        ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>

              {/* Form Input Fields */}
              <form onSubmit={handlePayAndLaunch} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                    {t.checkoutCardNumber}
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="4892 0192 8491 9012"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    onFocus={() => setIsFlipped(false)}
                    className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/15 text-sm text-white font-mono tracking-widest focus:border-cyan-400 focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
                      {t.checkoutCardExpiry}
                    </label>
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="MM/YY (12/28)"
                      value={expiry}
                      onChange={handleExpiryChange}
                      onFocus={() => setIsFlipped(false)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-white/15 text-sm text-white font-mono tracking-wider focus:border-cyan-400 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1 flex items-center justify-between">
                      <span>{t.checkoutCardCvv}</span>
                      <span className="text-[9px] text-cyan-400">{t.checkoutCardFlipNotice}</span>
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="892"
                      value={cvv}
                      onChange={e => setCvv(e.target.value.slice(0, 4))}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      className="w-full px-4 py-3 rounded-xl bg-[#070A12] border border-cyan-500/40 text-sm text-white font-mono tracking-widest focus:border-cyan-400 focus:outline-none shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-bold font-mono text-sm tracking-wide shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>{t.checkoutPayBtn} ({formatPrice(cartTotalUsd)})</span>
                </button>
              </form>
            </div>
          )}

          {/* USDT CRYPTO ESCROW TAB */}
          {paymentTab === 'crypto' && (
            <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl font-mono space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">{t.checkoutCryptoTitle}</span>
                <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                  TRC-20 & ERC-20
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#070A12] border border-white/10 text-center">
                <div className="w-40 h-40 mx-auto rounded-xl bg-white p-2.5 flex items-center justify-center mb-3">
                  <div className="w-full h-full bg-slate-900 rounded grid grid-cols-6 gap-1 p-2">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-sm ${
                          (i % 2 === 0 || i % 5 === 0) ? 'bg-cyan-400' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 mb-1">{language === 'RU' ? 'Официальный мультисиг-эскроу сейф AURA:' : 'AURA Official Multi-Sig Escrow Vault:'}</div>
                <div className="text-xs text-cyan-300 font-bold select-all bg-black/60 p-2 rounded-lg border border-cyan-500/30 break-all">
                  0x71CA9942F80B917Ea8b0c4D917Fa9C21AURA
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div>{t.turnkeyPrice}: <strong className="text-white">{cartTotalUsd.toLocaleString()} USDT</strong></div>
                <div className="text-[11px] text-slate-400">{t.checkoutCryptoDesc}</div>
              </div>

              <button
                type="button"
                onClick={handlePayAndLaunch}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold text-sm tracking-wide shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>{language === 'RU' ? 'Подтвердить крипто-депозит в эскроу' : 'Confirm Crypto Escrow Deposit'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* VIP WIRE TRANSFER TAB */}
          {paymentTab === 'wire' && (
            <div className="rounded-3xl bg-[#0B0F1A]/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-7 shadow-2xl font-mono space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white">{t.checkoutWireTitle}</span>
                <span className="text-[10px] text-violet-400 px-2 py-0.5 rounded bg-violet-950/40 border border-violet-500/30">
                  TIER 1 CUSTODY
                </span>
              </div>

              <div className="space-y-3 p-4 rounded-2xl bg-[#070A12] border border-white/10 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'RU' ? 'Бенефициар:' : 'Beneficiary:'}</span>
                  <span className="text-white font-bold">AURA GLOBAL PRIVATE CLIENTS AG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">{language === 'RU' ? 'Банк-кастодиан:' : 'Custody Bank:'}</span>
                  <span className="text-white">UBS Switzerland / Frankfurt</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">IBAN:</span>
                  <span className="text-cyan-300 select-all font-bold">CH93 0024 0240 8920 1820 9</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">SWIFT / BIC:</span>
                  <span className="text-violet-300 font-bold">UBSWCHZH80A</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePayAndLaunch}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold text-sm tracking-wide shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span>{t.checkoutWireBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CELEBRATORY ORDER SUCCESS MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="relative max-w-lg w-full rounded-3xl bg-[#0B0F1A] border border-cyan-500/40 p-8 shadow-[0_0_80px_rgba(6,182,212,0.4)] text-center font-mono">
            
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 mx-auto flex items-center justify-center text-black mb-4 shadow-[0_0_30px_rgba(6,182,212,0.6)]">
              <CheckCircle className="w-9 h-9" />
            </div>

            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1">
              {t.checkoutSuccessTag}
            </span>
            <h2 className="text-2xl font-bold text-white font-display">
              {t.checkoutSuccessTitle}
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              {t.checkoutSuccessDesc}
            </p>

            {/* Generated Tracking Number Badge */}
            <div className="my-6 p-4 rounded-2xl bg-[#060810] border border-cyan-500/30">
              <span className="text-[10px] text-slate-400 block uppercase">
                {t.checkoutTrackingIdLabel}
              </span>
              <span className="text-2xl font-black text-cyan-300 tracking-wider">
                {generatedTrackingId}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleGoToTracking}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-violet-600 to-pink-500 text-white font-bold text-xs tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
              >
                <Compass className="w-4 h-4" />
                <span>{t.checkoutTrackBtn}</span>
              </button>
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs hover:text-white"
              >
                {t.checkoutCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
