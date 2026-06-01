import { Product, BusinessInfo } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "SignCraft Studio",
  tagline: "Precision Crafted Identity for Your Vehicles & Business",
  whatsappNumber: "919000000000", // Default India format, user can customize this directly in the UI!
  phone: "+91 90000 00000",
  email: "orders@signcraftstudio.com",
  address: "Metro Arcade, Ground Floor, Central Ring Road, Cochin, India"
};

export const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Premium 3D Gel Vehicle Plates",
    category: "vehicle",
    description: "Sleek, double-dome German acrylic plates featuring letters cut with high-density laser and mounted on impact-resistant boards.",
    basePrice: 1200,
    image: "https://images.unsplash.com/photo-1610641818989-c2025095c7f1?auto=format&fit=crop&q=80&w=600",
    materials: ["German Acrylic Base", "Carbon Fiber Frame", "3D Glossy Gel Text", "Matte Carbon Backing"],
    sizes: ["Standard Car (50 x 12 cm)", "Compact Car (34 x 8 cm)", "Two Wheeler (20 x 11 cm)"],
    popular: true
  },
  {
    id: "prod-2",
    title: "Vintage Gilded Wooden Shop Sign",
    category: "shop",
    description: "Hand-finished teak wood signs featuring recessed hand engraving, direct weatherproofing, and stunning 24k gold leaf lettering details.",
    basePrice: 8500,
    image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600",
    materials: ["Teak Wood", "Rust-Resistant Brass Border", "Polyurethane Marine Finish", "Gold Leafing"],
    sizes: ["Boutique Small (2 x 1.5 ft)", "Commercial Banner (4 x 2.5 ft)", "Grand Entrance (6 x 3.5 ft)"],
    popular: false
  },
  {
    id: "prod-3",
    title: "Vivid Custom LED Neon Signage",
    category: "led",
    description: "Flexible, low-voltage silicon LED neon lights hand-shaped onto premium clear acrylic backings. Perfect for storefronts, cafes, and indoor decor.",
    basePrice: 3500,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600",
    materials: ["Flexible LED Silicone", "Frosted Acrylic Backboard", "Mirror Silver Background", "Dimmer Remote Module"],
    sizes: ["Cafe Special (40 x 30 cm)", "Luxe Statement (80 x 60 cm)", "Mega Backdrop (120 x 90 cm)"],
    popular: true
  },
  {
    id: "prod-4",
    title: "Sleek Brushed Metal & Acrylic Crests",
    category: "acrylic",
    description: "Professional multi-layer acrylic signs with raised aluminum inserts, floating stand-off screws, and clean chemical-etched text tags.",
    basePrice: 2200,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
    materials: ["Frosted Acrylic", "Brushed Aluminum Inlay", "Stainless Steel Standoffs", "UV Stabilized Printing"],
    sizes: ["Standard A4 Desk (29 x 21 cm)", "Standard Office Door (40 x 30 cm)", "Reception Mainpiece (90 x 60 cm)"],
    popular: true
  },
  {
    id: "prod-5",
    title: "Bespoke Sculpted Brass Monogram",
    category: "custom",
    description: "Completely customizable architectural solid solid brass castings, acid-neutralized and polished for a timeless premium front facade name board.",
    basePrice: 12000,
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600",
    materials: ["Cast Brass", "Deep Black Oxidized Backing", "Sealed Matte Acrylic Clearcoat", "Concealed Anchors"],
    sizes: ["Compact Gate (30 x 15 cm)", "Standard Residence (45 x 30 cm)", "Custom Blueprint Dimensions"],
    popular: false
  }
];

export const ADVANTAGES = [
  {
    title: "Premium Handcrafted Quality",
    description: "Every name board is designed, cut, polished, and finished by seasoned local craftsmen using high-grade marine acrylics, metals, and woods."
  },
  {
    title: "All-Weather Durability",
    description: "Built to withstand harsh direct sunlight, heavy downpours, and coastal environments without yellowing, cracking, or lettering detachment."
  },
  {
    title: "Rapid WhatsApp Approvals",
    description: "We don't just print. We send digital previews, font options, and measurements on WhatsApp for your sign-off before manufacturing starts."
  },
  {
    title: "Secure Packaging & Delivery",
    description: "Double-bubble-wrap layered carton packing with custom corner guards, shipped with signature tracking across the country."
  }
];

export const TESTIMONIALS = [
  {
    name: "Aravind Govind",
    origin: "Royal Enfield Owner",
    text: "The vintage gel car plate changed the look of my cruiser! Received several questions about where I got it. Design checkout was simple, shipped in 3 days.",
    stars: 5
  },
  {
    name: "Meera Sen",
    origin: "Owner, Green Spoon Bakery",
    text: "Ordered a custom pink LED name board for my cafe storefront. The acrylic is crystal clear, and the brightness controls are super convenient. Highly recommend!",
    stars: 5
  },
  {
    name: "Sanjay Nair",
    origin: "Nair & Associates Office",
    text: "Pristine acrylic entrance name board with floating steel sturdiness. The etched brushed-aluminum logos came out incredibly sharp. Top-notch service.",
    stars: 5
  }
];
