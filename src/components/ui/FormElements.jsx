import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, ChevronDown } from 'lucide-react';

/**
 * Reusable Form Elements for Info Pages
 * Style specs:
 * - Floating/small label above (text-xs uppercase tracking-wider)
 * - Input/Select/Button h-12, rounded-xl, border border-[#E3D2CC], bg-[#FDF8F6], px-4, text-sm
 * - Placeholder readable text-[#9C8A85]
 * - Focus: border-[#5A1E2B] with ring-2 ring-[#5A1E2B]/15, smooth transition
 * - Error: red border and message underneath
 * - Primary button: full-width on mobile, bg-[#3A1A1D], hover slightly lighter, rounded-xl, h-12, loading/disabled state
 */

export const FormInput = ({
  label,
  id,
  error,
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-wider font-medium text-[#3A1A1D] block select-none"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        className={`w-full h-12 min-h-[48px] px-4 rounded-xl border bg-[#FDF8F6] text-sm md:text-base text-[var(--color-ink)] placeholder:text-sm placeholder:text-[#9C8A85] placeholder:tracking-normal transition-all duration-200 outline-none ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
            : 'border-[#E3D2CC] focus:border-[#5A1E2B] focus:ring-2 focus:ring-[#5A1E2B]/20'
        } ${className}`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 font-medium mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const FormTextarea = ({
  label,
  id,
  error,
  rows = 4,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-wider font-medium text-[#3A1A1D] block select-none"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full p-4 rounded-xl border bg-[#FDF8F6] text-sm md:text-base text-[var(--color-ink)] placeholder:text-sm placeholder:text-[#9C8A85] placeholder:tracking-normal transition-all duration-200 outline-none resize-y leading-relaxed ${
          error
            ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
            : 'border-[#E3D2CC] focus:border-[#5A1E2B] focus:ring-2 focus:ring-[#5A1E2B]/20'
        } ${className}`}
        {...props}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 font-medium mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const FormSelect = ({
  label,
  id,
  error,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label
          htmlFor={id}
          className="text-xs uppercase tracking-wider font-medium text-[#3A1A1D] block select-none"
        >
          {label}
        </label>
      )}
      <div className="relative w-full">
        <select
          id={id}
          className={`w-full h-12 min-h-[48px] pl-4 pr-10 rounded-xl border bg-[#FDF8F6] text-sm md:text-base text-[var(--color-ink)] transition-all duration-200 outline-none appearance-none cursor-pointer ${
            error
              ? 'border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-500/20'
              : 'border-[#E3D2CC] focus:border-[#5A1E2B] focus:ring-2 focus:ring-[#5A1E2B]/20'
          } ${className}`}
          {...props}
        >
          {children}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A1E2B]">
          <ChevronDown size={18} strokeWidth={2} />
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-600 font-medium mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export const FormButton = ({
  children,
  loading = false,
  disabled = false,
  type = 'submit',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`w-full sm:w-auto px-6 h-12 min-h-[48px] rounded-xl font-medium text-sm tracking-wider text-white transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm select-none ${
        disabled || loading
          ? 'bg-[#3A1A1D] opacity-60 cursor-not-allowed'
          : 'bg-[#3A1A1D] hover:bg-[#4E2428] active:scale-[0.99]'
      } ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
