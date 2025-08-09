'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,
  faNetworkWired,
  faUsers,
  faCog,
  faChartBar,
  faExclamationTriangle,
  faPlus
} from '@fortawesome/free-solid-svg-icons';

interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  href: string;
  badge?: number;
}

const organizationNavigation: NavigationItem[] = [
  { id: 'sites', label: 'Sites', icon: faBuilding, href: '/sites' },
  { id: 'organization', label: 'Organization', icon: faUsers, href: '/organization' },
  { id: 'network-wide', label: 'Network-wide', icon: faNetworkWired, href: '/network-wide' },
  { id: 'alerts', label: 'Alerts', icon: faExclamationTriangle, href: '/alerts', badge: 3 },
  { id: 'administration', label: 'Administration', icon: faCog, href: '/administration' },
];

export default function OrganizationSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Organization Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faNetworkWired} className="h-4 w-4 text-white" />
          </div>
          <div>
            {/* TODO Convert to ENV */}
            <h2 className="text-lg font-semibold text-white">Brocade ESM</h2>
            <p className="text-xs text-gray-400">My Company</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {organizationNavigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`
                  flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
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

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-800">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          <span>Add Site</span>
        </button>
      </div>
    </div>
  );
}
