import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import { FormInput, FormButton } from '../components/ui/FormElements';

import Card from '../components/ui/Card';

const OrderTracking = () => {
  const [orderNum, setOrderNum] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNum.trim()) {
      setError('Please enter your order number');
      return;
    }
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const orders = JSON.parse(localStorage.getItem('alan_orders') || '[]');
      const found = orders.find(
        (o) => o.id?.toLowerCase() === orderNum.trim().toLowerCase()
      );

      if (found) {
        setOrder(found);
      } else if (orderNum.trim().toUpperCase().startsWith('ORD-')) {
        // Mock fallback for test numbers like ORD-1234
        setOrder({
          id: orderNum.trim().toUpperCase(),
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          status: 'Processing',
          step: 1,
          itemsCount: 1,
          estimatedDelivery: '3-5 Business Days'
        });
      } else {
        setOrder(null);
        setError('Order not found. Please check your order confirmation email or try ORD-1234.');
      }
    }, 700);
  };

  const sidePanelContent = (
    <>
      <Card>
        <h3 className="text-xl md:text-2xl font-serif font-playfair text-[var(--color-ink)] mb-4 leading-snug break-words">
          Shipping & Delivery Notes
        </h3>

        <div className="flex flex-col gap-5 text-sm">
          <div className="flex items-start gap-3 border-b border-[#EADBD5] pb-4">
            <Truck className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Complimentary Courier</p>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                All domestic orders are dispatched with premium insured express carriers (BlueDart / DHL).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 border-b border-[#EADBD5] pb-4">
            <Package className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Atelier Handcrafted Care</p>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                Custom bridal orders and made-to-measure pieces undergo a rigorous 48-hour final embroidery inspection.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-[#8C4A5A] shrink-0 mt-0.5" />
            <div className="min-w-0 break-words">
              <p className="font-semibold text-sm tracking-wide text-[#3A1A1D] mb-1">Tamper-Proof Box</p>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                Each package arrives in a sealed luxury garment box with archival tissue protection.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card highlight={true}>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-[#8C4A5A] shrink-0" />
          <h4 className="text-lg font-medium text-[#3A1A1D] m-0 break-words">
            Need Urgent Assistance?
          </h4>
        </div>
        <p className="text-sm text-[#6B5A56] leading-relaxed mb-3 m-0">
          Can't locate your tracking details? Contact our client dispatch desk directly at <span className="font-semibold text-[var(--color-ink)]">tracking@vastrika.com</span>.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5A1E2B] hover:underline mt-2"
        >
          Speak with concierge &rarr;
        </Link>
      </Card>
    </>
  );

  return (
    <PageShell
      eyebrow="ORDER STATUS"
      title="Track Order"
      subtext="Follow the progress of your handcrafted garments from our atelier to your doorstep."
      sidePanel={sidePanelContent}
    >
      {!order ? (
        <form onSubmit={handleTrack} className="flex flex-col gap-5">
          <FormInput
            id="orderNum"
            label="Order Number"
            placeholder="e.g. ORD-1234 or ORD-8742"
            value={orderNum}
            onChange={(e) => {
              setOrderNum(e.target.value);
              if (error) setError('');
            }}
            error={error}
            required
          />

          <FormInput
            id="email"
            type="email"
            label="Email or Phone (Optional)"
            placeholder="e.g. ananya@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="mt-6">
            <FormButton type="submit" loading={loading} className="px-6 h-12 rounded-xl">
              Track Shipment
            </FormButton>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#EADBD5] pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--color-stone)]">Order ID</span>
              <h3 className="text-xl font-serif font-playfair text-[var(--color-ink)] font-semibold mt-0.5">
                {order.id}
              </h3>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#8C4A5A]/10 text-[#8C4A5A]">
              {order.status || 'In Transit'}
            </span>
          </div>

          {/* Stepper Timeline */}
          <div className="py-2">
            <div className="relative pl-6 space-y-6 border-l-2 border-[#EADBD5]">
              {[
                { title: 'Order Confirmed', desc: 'Atelier received details', done: true },
                { title: 'Quality Handcrafting', desc: 'Garment finishing & inspection', done: true },
                { title: 'Dispatched with Courier', desc: 'Tracking active with carrier', done: false },
                { title: 'Delivered', desc: 'Expected in 2-3 business days', done: false }
              ].map((step, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 ${
                      step.done
                        ? 'bg-[#5A1E2B] border-[#5A1E2B]'
                        : 'bg-white border-[#C9B2A8]'
                    }`}
                  />
                  <div>
                    <h4 className="text-sm font-medium text-[var(--color-ink)] m-0">{step.title}</h4>
                    <p className="text-xs text-[var(--color-stone)] m-0 mt-0.5 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setOrder(null);
                setOrderNum('');
              }}
              className="w-full sm:w-auto text-xs uppercase tracking-wider font-semibold text-[#8C4A5A] hover:underline"
            >
              &larr; Track Another Order
            </button>
          </div>
        </div>
      )}
    </PageShell>
  );
};

export default OrderTracking;
