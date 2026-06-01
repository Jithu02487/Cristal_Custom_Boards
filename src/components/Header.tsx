import React, { useState } from 'react';
import { Layers, MessageSquare, Menu, X, Settings, Phone } from 'lucide-react';
import { BusinessInfo } from '../types';

interface HeaderProps {
  businessInfo: BusinessInfo;
  onUpdateWhatsApp: (num: string) => void;
  scrollToSection: (id: string) => void;
  activeSection: string;
}

export default function Header({ 
  businessInfo, 
  onUpdateWhatsApp, 
  scrollToSection,
  activeSection 
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [tempPhone, setTempPhone] = useState(businessInfo.whatsappNumber);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Why Choose Us' },
    { id: 'gallery', label: 'Products & Gallery' },
    { id: 'order', label: 'Order Custom Board' },
  ];

  const handleSavePhone = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean phone number (keep only digits and simple text, remove + and spaces)
    const cleaned = tempPhone.replace(/\D/g, '');
    if (cleaned) {
      onUpdateWhatsApp(cleaned);
      setShowSettings(false);
    }
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('hero')} id="brand-logo-container">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Layers className="w-6 h-6 text-neutral-950 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-lg tracking-tight leading-none text-white">
                {businessInfo.name}
              </h1>
              <span className="text-[10px] text-amber-400 font-mono tracking-wider uppercase leading-none block mt-0.5">
                Premium Signboards
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Configure WhatsApp Recipient Number"
              className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-all cursor-pointer"
              id="whatsapp-settings-btn"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleNavClick('order')}
              className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2 rounded-lg text-sm transition-all duration-200 shadow-md shadow-amber-500/10 flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Configure & Order
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-amber-400 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal (WhatsApp Number Configuration) */}
      {showSettings && (
        <div className="absolute top-16 right-4 sm:right-6 md:right-8 w-80 bg-neutral-950 border border-neutral-800 rounded-xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-sm text-white flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-amber-400" />
              WhatsApp Setup (Live Demo)
            </h3>
            <button 
              onClick={() => setShowSettings(false)}
              className="text-neutral-400 hover:text-white text-xs"
            >
              ✕
            </button>
          </div>
          <p className="text-neutral-400 text-xs mb-3">
            Change the WhatsApp phone number that orders will be forwarded to. Use international digits (no plus sign).
          </p>
          <form onSubmit={handleSavePhone} className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Target Whatsapp Mobile
              </label>
              <input
                type="text"
                placeholder="e.g. 919000000000"
                value={tempPhone}
                onChange={(e) => setTempPhone(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-1.5 text-sm font-mono text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div className="flex justify-end gap-2 text-xs pt-1">
              <button
                type="button"
                onClick={() => {
                  setTempPhone("919000000000");
                  onUpdateWhatsApp("919000000000");
                  setShowSettings(false);
                }}
                className="px-2.5 py-1.5 bg-neutral-900 hover:bg-neutral-850 rounded text-neutral-400 hover:text-neutral-200 border border-neutral-800 transition-colors"
                id="reset-whatsapp-btn"
              >
                Reset Default
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded transition-colors"
                id="save-whatsapp-btn"
              >
                Save Phone
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mobile nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 border-b border-neutral-800 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'text-amber-400 bg-amber-500/10 font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 px-4 border-t border-neutral-800 mt-2">
              <button
                onClick={() => handleNavClick('order')}
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-4 py-2.5 rounded-lg text-sm transition-all text-center flex items-center justify-center gap-2 shadow-md shadow-amber-500/10"
              >
                <MessageSquare className="w-4 h-4" />
                Configure & Order (WhatsApp)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
