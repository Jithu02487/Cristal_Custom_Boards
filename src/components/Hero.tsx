import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Phone } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  bestSellers: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function Hero({ bestSellers, onSelectProduct }: HeroProps) {
  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden" id="hero">
      {/* Decorative background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#232323_1px,transparent_1px),linear-gradient(to_bottom,#232323_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Introduction block */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-mono tracking-wider w-fit mx-auto lg:mx-0 mb-6 uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              Premium Signboards & Vehicle Plates
            </div>
            
            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.1] mb-6">
              Signs That Speak. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                Crafted For Impact.
              </span>
            </h2>

            <p className="font-sans text-neutral-300 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8">
              Welcome to SignCraft Studio. We engineer custom name boards for cars, shop frontage, high-output silicone LED neon installations, and crisp acrylic office plaques. Customized to your exact size, fonts, and patterns.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" id="hero-actions-container">
              <a 
                href="#order"
                className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer group"
              >
                Start Custom Board Build
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#gallery"
                className="w-full sm:w-auto bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-neutral-200 px-8 py-4 rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                Browse Our Designs
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-neutral-900 text-left max-w-lg mx-auto lg:mx-0">
              <div>
                <span className="text-amber-400 font-extrabold text-2xl font-mono block">100%</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">Waterproof Materials</span>
              </div>
              <div className="px-4 border-l border-neutral-900">
                <span className="text-amber-400 font-extrabold text-2xl font-mono block">24 Hrs</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">WhatsApp Draft Preview</span>
              </div>
              <div className="px-4 border-l border-neutral-900">
                <span className="text-amber-400 font-extrabold text-2xl font-mono block">5 Stars</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block mt-1">Local Craftsmanship</span>
              </div>
            </div>
          </div>

          {/* Featured Hero Visual Frame */}
          <div className="lg:col-span-5 relative w-full flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none">
              {/* Background gradient bulb */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl blur-2xl opacity-15"></div>
              
              {/* Frame Card */}
              <div className="relative bg-neutral-900 border border-neutral-800 rounded-3xl p-4 sm:p-6 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-neutral-950 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600" 
                    alt="Custom LED Board Neon glowing sign example" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-amber-400 border border-neutral-800 uppercase tracking-wider">
                    Category: LED Neon Signs
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-white font-sans">
                      Dine&Brew Coffee Signboard
                    </h3>
                    <span className="text-amber-400 font-mono font-bold text-base">
                      Prebuilt Draft
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs leading-relaxed">
                    A beautiful double-backing layout featuring sunset orange glow on polished 8mm clear corporate-grade acrylic backing. Built for persistent outdoor operation.
                  </p>
                  
                  <div className="flex items-center gap-2 pt-2 text-xs text-neutral-400 font-mono">
                    <span className="bg-neutral-800 py-1 px-2.5 rounded text-neutral-300">Silicone LED</span>
                    <span className="bg-neutral-800 py-1 px-2.5 rounded text-neutral-300">Acoustic Guard</span>
                    <span className="bg-neutral-800 py-1 px-2.5 rounded text-neutral-300">UV Rated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best Selling Products Showcase (Home Page element) */}
      <section className="bg-neutral-900/60 border-t border-b border-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">Customer Favorites</span>
            <h3 className="font-sans font-bold text-3xl text-white tracking-tight">Best-Selling Board Configurations</h3>
            <p className="text-neutral-400 text-sm mt-3">
              These ready-to-customize layout templates are currently trending this month. Select any to customize instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bestSellers.map((prod) => (
              <div 
                key={prod.id} 
                className="bg-neutral-950 border border-neutral-850 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300 flex flex-col group justify-between"
              >
                <div>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-neutral-900 mb-4">
                    <img 
                      src={prod.image} 
                      alt={prod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {prod.popular && (
                      <span className="absolute top-2.5 right-2.5 bg-amber-500 text-neutral-950 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                        Best Seller
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-lg text-white font-sans group-hover:text-amber-400 transition-colors">
                    {prod.title}
                  </h4>
                  <p className="text-neutral-400 text-xs leading-relaxed mt-2 line-clamp-2">
                    {prod.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prod.materials.slice(0, 2).map((m, idx) => (
                      <span key={idx} className="bg-neutral-900 text-neutral-400 text-[10px] px-2 py-0.5 rounded font-mono">
                        {m}
                      </span>
                    ))}
                    {prod.sizes.slice(0, 1).map((s, idx) => (
                      <span key={idx} className="bg-neutral-900 text-neutral-400 text-[10px] px-2 py-0.5 rounded font-mono">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">Starting From</span>
                    <span className="text-lg font-bold text-white font-mono">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => onSelectProduct(prod)}
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Select Design
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
