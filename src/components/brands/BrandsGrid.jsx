import React from 'react';
import { motion } from 'framer-motion';
import BrandCard from './BrandCard';
import BrandCardSkeleton from './BrandCardSkeleton';
import { AlertCircle } from 'lucide-react';

export default function BrandsGrid({ brands, loading, error, onSelectBrand }) {
  if (loading && brands.length === 0) {
    return (
      <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-start">
          {Array.from({ length: 6 }).map((_, index) => (
            <BrandCardSkeleton key={index} index={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error && brands.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-20 flex flex-col items-center justify-center gap-2 max-w-md mx-auto text-center px-4"
      >
        <AlertCircle size={28} className="text-stylein-red" />
        <p className="text-white text-sm font-bold">Unable to load brands</p>
        <p className="text-neutral-400 text-xs">{error}</p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-start">
        {brands.map((brand, index) => (
          <BrandCard
            key={brand._id || brand.id || index}
            brand={brand}
            index={index}
            onSelect={onSelectBrand}
          />
        ))}
      </div>
    </div>
  );
}
