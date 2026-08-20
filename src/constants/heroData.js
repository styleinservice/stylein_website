export const NAV_LINKS = [
  { id: 'services', label: 'Services', href: '#services', hasSubmenu: true },
  { id: 'brands', label: 'Brands', href: '/brands' },
  { id: 'about', label: 'About Us', href: '#about' },
  { id: 'faqs', label: 'FAQs', href: '#faqs' },
  { id: 'contact', label: 'Contact Us', href: '#contact' },
];

export const DYNAMIC_PHRASES = [
  'Tyre Change',
  'Car Wash',
  'Detailing & Care',
  'Roadside Rescue',
  'Oil Change',
  'Battery Service',
];

export const LANGUAGES = [
  { code: 'en', short: 'EN', name: 'English', native: 'English' },
  { code: 'ar', short: 'AR', name: 'Arabic', native: 'العربية' },
];

export const SERVICES_DROPDOWN_ITEMS = [
  {
    id: 'wash',
    title: 'Car Wash',
    subtitle: 'Eco-friendly deep mobile wash',
    iconName: 'Sparkles',
    href: '#car-wash'
  },
  {
    id: 'battery',
    title: 'Battery',
    subtitle: 'Doorstep testing & replacement',
    iconName: 'Zap',
    href: '#battery'
  },
  {
    id: 'tyres',
    title: 'Tyres',
    subtitle: 'Mobile installation & repair',
    iconName: 'Disc',
    href: '#tyres'
  },
  {
    id: 'engine-oil',
    title: 'Engine Oil',
    subtitle: 'Synthetic oil & filter change',
    iconName: 'Gauge',
    href: '#engine-oil'
  },
  {
    id: 'glass-coating',
    title: 'Glass Coating',
    subtitle: 'Ceramic paint & glass protection',
    iconName: 'ShieldCheck',
    href: '#glass-coating'
  },
  {
    id: 'car-inspection',
    title: 'Car Inspection',
    subtitle: 'Comprehensive 50-point diagnostic',
    iconName: 'CheckCircle2',
    href: '#car-inspection'
  },
  {
    id: 'rescue',
    title: 'Rescue',
    subtitle: '24/7 emergency roadside recovery',
    iconName: 'LifeBuoy',
    isRescue: true,
    href: '#rescue'
  }
];
