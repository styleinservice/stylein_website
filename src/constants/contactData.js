export const CONTACT_INFO = {
  phone: '+971 55 812 0570',
  phoneHref: 'tel:+971558120570',
  whatsapp: '+971 55 812 0570',
  whatsappHref: 'https://wa.me/971558120570',
  email: 'info@styleincar.com',
  emailHref: 'mailto:info@styleincar.com',
  address: 'Shop No. 5, Al Jerf, Industrial Area 1, Near Car Souq, Ajman, United Arab Emirates',
  mapsHref: 'https://www.google.com/maps?q=25.4383233,55.5124383&z=17&hl=en',
  mapEmbedUrl: 'https://maps.google.com/maps?q=25.4383233,55.5124383&hl=en&z=16&output=embed',
  coordinates: '25°26\'18.0"N 55°30\'44.8"E',
  license: 'Trade License No. 59292',
};

export const CONTACT_CARDS = [
  {
    id: 'phone',
    badge: 'Direct Hotline',
    title: 'Customer Support',
    value: '+971 55 812 0570',
    subtext: 'Available 8 AM - 10 PM (Rescue 24/7)',
    actionLabel: 'Call Now',
    href: 'tel:+971558120570',
    iconName: 'PhoneCall',
    accentColor: 'red',
  },
  {
    id: 'whatsapp',
    badge: 'Instant Response',
    title: 'WhatsApp Concierge',
    value: '+971 55 812 0570',
    subtext: 'Chat live with our technical advisors',
    actionLabel: 'Start Chat',
    href: 'https://wa.me/971558120570?text=Hello%20STYLEIN%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    iconName: 'MessageSquare',
    accentColor: 'emerald',
    isExternal: true,
  },
  {
    id: 'email',
    badge: 'Official Inquiries',
    title: 'Email Desk',
    value: 'info@styleincar.com',
    subtext: 'For corporate fleet & service queries',
    actionLabel: 'Send Email',
    href: 'mailto:info@styleincar.com',
    iconName: 'Mail',
    accentColor: 'blue',
  },
  {
    id: 'location',
    badge: 'Headquarters & Hub',
    title: 'Service Center',
    value: 'Al Jerf, Industrial 1, Ajman',
    subtext: 'Near Car Souq, United Arab Emirates',
    actionLabel: 'Get Directions',
    href: 'https://www.google.com/maps?q=25.4383233,55.5124383&z=17&hl=en',
    iconName: 'MapPin',
    accentColor: 'amber',
    isExternal: true,
  },
];

export const SERVICE_CATEGORIES = [
  'Eco-Friendly Car Wash',
  'Car Battery Replacement & Testing',
  'Tyre Installation & Puncture Repair',
  'Engine Oil & Filter Service',
  'Ceramic Paint & Glass Coating',
  'Comprehensive Car Inspection',
  '24/7 Roadside Emergency Rescue',
  'Other / General Automotive Inquiry',
];

export const OPERATING_HOURS = [
  { days: 'Everyday (Mon – Sun)', hours: '8:00 AM – 10:00 PM', label: 'Doorstep & Hub Service' },
  { days: 'Emergency Roadside', hours: '24 Hours / 7 Days', label: 'Live Rapid Dispatch' },
  { days: 'WhatsApp Concierge', hours: '24/7 Active', label: 'Instant Chat Assistance' },
];
