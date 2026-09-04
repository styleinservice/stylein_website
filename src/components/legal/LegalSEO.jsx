import React, { useEffect } from 'react';
import { LEGAL_META } from '../../data/legal/legalMeta';

export default function LegalSEO() {
  useEffect(() => {
    document.title = 'Terms of Service & Privacy Policy | STYLEIN';

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      'Read STYLEIN Terms of Service, Privacy Policy, Refund Policy, Subscription Terms, Warranty Terms and Customer Rights.'
    );

    const schemaData = [
      {
        '@context': 'https://schema.org',
        '@type': 'LegalPage',
        name: 'STYLEIN Legal Documentation, Terms of Service & Privacy Policy',
        url: 'https://www.styleincar.com/legal',
        description:
          'Comprehensive legal terms, privacy policies, refund terms and conditions of Stylein Car Services LLC.',
        publisher: {
          '@type': 'Organization',
          name: LEGAL_META.company,
          url: 'https://www.styleincar.com',
          telephone: LEGAL_META.phone,
          email: LEGAL_META.email,
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'TermsOfService',
        name: 'STYLEIN Terms of Service',
        url: 'https://www.styleincar.com/legal#part-a-terms-of-service',
        datePublished: '2026-09-01',
        dateModified: '2026-09-01',
        publisher: { '@type': 'Organization', name: LEGAL_META.company },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'PrivacyPolicy',
        name: 'STYLEIN Privacy Policy',
        url: 'https://www.styleincar.com/legal#part-b-privacy-policy',
        datePublished: '2026-09-01',
        dateModified: '2026-09-01',
        publisher: { '@type': 'Organization', name: LEGAL_META.company },
      },
    ];

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'legal-structured-data';
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('legal-structured-data');
      if (existingScript) existingScript.remove();
    };
  }, []);

  return null;
}
