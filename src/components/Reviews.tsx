import React, { useState, useEffect, useRef } from 'react';
import { Star, Upload, Image as ImageIcon, Send, Database, Smile, Info, Check, Eye } from 'lucide-react';
import { Review } from '../types';

// Pre-populated default reviews with high quality real-world signboard context photos
const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-default-1",
    name: "Arun Kumar",
    origin: "Royal Enfield Bullet Rider",
    text: "Absolutely stunning 3D gel plates! The letters are deeply raised and have a gorgeous high-gloss finish. They withstood monsoon storms in Kerala completely intact.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1610641818989-c2025095c7f1?auto=format&fit=crop&q=80&w=600",
    boardType: "Vehicle Plate",
    date: "May 15, 2026"
  },
  {
    id: "rev-default-2",
    name: "Ayesha Rahman",
    origin: "Founder, Bloom Floral Cafe",
    text: "Ordered a customized pink and white LED glowing sign based on my store logo. The layout matches perfectly. It has turned into our cafe's main photo wall!",
    stars: 5,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    boardType: "LED Neon Sign",
    date: "April 28, 2026"
  },
  {
    id: "rev-default-3",
    name: "Rishi Dev",
    origin: "Partner, Dev & Co Chambers",
    text: "Pristine brushed aluminum on heavy frosted acrylic door sign. The floating metallic standoffs make it look incredibly premium on our glass entrance.",
    stars: 5,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
    boardType: "Acrylic Plate",
    date: "March 10, 2026"
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [text, setText] = useState('');
  const [stars, setStars] = useState(5);
  const [boardType, setBoardType] = useState('LED Neon Sign');
  const [uploadedImage, setUploadedImage] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load reviews from localStorage on mount, or fallback to default prebuilt reviews
  useEffect(() => {
    const saved = localStorage.getItem('signcraft_client_reviews');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
          return;
        }
      } catch (err) {
        // Fallback
      }
    }
    setReviews(INITIAL_REVIEWS);
  }, []);

  // Save reviews whenever they change
  const saveReviews = (newList: Review[]) => {
    setReviews(newList);
    localStorage.setItem('signcraft_client_reviews', JSON.stringify(newList));
  };

  const handleStarClick = (num: number) => {
    setStars(num);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processReviewImage(files[0]);
    }
  };

  const processReviewImage = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
      processReviewImage(files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) {
      alert("Please fill out your Name and Review text.");
      return;
    }

    // Default placeholder card image if client doesn't upload a custom board photo
    const imageToUse = uploadedImage || "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600";

    const newReview: Review = {
      id: `rev-custom-${Date.now()}`,
      name,
      origin: origin || "Valued Client",
      text,
      stars,
      image: imageToUse,
      boardType,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const updated = [newReview, ...reviews];
    saveReviews(updated);

    // Reset Form Input State fields
    setName('');
    setOrigin('');
    setText('');
    setStars(5);
    setUploadedImage('');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleDeleteReview = (id: string) => {
    const updated = reviews.filter(r => r.id !== id);
    saveReviews(updated);
  };

  return (
    <section className="bg-neutral-900 py-16 md:py-24 border-t border-neutral-800" id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">Live Board Showcases</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Client Verification & Reviews
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            Prospective clients post pictures of their finished and mounted name boards. Take a look at physical installations at real boutiques, cafes, and motor vehicles.
          </p>
        </div>

        {/* Informative explanation detailing database-free functionality */}
        <div className="mb-12 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Database className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-base text-white flex items-center gap-2">
                Serverless localStorage Storage 
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 text-[10px] uppercase font-mono px-2 py-0.5 rounded">Active Demo</span>
              </h4>
              <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed max-w-2xl">
                <strong>Yes, this runs 100% database-free!</strong> New reviews and uploaded images are converted directly to structured local variables saved inside your browser's persistent sandbox. 
                <span className="text-neutral-300"> This means your local reviews won't lag or send telemetry to external cloud database APIs, though they remain stored on your current device browser. Let's see it in action below!</span>
              </p>
            </div>
          </div>
          
          <div className="text-xs text-neutral-500 bg-neutral-900 border border-neutral-850 px-4 py-3 rounded-xl max-w-xs shrink-0 self-stretch md:self-auto flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>To show reviews to <i>all global clients</i> simultaneously, we can plug in <b>Firebase Firestore</b> in a future update!</span>
          </div>
        </div>

        {/* Real Review Grid & Dynamic Forms section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Column 1: Submit a New Review with Board Photos */}
          <div className="lg:col-span-4 bg-neutral-950 border border-neutral-850 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <h3 className="font-sans font-bold text-lg text-white mb-2 flex items-center gap-2">
              <Smile className="w-5 h-5 text-amber-400" />
              Write Verified Review
            </h3>
            <p className="text-neutral-400 text-xs mb-6">
              Share a shot of your SignCraft name board and let other clients know how your plate or signage turned out!
            </p>

            {showSuccess && (
              <div className="mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded-xl p-4 text-xs flex items-start gap-2.5 animate-in slide-in-from-top-2">
                <Check className="w-4 h-4 text-emerald-400 stroke-[3] shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Review Saved Successfully!</p>
                  <p className="opacity-80 mt-1">Your response combined with your custom image is now saved securely in local storage.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Your Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Business / Vehicle Profile
                </label>
                <input
                  type="text"
                  placeholder="e.g. Owner, Classic Coffee or Thar Driver"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex items-center gap-1 h-10 px-2 bg-neutral-900 border border-neutral-800 rounded-xl justify-center">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleStarClick(num)}
                        className="cursor-pointer text-amber-500 focus:outline-none transition-transform active:scale-95 hover:scale-110"
                        title={`${num} Stars`}
                      >
                        <Star 
                          className={`w-4 h-4 ${
                            num <= stars ? 'fill-amber-400 text-amber-400' : 'text-neutral-600'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                    Board Category
                  </label>
                  <select
                    value={boardType}
                    onChange={(e) => setBoardType(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-2 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 h-10 cursor-pointer"
                  >
                    <option value="Vehicle Plate">Vehicle Plate</option>
                    <option value="Shop Signboard">Shop Signboard</option>
                    <option value="LED Neon Sign">LED Neon Sign</option>
                    <option value="Acrylic Plate">Acrylic Plate</option>
                    <option value="Custom Design">Custom Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Write Your Review <span className="text-amber-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How was the build layout? Is the waterproof protection holding up well?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Drag and Drop Review Photo uploader */}
              <div>
                <label className="block text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-1.5">
                  Upload Board Placement Photo
                </label>
                
                {!uploadedImage ? (
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileSelect}
                    className={`border border-dashed rounded-xl py-4 px-3 text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1 min-h-[90px] ${
                      isDragging 
                        ? 'border-amber-500 bg-amber-500/5 text-amber-400' 
                        : 'border-neutral-800 bg-neutral-900 hover:bg-neutral-850 text-neutral-400'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <Upload className="w-5 h-5 text-neutral-500" />
                    <span className="text-[10px] font-semibold">Drop or Tap to select Board Image</span>
                    <span className="text-[8px] text-neutral-500 font-mono">PNG, JPG under 3MB</span>
                  </div>
                ) : (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                        <img src={uploadedImage} alt="Client custom upload thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 truncate max-w-[120px]">Custom_Sign.jpg</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setUploadedImage('')}
                      className="text-neutral-450 hover:text-white px-2 py-0.5 bg-neutral-950 border border-neutral-850 hover:bg-neutral-850 rounded text-[9px] font-mono transition-colors cursor-pointer"
                    >
                      Clear image
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/5"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Review Locally
              </button>

            </form>
          </div>

          {/* Column 2: The Live Verified reviews visual gallery */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="flex items-center justify-between">
              <h4 className="font-sans font-bold text-base text-white">
                Live Submissions feed ({reviews.length})
              </h4>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">
                Active Client Submissions
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="client-reviews-container">
              {reviews.map((rev) => (
                <div 
                  key={rev.id}
                  className="bg-neutral-950 border border-neutral-850 rounded-3xl p-5 hover:border-neutral-700 transition-colors duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: rating + category */}
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${
                              idx < rev.stars ? 'fill-amber-400 text-amber-400' : 'text-neutral-800'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded text-[9px] font-mono text-neutral-400 uppercase tracking-wider">
                        {rev.boardType || 'Custom Sign'}
                      </span>
                    </div>

                    {/* Review Board Image Frame (The core request) */}
                    {rev.image && (
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-neutral-900 mb-4 group/image">
                        <img 
                          src={rev.image} 
                          alt={`Review signboard attachment from ${rev.name}`} 
                          className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-neutral-950/20 group-hover/image:bg-neutral-950/40 transition-colors"></div>
                        <button
                          onClick={() => setZoomImage(rev.image)}
                          className="absolute bottom-3 right-3 bg-neutral-950/80 backdrop-blur-md p-2 rounded-full text-white border border-neutral-800 opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer shadow-md"
                          title="Expand Installation Photo"
                        >
                          <Eye className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                      </div>
                    )}

                    {/* Testimonial Quote text */}
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                      "{rev.text}"
                    </p>
                  </div>

                  {/* Review footer info details */}
                  <div className="pt-4 border-t border-neutral-900/60 flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-xs text-white uppercase tracking-normal">{rev.name}</h5>
                      <span className="text-[9px] font-mono text-amber-400 mt-0.5 block">{rev.origin}</span>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <span className="text-[9px] font-mono text-neutral-500">{rev.date}</span>
                      
                      {/* Let clients clear custom local review if they need to test reset */}
                      {rev.id.startsWith('rev-custom-') && (
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="text-red-400 hover:text-red-300 text-[8px] font-mono hover:underline cursor-pointer"
                        >
                          Delete Local
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* Fullscreen review image light-box zoom */}
      {zoomImage && (
        <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full max-h-[85vh] bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl p-2 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 bg-neutral-950/90 border border-neutral-850 rounded-full p-2.5 text-neutral-300 hover:text-white transition-colors cursor-pointer z-10"
            >
              ✕
            </button>
            <div className="w-full h-full flex items-center justify-center bg-neutral-950 rounded-2xl overflow-hidden aspect-video">
              <img 
                src={zoomImage} 
                alt="Client full size board installation setup" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
