import React from 'react';

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
    label: '📱 iPhone',
    description: 'Phone View (430px)',
  },
  tablet: {
    width: 820,
    height: 1180,
    label: '📱 Tablet',
    description: 'Tablet View (820px)',
  },
  desktop: {
    width: 1440,
    height: 900,
    label: '💻 Desktop',
    description: 'Desktop View (1440px)',
  },
} as const;

export const DevicePreview: React.FC<DevicePreviewProps> = ({
  currentDevice,
  onDeviceChange,
}) => {
  const devices: Array<{ type: DeviceType; label: string; icon: string }> = [
    { type: 'phone', label: 'Phone', icon: '📱' },
    { type: 'tablet', label: 'Tablet', icon: '📱' },
    { type: 'desktop', label: 'Desktop', icon: '💻' },
  ];

  return (
    <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
      {devices.map((device) => (
        <button
          key={device.type}
          onClick={() => onDeviceChange(device.type)}
          className={`
            flex items-center justify-center gap-1 px-2 py-2 rounded-md font-medium
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${
              currentDevice === device.type
                ? 'bg-white text-blue-600 shadow-md'
                : 'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }
          `}
          title={device.label}
          aria-label={`Switch to ${device.label} view`}
          aria-pressed={currentDevice === device.type}
        >
          <span className="text-base">{device.icon}</span>
          <span className="hidden lg:inline text-xs">{device.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DevicePreview;
