'use client';
import React, { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

const QuoteSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    material: '',
    message: '',
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('active');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Backend integration point — connect to your API / CRM here
    setSubmitted(true);
  };

  return (
    <section id="quote" ref={sectionRef} className="bg-cream border-t border-charcoal/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 pb-32">
        {/* Header row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-20 reveal">
          <div className="col-span-1 md:col-span-6">
            <span className="text-[11px] font-bold uppercase tracking-widest2 text-muted block mb-4">
              // Start Your Project
            </span>
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter leading-tight">
              Request a <br />
              <span className="italic">Quote.</span>
            </h2>
          </div>
          <div className="col-span-1 md:col-span-6 flex flex-col justify-end gap-8">
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              Fill out the form and our dispatch team will respond within 2 business hours with availability and pricing. Or call us directly.
            </p>
            <div className="flex flex-col gap-4">
              <a
                href="tel:+2349049155555"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 border border-charcoal/15 flex items-center justify-center group-hover:bg-charcoal transition-colors">
                  <Icon name="PhoneIcon" size={16} variant="outline" className="text-charcoal group-hover:text-cream transition-colors" />
                </div>
                <span className="text-sm font-bold">+234 904 915 5555</span>
              </a>
              <a
                href="mailto:info@wajudynamics.com"
                className="flex items-center gap-3 group"
              >
                <div className="w-9 h-9 border border-charcoal/15 flex items-center justify-center group-hover:bg-charcoal transition-colors">
                  <Icon name="EnvelopeIcon" size={16} variant="outline" className="text-charcoal group-hover:text-cream transition-colors" />
                </div>
                <span className="text-sm font-bold">info@wajudynamics.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="line-h mb-16" />

        {/* Form */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 reveal active">
            <div className="w-16 h-16 border border-charcoal/15 flex items-center justify-center">
              <Icon name="CheckIcon" size={32} variant="outline" className="text-charcoal" />
            </div>
            <h3 className="font-serif text-4xl tracking-tight">Quote Request Received</h3>
            <p className="text-sm text-muted text-center max-w-sm">
              Our dispatch team will contact you within 2 business hours. For urgent requests call{' '}
              <a href="tel:+2349049155555" className="text-charcoal font-bold">+234 904 915 555</a>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 reveal delay-100">
            {/* Name */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Olatunide Eze"
                className="bg-transparent text-charcoal text-sm font-medium placeholder:text-charcoal/25 focus:outline-none"
              />
            </div>

            {/* Company */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Company *
              </label>
              <input
                type="text"
                name="company"
                required
                value={form.company}
                onChange={handleChange}
                placeholder="Tunde Construction LLC"
                className="bg-transparent text-charcoal text-sm font-medium placeholder:text-charcoal/25 focus:outline-none"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+234 901 555 0140"
                className="bg-transparent text-charcoal text-sm font-medium placeholder:text-charcoal/25 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="eze@tundeconstruction.com"
                className="bg-transparent text-charcoal text-sm font-medium placeholder:text-charcoal/25 focus:outline-none"
              />
            </div>

            {/* Material type */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Material / Service
              </label>
              <select
                name="material"
                value={form.material}
                onChange={handleChange}
                className="bg-transparent text-charcoal text-sm font-medium focus:outline-none appearance-none cursor-pointer"
              >
                <option value="">Select a service...</option>
                <option value="haulage">Fuel Hualage and Delivery</option>
                <option value="concrete">Heavy Duty Machinery Rentals</option>
                <option value="steel">Real Estate Solution</option>
                <option value="earthworks">Contruction</option>
              </select>
            </div>

            {/* Project details */}
            <div className="flex flex-col gap-2 border-b border-charcoal/15 pb-3 group focus-within:border-charcoal transition-colors">
              <label className="text-[11px] font-bold uppercase tracking-widest2 text-muted">
                Project Details
              </label>
              <textarea
                name="message"
                rows={2}
                value={form.message}
                onChange={handleChange}
                placeholder="Tonnage estimate, delivery address, timeline..."
                className="bg-transparent text-charcoal text-sm font-medium placeholder:text-charcoal/25 focus:outline-none resize-none"
              />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex items-center justify-between pt-4">
              <p className="text-[11px] text-muted">* Required fields</p>
              <button
                type="submit"
                className="flex items-center gap-3 bg-[#001D3C] text-cream text-[11px] font-bold uppercase tracking-widest2 px-8 py-4 hover:bg-mid transition-colors group"
              >
                Submit Quote Request
                <Icon
                  name="ArrowRightIcon"
                  size={16}
                  variant="outline"
                  className="text-cream transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;