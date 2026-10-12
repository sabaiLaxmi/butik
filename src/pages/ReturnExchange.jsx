import React, { useReducer, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Calendar,
  CheckCircle,
  Tag,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
  Truck,
  HelpCircle,
  PackageCheck,
  Check
} from 'lucide-react';
import PageShell from '../components/layout/PageShell';
import Card from '../components/ui/Card';
import { FormInput, FormSelect, FormTextarea, FormButton } from '../components/ui/FormElements';

// Initial Reducer State
const initialState = {
  step: 1,
  direction: 1, // 1 for forward, -1 for back
  loading: false,
  orderNumber: '',
  email: '',
  errors: {},
  order: null, // Fetched order data
  selectedItems: {}, // { [itemId]: { quantity: number, item: obj } }
  reason: 'Size issue',
  details: '',
  resolution: 'Exchange for another size', // 'Return for refund' | 'Exchange for another size' | 'Store credit'
  photos: [], // array of { file, previewUrl, name, size }
  agreedToPolicy: false,
  requestId: null,
  submittedAt: null
};

// Reducer for all Return & Exchange flow state
function returnExchangeReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: null }
      };

    case 'SET_ERRORS':
      return { ...state, errors: action.errors };

    case 'SET_LOADING':
      return { ...state, loading: action.loading };

    case 'ORDER_LOADED':
      return {
        ...state,
        order: action.order,
        loading: false,
        step: 2,
        direction: 1,
        // pre-select first item by default for convenience or empty
        selectedItems: {
          [action.order.items[0].id]: {
            quantity: 1,
            item: action.order.items[0]
          }
        }
      };

    case 'TOGGLE_ITEM': {
      const { item } = action;
      const nextSelected = { ...state.selectedItems };
      if (nextSelected[item.id]) {
        delete nextSelected[item.id];
      } else {
        nextSelected[item.id] = { quantity: 1, item };
      }
      return { ...state, selectedItems: nextSelected };
    }

    case 'UPDATE_ITEM_QUANTITY': {
      const { itemId, quantity } = action;
      if (!state.selectedItems[itemId]) return state;
      return {
        ...state,
        selectedItems: {
          ...state.selectedItems,
          [itemId]: {
            ...state.selectedItems[itemId],
            quantity: Math.max(1, quantity)
          }
        }
      };
    }

    case 'ADD_PHOTOS':
      return {
        ...state,
        photos: [...state.photos, ...action.newPhotos].slice(0, 3)
      };

    case 'REMOVE_PHOTO':
      return {
        ...state,
        photos: state.photos.filter((_, idx) => idx !== action.index)
      };

    case 'GO_TO_STEP':
      return {
        ...state,
        step: action.step,
        direction: action.step > state.step ? 1 : -1
      };

    case 'SUBMIT_SUCCESS':
      return {
        ...state,
        loading: false,
        requestId: action.requestId,
        submittedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };

    case 'RESET_FLOW':
      return {
        ...initialState,
        step: 1
      };

    default:
      return state;
  }
}

// Mock fetchOrder API function
const fetchOrder = async (orderNum, email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Check existing orders in localStorage if any
      const storedOrders = JSON.parse(localStorage.getItem('alan_orders') || '[]');
      const match = storedOrders.find(
        (o) => o.id?.toLowerCase() === orderNum.trim().toLowerCase()
      );

      if (match && match.items && match.items.length > 0) {
        resolve(match);
        return;
      }

      // Default high quality mock order with royal bridal & couture items
      resolve({
        id: orderNum.trim().toUpperCase() || 'ORD-9842',
        email: email.trim().toLowerCase(),
        date: 'Oct 05, 2026',
        status: 'Delivered',
        deliveryDate: 'Oct 08, 2026',
        items: [
          {
            id: 'item-101',
            name: 'Rose Gold Zardozi Lehenga Set',
            size: 'M',
            price: '$790.00',
            maxQuantity: 1,
            image:
              'https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704699/fish_1.png'
          },
          {
            id: 'item-102',
            name: 'Imperial Crimson Embroidered Sherwani',
            size: 'L',
            price: '$650.00',
            maxQuantity: 1,
            image:
              'https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704696/sher.png'
          },
          {
            id: 'item-103',
            name: 'Handloom Kanjivaram Silk Saree',
            size: 'Free Size',
            price: '$480.00',
            maxQuantity: 2,
            image:
              'https://res.cloudinary.com/snuwehqj/image/upload/f_auto,q_auto,h_700/v1791704710/sareeset.png'
          }
        ]
      });
    }, 850);
  });
};

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }
  },
  exit: (direction) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' }
  })
};

