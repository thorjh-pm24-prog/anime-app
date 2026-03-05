import React from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const colors = {
    success: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-300 shadow-lg',
    error: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-300 shadow-lg',
    info: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border-blue-300 shadow-lg',
  };

  const icons = {
    success: '✓',
    error: '×',
    info: 'ℹ',
  };

  const iconBg = {
    success: 'bg-green-200',
    error: 'bg-red-200',
    info: 'bg-blue-200',
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 ${colors[type]} border px-5 py-4 rounded-lg flex items-center gap-3 animate-slide-up z-50 max-w-sm`}>
      <span className={`${iconBg[type]} w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0`} aria-hidden="true">
        {icons[type]}
      </span>
      <span className="text-sm font-semibold flex-1">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 text-lg font-bold text-current opacity-60 hover:opacity-100 transition-opacity flex-shrink-0" 
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

interface ToastContextType {
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = React.useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
};
