import React from 'react';
import { ShieldCheck, Radio, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalStateContext';

export const Footer: React.FC = () => {
  const { t, language } = useGlobalState();

  const hubs = [
    { city: language === 'RU' ? 'Кремниевая Долина (SFO)' : 'Silicon Valley (SFO)', status: language === 'RU' ? 'Активный хаб' : 'Active Hub', ping: '12ms' },
    { city: language === 'RU' ? 'Франкфурт (FRA)' : 'Frankfurt (FRA)', status: language === 'RU' ? 'Авиатерминал' : 'Active Hub', ping: '24ms' },
    { city: language === 'RU' ? 'Лондон (LHR)' : 'London (LHR)', status: language === 'RU' ? 'Таможня чиста' : 'Customs Clear', ping: '19ms' },
    { city: language === 'RU' ? 'Дубай (DXB)' : 'Dubai (DXB)', status: language === 'RU' ? 'Экспресс-сейф' : 'Express Vault', ping: '31ms' },
    { city: language === 'RU' ? 'Ташкент (TAS)' : 'Tashkent (TAS)', status: language === 'RU' ? 'Белые перчатки' : 'White Glove', ping: '8ms' }
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#060810]/90 backdrop-blur-2xl text-slate-400 py-12 px-4 sm:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-violet-500 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </div>
            <span className="font-extrabold tracking-widest text-white font-display">
              AURA <span className="text-cyan-400 font-light">GLOBAL</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            {t.footerDesc}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.footerUnderwritten}</span>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3">
            {t.footerPortals}
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <Link to="/showroom" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                {t.navShowroom}
              </Link>
            </li>
            <li>
              <Link to="/catalog" className="hover:text-cyan-400 transition-colors">
                {t.navCatalog}
              </Link>
            </li>
            <li>
              <Link to="/order" className="hover:text-cyan-400 transition-colors">
                {t.navOrder}
              </Link>
            </li>
            <li>
              <Link to="/tracking" className="hover:text-cyan-400 transition-colors">
                {t.navTracking}
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-cyan-400 transition-colors">
                {t.navCheckout}
              </Link>
            </li>
          </ul>
        </div>

        {/* Global Logistics Hubs */}
        <div className="md:col-span-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-white font-semibold mb-3 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            {t.footerTerminals}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {hubs.map((hub, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col justify-between"
              >
                <div className="text-xs font-semibold text-slate-200 font-mono truncate">
                  {hub.city}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
                  <span className="text-emerald-400">{hub.status}</span>
                  <span className="text-slate-500">{hub.ping}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
        <div>
          {t.footerCopyright}
        </div>
        <div className="flex items-center gap-4">
          <span>{t.footerSecurity}</span>
        </div>
      </div>
    </footer>
  );
};
