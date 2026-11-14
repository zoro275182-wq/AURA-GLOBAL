export type Language = 'EN' | 'RU';

export interface Translations {
  // Navigation
  navHome: string;
  navShowroom: string;
  navCatalog: string;
  navOrder: string;
  navTracking: string;
  navCheckout: string;
  navLive3D: string;
  navVault: string;
  protocolStatus: string;
  escrowStatus: string;

  // Home Page
  heroTag: string;
  heroTitle1: string;
  heroTitleGradient: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroBtnShowroom: string;
  heroBtnCalculator: string;
  heroSafeDeal: string;
  heroAirSpeed: string;
  heroBiometric: string;
  pillarsTag: string;
  pillarsTitle: string;
  pillarsSubtitle: string;
  pillar1Title: string;
  pillar1Subtitle: string;
  pillar1Desc: string;
  pillar1Btn: string;
  pillar2Title: string;
  pillar2Subtitle: string;
  pillar2Desc: string;
  pillar2Btn: string;
  pillar3Title: string;
  pillar3Subtitle: string;
  pillar3Desc: string;
  pillar3Btn: string;
  pillar4Title: string;
  pillar4Subtitle: string;
  pillar4Desc: string;
  pillar4Btn: string;
  lifecycleTag: string;
  lifecycleTitle: string;
  lifecycleSubtitle: string;
  step1Num: string;
  step1Title: string;
  step1Desc: string;
  step2Num: string;
  step2Title: string;
  step2Desc: string;
  step3Num: string;
  step3Title: string;
  step3Desc: string;
  step4Num: string;
  step4Title: string;
  step4Desc: string;
  featuredTag: string;
  featuredTitle: string;
  viewCatalogBtn: string;
  turnkeyPrice: string;
  inspect3dBtn: string;

  // 3D Showroom
  showroomHintDrag: string;
  showroomHintZoom: string;
  showroomEngine: string;
  showroomHologramTitle: string;
  showroomBooting: string;
  showroomOriginHub: string;
  showroomTransit: string;
  showroomBenchmarks: string;
  showroomReplayGlitch: string;
  showroomXray: string;
  showroomXrayOn: string;
  showroomOrderBtn: string;
  showroomInsured: string;

  // Catalog
  catalogTag: string;
  catalogTitle: string;
  catalogSubtitle: string;
  catAll: string;
  catGpu: string;
  catPhone: string;
  catCar: string;
  catMaterials: string;
  catVillas: string;
  catalogSearchPlaceholder: string;
  addToOrderBtn: string;
  addedToOrderBtn: string;

  // Calculator
  calcTag: string;
  calcTitle: string;
  calcSubtitle: string;
  calcCol1Title: string;
  calcCol1Subtitle: string;
  calcQuickLinks: string;
  calcUrlLabel: string;
  calcUploadLabel: string;
  calcUploadHint: string;
  calcUploadSize: string;
  calcNotesLabel: string;
  calcNotesPlaceholder: string;
  calcVideoNotice: string;
  calcCol2Title: string;
  calcCol2Subtitle: string;
  calcStep1Label: string;
  calcStep2Origin: string;
  calcStep2Speed: string;
  calcSpeedAir: string;
  calcSpeedAirDays: string;
  calcSpeedCargo: string;
  calcSpeedCargoDays: string;
  calcStep3Value: string;
  calcStep3Weight: string;
  calcBaseCost: string;
  calcShippingCost: string;
  calcCustomsCost: string;
  calcInsuranceCost: string;
  calcHandlingCost: string;
  calcTotalTurnkey: string;
  calcZeroHiddenFees: string;
  calcLockBtn: string;

  // Live Tracking
  trackingTag: string;
  trackingTitle: string;
  trackingSubtitle: string;
  trackingSearchPlaceholder: string;
  trackingLocateBtn: string;
  trackingActiveVaults: string;
  trackingPassportTitle: string;
  trackingTemp: string;
  trackingPressure: string;
  trackingFlight: string;
  trackingEta: string;
  trackingSeal: string;
  trackingMilestoneTitle: string;