const ReturnExchange = () => {
  const [state, dispatch] = useReducer(returnExchangeReducer, initialState);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Step 1 Validation
  const handleFindOrder = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!state.orderNumber.trim()) errors.orderNumber = 'Order number is required (e.g. ORD-9842)';
    if (!state.email.trim() || !state.email.includes('@')) {
      errors.email = 'A valid email address is required';
    }

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SET_LOADING', loading: true });
    try {
      const orderData = await fetchOrder(state.orderNumber, state.email);
      dispatch({ type: 'ORDER_LOADED', order: orderData });
    } catch {
      dispatch({
        type: 'SET_ERRORS',
        errors: { orderNumber: 'Could not locate order. Please check your credentials.' }
      });
      dispatch({ type: 'SET_LOADING', loading: false });
    }
  };

  // Step 3 Photo Upload Handler
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validPhotos = [];
    const photoErrors = [];

    files.forEach((file) => {
      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        photoErrors.push(`${file.name} exceeds 5 MB`);
        return;
      }
      validPhotos.push({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        previewUrl: URL.createObjectURL(file)
      });
    });

    if (photoErrors.length > 0) {
      dispatch({
        type: 'SET_ERRORS',
        errors: { photos: photoErrors.join(', ') }
      });
    }

    if (validPhotos.length > 0) {
      dispatch({ type: 'ADD_PHOTOS', newPhotos: validPhotos });
    }
    // reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Step 4 Final Submit
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (!state.agreedToPolicy) {
      dispatch({
        type: 'SET_ERRORS',
        errors: { agreement: 'Please accept the return & exchange policy' }
      });
      return;
    }

    dispatch({ type: 'SET_LOADING', loading: true });
    setTimeout(() => {
      const generatedId = `RET-${Math.floor(10000 + Math.random() * 90000)}`;
      dispatch({ type: 'SUBMIT_SUCCESS', requestId: generatedId });
    }, 900);
  };

  // Step validation helpers for Next button states
  const isStep2Valid = Object.keys(state.selectedItems).length > 0;
  const isStep3Valid = Boolean(state.reason && state.resolution);
  const isStep4Valid = state.agreedToPolicy;

  // Desktop Side Panel Content
  const sidePanelContent = (
    <>
      {/* Return Policy Summary Card */}
      <Card>
        <h3 className="text-xl md:text-2xl font-serif font-playfair text-[var(--color-ink)] mb-4 break-words leading-snug">
          Return Policy Summary
        </h3>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-start border-b border-[#EADBD5] pb-4">
            <Calendar className="shrink-0 h-5 w-5 text-[#8C4A5A] mt-0.5" />
            <div className="min-w-0 break-words">
              <h4 className="text-sm font-semibold tracking-wide text-[#3A1A1D] mb-1">
                7-Day Window
              </h4>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                Requests must be initiated within 7 calendar days of confirmed doorstep delivery.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start border-b border-[#EADBD5] pb-4">
            <Tag className="shrink-0 h-5 w-5 text-[#8C4A5A] mt-0.5" />
            <div className="min-w-0 break-words">
              <h4 className="text-sm font-semibold tracking-wide text-[#3A1A1D] mb-1">
                Unused With Security Tags
              </h4>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                Garments must be unworn, unwashed, unaltered, and accompanied by original packaging and tag fasteners.
              </p>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <Truck className="shrink-0 h-5 w-5 text-[#8C4A5A] mt-0.5" />
            <div className="min-w-0 break-words">
              <h4 className="text-sm font-semibold tracking-wide text-[#3A1A1D] mb-1">
                Reverse Pickup
              </h4>
              <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                Our logistics partner schedules insured pickup from your address within 2-3 business days.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Need Help Card */}
      <Card highlight={true}>
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="h-5 w-5 text-[#8C4A5A] shrink-0" />
          <h4 className="text-lg font-medium text-[#3A1A1D] m-0 break-words">
            Need Help? Contact Us
          </h4>
        </div>
        <p className="text-sm text-[#6B5A56] leading-relaxed mb-3 m-0">
          Have an urgent size dilemma or bespoke fit query? Our dedicated atelier team is here to assist.
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
      eyebrow="ATELIER SERVICES"
      title="Return & Exchange"
      subtext="Initiate a seamless return, size exchange, or store credit for eligible handcrafted pieces."
      sidePanel={sidePanelContent}
    >
      {/* SUCCESS SCREEN */}
      {state.requestId ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="py-4 flex flex-col items-center text-center"
        >
          <div className="w-14 h-14 rounded-full bg-[#8C4A5A]/10 text-[#5A1E2B] flex items-center justify-center mb-4">
            <PackageCheck size={32} />
          </div>

          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#8C4A5A] mb-1">
            REQUEST CONFIRMED
          </span>

          <h2 className="text-2xl md:text-3xl font-serif font-playfair text-[var(--color-ink)] mb-2">
            Request ID: {state.requestId}
          </h2>

          <p className="text-xs text-[var(--color-stone)] max-w-md leading-relaxed mb-6">
            We have registered your request for order <strong>{state.order?.id}</strong>. A confirmation email with reverse pickup documentation has been dispatched to <strong>{state.email}</strong>.
          </p>

          {/* Timeline of What Happens Next */}
          <div className="w-full bg-[#FAF6F4] rounded-2xl p-5 border border-[#EADBD5] mb-8 text-left">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[var(--color-ink)] mb-4">
              What Happens Next
            </h4>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#5A1E2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Courier Pickup (2–3 Days)</p>
                  <p className="text-[var(--color-stone)] mt-0.5 leading-relaxed">
                    Our reverse courier will arrive at your shipping address with a secure Vastrika garment box.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#5A1E2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">Atelier Quality Inspection</p>
                  <p className="text-[var(--color-stone)] mt-0.5 leading-relaxed">
                    Our garment artisans examine fabric integrity, embroidery, and security tags.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#5A1E2B] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-ink)]">
                    {state.resolution === 'Exchange for another size'
                      ? 'Exchange Dispatched'
                      : 'Refund / Credit Processed (5–7 Days)'}
                  </p>
                  <p className="text-[var(--color-stone)] mt-0.5 leading-relaxed">
                    {state.resolution === 'Exchange for another size'
                      ? 'Your replacement piece will be dispatched with priority courier.'
                      : 'Funds will reflect in your original payment method within 5–7 business days.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <FormButton
              type="button"
              onClick={() => navigate(`/track?order=${state.order?.id}`)}
              className="w-full sm:w-auto"
            >
              Track Request
            </FormButton>
            <button
              type="button"
              onClick={() => dispatch({ type: 'RESET_FLOW' })}
              className="text-xs uppercase tracking-wider font-semibold text-[var(--color-ink)] hover:underline py-2 px-4"
            >
              Start Another Request
            </button>
          </div>
        </motion.div>
      ) : (
        <div>
          {/* Progress Indicator Bar (Step X of 4) */}
          <div className="mb-5 pb-5 border-b border-[#EADBD5]">
            <div className="flex items-center justify-between mb-2 text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#8C4A5A]">
                STEP {state.step} OF 4
              </span>
              <span className="font-medium text-[#6B5A56]">
                {state.step === 1 && 'Find Your Order'}
                {state.step === 2 && 'Select Items'}
                {state.step === 3 && 'Reason & Resolution'}
                {state.step === 4 && 'Review & Submit'}
              </span>
            </div>

            {/* Visual Step Bar */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((stepNum) => {
                const isPassed = state.step > stepNum;
                const isCurrent = state.step === stepNum;
                return (
                  <div
                    key={stepNum}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isPassed
                        ? 'bg-[#5A1E2B]'
                        : isCurrent
                        ? 'bg-[#8C4A5A]'
                        : 'bg-[#EADBD5]'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Stepper Content with Framer Motion Slide Transitions */}
          <AnimatePresence mode="wait" custom={state.direction}>
            {/* STEP 1: FIND ORDER */}
            {state.step === 1 && (
              <motion.div
                key="step-1"
                custom={state.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="mt-6 mb-6">
                  <h3 className="text-2xl md:text-3xl font-serif font-playfair text-[var(--color-ink)] mb-2 leading-snug">
                    Locate Your Order
                  </h3>
                  <p className="text-sm text-[#6B5A56] leading-relaxed m-0">
                    Enter the order number and email address associated with your purchase to retrieve eligible items.
                  </p>
                </div>

                <form onSubmit={handleFindOrder} className="flex flex-col gap-5">
                  <FormInput
                    id="orderNumber"
                    label="Order Number"
                    placeholder="e.g. ORD-9842"
                    value={state.orderNumber}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'orderNumber',
                        value: e.target.value
                      })
                    }
                    error={state.errors.orderNumber}
                    required
                  />

                  <FormInput
                    id="email"
                    type="email"
                    label="Email Address"
                    placeholder="name@example.com"
                    value={state.email}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'email',
                        value: e.target.value
                      })
                    }
                    error={state.errors.email}
                    required
                  />

                  <div className="mt-6 flex justify-end">
                    <FormButton
                      type="submit"
                      loading={state.loading}
                      disabled={!state.orderNumber.trim() || !state.email.trim()}
                      className="w-full sm:w-auto px-6 h-12 text-sm rounded-xl"
                    >
                      <span>Find Order</span>
                      <ArrowRight size={16} />
                    </FormButton>
                  </div>
                </form>
              </motion.div>
            )}

            {/* STEP 2: SELECT ITEMS */}
            {state.step === 2 && (
              <motion.div
                key="step-2"
                custom={state.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="mb-5">
                  <h3 className="text-lg font-serif font-playfair text-[var(--color-ink)] mb-1">
                    Select Items to Return or Exchange
                  </h3>
                  <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                    Order <strong>{state.order?.id}</strong> &bull; Delivered on {state.order?.deliveryDate || 'Oct 08, 2026'}. Choose which garments to include.
                  </p>
                </div>

                {/* Items List */}
                <div className="space-y-3 mb-6">
                  {state.order?.items.map((item) => {
                    const isSelected = Boolean(state.selectedItems[item.id]);
                    const currentQty = state.selectedItems[item.id]?.quantity || 1;

                    return (
                      <div
                        key={item.id}
                        onClick={() => dispatch({ type: 'TOGGLE_ITEM', item })}
                        className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 sm:gap-4 select-none ${
                          isSelected
                            ? 'bg-[#FDF8F6] border-[#5A1E2B] shadow-sm ring-1 ring-[#5A1E2B]/10'
                            : 'bg-white border-[#EADBD5] hover:border-[#C9B2A8]'
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                          {/* Custom Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0 ${
                              isSelected
                                ? 'bg-[#5A1E2B] border-[#5A1E2B] text-white'
                                : 'bg-white border-[#C9B2A8]'
                            }`}
                          >
                            {isSelected && <Check size={14} strokeWidth={2.5} />}
                          </div>

                          {/* Image on soft blush background */}
                          <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-lg bg-[#F3E6E2] p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain drop-shadow-sm"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-serif font-playfair font-semibold text-[var(--color-ink)] truncate m-0">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-[var(--color-stone)] mt-0.5 m-0">
                              Size: <span className="font-medium text-[var(--color-ink)]">{item.size}</span>
                            </p>
                            <p className="text-xs font-semibold text-[#5A1E2B] mt-1 m-0">
                              {item.price}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Selector (when selected) */}
                        {isSelected && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="flex flex-col items-end gap-1 shrink-0"
                          >
                            <label className="text-[10px] uppercase font-semibold text-[var(--color-stone)]">
                              Qty
                            </label>
                            <select
                              value={currentQty}
                              onChange={(e) =>
                                dispatch({
                                  type: 'UPDATE_ITEM_QUANTITY',
                                  itemId: item.id,
                                  quantity: Number(e.target.value)
                                })
                              }
                              className="h-8 px-2 text-xs font-medium rounded-lg border border-[#E3D2CC] bg-white text-[var(--color-ink)] outline-none focus:border-[#5A1E2B]"
                            >
                              {[...Array(item.maxQuantity || 1)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'GO_TO_STEP', step: 1 })}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <FormButton
                    type="button"
                    disabled={!isStep2Valid}
                    onClick={() => dispatch({ type: 'GO_TO_STEP', step: 3 })}
                    className="w-full sm:w-auto"
                  >
                    <span>Continue</span>
                    <ArrowRight size={16} />
                  </FormButton>
                </div>
              </motion.div>
            )}

            {/* STEP 3: REASON & RESOLUTION */}
            {state.step === 3 && (
              <motion.div
                key="step-3"
                custom={state.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="mb-5">
                  <h3 className="text-lg font-serif font-playfair text-[var(--color-ink)] mb-1">
                    Reason & Preferred Resolution
                  </h3>
                  <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                    Tell us why you are returning or exchanging the item and choose your preferred outcome.
                  </p>
                </div>

                <div className="space-y-5">
                  {/* Reason Select */}
                  <FormSelect
                    id="reason"
                    label="Reason for Request"
                    value={state.reason}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'reason',
                        value: e.target.value
                      })
                    }
                  >
                    <option value="Size issue">Size issue (Too large / Too tight)</option>
                    <option value="Color different">Color different from website</option>
                    <option value="Damaged item">Damaged item / Defective embroidery</option>
                    <option value="Not as expected">Not as expected / Fabric feel</option>
                    <option value="Other">Other</option>
                  </FormSelect>

                  {/* Details Textarea */}
                  <FormTextarea
                    id="details"
                    label="Details & Fit Feedback (Optional)"
                    rows={3}
                    placeholder="Provide additional notes to help our atelier stylists (e.g. Need size S instead of M, sleeve length was tight...)"
                    value={state.details}
                    onChange={(e) =>
                      dispatch({
                        type: 'SET_FIELD',
                        field: 'details',
                        value: e.target.value
                      })
                    }
                  />

                  {/* Radio Choice: Resolution */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-wider font-medium text-[var(--color-ink)]">
                      Desired Resolution
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {[
                        {
                          id: 'Exchange for another size',
                          label: 'Exchange for Size',
                          desc: 'Complimentary shipping'
                        },
                        {
                          id: 'Return for refund',
                          label: 'Return for Refund',
                          desc: 'To original payment'
                        },
                        {
                          id: 'Store credit',
                          label: 'Store Credit',
                          desc: '+10% Bonus credit'
                        }
                      ].map((res) => {
                        const isChosen = state.resolution === res.id;
                        return (
                          <div
                            key={res.id}
                            onClick={() =>
                              dispatch({
                                type: 'SET_FIELD',
                                field: 'resolution',
                                value: res.id
                              })
                            }
                            className={`p-3 rounded-xl border cursor-pointer transition-all ${
                              isChosen
                                ? 'bg-[#FDF8F6] border-[#5A1E2B] ring-1 ring-[#5A1E2B]/15'
                                : 'bg-white border-[#EADBD5] hover:border-[#C9B2A8]'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                  isChosen
                                    ? 'border-[#5A1E2B] bg-[#5A1E2B]'
                                    : 'border-[#C9B2A8] bg-white'
                                }`}
                              >
                                {isChosen && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                              <span className="text-xs font-semibold text-[var(--color-ink)]">
                                {res.label}
                              </span>
                            </div>
                            <p className="text-[10px] text-[var(--color-stone)] pl-6 leading-tight m-0">
                              {res.desc}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Image Upload (up to 3 photos, max 5MB) */}
                  <div className="flex flex-col gap-2 pt-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs uppercase tracking-wider font-medium text-[var(--color-ink)]">
                        Upload Photos (Optional, max 3)
                      </label>
                      <span className="text-[11px] text-[var(--color-stone)]">
                        {state.photos.length}/3 photos &bull; Max 5 MB each
                      </span>
                    </div>

                    {/* Previews and Upload Box */}
                    <div className="flex items-center gap-3 flex-wrap">
                      {state.photos.map((photo, idx) => (
                        <div
                          key={idx}
                          className="relative w-20 h-20 rounded-xl border border-[#EADBD5] bg-[#FAF6F4] overflow-hidden group"
                        >
                          <img
                            src={photo.previewUrl}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => dispatch({ type: 'REMOVE_PHOTO', index: idx })}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}

                      {state.photos.length < 3 && (
                        <label className="w-20 h-20 rounded-xl border-2 border-dashed border-[#E3D2CC] hover:border-[#5A1E2B] bg-[#FDF8F6] flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-[var(--color-stone)] hover:text-[#5A1E2B]">
                          <Upload size={18} />
                          <span className="text-[10px] font-medium uppercase tracking-wider">Add</span>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                    {state.errors.photos && (
                      <p className="text-xs text-red-600 mt-1">{state.errors.photos}</p>
                    )}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'GO_TO_STEP', step: 2 })}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <FormButton
                    type="button"
                    disabled={!isStep3Valid}
                    onClick={() => dispatch({ type: 'GO_TO_STEP', step: 4 })}
                    className="w-full sm:w-auto"
                  >
                    <span>Review Request</span>
                    <ArrowRight size={16} />
                  </FormButton>
                </div>
              </motion.div>
            )}

            {/* STEP 4: REVIEW & SUBMIT */}
            {state.step === 4 && (
              <motion.div
                key="step-4"
                custom={state.direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="mb-5">
                  <h3 className="text-lg font-serif font-playfair text-[var(--color-ink)] mb-1">
                    Review Your Request
                  </h3>
                  <p className="text-xs text-[var(--color-stone)] leading-relaxed">
                    Verify order details, selected pieces, and resolution preference before submitting.
                  </p>
                </div>

                <div className="bg-[#FAF6F4] rounded-2xl p-4 sm:p-5 border border-[#EADBD5] space-y-4 mb-6">
                  {/* Order & Contact Info */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EADBD5] pb-3 text-xs">
                    <div>
                      <span className="text-[var(--color-stone)] uppercase tracking-wider text-[10px]">
                        Order ID
                      </span>
                      <p className="font-semibold text-[var(--color-ink)] mt-0.5 m-0">
                        {state.order?.id}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--color-stone)] uppercase tracking-wider text-[10px]">
                        Contact Email
                      </span>
                      <p className="font-semibold text-[var(--color-ink)] mt-0.5 m-0">
                        {state.email}
                      </p>
                    </div>
                    <div>
                      <span className="text-[var(--color-stone)] uppercase tracking-wider text-[10px]">
                        Resolution
                      </span>
                      <p className="font-semibold text-[#8C4A5A] mt-0.5 m-0">
                        {state.resolution}
                      </p>
                    </div>
                  </div>

                  {/* Items Summary */}
                  <div>
                    <span className="text-[var(--color-stone)] uppercase tracking-wider text-[10px] block mb-2">
                      Items for Return / Exchange ({Object.keys(state.selectedItems).length})
                    </span>
                    <div className="space-y-2">
                      {Object.values(state.selectedItems).map(({ item, quantity }) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between bg-white rounded-xl p-2.5 border border-[#EADBD5] text-xs"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-12 object-contain bg-[#F3E6E2] rounded p-1"
                            />
                            <div className="min-w-0">
                              <p className="font-medium text-[var(--color-ink)] truncate m-0">
                                {item.name}
                              </p>
                              <p className="text-[11px] text-[var(--color-stone)] m-0">
                                Size: {item.size} &bull; Qty: {quantity}
                              </p>
                            </div>
                          </div>
                          <span className="font-semibold text-[var(--color-ink)] shrink-0">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reason & Details */}
                  <div className="border-t border-[#EADBD5] pt-3 text-xs">
                    <span className="text-[var(--color-stone)] uppercase tracking-wider text-[10px]">
                      Reason Stated
                    </span>
                    <p className="text-[var(--color-ink)] font-medium mt-0.5 m-0">
                      {state.reason} {state.details ? `— "${state.details}"` : ''}
                    </p>
                    {state.photos.length > 0 && (
                      <p className="text-[11px] text-[var(--color-stone)] mt-1 m-0">
                        {state.photos.length} photo{state.photos.length > 1 ? 's' : ''} attached
                      </p>
                    )}
                  </div>
                </div>

                {/* Policy Agreement Checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={state.agreedToPolicy}
                      onChange={(e) =>
                        dispatch({
                          type: 'SET_FIELD',
                          field: 'agreedToPolicy',
                          value: e.target.checked
                        })
                      }
                      className="mt-0.5 w-4 h-4 rounded border-[#C9B2A8] text-[#5A1E2B] focus:ring-[#5A1E2B]"
                    />
                    <span className="text-xs text-[var(--color-stone)] leading-relaxed">
                      I confirm that the garment(s) are in original unworn condition, unwashed, with all designer atelier tags intact, and agree to the Vastrika Return Policy.
                    </span>
                  </label>
                  {state.errors.agreement && (
                    <p className="text-xs text-red-600 mt-1 pl-7">{state.errors.agreement}</p>
                  )}
                </div>

                {/* Navigation & Submit */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => dispatch({ type: 'GO_TO_STEP', step: 3 })}
                    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--color-stone)] hover:text-[var(--color-ink)] transition-colors"
                  >
                    <ArrowLeft size={16} />
                    <span>Back</span>
                  </button>

                  <FormButton
                    type="button"
                    loading={state.loading}
                    disabled={!isStep4Valid}
                    onClick={handleFinalSubmit}
                    className="w-full sm:w-auto"
                  >
                    <span>Submit Request</span>
                    <CheckCircle size={16} />
                  </FormButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </PageShell>
  );
};

export default ReturnExchange;
