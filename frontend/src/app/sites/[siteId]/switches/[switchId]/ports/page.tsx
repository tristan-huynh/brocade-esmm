'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/layout/Header';

// Mock data - replace with real API calls
const getSiteData = (siteId: string) => {
  const sites = {
    'hq-001': { name: 'Headquarters', id: 'hq-001' },
    'branch-001': { name: 'Downtown Branch', id: 'branch-001' },
    'warehouse-001': { name: 'Warehouse Facility', id: 'warehouse-001' },
    'remote-001': { name: 'Remote Office', id: 'remote-001' },
  };
  return sites[siteId as keyof typeof sites] || { name: 'Unknown Site', id: siteId };
};

const getSwitchData = (switchId: string) => {
  const switches = {
    'sw-001': { name: 'us-grrapids-sw-01', model: 'ICX7250-24P', ip: '10.0.1.134' },
    'sw-002': { name: 'us-grrapids-sw-02', model: 'ICX7450-48P', ip: '10.0.1.135' },
    'sw-003': { name: 'us-grrapids-sw-03', model: 'ICX7250-24P', ip: '10.0.1.136' },
  };
  return switches[switchId as keyof typeof switches] || { name: 'Unknown Switch', model: 'Unknown', ip: 'Unknown' };
};

export default function SwitchPortsPage() {
  const params = useParams();
  const siteId = params?.siteId as string;
  const switchId = params?.switchId as string;
  const site = getSiteData(siteId);
  const switchData = getSwitchData(switchId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <SwitchNavigation 
          siteName={site.name} 
          siteId={site.id} 
          switchName={switchData.name}
          switchId={switchId}
        />
        <div className="flex-1 min-w-0">
          <Header 
            breadcrumbs={[
              { label: 'Organization', href: '/' },
              { label: 'Sites', href: '/sites' },
              { label: site.name, href: `/sites/${siteId}` },
              { label: 'Switches', href: `/sites/${siteId}/switches` },
              { label: switchData.name, href: `/sites/${siteId}/switches/${switchId}` },
              { label: 'Ports' }
            ]}
          />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Port Configuration</h1>
              <p className="text-gray-600">Configure and monitor individual ports on {switchData.name}</p>
            </div>

            <SwitchVisualization
              switchId={switchId}
              switchName={switchData.name}
              switchModel={switchData.model}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
