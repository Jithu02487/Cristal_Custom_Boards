import React, { useState } from 'react';
import { Product } from '../types';
import { ArrowRight, Eye, Check } from 'lucide-react';

interface GalleryProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export default function Gallery({ products, onSelectProduct }: GalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'vehicle', label: 'Vehicle Boards' },
    { id: 'shop', label: 'Shop Signboards' },
    { id: 'led', label: 'LED Neon' },
    { id: 'acrylic', label: 'Acrylic Plates' },
    { id: 'custom', label: 'Custom Designs' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleConfigureClick = (product: Product) => {
    onSelectProduct(product);
    setActiveModalProduct(null);
  };

  return (
    <section className="bg-neutral-950 py-16 md:py-24 border-t border-neutral-900" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">Our Signature Gallery</span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Design Samples catalog
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Explore past blueprints and trending styles. Tap any setup to load it directly inside our custom order form generator.
            </p>
          </div>

          {/* Filter Categories Pills */}
          <div className="flex flex-wrap gap-2 md:self-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/10'
                    : 'bg-neutral-900 text-neutral-350 hover:bg-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" id="gallery-products-grid">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl hover:shadow-neutral-950 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div className="relative aspect-[4/3] w-full bg-neutral-950 overflow-hidden">
                  <img 
                    src={prod.image} 
                    alt={prod.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/40 transition-colors"></div>
                  
                  {/* Floating Action Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
                    <button
                      onClick={() => setActiveModalProduct(prod)}
                      className="bg-neutral-900/90 text-white p-3 rounded-full hover:bg-neutral-800 backdrop-blur-sm transition-all shadow-md cursor-pointer"
                      title="Inspect Specifications"
                    >
                      <Eye className="w-5 h-5 text-amber-400" />
                    </button>
                    <button
                      onClick={() => onSelectProduct(prod)}
                      className="bg-amber-500 text-neutral-950 px-4 py-2 rounded-full font-bold text-xs hover:bg-amber-400 shadow-md transition-all cursor-pointer"
                    >
                      Build Layout
                    </button>
                  </div>

                  <span className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 rounded-lg px-2.5 py-1 text-[10px] font-mono text-neutral-300 uppercase tracking-widest">
                    {prod.category}
                  </span>
                </div>

                {/* Card details */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-white font-sans group-hover:text-amber-400 transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm mt-2 line-clamp-2 leading-relaxed">
                    {prod.description}
                  </p>

                  <div className="mt-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider block">Standard Substrates</span>
                    <div className="flex flex-wrap gap-1">
                      {prod.materials.map((m, idx) => (
                        <span key={idx} className="bg-neutral-950 border border-neutral-850 px-2 py-0.5 rounded text-[10px] text-neutral-300 font-mono">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-neutral-850 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-neutral-500 uppercase block tracking-wider">Est. Budget</span>
                  <span className="text-base font-bold text-white font-mono">₹{prod.basePrice.toLocaleString('en-IN')}</span>
                </div>
                <button
                  onClick={() => onSelectProduct(prod)}
                  className="text-xs font-bold text-amber-500 flex items-center gap-1 hover:text-amber-400 group-hover:translate-x-1 duration-200 cursor-pointer"
                >
                  Configure Studio
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Specification Inspector Drawer / Modal */}
        {activeModalProduct && (
          <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
              <div className="relative aspect-video bg-neutral-950">
                <img 
                  src={activeModalProduct.image} 
                  alt={activeModalProduct.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="absolute top-4 right-4 bg-neutral-900/80 hover:bg-neutral-850 border border-neutral-800 text-white rounded-full p-2 text-xs transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                    {activeModalProduct.category} specs
                  </span>
                  <h3 className="text-xl font-bold font-sans text-white">{activeModalProduct.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-2">
                    {activeModalProduct.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider font-semibold">Available Sizing Templates</h4>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-none">
                    {activeModalProduct.sizes.map((s, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-400 stroke-[3]" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase block">Starting at</span>
                    <span className="text-xl font-bold text-amber-400 font-mono">₹{activeModalProduct.basePrice.toLocaleString('en-IN')}</span>
                  </div>
                  <button
                    onClick={() => handleConfigureClick(activeModalProduct)}
                    className="bg-amber-500 hover:bg-amber-400 text-neutral-950 px-5 py-2.5 rounded-lg font-bold text-sm transition-all cursor-pointer"
                  >
                    Select & Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
