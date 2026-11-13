import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  LifeBuoy,
  ArrowRight,
  AlertCircle,
  Home,
  Compass,
} from 'lucide-react';
import { fetchBrandBySlug, clearCurrentBrand, fetchBrands } from '../../store/brands/brandsSlice';
import { getBrandSlug } from '../../utils/brandSlug';
import { optimizeCloudinary } from '../../utils/imageOptimizer';
import { SmoothScrollProvider, useSmoothScroll } from '../../context/SmoothScrollContext';
import StyleinNavbar from '../../components/home/StyleinNavbar';
import NavMobileMenu from '../../components/home/NavMobileMenu';
import StyleinFooter from '../../components/footer/StyleinFooter';
import SEO from '../../components/common/SEO';

function BrandDetailSkeleton() {
  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12 py-10 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-48 bg-white/5 rounded mb-8" />

      {/* Hero Showcase Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl p-6 sm:p-10 bg-[#0b0d14]/60 border border-white/5">
        <div className="lg:col-span-6 h-64 sm:h-80 bg-white/5 rounded-2xl" />
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="h-4 w-32 bg-stylein-red/20 rounded" />
          <div className="h-10 w-3/4 bg-white/10 rounded" />
          <div className="h-4 w-1/2 bg-white/5 rounded" />
          <div className="h-20 w-full bg-white/5 rounded mt-2" />
          <div className="flex gap-3 mt-4">
            <div className="h-11 w-36 bg-white/10 rounded-full" />
            <div className="h-11 w-36 bg-white/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandNotFoundState({ slug }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: allBrands, fetched } = useSelector((state) => state.brands);

  useEffect(() => {
    if (!fetched) dispatch(fetchBrands());
  }, [dispatch, fetched]);

  const activeBrands = (allBrands || []).filter((b) => !b.deleted && b.active).slice(0, 6);

  return (
    <div className="w-full max-w-[980px] mx-auto px-4 sm:px-8 py-20 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-stylein-red/15 border border-stylein-red/30 flex items-center justify-center mb-5 text-stylein-red">
        <AlertCircle size={32} />
      </div>

      <span className="text-stylein-red font-heading text-xs font-bold uppercase tracking-widest mb-1.5">
        404 — Brand Not Found
      </span>

      <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
        Automotive Profile Unavailable
      </h1>

      <p className="text-neutral-400 text-sm sm:text-base max-w-lg mb-8 leading-relaxed font-body">
        The brand or vehicle profile for <span className="text-white font-mono bg-white/10 px-2 py-0.5 rounded text-xs">{slug}</span> does not exist or has been retired from our active fleet catalog.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
        <Link
          to="/brands"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-stylein-red hover:bg-[#b00710] shadow-[0_4px_20px_rgba(229,9,20,0.4)] transition-all active:scale-95 no-underline"
        >
          <Compass size={16} />
          <span>Browse All Active Brands</span>
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95 no-underline"
        >
          <Home size={16} />
          <span>Back to Home</span>
        </Link>
      </div>

      {activeBrands.length > 0 && (
        <div className="w-full pt-10 border-t border-white/10 text-left">
          <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 text-center">
            Popular Luxury Marques
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {activeBrands.map((b) => (
              <Link
                key={b._id || b.id}
                to={`/brands/${getBrandSlug(b)}`}
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 flex items-center gap-3 transition-colors no-underline group"
              >
                {b.image && (
                  <img src={optimizeCloudinary(b.image, 100)} alt={b.name} className="w-10 h-10 object-contain shrink-0" />
                )}
                <div className="truncate">
                  <p className="text-xs font-bold text-white group-hover:text-stylein-red truncate transition-colors">
                    {b.name}
                  </p>
                  <p className="text-[0.68rem] text-neutral-400 truncate">{b.tagline || 'View Profile'}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BrandDetailContent() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentBrand: brand, detailLoading: loading, detailError: error, redirectInfo, items: allBrands } = useSelector(
    (state) => state.brands
  );

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = React.useState(false);
  const [capturedScrollY, setCapturedScrollY] = React.useState(0);
  const savedScrollRef = useRef(0);
  const lenis = useSmoothScroll();

  // Load Brand Data
  useEffect(() => {
    if (slug) {
      dispatch(fetchBrandBySlug(slug));
    }
    return () => {
      dispatch(clearCurrentBrand());
    };
  }, [slug, dispatch]);

  // Handle Old Slug Permanent Redirects (HTTP 301 / Canonical address bar update)
  useEffect(() => {
    if (redirectInfo?.isRedirect && redirectInfo?.currentSlug && redirectInfo.currentSlug !== slug) {
      const search = location.search || '';
      navigate(`/brands/${redirectInfo.currentSlug}${search}`, { replace: true });
    }
  }, [redirectInfo, slug, navigate, location.search]);

  // Sync scroll lock for 3D Mobile Menu
  const handleOpenMenu = () => {
    const scroll = lenis?.scroll ?? window.scrollY ?? document.documentElement.scrollTop ?? 0;
    savedScrollRef.current = scroll;
    setCapturedScrollY(scroll);
    setIsMenuAnimating(true);
    setMobileMenuOpen(true);
    lenis?.stop();
  };

  const isLockedState = mobileMenuOpen || isMenuAnimating;

  useLayoutEffect(() => {
    if (!isLockedState && !mobileMenuOpen) {
      const target = savedScrollRef.current;
      window.scrollTo(0, target);
      document.documentElement.scrollTop = target;
      document.body.scrollTop = target;
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(target, { immediate: true });
        lenis.start();
      }
    }
  }, [isLockedState, mobileMenuOpen, lenis]);

  const canonicalSlug = brand ? getBrandSlug(brand) : slug;
  const canonicalUrl = `https://www.styleincar.com/brands/${canonicalSlug}`;
  const seoTitle = brand ? `${brand.name} Cars in India | StyleinCar` : 'Brand Details | StyleinCar';
  const seoDesc = brand?.description
    ? `Explore ${brand.name} cars, available models, specifications, and bespoke care details at StyleinCar.`
    : `Explore ${brand?.name || 'luxury'} cars, available models, specifications and details at StyleinCar.`;

  // Filter other active brands for bottom showcase
  const relatedBrands = (allBrands || [])
    .filter((b) => !b.deleted && b.active && getBrandSlug(b) !== canonicalSlug)
    .slice(0, 4);

  return (
    <div className="bg-[#05060a] min-h-screen relative overflow-x-hidden selection:bg-stylein-red selection:text-white">
      <SEO
        pageKey="brand-detail"
        title={seoTitle}
        description={seoDesc}
        canonicalUrl={canonicalUrl}
        ogImage={brand?.image}
      />

      <NavMobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Main Website Canvas */}
      <motion.main
        animate={
          mobileMenuOpen
            ? {
                x: '44%',
                scale: 0.62,
                borderRadius: '32px',
                boxShadow: '-25px 0 70px rgba(0,0,0,0.98), 0 0 0 1px rgba(255,255,255,0.18)',
              }
            : { x: '0%', scale: 1, borderRadius: '0px', boxShadow: 'none' }
        }
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (!mobileMenuOpen) setIsMenuAnimating(false);
        }}
        style={{
          transformOrigin: 'center center',
          transform: !mobileMenuOpen && !isLockedState ? 'none' : undefined,
        }}
        className={`w-full bg-[#030406] z-30 transition-[border-radius] ${
          isLockedState
            ? 'h-[100dvh] max-h-[100dvh] overflow-hidden fixed top-0 bottom-0 left-0 right-0 m-auto pointer-events-none lg:pointer-events-auto'
            : 'relative min-h-screen'
        }`}
      >
        {mobileMenuOpen && (
          <div aria-label="Scaled website view" className="absolute inset-0 z-[2500] pointer-events-auto cursor-default bg-black/15 select-none" />
        )}

        <div style={{ transform: isLockedState ? `translateY(-${capturedScrollY}px)` : 'none' }} className="w-full">
          <StyleinNavbar isReady={true} mobileMenuOpen={mobileMenuOpen} isMenuSession={isLockedState} onToggleMobileMenu={handleOpenMenu} />

          <div className="relative z-10 w-full flex flex-col items-center bg-[#05060a] shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-b border-white/5 pt-20 sm:pt-24 lg:pt-28 rounded-b-[32px] sm:rounded-b-[40px] md:rounded-b-[48px] lg:rounded-b-[56px] overflow-hidden pb-16 sm:pb-24">
            {loading ? (
              <BrandDetailSkeleton />
            ) : error || !brand ? (
              <BrandNotFoundState slug={slug} />
            ) : (
              <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 lg:px-12">
                {/* 1. Breadcrumbs Navigation */}
                <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8 flex items-center gap-2 text-xs text-neutral-400 font-body">
                  <Link to="/" className="hover:text-white transition-colors flex items-center gap-1 no-underline text-neutral-400">
                    <Home size={13} />
                    <span>Home</span>
                  </Link>
                  <ChevronRight size={12} className="text-neutral-600" />
                  <Link to="/brands" className="hover:text-white transition-colors no-underline text-neutral-400">
                    Brands
                  </Link>
                  <ChevronRight size={12} className="text-neutral-600" />
                  <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">{brand.name}</span>
                </nav>

                {/* 2. Main Brand Showcase Card */}
                <section className="relative rounded-3xl sm:rounded-[36px] bg-[#0b0d14] border border-white/[0.1] shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden p-6 sm:p-10 lg:p-12 mb-12">
                  {/* Subtle Red Ambient Glow */}
                  <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full bg-stylein-red/10 blur-[100px] pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    {/* Left: Prominent Vehicle Centerpiece Image */}
                    <div className="lg:col-span-6 w-full flex items-center justify-center relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
                      <div className="w-full h-full max-h-[380px] flex items-center justify-center">
                        <img
                          src={optimizeCloudinary(brand.image, 800)}
                          alt={brand.name}
                          title={brand.name}
                          className="w-full h-full max-h-[380px] object-contain drop-shadow-[0_20px_45px_rgba(0,0,0,0.98)] select-none will-change-transform"
                          loading="eager"
                        />
                      </div>
                    </div>

                    {/* Right: Brand Title, Tagline, Description & CTAs */}
                    <div className="lg:col-span-6 flex flex-col justify-center text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-stylein-red/15 border border-stylein-red/30 text-stylein-red text-[0.68rem] font-black uppercase tracking-widest">
                          Certified Automotive Profile
                        </span>
                        {brand.featured && (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-[0.65rem] font-bold uppercase tracking-wider">
                            Featured Marque
                          </span>
                        )}
                      </div>

                      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-[1.08] mb-2.5">
                        {brand.name}
                      </h1>

                      {brand.tagline && (
                        <p className="text-stylein-red text-xs sm:text-sm font-bold uppercase tracking-wider font-heading mb-4">
                          {brand.tagline}
                        </p>
                      )}

                      <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-body mb-6">
                        {brand.description ||
                          'Comprehensive doorstep luxury care and precision automotive maintenance calibrated specifically for this prestige marque.'}
                      </p>

                      {/* Primary Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <Link
                          to="/services"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-stylein-red hover:bg-[#b00710] shadow-[0_4px_22px_rgba(229,9,20,0.45)] transition-all active:scale-95 no-underline group"
                        >
                          <Sparkles size={16} />
                          <span>Book Doorstep Service</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <Link
                          to="/rescue"
                          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all active:scale-95 no-underline"
                        >
                          <LifeBuoy size={16} className="text-stylein-red" />
                          <span>24/7 Roadside Rescue</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Bespoke Care Highlights Section */}
                {brand.highlights && brand.highlights.length > 0 && (
                  <section className="mb-14 rounded-3xl bg-[#090b10] border border-white/[0.08] p-6 sm:p-10 text-left">
                    <div className="flex items-center gap-2.5 mb-6">
                      <div className="w-8 h-8 rounded-lg bg-stylein-red/15 flex items-center justify-center text-stylein-red">
                        <ShieldCheck size={18} />
                      </div>
                      <div>
                        <h2 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                          Bespoke Care Highlights
                        </h2>
                        <p className="text-neutral-400 text-xs">
                          Engineered procedures and certified OEM products for {brand.name}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4">
                      {brand.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3 hover:border-white/15 transition-colors"
                        >
                          <CheckCircle2 size={16} className="text-stylein-red shrink-0 mt-0.5" />
                          <span className="text-neutral-200 text-xs sm:text-sm leading-relaxed font-body">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 4. Vehicles Belonging to Brand / Dedicated Model Showcase */}
                {Array.isArray(brand.vehicles) && brand.vehicles.length > 0 ? (
                  <section className="mb-14 text-left">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight">
                          Vehicles In This Family
                        </h2>
                        <p className="text-neutral-400 text-xs">Models supported under our dedicated doorstep program</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {brand.vehicles.map((v, i) => (
                        <div
                          key={v._id || v.id || i}
                          className="rounded-2xl p-5 bg-[#0b0d14] border border-white/10 flex flex-col justify-between"
                        >
                          {v.image && (
                            <img
                              src={optimizeCloudinary(v.image, 400)}
                              alt={v.name || 'Vehicle'}
                              className="w-full h-36 object-contain mb-3"
                              loading="lazy"
                            />
                          )}
                          <h3 className="font-heading text-sm font-bold uppercase text-white">{v.name}</h3>
                          {v.tagline && <p className="text-stylein-red text-[0.7rem] font-bold mt-1">{v.tagline}</p>}
                          {v.description && <p className="text-neutral-400 text-xs mt-2">{v.description}</p>}
                        </div>
                      ))}
                    </div>
                  </section>
                ) : (
                  /* Standard Vehicle Profile Services Breakdown */
                  <section className="mb-14 text-left">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="font-heading text-xl sm:text-2xl font-extrabold uppercase text-white tracking-tight">
                          Recommended Services for {brand.name}
                        </h2>
                        <p className="text-neutral-400 text-xs">
                          Doorstep mobile care units dispatched directly to your residence or office
                        </p>
                      </div>
                      <Link to="/services" className="text-stylein-red text-xs font-bold hover:underline no-underline flex items-center gap-1">
                        <span>View All</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        {
                          title: 'Foam & Steam Wash',
                          sub: 'Scratch-free wash with pH-neutral shampoo and micro-fibre mitts',
                          tag: 'Exterior & Interior',
                        },
                        {
                          title: 'Ceramic Glass Coating',
                          sub: '9H hardness paint shield protecting against UV rays & road sand',
                          tag: 'Paint Protection',
                        },
                        {
                          title: 'Synthetic Oil Change',
                          sub: 'OEM-grade synthetic oil & genuine filter replacement at your doorstep',
                          tag: 'Powertrain',
                        },
                        {
                          title: 'Battery & Tyre Health',
                          sub: 'Digital 50-point diagnostic check, battery load test & mobile tyre fitting',
                          tag: 'Diagnostics',
                        },
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-[#090b10] border border-white/[0.08] hover:border-stylein-red/40 transition-colors flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[0.65rem] font-black uppercase text-stylein-red tracking-wider">
                              {item.tag}
                            </span>
                            <h3 className="font-heading text-sm font-extrabold uppercase text-white mt-1 mb-2">
                              {item.title}
                            </h3>
                            <p className="text-neutral-400 text-xs leading-relaxed font-body">
                              {item.sub}
                            </p>
                          </div>
                          <Link
                            to="/services"
                            className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-white text-xs font-bold hover:text-stylein-red transition-colors no-underline group"
                          >
                            <span>Book Now</span>
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* 5. More Luxury Marques */}
                {relatedBrands.length > 0 && (
                  <section className="text-left pt-8 border-t border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-heading text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight">
                        Explore Other Luxury Marques
                      </h2>
                      <Link
                        to="/brands"
                        className="text-xs font-bold text-neutral-400 hover:text-white transition-colors no-underline flex items-center gap-1"
                      >
                        <span>View All ({allBrands?.length || 14})</span>
                        <ChevronRight size={12} />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                      {relatedBrands.map((b) => (
                        <Link
                          key={b._id || b.id}
                          to={`/brands/${getBrandSlug(b)}`}
                          className="p-4 rounded-2xl bg-[#0b0d14] border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 flex flex-col items-center text-center no-underline group shadow-lg"
                        >
                          <div className="w-full h-24 flex items-center justify-center overflow-hidden mb-2">
                            <img
                              src={optimizeCloudinary(b.image, 250)}
                              alt={b.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-xs font-bold text-white uppercase group-hover:text-stylein-red truncate w-full transition-colors font-heading">
                            {b.name}
                          </p>
                          <p className="text-[0.65rem] text-stylein-red font-bold uppercase truncate w-full mt-0.5">
                            {b.tagline || 'Prestige Profile'}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>

          <StyleinFooter />
        </div>
      </motion.main>
    </div>
  );
}

export default function BrandDetailPage() {
  return (
    <SmoothScrollProvider>
      <BrandDetailContent />
    </SmoothScrollProvider>
  );
}
