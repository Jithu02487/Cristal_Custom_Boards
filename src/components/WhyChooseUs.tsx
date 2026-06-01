import { ADVANTAGES, TESTIMONIALS } from '../data';
import { Shield, Lightbulb, CheckCircle, PackageCheck, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const icons = [
    <Shield className="w-6 h-6 text-amber-400" />,
    <Lightbulb className="w-6 h-6 text-amber-400" />,
    <CheckCircle className="w-6 h-6 text-amber-400" />,
    <PackageCheck className="w-6 h-6 text-amber-400" />
  ];

  return (
    <section className="bg-neutral-900 py-16 md:py-24" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Why Choose You Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">Our Signature Approach</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Why Select SignCraft Studio?
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-4 leading-relaxed">
            We merge premium-grade raw substrates (German marine acrylics, weather-sealed teak wood, and solid brass core elements) with computer-guided precise laser-cutting to deliver visual perfection.
          </p>
        </div>

        {/* Advantage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" id="advantages-grid">
          {ADVANTAGES.map((adv, idx) => (
            <div 
              key={idx} 
              className="bg-neutral-950 border border-neutral-850 p-6 rounded-2xl flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center mb-5">
                  {icons[idx] || <CheckCircle className="w-6 h-6 text-amber-400" />}
                </div>
                <h3 className="font-sans font-bold text-lg text-white mb-2">
                  {adv.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {adv.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
