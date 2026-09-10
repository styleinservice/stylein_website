export const NAV_LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'services', label: 'Services', href: '#services', hasSubmenu: true },
  { id: 'brands', label: 'Brands', href: '/brands' },
  { id: 'faqs', label: 'FAQs', href: '/faqs' },
  { id: 'about', label: 'About Us', href: '/about' },
  { id: 'contact', label: 'Contact', href: '/contact' },
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
    href: '/services/car-wash',
  },
  {
    id: 'battery',
    title: 'Battery',
    subtitle: 'Doorstep testing & replacement',
    iconName: 'Zap',
    href: '/services/battery',
  },
  {
    id: 'tyres',
    title: 'Tyres',
    subtitle: 'Mobile installation & repair',
    iconName: 'Disc',
    href: '/rescue',
  },
  {
    id: 'engine-oil',
    title: 'Engine Oil',
    subtitle: 'Synthetic oil & filter change',
    iconName: 'Gauge',
    href: '/services/oil-change',
  },
  {
    id: 'glass-coating',
    title: 'Glass Coating',
    subtitle: 'Ceramic paint & glass protection',
    iconName: 'ShieldCheck',
    href: '/services/glass-coating',
  },
  {
    id: 'car-inspection',
    title: 'Car Inspection',
    subtitle: 'Comprehensive 50-point diagnostic',
    iconName: 'CheckCircle2',
    href: '/services/car-inspection',
  },
  {
    id: 'rescue',
    title: 'Rescue',
    subtitle: '24/7 emergency roadside recovery',
    iconName: 'LifeBuoy',
    isRescue: true,
    href: '/rescue',
  },
];
