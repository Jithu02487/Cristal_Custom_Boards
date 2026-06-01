import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Phone, ArrowUpRight, UploadCloud, 
  Sparkles, RefreshCw, Layers, Check, Hammer
} from 'lucide-react';
import { Product, OrderFormInputs, BusinessInfo } from '../types';

interface OrderFormProps {
  businessInfo: BusinessInfo;
  selectedProduct: Product | null;
  onOrderComplete?: () => void;
}

const FONTS = [
  { value: 'font-sans', label: 'Modern Sans' },
  { value: 'font-serif', label: 'Luxurious Serif' },
  { value: 'font-mono', label: 'Technical Industrial' },
  { value: 'font-neon', label: 'Retro Neon Glow' },
];

const COLORS = [
  { value: '#f59e0b', label: 'Amber Gold', glow: 'shadow-[0_0_15px_#f59e0b]' },
  { value: '#ef4444', label: 'Hot Crimson', glow: 'shadow-[0_0_15px_#ef4444]' },
  { value: '#06b6d4', label: 'Electric Cyan', glow: 'shadow-[0_0_15px_#06b6d4]' },
  { value: '#10b981', label: 'Vivid Emerald', glow: 'shadow-[0_0_15px_#10b981]' },
  { value: '#fafafa', label: 'Frosted Silica', glow: 'shadow-[0_0_15px_rgba(255,255,255,0.7)]' },
];

