import React from 'react';

/**
 * Accessibility utilities for the anime search application
 */

/**
 * Skip to main content link - should be first focusable element
 */
export const SkipToMainContent: React.FC = () => (
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only fixed top-0 left-0 z-50 px-4 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
  >
    Skip to main content
  </a>
);

/**
 * Announce screen reader messages
 */
export const ScreenReaderAnnouncement: React.FC<{ message: string }> = ({ message }) => (
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    className="sr-only"
  >
    {message}
  </div>
);

/**
 * Loading announcement for screen readers
 */
export const LoadingAnnouncement: React.FC<{ isLoading: boolean }> = ({ isLoading }) => (
  <div
    role="status"
    aria-live="polite"
    className="sr-only"
  >
    {isLoading && 'Loading anime content...'}
  </div>
);

/**
 * Result count announcement
 */
export const ResultAnnouncement: React.FC<{ count: number }> = ({ count }) => (
  <div
    role="status"
    aria-live="polite"
    className="sr-only"
  >
    {count > 0 ? `${count} anime results found` : 'No results found'}
  </div>
);

/**
 * Semantic landmark for main content
 */
export const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main
    id="main-content"
    className="flex-1"
    role="main"
    aria-label="Main content"
  >
    {children}
  </main>
);

/**
 * Semantic section with proper heading structure
 */
export const Section: React.FC<{
  children: React.ReactNode;
  title: string;
  ariaLabel?: string;
}> = ({ children, title, ariaLabel }) => (
  <section aria-label={ariaLabel || title}>
    <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
    {children}
  </section>
);

/**
 * Keyboard navigation hints
 */
export const KeyboardHint: React.FC<{ keys: string; action: string }> = ({
  keys,
  action,
}) => (
  <div className="text-xs text-gray-600 mt-2">
    <kbd className="bg-gray-100 border border-gray-300 rounded px-2 py-1">{keys}</kbd>
    {' '} {action}
  </div>
);

/**
 * Accessible icon button wrapper
 */
export const IconButton: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  ariaPressed?: boolean;
}> = ({ icon, label, onClick, className = '', disabled = false, ariaPressed }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex items-center justify-center p-2 rounded-lg transition-all hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    aria-label={label}
    title={label}
    aria-pressed={ariaPressed}
  >
    <span className="text-xl" aria-hidden="true">
      {icon}
    </span>
  </button>
);

/**
 * Accessible form label
 */
export const FormLabel: React.FC<{
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}> = ({ htmlFor, children, required = false }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-900 mb-2">
    {children}
    {required && <span aria-label="required" className="text-red-600 ml-1">*</span>}
  </label>
);

/**
 * Accessible select input
 */
export const AccessibleSelect: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  label: string;
  disabled?: boolean;
  required?: boolean;
}> = ({ id, value, onChange, options, label, disabled = false, required = false }) => (
  <div>
    <FormLabel htmlFor={id} required={required}>
      {label}
    </FormLabel>
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
      aria-describedby={`${id}-description`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

/**
 * Accessible input field
 */
export const AccessibleInput: React.FC<{
  id: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
}> = ({
  id,
  type = 'text',
  value,
  onChange,
  placeholder,
  label,
  disabled = false,
  required = false,
  description,
}) => (
  <div>
    {label && <FormLabel htmlFor={id} required={required}>{label}</FormLabel>}
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
      aria-describedby={description ? `${id}-description` : undefined}
    />
    {description && (
      <p id={`${id}-description`} className="mt-1 text-xs text-gray-600">
        {description}
      </p>
    )}
  </div>
);
