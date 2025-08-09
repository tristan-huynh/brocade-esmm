'use client';

import React from 'react';
import OrganizationSidebar from '@/components/layout/OrganizationSidebar';
import Header from '@/components/layout/Header';
import NetworkWideOverview from '@/components/organization/NetworkWideOverview';

export default function NetworkWidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <OrganizationSidebar />
        <div className="flex-1 min-w-0">
          <Header 
            breadcrumbs={[
              { label: 'Organization', href: '/' },
              { label: 'Network-wide' }
            ]}
          />
          <main className="p-6">
            <NetworkWideOverview />
          </main>
        </div>
      </div>
    </div>
  );
}
