import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { FormInput, FormTextarea, FormButton } from '../components/ui/FormElements';

import Card from '../components/ui/Card';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your full name';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem('vastrika_lastContact', JSON.stringify(formData));
      setLoading(false);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 7000);
    }, 800);
  };

  const sidePanelContent = (
    <>
      <Card>
        <h3 className="text-xl md:text-2xl font-serif font-playfair text-[var(--color-ink)] mb-4 leading-snug break-words">
          Atelier Concierge
        </h3>
        <p className="text-sm text-[#6B5A56] leading-relaxed mb-6">
          Our master stylists and concierge team are available for personal styling appointments, bridal consultations, and bespoke custom fits.
        </p>

        <div className="flex flex-col gap-5 text-sm">
          <div className="flex items-start gap-3 border-b border-[#EADBD5] pb-4">
            <MapPin className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Atelier Location</p>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">Vastrika Flagship Studio, DLF Phase 5, Gurugram, India</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-b border-[#EADBD5] pb-4">
            <Mail className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Email Concierge</p>
              <p className="text-sm text-[#6B5A56] m-0">concierge@vastrika.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-b border-[#EADBD5] pb-4">
            <Phone className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Phone / WhatsApp</p>
              <p className="text-sm text-[#6B5A56] m-0">+91 (0) 987 654 3210</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Hours of Operation</p>
              <p className="text-sm text-[#6B5A56] m-0">Mon - Sat: 10:00 AM - 7:00 PM IST</p>
            </div>
          </div>
        </div>
      </Card>

      <Card highlight={true}>
        <h4 className="text-lg font-medium text-[#3A1A1D] mb-2 break-words">
          Bridal Appointments
        </h4>
        <p className="text-sm text-[#6B5A56] leading-relaxed mb-3">
          Planning a wedding or festive occasion? Book a one-on-one virtual or in-person consultation with our senior couturiers.
        </p>
      </Card>
    </>
  );

  return (
    <PageShell
      eyebrow="CLIENT SERVICES"
      title="Contact Us"
      subtext="Our concierge team is at your service for styling advice, order inquiries, and custom atelier requests."
      sidePanel={sidePanelContent}
    >
      {status === 'success' ? (
        <div className="py-8 px-4 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
            <CheckCircle size={28} />
          </div>
          <h3 className="text-xl font-serif font-playfair text-[var(--color-ink)] mb-2">
            Message Sent Successfully
          </h3>
          <p className="text-xs text-[var(--color-stone)] max-w-sm leading-relaxed mb-6">
            Thank you for reaching out. A Vastrika concierge specialist will respond to your inquiry within 24 business hours.
          </p>
          <FormButton onClick={() => setStatus('')} type="button">
            Send Another Inquiry
          </FormButton>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <FormInput
            id="name"
            label="Full Name"
            placeholder="e.g. Ananya Sharma"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            error={errors.name}
            required
          />

          <FormInput
            id="email"
            type="email"
            label="Email Address"
            placeholder="e.g. ananya@example.com"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: null });
            }}
            error={errors.email}
            required
          />

          <FormInput
            id="subject"
            label="Subject (Optional)"
            placeholder="e.g. Bridal Lehenga Inquiry / Order Status"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          />

          <FormTextarea
            id="message"
            label="Your Message"
            rows={5}
            placeholder="How can our concierge assist you today?"
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: null });
            }}
            error={errors.message}
            required
          />

          <div className="mt-6">
            <FormButton type="submit" loading={loading} className="px-6 h-12 rounded-xl">
              Send Message
            </FormButton>
          </div>
        </form>
      )}
    </PageShell>
  );
};

export default Contact;
