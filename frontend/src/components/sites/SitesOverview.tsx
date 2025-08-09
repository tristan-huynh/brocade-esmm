'use client';

import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBuilding,
  faNetworkWired,
  faExclamationTriangle,
  faCheckCircle,
  faPlus,
  faEllipsisH,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import type { Site } from '@/types';

// Mock data - replace with real data from your API
const mockSites: Site[] = [
  {
    id: 'hq-001',
    name: 'Headquarters',
    address: '123 Business Ave, Grand Rapids, MI',
    timezone: 'America/Detroit',
    status: 'online',
    devices: { switches: 8, online: 7, offline: 1 },
    lastSeen: '2 minutes ago',
    tags: ['critical', 'datacenter']
  },
  {
    id: 'branch-001',
    name: 'Downtown Branch',
    address: '456 Main St, Grand Rapids, MI',
    timezone: 'America/Detroit',
    status: 'online',
    devices: { switches: 3, online: 3, offline: 0 },
    lastSeen: '1 minute ago',
    tags: ['branch']
  },
  {
    id: 'warehouse-001',
    name: 'Warehouse Facility',
    address: '789 Industrial Blvd, Grand Rapids, MI',
    timezone: 'America/Detroit',
    status: 'warning',
    devices: { switches: 5, online: 4, offline: 1 },
    lastSeen: '5 minutes ago',
    tags: ['warehouse', 'iot']
  },
  {
    id: 'remote-001',
    name: 'Remote Office',
    address: '321 Corporate Dr, Kalamazoo, MI',
    timezone: 'America/Detroit',
    status: 'offline',
    devices: { switches: 2, online: 0, offline: 2 },
    lastSeen: '2 hours ago',
    tags: ['remote']
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'online': return { icon: faCheckCircle, color: 'text-green-500' };
    case 'warning': return { icon: faExclamationTriangle, color: 'text-yellow-500' };
    case 'offline': return { icon: faExclamationTriangle, color: 'text-red-500' };
    default: return { icon: faCheckCircle, color: 'text-gray-500' };
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'online': return 'bg-green-100 text-green-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'offline': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function SitesOverview() {
  const totalSites = mockSites.length;
  const onlineSites = mockSites.filter(s => s.status === 'online').length;
  const totalDevices = mockSites.reduce((sum, site) => sum + site.devices.switches, 0);
  const onlineDevices = mockSites.reduce((sum, site) => sum + site.devices.online, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sites</h1>
          <p className="text-gray-600">Manage and monitor your network sites</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          <span>Add Site</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <FontAwesomeIcon icon={faBuilding} className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sites</p>
              <p className="text-2xl font-bold text-gray-900">{totalSites}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Online Sites</p>
              <p className="text-2xl font-bold text-gray-900">{onlineSites}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <FontAwesomeIcon icon={faNetworkWired} className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{totalDevices}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <FontAwesomeIcon icon={faNetworkWired} className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Online Devices</p>
              <p className="text-2xl font-bold text-gray-900">{onlineDevices}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSites.map((site) => {
          const statusInfo = getStatusIcon(site.status);
          
          return (
            <Link
              key={site.id}
              href={`/sites/${site.id}`}
              className="block bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
            >
              <div className="p-6">
                {/* Site Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <FontAwesomeIcon icon={faBuilding} className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{site.name}</h3>
                      <p className="text-sm text-gray-500">{site.address}</p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <FontAwesomeIcon icon={faEllipsisH} className="h-4 w-4" />
                  </button>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={statusInfo.icon} className={`h-4 w-4 ${statusInfo.color}`} />
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(site.status)}`}>
                      {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                    <span>{site.lastSeen}</span>
                  </div>
                </div>

                {/* Device Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{site.devices.switches}</p>
                    <p className="text-xs text-gray-500">Switches</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{site.devices.online}</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-red-600">{site.devices.offline}</p>
                    <p className="text-xs text-gray-500">Offline</p>
                  </div>
                </div>

                {/* Tags */}
                {site.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {site.tags.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
