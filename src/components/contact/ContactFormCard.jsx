import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';
import { SERVICE_OPTIONS, VEHICLE_BRANDS } from '../../constants/contactData';

export default function ContactFormCard() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: SERVICE_OPTIONS[0],
    brand: VEHICLE_BRANDS[0],
    model: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0 rounded-[22px] bg-[#080a0f] border border-white/[0.08] p-4.5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.85)] relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-stylein-red/5 blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 flex flex-col items-center text-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-stylein-red/15 border border-stylein-red/40 flex items-center justify-center text-stylein-red mb-1">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="font-heading text-lg font-bold text-white uppercase tracking-tight">Request Received</h3>
            <p className="font-body text-neutral-300 text-xs max-w-sm leading-relaxed">
              Thank you, <strong className="text-white font-medium">{formData.fullName}</strong>. Our automotive concierge will reach out within 15 minutes.
            </p>
            <button
              onClick={() => { setSubmitted(false); setFormData({ fullName: '', phone: '', email: '', service: SERVICE_OPTIONS[0], brand: VEHICLE_BRANDS[0], model: '', message: '' }); }}
              className="mt-3 px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white text-[0.72rem] font-medium uppercase tracking-wider font-heading cursor-pointer transition-colors"
            >
              Submit Another Request
            </button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="flex flex-col gap-3 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Full Name *</label>
                <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="e.g. Tariq Al-Mansoor" className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all placeholder:text-neutral-500 font-body" />
              </div>
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Phone Number *</label>
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 50 000 0000" className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all placeholder:text-neutral-500 font-body" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.ae" className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all placeholder:text-neutral-500 font-body" />
              </div>
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Service Required</label>
                <select name="service" value={formData.service} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all font-body cursor-pointer">
                  {SERVICE_OPTIONS.map((srv, idx) => (
                    <option key={idx} value={srv} className="bg-[#090c12] text-white">{srv}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Vehicle Brand</label>
                <select name="brand" value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-[#0a0d14] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all font-body cursor-pointer">
                  {VEHICLE_BRANDS.map((br, idx) => (
                    <option key={idx} value={br} className="bg-[#090c12] text-white">{br}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Model / Year</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Taycan Turbo S 2024" className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all placeholder:text-neutral-500 font-body" />
              </div>
            </div>

            <div>
              <label className="block text-[0.66rem] font-medium text-neutral-400 uppercase tracking-wider font-heading mb-1">Message / Location Details</label>
              <textarea rows={2} name="message" value={formData.message} onChange={handleChange} placeholder="Location or special instructions..." className="w-full px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 focus:border-stylein-red/50 text-neutral-200 text-xs outline-none transition-all placeholder:text-neutral-500 font-body resize-none" />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 w-full py-3 rounded-xl bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] hover:shadow-[0_6px_25px_rgba(229,9,20,0.45)] text-white text-xs font-semibold tracking-wider uppercase font-heading flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-98 disabled:opacity-70 group"
            >
              <span>{submitting ? 'Submitting Request...' : 'Request Service'}</span>
              <Send size={13} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
