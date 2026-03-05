import React, { ReactNode, useEffect, useState } from 'react';
import { useAnimeStore } from '@/stores/animeStore';

interface DeviceViewportWrapperProps {
  children: ReactNode;
}

export const DEVICE_VIEWPORTS = {
  phone: {
    width: 430,
    height: 932,
    padding: '12px',
    borderRadius: '50px',
  },
  tablet: {
    width: 820,
    height: 1180,
    padding: '8px',
    borderRadius: '24px',
  },
  desktop: {
    width: 1440,
    height: 'auto',
    padding: '0',
    borderRadius: '0',
  },
} as const;

export const DeviceViewportWrapper: React.FC<DeviceViewportWrapperProps> = ({
  children,
}) => {
  const { deviceMode } = useAnimeStore();
  const [scale, setScale] = useState(1);

  const device = DEVICE_VIEWPORTS[deviceMode];

  // Add body class for CSS targeting and update document
  useEffect(() => {
    // Remove all device mode classes
    document.body.classList.remove('device-mode-phone', 'device-mode-tablet', 'device-mode-desktop');
    
    // Add current device mode class
    document.body.classList.add(`device-mode-${deviceMode}`);
  }, [deviceMode]);

  // Calculate responsive scale
  useEffect(() => {
    const handleResize = () => {
      if (deviceMode === 'phone') {
        // Phone - better scaling for readability
        const windowWidth = window.innerWidth;
        if (windowWidth < 480) {
          setScale(0.85);
        } else if (windowWidth < 600) {
          setScale(0.95);
        } else {
          setScale(1);
        }
      } else if (deviceMode === 'tablet') {
        // Tablet - optimized scaling
        const windowWidth = window.innerWidth;
        if (windowWidth < 900) {
          setScale(0.9);
        } else if (windowWidth < 1100) {
          setScale(0.95);
        } else {
          setScale(1);
        }
      } else {
        // Desktop - no scaling needed
        setScale(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [deviceMode]);

  // Determine classes based on device mode
  const isPhone = deviceMode === 'phone';
  const isTablet = deviceMode === 'tablet';
  const isDesktop = deviceMode === 'desktop';

  return (
    <div className="device-viewport-container">
      {/* Background accent for non-desktop modes */}
      {!isDesktop && <div className="device-viewport-bg" />}

      <div
        className={`device-viewport-wrapper ${deviceMode}`}
        style={{
          width: deviceMode === 'desktop' ? '100%' : `${device.width}px`,
          maxWidth: deviceMode === 'desktop' ? '100%' : `${device.width}px`,
          margin: '0 auto',
          transform: scale !== 1 ? `scale(${scale})` : 'none',
          transformOrigin: 'top center',
          transition: 'transform 0.3s ease-out, width 0.3s ease-out',
        }}
      >
        {/* Device Frame */}
        <div
          className={`device-frame-viewport ${deviceMode}`}
          style={{
            width: '100%',
            borderRadius: device.borderRadius,
            overflow: 'auto',
            ...(isPhone && {
              border: '8px solid #000',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }),
            ...(isTablet && {
              border: '6px solid #2d3748',
              boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
              position: 'relative',
            }),
            ...(isDesktop && {
              border: 'none',
              boxShadow: 'none',
            }),
          }}
        >
          {/* iPhone Notch Simulation */}
          {isPhone && (
            <div
              className="device-notch"
              style={{
                position: 'absolute',
                top: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '35%',
                height: '12px',
                backgroundColor: '#000',
                borderRadius: '0 0 20px 20px',
                zIndex: 20,
              }}
            />
          )}

          {/* Content */}
          <div className="device-viewport-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DeviceViewportWrapper;
