import React from 'react';
import AppStoreBadge from '../common/AppStoreBadge';
import GooglePlayBadge from '../common/GooglePlayBadge';

export default function FooterStoreBadges() {
  return (
    <div className="flex flex-wrap items-center gap-3 pt-3">
      <AppStoreBadge />
      <GooglePlayBadge />
    </div>
  );
}
