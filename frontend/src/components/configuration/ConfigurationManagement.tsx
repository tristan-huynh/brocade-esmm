'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog,
  faNetworkWired,
  faWifi,
  faShield,
  faUsers,
  faGlobe,
  faSave,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

const ConfigurationManagement = () => {
  const [activeSection, setActiveSection] = useState('network');

  const configSections = [
    { id: 'network', name: 'Network Settings', icon: faNetworkWired },
    { id: 'vlans', name: 'VLAN Configuration', icon: faWifi },
    { id: 'security', name: 'Security', icon: faShield },
    { id: 'users', name: 'User Management', icon: faUsers },
    { id: 'system', name: 'System Settings', icon: faCog },
  ];

  const renderNetworkSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hostname
          </label>
          <input
            type="text"
            defaultValue="us-grrapids-sw-01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Domain
          </label>
          <input
            type="text"
            defaultValue="dc01.tramhammer.org"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Management IP
          </label>
          <input
            type="text"
            defaultValue="10.0.1.134"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subnet Mask
          </label>
          <input
            type="text"
            defaultValue="255.255.255.0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Default Gateway
        </label>
        <input
          type="text"
          defaultValue="10.0.1.1"
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DNS Servers
        </label>
        <input
          type="text"
          defaultValue="10.0.1.1"
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faShield} className="h-5 w-5 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">Security Configuration</span>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          Manage authentication, access control, and security policies.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm font-medium text-gray-700">Enable SSH Access</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm font-medium text-gray-700">Enable Telnet Access</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm font-medium text-gray-700">Enable SNMP</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-gray-300" />
            <span className="text-sm font-medium text-gray-700">Enable AAA Authentication</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          SNMP Community String
        </label>
        <input
          type="password"
          placeholder="Enter community string"
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">User Accounts</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add User
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                admin
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Administrator
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                2 hours ago
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                root
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Super Administrator
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                1 day ago
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                <button className="text-red-600 hover:text-red-800">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
            <option value="us/michigan">US/Michigan</option>
            <option value="us/eastern">US/Eastern</option>
            <option value="us/central">US/Central</option>
            <option value="us/pacific">US/Pacific</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            NTP Server
          </label>
          <input
            type="text"
            defaultValue="pool.ntp.org"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" defaultChecked className="rounded border-gray-300" />
          <span className="text-sm font-medium text-gray-700">Enable Summer Time</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Syslog Server
        </label>
        <input
          type="text"
          placeholder="Enter syslog server IP"
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'network': return renderNetworkSettings();
      case 'security': return renderSecuritySettings();
      case 'users': return renderUserManagement();
      case 'system': return renderSystemSettings();
      default: return renderNetworkSettings();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Configuration Management</h2>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration Menu */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Settings</h3>
            </div>
            <nav className="p-2">
              {configSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <FontAwesomeIcon icon={section.icon} className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Configuration Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {configSections.find(s => s.id === activeSection)?.name}
              </h3>
            </div>
            <div className="p-6">
              {renderContent()}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center space-x-2">
                <FontAwesomeIcon icon={faUndo} className="h-4 w-4" />
                <span>Reset</span>
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigurationManagement;
