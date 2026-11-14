import { TrackingOrder } from '../types';

export const TRACKING_DATABASE: Record<string, TrackingOrder> = {
  'AURA-5090-FE': {
    id: 'AURA-5090-FE',
    assetName: 'NVIDIA RTX 5090 Founders Edition',
    category: 'PC Hardware',
    originCity: 'San Francisco (SFO)',
    originCoords: [37.7749, -122.4194],
    customsHub: 'Frankfurt Air Hub (FRA)',
    customsCoords: [50.1109, 8.6821],
    destinationCity: 'Tashkent Central (TAS)',
    destinationCoords: [41.2995, 69.2401],
    statusText: 'In Transit — Intercontinental Air Freight',
    percentComplete: 68,
    eta: 'Tomorrow at 14:30 GMT+5',
    carrier: 'Lufthansa Cargo Flight LH8294 (VIP Priority)',
    flightCode: 'LH-8294',
    temperature: '+19.2°C (Vibration Dampened)',
    pressure: '1013 hPa (Pressurized Cargo Hold)',
    securitySeal: 'CRYPTOGRAPHIC-SEAL #9024-X-SECURE',
    totalTurnkeyUsd: 2399,
    steps: [
      {
        title: 'Silicon Acquired & 4K Engineer Video Check',
        location: 'Silicon Valley SFO Depot, USA',
        timestamp: 'Nov 12, 09:15 EST',
        completed: true,
        current: false,
        details: 'Serial #NV-5090-9981 benchmarked in 3DMark Speedway. Zero artifacts. Factory seal validated.'
      },
      {
        title: 'US Export Customs Cleared',
        location: 'San Francisco International Airport (SFO)',
        timestamp: 'Nov 13, 03:40 EST',
        completed: true,
        current: false,
        details: 'HS Code 8471.80 certified. Clean export declaration stamped.'
      },
      {
        title: 'Transit via Frankfurt Central Air Hub',
        location: 'Frankfurt Cargo City South (FRA)',
        timestamp: 'Nov 14, 11:20 CET',
        completed: true,
        current: true,
        details: 'Loaded onto Boeing 777F cargo vault with thermal monitoring active.'
      },
      {
        title: 'Import Customs Clearance & Handover',
        location: 'Tashkent International Hub (TAS)',
        timestamp: 'Nov 15, Estimated 14:30',
        completed: false,
        current: false,
        details: 'AURA Concierge personal armored transport to your door.'
      }
    ]
  },
  'AURA-IPHONE18-BURG': {
    id: 'AURA-IPHONE18-BURG',
    assetName: 'iPhone 18 Pro Max — Deep Burgundy Titanium',
    category: 'Smartphones',
    originCity: 'Cupertino / San Jose (SJC)',
    originCoords: [37.3382, -121.8863],
    customsHub: 'Dubai Logistics City (DWC)',
    customsCoords: [25.2048, 55.2708],
    destinationCity: 'Tashkent Diplomatic Hub (TAS)',
    destinationCoords: [41.2995, 69.2401],
    statusText: 'Cleared Customs — Out for White-Glove Handover',
    percentComplete: 92,
    eta: 'Today at 21:00 GMT+5',
    carrier: 'Emirates SkyCargo Flight EK9402',
    flightCode: 'EK-9402',
    temperature: '+21.0°C (Climate Controlled Vault)',
    pressure: '1015 hPa',
    securitySeal: 'TAMPER-EVIDENT-BIOMETRIC #APL-188-B',
    totalTurnkeyUsd: 1999,
    steps: [
      {
        title: 'Acquired Directly from Apple Park Campus Vault',
        location: 'Cupertino, CA, USA',
        timestamp: 'Nov 11, 14:00 PST',
        completed: true,
        current: false,
        details: 'Deep Burgundy Titanium finish inspected under 5000K daylight simulation.'
      },
      {
        title: 'Direct Trans-Pacific Air Express',
        location: 'San Francisco (SFO) to Dubai (DXB)',
        timestamp: 'Nov 12, 19:30 PST',
        completed: true,
        current: false,
        details: 'Vault container scanned and GPS beacon linked.'
      },
      {
        title: 'Customs Duty Pre-Paid & Stamped',
        location: 'Tashkent Cargo Terminal',
        timestamp: 'Nov 14, 08:30 GMT+5',
        completed: true,
        current: false,
        details: 'Zero duty balance. Green diplomatic lane release.'
      },
      {
        title: 'AURA White-Glove Handover Dispatch',
        location: 'Tashkent City Center',
        timestamp: 'Nov 14, 20:45 GMT+5',
        completed: false,
        current: true,
        details: 'Driver dispatched with biometric unboxing kit.'
      }
    ]
  },
  'AURA-CULLINAN-VIP': {
    id: 'AURA-CULLINAN-VIP',
    assetName: 'BMW M Performance M4 Competition',
    category: 'Luxury Cars',
    originCity: 'Munich BMW Welt (GER)',
    originCoords: [48.1768, 11.5583],
    customsHub: 'Frankfurt Cargo Hub (FRA)',
    customsCoords: [50.1109, 8.6821],
    destinationCity: 'Dubai Emirates Hills (DXB)',
    destinationCoords: [25.0657, 55.1713],
    statusText: 'In Enclosed Air Cargo Transit',
    percentComplete: 52,
    eta: 'In 3 Days (Nov 17)',
    carrier: 'Lufthansa Cargo Boeing 777F Air Freighter',
    flightCode: 'LH-8220',
    temperature: '+18.5°C (Hydraulic Locked Pallet)',
    pressure: '1012 hPa',
    securitySeal: 'BMW-M-PERFORMANCE #M4-904-BLACK',
    totalTurnkeyUsd: 148000,
    steps: [
      {
        title: 'Munich BMW Welt Handover & PPF Protection',
        location: 'BMW Welt Munich, Germany',
        timestamp: 'Nov 10, 11:00 CET',
        completed: true,
        current: false,
        details: 'Full body XPEL Ultimate Plus self-healing protection film applied.'
      },
      {
        title: 'Air Pallet Rigging & Tilt-Sensor Activation',
        location: 'Frankfurt Cargo Center (FRA)',
        timestamp: 'Nov 12, 16:20 CET',
        completed: true,
        current: false,
        details: 'Forged 826M wheels locked with specialized soft nylon chassis straps.'
      },
      {
        title: 'En Route to Middle East Logistics Hub',
        location: 'Mid-Air Over Mediterranean Corridor',
        timestamp: 'Nov 14, 15:10 UTC',
        completed: true,
        current: true,
        details: 'Cruising at 36,000 ft. Satellite telemetry active.'
      },
      {
        title: 'Escrow Release & Armored Flatbed Delivery',
        location: 'Emirates Hills, Dubai',
        timestamp: 'Nov 17, Estimated',
        completed: false,
        current: false,
        details: 'Keys and M Performance documentation handover with notary.'
      }
    ]
  },
  'AURA-911-GT3': {
    id: 'AURA-911-GT3',
    assetName: 'Lamborghini Gallardo LP 560-4',
    category: 'Luxury Cars',
    originCity: 'Sant\'Agata Bolognese (ITA)',
    originCoords: [44.6627, 11.1306],
    customsHub: 'Milan Malpensa Hub (MXP)',
    customsCoords: [45.6301, 8.7255],
    destinationCity: 'Almaty Premium Hub (ALA)',
    destinationCoords: [43.2220, 76.8512],
    statusText: 'Secured Airfreight Loading Phase',
    percentComplete: 40,
    eta: 'In 4 Days (Nov 18)',
    carrier: 'Cargolux Italia #C8-7120',
    flightCode: 'C8-7120',
    temperature: '+17.8°C',
    pressure: '1014 hPa',
    securitySeal: 'LAMBO-CORSE #GAL-560-ITA',
    totalTurnkeyUsd: 215000,
    steps: [
      {
        title: 'Dyno Benchmarked & V10 Telemetry Verified',
        location: 'Sant\'Agata Bolognese, Italy',
        timestamp: 'Nov 09, 14:00 CET',
        completed: true,
        current: false,
        details: 'Atmospheric 5.2L V10 report clean. Zero over-revs. Carbon aero pristine.'
      },
      {
        title: 'EU Export Clearance & Carnet ATA Sealed',
        location: 'Stuttgart Zollamt',
        timestamp: 'Nov 11, 10:15 CET',
        completed: true,
        current: false,
        details: 'All export customs duties certified and bond posted.'
      },
      {
        title: 'Vienna Cargo Vault Airfreight Staging',
        location: 'Vienna International (VIE)',
        timestamp: 'Nov 14, 18:00 CET',
        completed: false,
        current: true,
        details: 'Enclosed aircraft loading onto main deck.'
      },
      {
        title: 'Doorstep Enclosed Delivery to Almaty Residence',
        location: 'Almaty, Kazakhstan',
        timestamp: 'Nov 18, Estimated',
        completed: false,
        current: false,
        details: 'AURA Concierge with spare magnesium track wheel set.'
      }
    ]
  }
};
