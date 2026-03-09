import React, { useState, useRef, useEffect } from 'react';
import { useSound } from '@/hooks/useSound';

export type DeviceType = 'phone' | 'tablet' | 'desktop';

interface DevicePreviewProps {
  currentDevice: DeviceType;
  onDeviceChange: (device: DeviceType) => void;
}

// Device viewport sizes (in pixels)
export const DEVICE_SIZES = {
  phone: {
    width: 430,
    height: 932,
    label: 'Phone',
    description: 'Phone View (430px)',
  },
  tablet: {
    width: 820,
    height: 1180,
    label: 'Tablet',
    description: 'Tablet View (820px)',
  },
  desktop: {
    width: 1440,
    height: 900,
    label: 'Desktop',
    description: 'Desktop View (1440px)',
  },
} as const;

const DEVICE_ICONS = {
  phone: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
  tablet: 'M12 18h.01M17 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z',
  desktop: 'M9.75 17L9 20m0 0l-.75 3M9 20h6m0 0l.75 3M15 20l.75-3m-2.25-3h3.5a2 2 0 002-2V5a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

export const DevicePreview: React.FC<DevicePreviewProps> = ({
  currentDevice,
  onDeviceChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { playClick } = useSound();

  const devices: Array<{ type: DeviceType; label: string }> = [
    { type: 'phone', label: 'Phone' },
    { type: 'tablet', label: 'Tablet' },
    { type: 'desktop', label: 'Desktop' },
  ];

  const currentLabel = devices.find(d => d.type === currentDevice)?.label || 'Phone';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleDeviceSelect = (device: DeviceType) => {
    playClick();
    onDeviceChange(device);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex gap-0 bg-gradient-to-r from-indigo-100 to-purple-50 rounded-lg border border-indigo-300 overflow-hidden shadow-md">
        {/* Main button showing current device */}
        <button
          onClick={() => {
            playClick();
            setIsOpen(!isOpen);
          }}
          className="px-3 py-1.5 sm:py-2 bg-white text-gray-900 font-semibold transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm hover:bg-indigo-50 focus:outline-none"
          title={`Current: ${currentLabel} view`}
          aria-label={`Device selector: ${currentLabel}`}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d={DEVICE_ICONS[currentDevice]} />
          </svg>
          <span className="hidden sm:inline">{currentLabel}</span>
        </button>

        {/* Dropdown toggle button */}
        <button
          onClick={() => {
            playClick();
            setIsOpen(!isOpen);
          }}
          className={`px-2 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-100 to-purple-50 text-gray-600 hover:bg-indigo-200 transition-all duration-300 border-l border-indigo-300 focus:outline-none ${
            isOpen ? 'bg-indigo-200' : ''
          }`}
          aria-label="Toggle device menu"
          aria-expanded={isOpen}
        >
          <svg
            className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-sky-300 rounded-lg shadow-xl z-50 min-w-44 overflow-hidden animate-scale">
          {devices.map((device) => (
            <button
              key={device.type}
              onClick={() => handleDeviceSelect(device.type)}
              className={`w-full px-4 py-2.5 text-left flex items-center gap-3 font-semibold transition-all duration-300 text-sm ${
                currentDevice === device.type
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-l-2 border-white'
                  : 'text-gray-700 hover:bg-indigo-50 border-l-2 border-transparent hover:border-indigo-300'
              } focus:outline-none`}
              aria-label={`Switch to ${device.label} view`}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={DEVICE_ICONS[device.type]} />
              </svg>
              <span>{device.label}</span>
              {currentDevice === device.type && (
                <svg className="w-4 h-4 ml-auto text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DevicePreview;
