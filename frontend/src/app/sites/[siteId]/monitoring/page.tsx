'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import SiteNavigation from '@/components/layout/SiteNavigation';
import Header from '@/components/layout/Header';
import MonitoringDashboard from '@/components/monitoring/MonitoringDashboard';

// Mock site data - replace with real API call
const getSiteData = (siteId: string) => {
  const sites = {
    'hq-001': { name: 'Headquarters', id: 'hq-001' },
    'branch-001': { name: 'Downtown Branch', id: 'branch-001' },
    'warehouse-001': { name: 'Warehouse Facility', id: 'warehouse-001' },
    'remote-001': { name: 'Remote Office', id: 'remote-001' },
  };
  return sites[siteId as keyof typeof sites] || { name: 'Unknown Site', id: siteId };
};

export default function SiteMonitoringPage() {
  const params = useParams();
  const siteId = params?.siteId as string;
  const site = getSiteData(siteId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SiteNavigation siteName={site.name} siteId={site.id} />
        <div className="flex-1 min-w-0">
          <Header 
            breadcrumbs={[
              { label: 'Organization', href: '/' },
              { label: 'Sites', href: '/sites' },
              { label: site.name },
              { label: 'Monitoring' }
            ]}
          />
          <main className="p-6">
            <MonitoringDashboard />
          </main>
        </div>
      </div>
    </div>
  );
}