  // Checkout
  checkoutTag: string;
  checkoutTitle: string;
  checkoutSubtitle: string;
  checkoutSummaryTitle: string;
  checkoutCartEmpty: string;
  checkoutExploreBtn: string;
  checkoutEscrowFreeAir: string;
  checkoutCustomsPrepaid: string;
  checkoutTotalTurnkey: string;
  checkoutBuyerTitle: string;
  checkoutFullName: string;
  checkoutEmail: string;
  checkoutPhone: string;
  checkoutCountry: string;
  checkoutAddress: string;
  checkoutTabCard: string;
  checkoutTabCrypto: string;
  checkoutTabWire: string;
  checkoutCardNumber: string;
  checkoutCardExpiry: string;
  checkoutCardCvv: string;
  checkoutCardFlipNotice: string;
  checkoutTiltNotice: string;
  checkoutPayBtn: string;
  checkoutCryptoTitle: string;
  checkoutCryptoDesc: string;
  checkoutWireTitle: string;
  checkoutWireBtn: string;
  checkoutSuccessTag: string;
  checkoutSuccessTitle: string;
  checkoutSuccessDesc: string;
  checkoutTrackingIdLabel: string;
  checkoutTrackBtn: string;
  checkoutCloseBtn: string;

  // Footer
  footerDesc: string;
  footerUnderwritten: string;
  footerPortals: string;
  footerTerminals: string;
  footerCopyright: string;
  footerSecurity: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  EN: {
    // Nav
    navHome: 'Home',
    navShowroom: '3D Showroom',
    navCatalog: 'Catalog',
    navOrder: 'Order & Calculator',
    navTracking: 'Live Tracking',
    navCheckout: 'Checkout',
    navLive3D: '3D LIVE',
    navVault: 'VAULT',
    protocolStatus: 'AURA 2.0 PROTOCOL • DIPLOMATIC CARGO ESCORT',
    escrowStatus: '100% Escrow & Lloyds Underwritten',

    // Home
    heroTag: 'AURA 2.0 PROTOCOL • DIPLOMATIC CARGO ESCORT',
    heroTitle1: "The World’s Most Desired Assets.",
    heroTitleGradient: 'Bought, Built & Delivered',
    heroTitle2: 'to Your Door.',
    heroSubtitle: 'An elite sovereign acquisition ecosystem for unreleased PC silicon, exotic supercars, luxury building materials, and turnkey architectural villas.',
    heroBtnShowroom: 'Launch 3D Showroom',
    heroBtnCalculator: 'Calculate Delivery by Link',
    heroSafeDeal: '100% Escrow Safe-Deal',
    heroAirSpeed: 'Express Air Cargo (4-7 Days)',
    heroBiometric: 'Biometric Video Verification',
    pillarsTag: 'SOVEREIGN SECTORS',
    pillarsTitle: 'The Four Acquisition Pillars',
    pillarsSubtitle: 'Every category backed by dedicated overseas sourcing teams and customs clearance brokers.',
    pillar1Title: 'Flagship PC Hardware & Silicon',
    pillar1Subtitle: 'Blackwell RTX 5090, Threadripper PRO, Enterprise Clusters',
    pillar1Desc: 'Direct dispatch from Silicon Valley & Taiwan tech hubs. Pre-tested, liquid-metal verified, and duty-exempt insured airfreight in under 7 days.',
    pillar1Btn: 'Inspect RTX 5090 in 3D',
    pillar2Title: 'Luxury & Exotic Automobiles',
    pillar2Subtitle: 'BMW M Performance, Lamborghini Gallardo, Ferrari, Bentley',
    pillar2Desc: 'Exclusive allocations from Munich, Sant\'Agata Bolognese & Dubai. Full manufacturer provenance, XPEL protection film, and climate-controlled enclosed air transit.',
    pillar2Btn: 'Inspect BMW M4 in 3D',
    pillar3Title: 'Turnkey Home Construction & Materials',
    pillar3Subtitle: 'Architectural Smart Villas, Italian Marble, German Glazing',
    pillar3Desc: 'Prefabricated luxury architectural villas delivered directly to your land plot. Complete with Schüco triple glazing, Tesla solar roofs, and master masonry.',
    pillar3Btn: 'Inspect 450m² Villa in 3D',
    pillar4Title: 'Global Real Estate & Heavy Assets',
    pillar4Subtitle: 'Cross-Border Estates, Commercial Silicon & High-Value Machinery',
    pillar4Desc: 'Full-service escrow acquisition with international title guarantees, biometric notary verification, and white-glove turnkey keys handover.',
    pillar4Btn: 'Browse All Assets',
    lifecycleTag: 'TRANSPARENT LIFECYCLE',
    lifecycleTitle: 'Turnkey Delivery in 4 Clean Stages',
    lifecycleSubtitle: 'Zero surprises, full escrow custody, and end-to-end legal clearance.',
    step1Num: '01',
    step1Title: 'Paste Link or Request Asset',
    step1Desc: 'Submit any product URL from Apple, Mobile.de, Amazon, Copart, or upload your villa blueprint.',
    step2Num: '02',
    step2Title: 'Engineer 4K Video Check',
    step2Desc: 'Our licensed engineers physically verify serials, run diagnostics, and send you 4K benchmark verification.',
    step3Num: '03',
    step3Title: 'Diplomatic Air & Customs Transit',
    step3Desc: 'Pre-cleared green lane customs with 100% Lloyds of London escrow insurance and live satellite GPS tracking.',
    step4Num: '04',
    step4Title: 'Armored Doorstep Handover',
    step4Desc: 'White-glove unboxing and key handover at your residence with full legal title documentation.',
    featuredTag: 'IMMEDIATE ESCROW ALLOCATION',
    featuredTitle: 'Popular Sourced Assets',
    viewCatalogBtn: 'View Full 2D Catalog',
    turnkeyPrice: 'Turnkey Price',
    inspect3dBtn: '3D Inspect',

    // Showroom
    showroomHintDrag: 'Drag to Rotate 360°',
    showroomHintZoom: 'Pinch / Scroll to Zoom',
    showroomEngine: 'Three.js WebGL 2.0 Physical Studio',
    showroomHologramTitle: 'HOLOGRAPHIC SPECIFICATION LETTER',
    showroomBooting: 'BOOTING HOLOGRAM // 0.65s',
    showroomOriginHub: 'Origin Hub',
    showroomTransit: 'Transit Priority',
    showroomBenchmarks: 'Verified Technical Benchmarks',
    showroomReplayGlitch: 'Replay Glitch Scan',
    showroomXray: 'X-Ray Wireframe',
    showroomXrayOn: 'X-Ray ON',
    showroomOrderBtn: 'Order Turnkey Asset',
    showroomInsured: '100% Lloyds Insured',

    // Catalog
    catalogTag: 'FAST 2D CATALOG // VERIFIED INVENTORY',
    catalogTitle: 'Curated International Asset Registry',
    catalogSubtitle: 'Every item is physically verified at our international sorting hubs, pre-cleared for export, and delivered turnkey with full escrow protection.',
    catAll: 'All Assets',
    catGpu: 'GPUs & CPUs',
    catPhone: 'Smartphones',
    catCar: 'Luxury Cars',
    catMaterials: 'Building Materials',
    catVillas: 'Turnkey Villas',
    catalogSearchPlaceholder: 'Search silicon, vehicle, villa...',
    addToOrderBtn: 'Add to Order',
    addedToOrderBtn: 'Added to Vault',

    // Calculator
    calcTag: 'ORDER BY LINK & ALL-INCLUSIVE CALCULATOR',
    calcTitle: 'Calculate Any Item or Blueprint Turnkey',
    calcSubtitle: 'Paste any external retail or auction link, adjust your origin and weight parameters, and receive a binding, zero-surprise turnkey price with 100% escrow protection.',
    calcCol1Title: '1. Paste Link or Blueprint',
    calcCol1Subtitle: 'Any global marketplace or PDF drawing',
    calcQuickLinks: 'Quick Test Links:',
    calcUrlLabel: 'Item URL / Auction Listing',
    calcUploadLabel: 'Or Upload Architectural CAD / PDF Blueprint',
    calcUploadHint: 'Click to upload .PDF, .DWG, .CAD, .ZIP',
    calcUploadSize: 'Maximum file size 150 MB (Encrypted)',
    calcNotesLabel: 'Special Procurement Notes / VIN / Specs',
    calcNotesPlaceholder: 'E.g., Specify color: Deep Burgundy, confirm 32GB RAM version, inspect chassis number...',
    calcVideoNotice: 'Engineer video benchmark report provided before shipping',
    calcCol2Title: '2. Smart Iridescent Calculator',
    calcCol2Subtitle: 'Real-time customs algorithms & airfreight rates',
    calcStep1Label: 'Step 1: Asset Classification',
    calcStep2Origin: 'Origin Hub',
    calcStep2Speed: 'Transit Speed',
    calcSpeedAir: 'Priority Airfreight',
    calcSpeedAirDays: '4-7 Days Delivery',
    calcSpeedCargo: 'Sea / Rail Cargo',
    calcSpeedCargoDays: '20-30 Days Heavy',
    calcStep3Value: 'Estimated Asset Retail Value:',
    calcStep3Weight: 'Total Asset Weight (kg):',
    calcBaseCost: 'Base Sourced Asset Cost',
    calcShippingCost: 'Shipping',
    calcCustomsCost: 'Customs & Import Duties',
    calcInsuranceCost: '100% Lloyds Escrow Insurance',
    calcHandlingCost: '4K Video Benchmark & Concierge Inspection',
    calcTotalTurnkey: 'Total Guaranteed Turnkey Price',
    calcZeroHiddenFees: 'Zero Hidden Fees Guaranteed',
    calcLockBtn: 'Lock Price & Proceed to Checkout',

    // Live Tracking
    trackingTag: 'SATELLITE RADAR // 3D CARGO TELEMETRY',
    trackingTitle: 'Live Intercontinental Asset Radar',
    trackingSubtitle: 'Real-time global tracking with cryptographic seals, pressurized vault temperature telemetry, and 3D flight trajectory arcs.',
    trackingSearchPlaceholder: 'Enter Order Tracking ID (e.g. AURA-5090-FE, AURA-VIP-9942)...',
    trackingLocateBtn: 'Locate',
    trackingActiveVaults: 'Active Vaults:',
    trackingPassportTitle: 'Cargo Telemetry Passport',
    trackingTemp: 'Vault Temperature',
    trackingPressure: 'Pressure & G-Force',
    trackingFlight: 'Carrier Flight:',
    trackingEta: 'Estimated Handover:',
    trackingSeal: 'Security Seal:',
    trackingMilestoneTitle: 'Inspection & Transit Milestone Log',

    // Checkout
    checkoutTag: 'VIP PRIVATE CLIENT CHECKOUT // QUANTUM ESCROW',
    checkoutTitle: 'Sovereign Settlement Vault',
    checkoutSubtitle: 'Your payment is held in 100% underwritten escrow until you inspect and accept your asset in person.',
    checkoutSummaryTitle: 'Order Asset Summary',
    checkoutCartEmpty: 'Your order vault is currently empty.',
    checkoutExploreBtn: 'Explore Catalog',
    checkoutEscrowFreeAir: 'Direct Air & Armored Escort',
    checkoutCustomsPrepaid: 'Diplomatic Customs Clearance Duty',
    checkoutTotalTurnkey: 'Total Turnkey Settlement:',
    checkoutBuyerTitle: 'Buyer & Handover Destination',
    checkoutFullName: 'Full Legal Name (Passport)',
    checkoutEmail: 'Encrypted VIP Email',
    checkoutPhone: 'Phone / Signal Protocol',
    checkoutCountry: 'Destination Country',
    checkoutAddress: 'Residence / Diplomatic Handover Address',
    checkoutTabCard: 'Bank Card',
    checkoutTabCrypto: 'USDT Escrow',
    checkoutTabWire: 'VIP Wire',
    checkoutCardNumber: 'Card Number',
    checkoutCardExpiry: 'Expiry Date',
    checkoutCardCvv: 'CVV / CVC',
    checkoutCardFlipNotice: 'FLIPS CARD',
    checkoutTiltNotice: 'Hover to tilt 3D shimmer • Focus CVV to flip 180°',
    checkoutPayBtn: 'Pay & Launch Order',
    checkoutCryptoTitle: 'USDT / USDC Multi-Sig Escrow',
    checkoutCryptoDesc: 'Funds remain locked in smart contract until you sign delivery confirmation.',
    checkoutWireTitle: 'SWIFT / Fedwire Private Banking',
    checkoutWireBtn: 'Generate Wire Escrow Invoice',
    checkoutSuccessTag: 'ESCROW TRANSACTION EXECUTED',
    checkoutSuccessTitle: 'Your Order is Live & Trackable',
    checkoutSuccessDesc: 'Funds are secured in multi-sig escrow under Lloyds of London underwriting. Sourcing engineers have been dispatched to the origin hub.',
    checkoutTrackingIdLabel: 'Satellite Cargo Radar ID:',
    checkoutTrackBtn: 'Track Your Order Live',
    checkoutCloseBtn: 'Close',

    // Footer
    footerDesc: 'Direct sovereign acquisition, engineer verification, and armored turnkey transit for flagship silicon, exotic hypercars, and luxury architectural villas.',
    footerUnderwritten: '100% Escrow & Lloyds Underwritten',
    footerPortals: 'Ecosystem Portals',
    footerTerminals: 'Active AURA Transit Terminals (Live Telemetry)',
    footerCopyright: '© 2026 AURA GLOBAL LUXURY ACQUISITIONS INC. ALL RIGHTS RESERVED.',
    footerSecurity: 'ENCRYPTED SECURE PROTOCOL • DIPLOMATIC AIR CARGO ESCORT'
  },
  RU: {
    // Nav
    navHome: 'Главная',
    navShowroom: '3D Шоурум',
    navCatalog: 'Каталог',
    navOrder: 'Калькулятор и Заказ',
    navTracking: 'Онлайн-радар',
    navCheckout: 'Оплата и Эскроу',
    navLive3D: '3D ОНЛАЙН',
    navVault: 'СЕЙФ',
    protocolStatus: 'ПРОТОКОЛ AURA 2.0 • ДИПЛОМАТИЧЕСКИЙ ЭСКОРТ ГРУЗА',
    escrowStatus: '100% Эскроу и страхование Lloyds',

    // Home
    heroTag: 'ПРОТОКОЛ AURA 2.0 • ДИПЛОМАТИЧЕСКИЙ ЭСКОРТ ГРУЗА',
    heroTitle1: 'Самые желанные мировые активы.',
    heroTitleGradient: 'Выкуплены, построены и доставлены',
    heroTitle2: 'прямо к вашей двери.',
    heroSubtitle: 'Элитная экосистема суверенного выкупа: флагманские чипы и видеокарты, экзотические суперкары, премиальные стройматериалы и умные виллы под ключ.',
    heroBtnShowroom: 'Открыть 3D Шоурум',
    heroBtnCalculator: 'Рассчитать доставку по ссылке',
    heroSafeDeal: '100% Безопасная сделка (Эскроу)',
    heroAirSpeed: 'Экспресс авиадоставка (4-7 дней)',
    heroBiometric: 'Биометрическая видеоверификация',
    pillarsTag: 'НАПРАВЛЕНИЯ ВЫКУПА',
    pillarsTitle: 'Четыре столпа экосистемы AURA',
    pillarsSubtitle: 'Каждая категория обслуживается выделенными командами закупщиков и брокерами дипломатической таможни.',
    pillar1Title: 'Флагманское железо и кремний',
    pillar1Subtitle: 'Blackwell RTX 5090, Threadripper PRO, ИИ-кластеры',
    pillar1Desc: 'Прямые поставки из Кремниевой Долины и Тайваня. Заводское тестирование жидкого металла, беспошлинный зеленый коридор и авиафрахт за 4-7 дней.',
    pillar1Btn: 'Осмотреть RTX 5090 в 3D',
    pillar2Title: 'Элитные и экзотические автомобили',
    pillar2Subtitle: 'BMW M Performance, Lamborghini Gallardo, Ferrari, Bentley',
    pillar2Desc: 'Прямые аллокации с заводов в Мюнхене, Сант-Агата-Болоньезе и Дубае. Заводская родословная, бронепленка XPEL и климатический авиаконтейнер.',
    pillar2Btn: 'Осмотреть BMW M4 в 3D',
    pillar3Title: 'Строительство вилл и материалы под ключ',
    pillar3Subtitle: 'Архитектурные умные виллы, мрамор Италии, немецкие фасады',
    pillar3Desc: 'Сборные роскошные виллы с доставкой прямо на ваш участок. Панорамное остекление Schüco, солнечные крыши Tesla и итальянский мрамор.',
    pillar3Btn: 'Осмотреть виллу 450м² в 3D',
    pillar4Title: 'Мировая недвижимость и тяжелые активы',
    pillar4Subtitle: 'Международные резиденции, коммерческие фабрики и станки',
    pillar4Desc: 'Полное юридическое сопровождение, нотариальная гарантия чистоты сделки, эскроу-хранение средств и вручение ключей в белых перчатках.',
    pillar4Btn: 'Открыть весь каталог',
    lifecycleTag: 'ПРОЗРАЧНЫЙ ЖИЗНЕННЫЙ ЦИКЛ',
    lifecycleTitle: 'Доставка под ключ в 4 четких этапа',
    lifecycleSubtitle: 'Никаких скрытых платежей, полная защита эскроу и 100% таможенная очистка.',
    step1Num: '01',
    step1Title: 'Вставьте ссылку или чертеж',
    step1Desc: 'Отправьте ссылку на товар из Apple, Mobile.de, Amazon, Copart или загрузите PDF/CAD чертеж виллы.',
    step2Num: '02',
    step2Title: '4K видеопроверка инженером',
    step2Desc: 'Наши лицензированные инженеры лично сверяют серийные номера, проводят стресс-тесты и отправляют 4K видеоотчет.',
    step3Num: '03',
    step3Title: 'Дипломатический авиафрахт и таможня',
    step3Desc: 'Зеленый коридор таможни, полное страхование в Lloyds of London и онлайн-трекинг со спутникового радара.',
    step4Num: '04',
    step4Title: 'Бронированная передача у двери',
    step4Desc: 'Торжественная распаковка в белых перчатках у вашей двери со всеми документами и передачей прав собственности.',
    featuredTag: 'ДОСТУПНО ДЛЯ ВЫКУПА В ЭСКРОУ',
    featuredTitle: 'Популярные мировые активы',
    viewCatalogBtn: 'Открыть полный 2D каталог',
    turnkeyPrice: 'Цена под ключ',
    inspect3dBtn: '3D Осмотр',

    // Showroom
    showroomHintDrag: 'Вращение на 360° мышью',
    showroomHintZoom: 'Зум колесиком мыши',
    showroomEngine: 'Физический движок Three.js WebGL 2.0',
    showroomHologramTitle: 'ГОЛОГРАФИЧЕСКИЙ ФОРМУЛЯР СПЕЦИФИКАЦИИ',
    showroomBooting: 'ЗАГРУЗКА ГОЛОГРАММЫ // 0.65с',
    showroomOriginHub: 'Хаб отправления',
    showroomTransit: 'Приоритет транзита',
    showroomBenchmarks: 'Верифицированные техпараметры',
    showroomReplayGlitch: 'Повторить глитч-скан',
    showroomXray: 'Рентген-сетка (Wireframe)',
    showroomXrayOn: 'Рентген ВКЛ',
    showroomOrderBtn: 'Заказать актив под ключ',
    showroomInsured: '100% Застраховано Lloyds',

    // Catalog
    catalogTag: 'БЫСТРЫЙ 2D КАТАЛОГ // ПРОВЕРЕННЫЙ ИНВЕНТАРЬ',
    catalogTitle: 'Реестр верифицированных активов мира',
    catalogSubtitle: 'Каждый предмет лично проверен инженерами на складах отправления, очищен на экспортной таможне и доставляется под ключ с защитой эскроу.',
    catAll: 'Все активы',
    catGpu: 'Видеокарты и CPU',
    catPhone: 'Смартфоны',
    catCar: 'Суперкары',
    catMaterials: 'Стройматериалы',
    catVillas: 'Виллы под ключ',
    catalogSearchPlaceholder: 'Поиск чипа, авто, виллы...',
    addToOrderBtn: 'В заказ',
    addedToOrderBtn: 'Добавлено в сейф',

    // Calculator
    calcTag: 'ВЫКУП ПО ССЫЛКЕ И УМНЫЙ КАЛЬКУЛЯТОР',
    calcTitle: 'Рассчитайте любой товар или чертеж под ключ',
    calcSubtitle: 'Вставьте ссылку с любого маркетплейса или аукциона, укажите вес и получите фиксированную финальную цену без скрытых доплат.',
    calcCol1Title: '1. Ссылка или чертеж',
    calcCol1Subtitle: 'Любой сайт мира или PDF-проект',
    calcQuickLinks: 'Быстрые ссылки для теста:',
    calcUrlLabel: 'Ссылка на товар / аукционный лот',
    calcUploadLabel: 'Или загрузите CAD / PDF чертеж виллы',
    calcUploadHint: 'Нажмите для загрузки .PDF, .DWG, .CAD, .ZIP',
    calcUploadSize: 'Максимальный размер 150 МБ (Зашифровано)',
    calcNotesLabel: 'Пожелания к выкупу / VIN / Комплектация',
    calcNotesPlaceholder: 'Например: цвет Deep Burgundy, 32GB памяти, проверить состояние кузова перед выкупом...',
    calcVideoNotice: 'Инженер предоставит 4K видеоотчет бенчмарков до отправки',
    calcCol2Title: '2. Умный переливающийся калькулятор',
    calcCol2Subtitle: 'Актуальные тарифы авиафрахта и таможни',
    calcStep1Label: 'Шаг 1: Категория актива',
    calcStep2Origin: 'Хаб отправления',
    calcStep2Speed: 'Скорость доставки',
    calcSpeedAir: 'Приоритетный авиафрахт',
    calcSpeedAirDays: '4-7 дней до двери',
    calcSpeedCargo: 'Морской / Ж/Д карго',
    calcSpeedCargoDays: '20-30 дней для тяжелых грузов',
    calcStep3Value: 'Ориентировочная цена актива:',
    calcStep3Weight: 'Общий вес груза (кг):',
    calcBaseCost: 'Стоимость самого актива',
    calcShippingCost: 'Доставка',
    calcCustomsCost: 'Таможенная пошлина и оформление',
    calcInsuranceCost: '100% Эскроу-страхование Lloyds',
    calcHandlingCost: '4K видеопроверка и консьерж-инспекция',
    calcTotalTurnkey: 'Итоговая гарантированная цена под ключ',
    calcZeroHiddenFees: 'Гарантия отсутствия скрытых платежей',
    calcLockBtn: 'Зафиксировать цену и перейти к оформлению',

    // Live Tracking
    trackingTag: 'СПУТНИКОВЫЙ РАДАР // 3D ТЕЛЕМЕТРИЯ ГРУЗА',
    trackingTitle: 'Онлайн-радар межконтинентального транзита',
    trackingSubtitle: 'Отслеживание перемещения активов в реальном времени с криптографическими пломбами, датчиками температуры климатического сейфа и 3D дугой полета.',
    trackingSearchPlaceholder: 'Введите трек-номер (напр. AURA-5090-FE, AURA-VIP-9942)...',
    trackingLocateBtn: 'Найти груз',
    trackingActiveVaults: 'Активные сейфы:',
    trackingPassportTitle: 'Телеметрический паспорт груза',
    trackingTemp: 'Температура сейфа',
    trackingPressure: 'Давление и перегрузки',
    trackingFlight: 'Рейс перевозчика:',
    trackingEta: 'Ожидаемое вручение:',
    trackingSeal: 'Защитная пломба:',
    trackingMilestoneTitle: 'Журнал инспекций и контрольных точек',

    // Checkout
    checkoutTag: 'VIP ПРИВАТНЫЙ РАСЧЕТ // КВАНТОВЫЙ ЭСКРОУ',
    checkoutTitle: 'Сейф суверенных взаиморасчетов',
    checkoutSubtitle: 'Ваши средства депонируются в безотзывном эскроу-хранилище под гарантией Lloyds of London и переводятся продавцу только после вашего личного осмотра.',
    checkoutSummaryTitle: 'Сводка заказанных активов',
    checkoutCartEmpty: 'Ваш сейф заказа пока пуст.',
    checkoutExploreBtn: 'Перейти в каталог',
    checkoutEscrowFreeAir: 'Прямой авиарейс и бронированный эскорт',
    checkoutCustomsPrepaid: 'Дипломатическая таможенная пошлина',
    checkoutTotalTurnkey: 'Итого к расчету под ключ:',
    checkoutBuyerTitle: 'Данные получателя и адрес вручения',
    checkoutFullName: 'ФИО по загранпаспорту',
    checkoutEmail: 'Зашифрованный VIP Email',
    checkoutPhone: 'Телефон / Telegram / Signal',
    checkoutCountry: 'Страна доставки',
    checkoutAddress: 'Резиденция / Дипломатический адрес вручения',
    checkoutTabCard: 'Банковская карта',
    checkoutTabCrypto: 'USDT Эскроу',
    checkoutTabWire: 'VIP Банковский перевод',
    checkoutCardNumber: 'Номер карты',
    checkoutCardExpiry: 'Срок действия',
    checkoutCardCvv: 'CVV / CVC код',
    checkoutCardFlipNotice: 'ПЕРЕВОРАЧИВАЕТ КАРТУ',
    checkoutTiltNotice: 'Наведите мышь для 3D наклона • Нажмите на CVV для разворота на 180°',
    checkoutPayBtn: 'Оплатить и запустить доставку',
    checkoutCryptoTitle: 'Мультисиг Эскроу USDT / USDC',
    checkoutCryptoDesc: 'Криптовалюта блокируется в смарт-контракте до подписания акта приема актива.',
    checkoutWireTitle: 'SWIFT / Международный банковский перевод',
    checkoutWireBtn: 'Сформировать счет-фактуру эскроу',
    checkoutSuccessTag: 'ЭСКРОУ-ТРАНЗАКЦИЯ УСПЕШНО АКТИВИРОВАНА',
    checkoutSuccessTitle: 'Ваш заказ запущен и отслеживается на радаре',
    checkoutSuccessDesc: 'Средства заблокированы в мультисиг-эскроу под гарантией Lloyds. Инженеры выкупа уже направлены в хаб отправления.',
    checkoutTrackingIdLabel: 'Номер для спутникового радара:',
    checkoutTrackBtn: 'Смотреть груз на онлайн-радаре',
    checkoutCloseBtn: 'Закрыть',

    // Footer
    footerDesc: 'Прямой суверенный выкуп, инженерная верификация и бронированная доставка под ключ флагманского кремния, экзотических суперкаров и элитных архитектурных вилл.',
    footerUnderwritten: '100% Эскроу и гарантия Lloyds of London',
    footerPortals: 'Порталы экосистемы',
    footerTerminals: 'Действующие терминалы AURA (Телеметрия онлайн)',
    footerCopyright: '© 2026 AURA GLOBAL LUXURY ACQUISITIONS INC. ВСЕ ПРАВА ЗАЩИЩЕНЫ.',
    footerSecurity: 'ЗАШИФРОВАННЫЙ ПРОТОКОЛ • ДИПЛОМАТИЧЕСКИЙ АВИАЭСКОРТ'
  }
};