export default function OrderForm({ businessInfo, selectedProduct }: OrderFormProps) {
  const [inputs, setInputs] = useState<OrderFormInputs>({
    customerName: '',
    phoneNumber: '',
    boardType: 'vehicle',
    width: '45',
    height: '15',
    sizeUnit: 'cm',
    material: 'Acrylic Panel',
    logoBase64: '',
    logoFileName: '',
    additionalNotes: '',
  });

  // Additional design configuration purely for the high-end mockup visualizer
  const [displayText, setDisplayText] = useState('CUSTOM BOARD');
  const [customFont, setCustomFont] = useState('font-sans');
  const [customColor, setCustomColor] = useState('#f59e0b');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // If a customer selects a preset product from the hero showcase or the gallery,
  // we dynamically update the form presets to match that product!
  useEffect(() => {
    if (selectedProduct) {
      const typeMap: Record<string, string> = {
        'vehicle': 'vehicle',
        'shop': 'shop',
        'led': 'led',
        'acrylic': 'acrylic',
        'custom': 'custom'
      };

      // Extract width/height guess from product standard size to prefill
      let w = '45';
      let h = '15';
      let u: 'cm' | 'inches' | 'feet' = 'cm';

      if (selectedProduct.category === 'shop') {
        w = '4';
        h = '2';
        u = 'feet';
      } else if (selectedProduct.category === 'led') {
        w = '60';
        h = '40';
        u = 'cm';
      } else if (selectedProduct.category === 'acrylic') {
        w = '30';
        h = '20';
        u = 'cm';
      }

      setInputs(prev => ({
        ...prev,
        boardType: typeMap[selectedProduct.category] || 'custom',
        material: selectedProduct.materials[0] || 'Acrylic Panel',
        width: w,
        height: h,
        sizeUnit: u,
        additionalNotes: `Based on: ${selectedProduct.title}`
      }));

      // Update interactive text simulator with category sample text
      if (selectedProduct.category === 'vehicle') {
        setDisplayText('KL-07 CY-1122');
        setCustomFont('font-sans');
      } else if (selectedProduct.category === 'led') {
        setDisplayText('OPEN CAFE');
        setCustomFont('font-neon');
      } else {
        setDisplayText('STUDIO FRONT');
        setCustomFont('font-serif');
      }
    }
  }, [selectedProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Convert uploaded logo/file to base64 preview
  const processFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInputs(prev => ({
          ...prev,
          logoBase64: reader.result as string,
          logoFileName: file.name
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const clearFile = () => {
    setInputs(prev => ({
      ...prev,
      logoBase64: '',
      logoFileName: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Build high quality formatted WhatsApp API Text
  const handleOrderWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputs.customerName || !inputs.phoneNumber) {
      alert("Please fill in your Customer Name and Phone Number to compile your design specifications.");
      return;
    }

    const uppercaseType = inputs.boardType.toUpperCase();
    const cleanNum = businessInfo.whatsappNumber.replace(/\D/g, '');

    const messageText = `*NEW CUSTOM BOARD CONFIGURATION SUBMISSION* 🛠️
-----------------------------------------
👤 *Customer Information:*
• Name: ${inputs.customerName}
• Active Phone: ${inputs.phoneNumber}

📐 *Board Specifications:*
• Board Category: ${uppercaseType} NAME BOARD
• Custom Dimensions: ${inputs.width} x ${inputs.height} ${inputs.sizeUnit}
• Primary Substrate Material: ${inputs.material}

🎨 *Visual Customization:*
• Display Copy text: "${displayText}"
• Simulated Text Font: ${customFont.replace('font-', '')}
• Primary Color Accent: ${customColor}

📎 *Attached Assets:*
• Custom Logo File: ${inputs.logoFileName ? `Uploaded [${inputs.logoFileName}]` : 'None (No Logo uploaded)'}

📝 *Specific Design Notes:*
${inputs.additionalNotes || 'No custom notes provided.'}

-----------------------------------------
_Please draft a preview based on the above specifications. I will attach my reference image/logo directly in this chat._`;

    // Direct WhatsApp API trigger
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Dynamically update default material hints depending on chosen board category
  const getMaterialOptions = () => {
    switch (inputs.boardType) {
      case 'vehicle':
        return ['German Acrylic Base', 'Matte Carbon Fiber Base', 'Chrome Frame Plate', '3D Dome Gel Base'];
      case 'shop':
        return ['Teak Wood Base', 'Engraved Steel Plate', 'Painted Brick Core', 'Polished Oak Board'];
      case 'led':
        return ['Transparent Back Acrylic', 'Frosted Back Acrylic', 'Double-Plate Acrylic', 'Opaque Solid Board'];
      case 'acrylic':
        return ['Premium Frosted Acrylic', 'Clear Cast Glossy Glass', 'Mirror Finish Backing', 'Tinted Grey Acrylic'];
      case 'custom':
      default:
        return ['Solid Casting Brass', 'Heavy duty Cast Bronze', 'Brushed Aluminum Plaque', 'Composite Multi-layer Substrate'];
    }
  };

  // Helper styles to adjust Mockup Preview background depending on board type
  const getMockupBgStyle = () => {
    switch (inputs.boardType) {
      case 'vehicle':
        return 'bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-xl';
      case 'shop':
        return 'bg-[radial-gradient(#262626_1px,transparent_1px)] bg-[size:16px_16px] bg-neutral-900 border border-neutral-800 rounded-2xl';
      case 'led':
        return 'bg-neutral-950 border border-neutral-850 rounded-2xl';
      case 'acrylic':
        return 'bg-gradient-to-tr from-neutral-850 via-neutral-900 to-neutral-850 border border-neutral-800';
      case 'custom':
      default:
        return 'bg-neutral-900 border border-neutral-800';
    }
  };

  return (
    <section className="bg-neutral-900 py-16 md:py-24 border-t border-neutral-800" id="order">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">Build Simulator</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Name Board configuration Studio
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            Choose your options, customize text strings, and select premium raw materials below. Once satisfied, click the green button to transfer all specifications directly into WhatsApp to receive your design blueprint.
          </p>
        </div>

        {/* Dynamic Studio Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Configurator Inputs */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-sans font-bold text-lg text-white mb-6 flex items-center gap-2">
              <Hammer className="w-5 h-5 text-amber-500" />
              1. Customize Specifications
            </h3>

            <form onSubmit={handleOrderWhatsApp} className="space-y-6">
              
              {/* Customer Base Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Customer Name <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    required
                    value={inputs.customerName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Active Phone Number <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={inputs.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {/* Board Category selector buttons */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Select Board Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'vehicle', label: 'Vehicle Board' },
                    { id: 'shop', label: 'Shop Signboard' },
                    { id: 'led', label: 'LED Neon' },
                    { id: 'acrylic', label: 'Acrylic Plate' },
                    { id: 'custom', label: 'Custom Design' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setInputs(prev => ({ ...prev, boardType: cat.id, material: getMaterialOptions()[0] }));
                      }}
                      className={`px-3 py-2.5 text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        inputs.boardType === cat.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension Configurations */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Width (W)
                  </label>
                  <input
                    type="number"
                    name="width"
                    value={inputs.width}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Height (H)
                  </label>
                  <input
                    type="number"
                    name="height"
                    value={inputs.height}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div className="sm:col-span-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                    Sizing Unit
                  </label>
                  <select
                    name="sizeUnit"
                    value={inputs.sizeUnit}
                    onChange={handleInputChange}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 font-mono cursor-pointer"
                  >
                    <option value="cm">cm (Plates)</option>
                    <option value="inches">inches (LEDs)</option>
                    <option value="feet">feet (Shops)</option>
                  </select>
                </div>
              </div>

              {/* Substrate Raw Material Picker */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Primary Substrate Material
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getMaterialOptions().map((mat) => (
                    <button
                      key={mat}
                      type="button"
                      onClick={() => setInputs(prev => ({ ...prev, material: mat }))}
                      className={`px-3 py-2 text-[11px] font-mono rounded-lg border text-center transition-all cursor-pointer ${
                        inputs.material === mat
                          ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                          : 'border-neutral-850 bg-neutral-900 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {mat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Simulator Settings (Text overlay configuration) */}
              <div className="border-t border-neutral-900 pt-6 space-y-4">
                <span className="text-xs font-bold text-white tracking-wide block">
                  Interactive Simulator Display (For Live Mockup Preview)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Preview Board Lettering Text
                    </label>
                    <input
                      type="text"
                      maxLength={24}
                      value={displayText}
                      onChange={(e) => setDisplayText(e.target.value)}
                      placeholder="e.g. KL-07 AC-2200"
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Font Accent
                    </label>
                    <select
                      value={customFont}
                      onChange={(e) => setCustomFont(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-2.5 py-2 text-sm text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {FONTS.map(f => (
                        <option key={f.value} value={f.value}>{f.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1.5">
                      Visual Color
                    </label>
                    <div className="flex items-center gap-1.5 h-[38px] justify-center sm:justify-start bg-neutral-905 border border-neutral-800 px-2 rounded-xl">
                      {COLORS.map((col) => (
                        <button
                          key={col.value}
                          type="button"
                          onClick={() => setCustomColor(col.value)}
                          style={{ backgroundColor: col.value }}
                          className={`w-5 h-5 rounded-full cursor-pointer border ring-offset-2 ring-offset-neutral-950 transition-all ${
                            customColor === col.value ? 'ring-2 ring-amber-500 scale-110' : 'border-neutral-900'
                          }`}
                          title={col.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Logo Selector & Drag-Drop */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Upload Vector Logo or Layout Image (.png, .jpg)
                </label>
                
                {!inputs.logoBase64 ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-2xl py-6 px-4 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
                      isDragging 
                        ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                        : 'border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 text-neutral-400 hover:text-neutral-300'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <UploadCloud className="w-8 h-8 text-neutral-500" />
                    <div>
                      <p className="text-xs font-semibold">Drag & Drop files here, or click to browse</p>
                      <p className="text-[10px] text-neutral-500 mt-1 font-mono">Supports PNG, JPEG under 4MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-neutral-955 rounded overflow-hidden border border-neutral-800 flex items-center justify-center">
                        <img 
                          src={inputs.logoBase64} 
                          alt="Logo Preview thumbnail" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="truncate max-w-xs">
                        <p className="text-xs font-mono text-neutral-300 truncate">{inputs.logoFileName}</p>
                        <p className="text-[10px] text-amber-500 font-mono">Attachment Prepared Successfully</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearFile}
                      className="text-neutral-400 hover:text-white px-2.5 py-1 text-xs font-mono rounded bg-neutral-950 hover:bg-neutral-850 transition-colors"
                    >
                      Clear File
                    </button>
                  </div>
                )}
              </div>

              {/* Additional custom notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  Special Design Requests & Fonts Details
                </label>
                <textarea
                  name="additionalNotes"
                  value={inputs.additionalNotes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Specify custom fonts shape, dual layer acrylic desires, neon backing color, vehicle clamp positions, etc. (Optional)"
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none"
                ></textarea>
              </div>

              {/* Submit trigger button (Send on WhatsApp) */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-extrabold py-4 px-6 rounded-2xl text-base transition-all duration-300 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-3 cursor-pointer"
                id="order-whatsapp-submit"
              >
                <Phone className="w-5 h-5 fill-neutral-950 stroke-none" />
                Submit and Order via WhatsApp
                <ArrowUpRight className="w-5 h-5" />
              </button>

              <p className="text-center text-[10px] sm:text-xs text-neutral-500 leading-normal max-w-sm mx-auto">
                * Note: Your vector logo image is safely handled locally to preview here. Standard WhatsApp redirect requires attaching the original raw image file in your chat.
              </p>

            </form>
          </div>

          {/* Column 2: Live Mockup Simulator Canvas */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            <div className="bg-neutral-950 border border-neutral-850 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-amber-500 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  Visual Design Simulator
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  Est. Scale
                </span>
              </div>

              {/* Interactive Virtual Frame Card */}
              <div className={`p-8 aspect-[16/10] w-full flex items-center justify-center relative shadow-inner overflow-hidden ${getMockupBgStyle()}`}>
                
                {/* Visual simulator based on category overlay styles */}
                {inputs.boardType === 'vehicle' && (
                  <div className="w-[85%] h-24 bg-zinc-900 border-[3px] border-zinc-700/80 rounded-lg flex items-center justify-between px-4 sm:px-6 relative shadow-2xl overflow-hidden shadow-black">
                    <div className="absolute top-0 bottom-0 left-0 w-3 bg-blue-600 flex flex-col items-center justify-center select-none py-1">
                      <span className="text-[6px] font-bold text-white leading-none">IND</span>
                    </div>

                    <div className="w-full flex items-center justify-center select-none text-center">
                      <h4 
                        style={{ color: customColor }}
                        className={`text-2xl font-bold tracking-wider leading-none truncate w-full ${customFont}`}
                      >
                        {displayText || 'KL-07'}
                      </h4>
                    </div>

                    {/* Logo base preview inside frame context */}
                    {inputs.logoBase64 && (
                      <div className="absolute right-3 w-6 h-6 border border-zinc-700 bg-neutral-950 rounded overflow-hidden select-none">
                        <img 
                          src={inputs.logoBase64} 
                          alt="overlay logo" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                )}

                {inputs.boardType === 'shop' && (
                  <div className="w-[90%] h-36 bg-gradient-to-br from-amber-950 via-neutral-950 to-amber-950 border-4 border-[#854d0e] rounded-xl flex items-center justify-center relative py-4 px-6 text-center select-none shadow-xl shadow-black">
                    <div className="absolute inset-2 border border-amber-800/20"></div>
                    
                    <div className="flex flex-col items-center justify-center gap-1.5 w-full">
                      {inputs.logoBase64 && (
                        <div className="w-8 h-8 rounded-full border border-amber-500/30 overflow-hidden shrink-0 bg-neutral-900">
                          <img src={inputs.logoBase64} alt="wood sign logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <h4 
                        style={{ color: customColor }}
                        className={`text-xl font-bold leading-tight tracking-tight uppercase truncate max-w-full ${customFont}`}
                      >
                        {displayText || 'SIGN STORE'}
                      </h4>
                      <span className="text-[8px] font-mono tracking-widest text-amber-500/60 uppercase">Estd. Crafted</span>
                    </div>
                  </div>
                )}

                {inputs.boardType === 'led' && (
                  <div className="w-[85%] h-32 bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col items-center justify-center relative p-4 shadow-2xl">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-neutral-800 to-neutral-900 rounded-2xl -z-10 opacity-30"></div>
                    
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                      <h4 
                        style={{ 
                          color: customColor,
                          textShadow: `0 0 10px ${customColor}, 0 0 20px ${customColor}`
                        }}
                        className={`text-2xl font-black text-center tracking-wide leading-none select-none ${customFont}`}
                      >
                        {displayText || 'NEON SHOP'}
                      </h4>
                      
                      {inputs.logoBase64 && (
                        <div className="w-6 h-6 rounded border opacity-60 overflow-hidden bg-neutral-900">
                          <img src={inputs.logoBase64} alt="neon overlay logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {inputs.boardType === 'acrylic' && (
                  <div className="w-[80%] h-28 bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex items-center justify-center p-4 relative shadow-2xl select-none">
                    {/* Metallic Standoff Screws */}
                    <div className="absolute top-2 left-2 w-2_5 h-2_5 rounded-full bg-linear-to-b from-zinc-300 to-zinc-500 border border-zinc-600 shadow shadow-black"></div>
                    <div className="absolute top-2 right-2 w-2_5 h-2_5 rounded-full bg-linear-to-b from-zinc-300 to-zinc-500 border border-zinc-600 shadow shadow-black"></div>
                    <div className="absolute bottom-2 left-2 w-2_5 h-2_5 rounded-full bg-linear-to-b from-zinc-300 to-zinc-500 border border-zinc-600 shadow shadow-black"></div>
                    <div className="absolute bottom-2 right-2 w-2_5 h-2_5 rounded-full bg-linear-to-b from-zinc-300 to-zinc-500 border border-zinc-600 shadow shadow-black"></div>

                    <div className="flex items-center gap-3 w-full justify-center px-4">
                      {inputs.logoBase64 && (
                        <div className="w-8 h-8 rounded border border-neutral-700/50 overflow-hidden shrink-0 bg-neutral-950">
                          <img src={inputs.logoBase64} alt="acrylic logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      <h4 
                        style={{ color: customColor }}
                        className={`text-base font-semibold tracking-wide uppercase truncate ${customFont}`}
                      >
                        {displayText || 'OFFICE PLAZA'}
                      </h4>
                    </div>
                  </div>
                )}

                {inputs.boardType === 'custom' && (
                  <div className="w-[85%] h-32 bg-stone-900 border-2 border-stone-800 rounded-3xl flex flex-col items-center justify-center p-5 select-none relative shadow-xl shadow-black">
                    <div className="flex flex-col items-center justify-center w-full gap-2">
                      {inputs.logoBase64 && (
                        <div className="w-8 h-8 rounded overflow-hidden border border-neutral-700 bg-neutral-955">
                          <img src={inputs.logoBase64} alt="custom mockup logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                      )}
                      
                      <h4 
                        style={{ color: customColor }}
                        className={`text-lg font-bold tracking-normal text-center leading-tight truncate max-w-full ${customFont}`}
                      >
                        {displayText || 'MODERN CREATION'}
                      </h4>
                    </div>
                  </div>
                )}

              </div>

              {/* Specifications legend read-out */}
              <div className="mt-5 space-y-2 text-[11px] text-neutral-400 font-mono bg-neutral-900 border border-neutral-850 p-4 rounded-xl">
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">Board Class:</span>
                  <span className="text-neutral-200 uppercase">{inputs.boardType}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">Dimensions:</span>
                  <span className="text-neutral-200 font-sans">{inputs.width} x {inputs.height} {inputs.sizeUnit}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-850 pb-1.5">
                  <span className="text-neutral-500">Substrate Class:</span>
                  <span className="text-neutral-200 font-sans">{inputs.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Ready for Draft:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 stroke-[3]" /> Yes
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Helper Tips */}
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-4 text-xs text-amber-300">
              <h4 className="font-bold mb-1.5 flex items-center gap-1 font-sans">
                💡 How the Ordering Process Works
              </h4>
              <ol className="list-decimal pl-4 space-y-1 my-0 font-sans leading-relaxed text-neutral-300">
                <li>Input your names, custom measurements, and base options.</li>
                <li>Verify your styling specs in the Real-time visual mockup above.</li>
                <li>Click <strong>“Submit and Order via WhatsApp”</strong>. This passes the completed catalog data directly to WhatsApp.</li>
                <li>Receive your finalized high-res digital preview proof within 12 hours from our designers.</li>
              </ol>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}
