import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { fetchBrands } from '../store/brands/brandsSlice';
import StyleinNavbar from '../components/home/StyleinNavbar';
import NavMobileMenu from '../components/home/NavMobileMenu';
import BrandsHero from '../components/brands/BrandsHero';
import BrandsGrid from '../components/brands/BrandsGrid';
import BrandDetailModal from '../components/brands/BrandDetailModal';
import StyleinFooter from '../components/footer/StyleinFooter';

export default function BrandsPage() {
  const dispatch = useDispatch();
  const { items: allBrands, loading, error, fetched } = useSelector((state) => state.brands);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!fetched) {
      dispatch(fetchBrands());
    }
  }, [dispatch, fetched]);

  const activeBrands = allBrands
    .filter((b) => !b.deleted && b.active)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden text-white selection:bg-stylein-red selection:text-white">
      {/* Subtle Ambient Radial Lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[160px] bg-stylein-red/5 pointer-events-none z-0" />

      {/* Navigation */}
      <StyleinNavbar
        isReady={true}
        mobileMenuOpen={mobileMenuOpen}
        isMenuSession={false}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
      />

      <NavMobileMenu
        isOpen={mobileMenuOpen}
        currentLang={currentLang}
        onSelectLang={(l) => setCurrentLang(l)}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Solid Opaque Page Canvas */}
      <main className="relative z-10 w-full flex flex-col items-center bg-[#05060a] shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
        <BrandsHero />
        <BrandsGrid
          brands={activeBrands}
          loading={loading}
          error={error}
          onSelectBrand={(b) => setSelectedBrand(b)}
        />
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <BrandDetailModal
            brand={selectedBrand}
            onClose={() => setSelectedBrand(null)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <StyleinFooter />
    </div>
  );
}
