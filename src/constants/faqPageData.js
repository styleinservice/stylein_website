export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'doorstep', label: 'Doorstep Services' },
  { id: 'rescue', label: 'Roadside Rescue' },
  { id: 'payments', label: 'Pricing & Safety' },
];

export const STYLEIN_PAGE_FAQS = [
  {
    id: 'faq-1',
    category: 'doorstep',
    categoryLabel: 'Doorstep Care',
    question: 'How does STYLEIN doorstep car care service work?',
    answer: 'Select your required automotive service (Car Wash, Battery, Tyre Fitting, Synthetic Oil Change, Ceramic Glass Coating, or Vehicle Inspection), pick your preferred time and location in Dubai or across the UAE. Our fully equipped mobile workshop van arrives with certified specialists to complete the service on-site while you relax.',
  },
  {
    id: 'faq-2',
    category: 'rescue',
    categoryLabel: 'Emergency Rescue',
    question: 'How fast can an Emergency Rescue team reach my location?',
    answer: 'For emergency roadside situations (flat tyre replacement, battery jumpstart or instant replacement, emergency tyre pressure), our rapid rescue dispatch team reaches your exact GPS location within 20 to 30 minutes in prime UAE service zones.',
  },
  {
    id: 'faq-3',
    category: 'doorstep',
    categoryLabel: 'Marque Compatibility',
    question: 'Which vehicle brands and models do you service?',
    answer: 'STYLEIN services all luxury, exotic, high-performance, and modern electric marques including Porsche, Mercedes-Benz, BMW, Audi, Land Rover, Ferrari, Lamborghini, Bentley, Rolls-Royce, Aston Martin, Tesla, Lucid, and Lexus using authentic OEM-approved fluids, batteries, and equipment.',
  },
  {
    id: 'faq-4',
    category: 'payments',
    categoryLabel: 'Billing & Payments',
    question: 'What payment methods do you accept for services?',
    answer: 'We offer complete cashless convenience. You can pay securely through the STYLEIN app with Apple Pay, Google Pay, Visa, Mastercard, or directly on-site using our technician\'s contactless mobile POS terminal upon complete satisfaction of the service.',
  },
  {
    id: 'faq-5',
    category: 'payments',
    categoryLabel: 'Certification & Warranty',
    question: 'Are STYLEIN technicians certified, background-checked, and insured?',
    answer: 'Yes. Every technician undergoes intensive manufacturer-grade training and rigorous background verification. Furthermore, all operations and customer vehicles are protected under our comprehensive multi-million AED insurance coverage and service satisfaction warranty.',
  },
  {
    id: 'faq-6',
    category: 'doorstep',
    categoryLabel: 'Booking Flexibility',
    question: 'Can I reschedule or cancel my appointment with STYLEIN?',
    answer: 'Yes. You have total flexibility to reschedule or cancel your appointment up to 2 hours before your scheduled arrival time directly inside the STYLEIN app or by contacting our 24/7 concierge with zero penalties or hidden cancellation fees.',
  },
];

export const FAQ_SUPPORT_CARDS = [
  {
    id: 'toll-free',
    title: '800 STYLEIN',
    subtitle: 'Toll-free customer care available 24/7',
    actionText: 'Call 800 STYLEIN',
    actionHref: 'tel:+97180078953',
    iconName: 'PhoneCall',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Concierge',
    subtitle: 'Chat live with our automotive care team',
    actionText: 'Start Live Chat',
    actionHref: 'https://wa.me/971558120570?text=Hello%20STYLEIN%20Team%2C%20I%20have%20a%20question%20regarding%20your%20services.',
    iconName: 'MessageSquare',
  },
  {
    id: 'rescue',
    title: 'Emergency Roadside',
    subtitle: 'Flat tyre or dead battery? 20-min arrival',
    actionText: 'Request Roadside Help',
    actionHref: '/rescue',
    iconName: 'LifeBuoy',
    isRescue: true,
  },
];
