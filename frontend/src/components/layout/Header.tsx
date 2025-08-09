'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBell, 
  faUser, 
  faSearch, 
  faGlobe,
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

export default function Header({ title, breadcrumbs }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Breadcrumbs */}
        <div className="flex items-center space-x-4">
          {breadcrumbs && (
            <nav className="flex items-center space-x-2 text-sm text-gray-500">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <span>/</span>}
                  <span className={index === breadcrumbs.length - 1 ? 'text-gray-900 font-medium' : 'hover:text-gray-700'}>
                    {crumb.label}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}
          {title && !breadcrumbs && (
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-4">
          {/* Global Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
            <FontAwesomeIcon icon={faBell} className="h-5 w-5" />
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white">
              <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
            </div>
            <div className="hidden md:block">
              <div className="text-sm font-medium text-gray-900">DefaultAdmin</div>
              <div className="text-xs text-gray-500">System Administrator</div>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="h-3 w-3 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
