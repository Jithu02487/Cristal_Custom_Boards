/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import OrderForm from './components/OrderForm';
import Footer from './components/Footer';
import { Product, BusinessInfo } from './types';
import { PRODUCTS, BUSINESS_INFO } from './data';

export default function App() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(() => {
    // Attempt local storage recall to remember customized target WhatsApp recipient details
    const local = localStorage.getItem('signcraft_business_info');
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        // Fallback
      }
    }
    return BUSINESS_INFO;
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeSection, setActiveSection] = useState('hero');

  // Keep track of scroll positions to highlight Nav Items elegantly
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'gallery', 'order'];
      const scrollPosition = window.scrollY + 120; // safe navbar offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUpdateWhatsApp = (newPhone: string) => {
    const updated = {
      ...businessInfo,
      whatsappNumber: newPhone,
      phone: `+${newPhone.replace(/\D/g, '')}`
    };
    setBusinessInfo(updated);
    localStorage.setItem('signcraft_business_info', JSON.stringify(updated));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Directly load selected preset product and jump with linear offset to configuration form
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    scrollToSection('order');
  };

  // Extract best sellers metrics dynamically
  const bestSellers = PRODUCTS.filter(p => p.popular);

  return (
    <div className="bg-neutral-950 min-h-screen text-slate-100 antialiased selection:bg-amber-500 selection:text-neutral-950">
      {/* Primary header navbar */}
      <Header 
        businessInfo={businessInfo} 
        onUpdateWhatsApp={handleUpdateWhatsApp} 
        scrollToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main landing segments container */}
      <main className="flex-grow">
        
        {/* Intro Block and Best sellers list */}
        <Hero 
          bestSellers={bestSellers} 
          onSelectProduct={handleSelectProduct} 
        />

        {/* Why choose us */}
        <WhyChooseUs />

        {/* Dynamic Client Reviews and Board Gallery */}
        <Reviews />

        {/* Detailed searchable categorised visual sign catalog */}
        <Gallery 
          products={PRODUCTS} 
          onSelectProduct={handleSelectProduct} 
        />

        {/* Live design canvas & Whatsapp payload formatter order configurator */}
        <OrderForm 
          businessInfo={businessInfo} 
          selectedProduct={selectedProduct} 
        />

      </main>

      {/* Footer contacts detail segment */}
      <Footer 
        businessInfo={businessInfo} 
        scrollToSection={scrollToSection} 
      />
    </div>
  );
}
