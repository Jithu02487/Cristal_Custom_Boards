import { MapPin, Mail, Phone, Layers, MessageSquare, ArrowUp } from 'lucide-react';
import { BusinessInfo } from '../types';

interface FooterProps {
  businessInfo: BusinessInfo;
  scrollToSection: (id: string) => void;
}

export default function Footer({ businessInfo, scrollToSection }: FooterProps) {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-850 pt-16 pb-8 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand/Introduction */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3 text-white cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <Layers className="w-5 h-5 text-neutral-950 stroke-[2.5]" />
              </div>
              <span className="font-bold font-sans text-base tracking-tight">{businessInfo.name}</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              We engineer custom dimensional name boards, glow neon signs, brushed plaque standoffs, and vehicle plates using laser-precision tooling and premium long-lasting marine-grade hardware. Delivered straight to your home.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block mb-1">
                Direct Ordering Contact
              </span>
              <p className="text-neutral-300 font-semibold flex items-center gap-1.5 text-xs font-mono">
                WhatsApp: <a href={`https://wa.me/${businessInfo.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">{businessInfo.phone}</a>
              </p>
            </div>
          </div>

          {/* Quick links block */}
          <div>
            <h4 className="text-xs uppercase text-white font-mono tracking-widest font-bold mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 list-none">
              {[
                { id: 'hero', label: 'Home Introduction' },
                { id: 'about', label: 'Why Choose Us' },
                { id: 'gallery', label: 'Product Catalog' },
                { id: 'order', label: 'Configure Custom' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-amber-500 transition-colors cursor-pointer text-left font-medium"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Contact Specs */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase text-white font-mono tracking-widest font-bold mb-4">Headquarters</h4>
            
            <div className="space-y-3.5 text-xs text-neutral-400 leading-normal">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{businessInfo.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${businessInfo.email}`} className="hover:text-white transition-colors truncate">{businessInfo.email}</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{businessInfo.phone}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom border & standard copyright elements */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs text-neutral-500">
          <div>
            <span>© {new Date().getFullYear()} {businessInfo.name}. All Rights Reserved. Crafted with laser precision.</span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('hero')}
              className="bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white p-2.5 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 font-mono hover:border-neutral-700"
              title="Return to Top"
            >
              Back to Top
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
