'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faNetworkWired,
  faLayerGroup,
  faChartBar,
  faCog,
  faExclamationTriangle,
  faWifi,
  faShield,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

interface SiteNavigationProps {
  siteName: string;
  siteId: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: number;
}

export default function SiteNavigation({ siteName, siteId }: SiteNavigationProps) {
  const pathname = usePathname();

  const siteNavigation: NavigationItem[] = [
    { id: 'overview', label: 'Overview', icon: faHome, href: `/sites/${siteId}` },
    { id: 'switches', label: 'Switches', icon: faNetworkWired, href: `/sites/${siteId}/switches` },
    { id: 'vlans', label: 'VLANs', icon: faLayerGroup, href: `/sites/${siteId}/vlans` },
    { id: 'wireless', label: 'Wireless', icon: faWifi, href: `/sites/${siteId}/wireless` },
    { id: 'security', label: 'Security', icon: faShield, href: `/sites/${siteId}/security` },
    { id: 'monitoring', label: 'Monitoring', icon: faChartBar, href: `/sites/${siteId}/monitoring` },
    { id: 'alerts', label: 'Alerts', icon: faExclamationTriangle, href: `/sites/${siteId}/alerts`, badge: 2 },
    { id: 'configure', label: 'Configure', icon: faCog, href: `/sites/${siteId}/configure` },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Site Header */}
      <div className="p-6 border-b border-gray-200">
        <Link 
          href="/sites"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 text-sm"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
          <span>Back to Sites</span>
        </Link>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{siteName}</h2>
          <p className="text-sm text-gray-500">Site Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {siteNavigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.id === 'overview' && pathname === `/sites/${siteId}`);
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <FontAwesomeIcon icon={item.icon} className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Site Status */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">All systems operational</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
