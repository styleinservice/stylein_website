import React, { useState } from 'react';
import { Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
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
      `Hello STYLEIN,\nName: ${formData.name || 'Not provided'}\nPhone: ${formData.phone || 'Not provided'}\nSubject: ${formData.subject || 'General Inquiry'}\nNote: ${formData.message || 'I would like to inquire about services.'}`
    );
    window.open(`https://wa.me/971558120570?text=${text}`, '_blank');
  };

  return (
    <div className="w-full bg-[#0b0d14]/90 border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden text-left">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white font-heading">
          Send Us a Message
        </h2>
        <p className="text-neutral-400 text-xs mt-0.5 font-body">
          Fill out the details below or message our team directly on WhatsApp.
        </p>
      </div>

      {submitted ? (
        <div className="py-8 px-2 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <CheckCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-white font-heading">Inquiry Received</h3>
          <p className="text-neutral-300 text-xs max-w-sm mt-1 font-body">
            Thank you! Our concierge representative will contact you within 15 minutes.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.72rem] font-semibold text-neutral-300 mb-1 font-heading">Your Name *</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Tariq Al Mansoori"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-neutral-300 mb-1 font-heading">Phone / WhatsApp *</label>
              <input
                required
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+971 50 000 0000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[0.72rem] font-semibold text-neutral-300 mb-1 font-heading">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@domain.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[0.72rem] font-semibold text-neutral-300 mb-1 font-heading">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Car Wash, Battery, Service Quote..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-xs sm:text-sm outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.72rem] font-semibold text-neutral-300 mb-1 font-heading">Vehicle Details or Notes</label>
            <textarea
              rows={2}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="e.g. Car Model, Location in Ajman/Dubai..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 focus:border-[#FF3B47] text-white text-xs sm:text-sm outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <button
              type="submit"
              className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E50914] via-[#FF1F2D] to-[#E50914] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:shadow-[0_4px_20px_rgba(229,9,20,0.4)] transition-all cursor-pointer"
            >
              <Send size={14} />
              <span>Submit Inquiry</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppSend}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <MessageSquare size={14} />
              <span>Send via WhatsApp</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
