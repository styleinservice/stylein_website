import React from 'react';
import { LEGAL_META } from '../../data/legal/legalMeta';

export default function LegalCompanyContact() {
  return (
    <footer className="mt-16 pt-10 border-t-2 border-white/20 text-neutral-300 font-body text-sm sm:text-base space-y-3">
      <h2 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wider">
        Company Legal Contact Information
      </h2>
      <p className="font-semibold text-white">{LEGAL_META.company}</p>
      <div className="space-y-1.5 text-xs sm:text-sm text-neutral-400 font-mono">
        <p>Website: {LEGAL_META.website}</p>
        <p>Email: {LEGAL_META.email}</p>
        <p>Telephone / WhatsApp: {LEGAL_META.phone}</p>
        <p>Location: {LEGAL_META.location}</p>
        <p>Trade Licence No.: {LEGAL_META.tradeLicence}</p>
        <p>Registered Legal Address: {LEGAL_META.legalAddress}</p>
        <p>Privacy Officer / Data Protection Contact: {LEGAL_META.privacyOfficerContact}</p>
        <p>Effective Date: {LEGAL_META.effectiveDate}</p>
        <p>Document Version: {LEGAL_META.version}</p>
      </div>
    </footer>
  );
}
