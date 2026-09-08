import React, { useState } from 'react';
import { SERVICE_CATEGORIES, CONTACT_INFO } from '../../constants/contactData';
import { Send, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: SERVICE_CATEGORIES[0],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hello STYLEIN,\n\nName: ${formData.name || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nService: ${formData.service}\nNote: ${formData.message || 'I would like to book a service.'}`
    );
    window.open(`https://wa.me/971558120570?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#0b0d14]/90 border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-stylein-red/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mb-6 sm:mb-8 text-left">
        <span className="text-[0.72rem] font-bold tracking-wider text-stylein-red uppercase font-heading flex items-center gap-1.5">
          <Sparkles size={13} /> Direct Service Inquiry
        </span>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-heading mt-1">
          Send Us a Message
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm mt-1 font-body">
          Fill out the form below or chat directly on WhatsApp for instantaneous booking.
        </p>
      </div>

      {submitted ? (
        <div className="py-12 px-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
            <CheckCircle size={32} />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Thank You!</h3>
          <p className="text-neutral-300 text-sm max-w-md mt-2 font-body">
            Your inquiry has been received. Our concierge representative will contact you within 15 minutes.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-heading">Your Name *</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tariq Al Mansoori"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-heading">Phone / WhatsApp *</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 50 000 0000"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-heading">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-heading">Required Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#121520] border border-white/10 focus:border-[#FF3B47] text-white text-sm outline-none transition-colors cursor-pointer"
              >
                {SERVICE_CATEGORIES.map((srv, idx) => (
                  <option key={idx} value={srv} className="bg-[#121520] text-white">{srv}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-heading">Vehicle Details or Notes</label>
            <textarea
              rows={3}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Car Model, Location in Ajman/Dubai, preferred arrival time..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-sm outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-[0_4px_25px_rgba(229,9,20,0.5)] transition-all cursor-pointer"
            >
              <Send size={15} />
              <span>Submit Inquiry</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare size={16} />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
