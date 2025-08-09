'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlug,
  faSpinner,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { useSwitchData } from '@/hooks/useSwitchData';

export default function ConnectionPanel() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [credentials, setCredentials] = useState({
    ip: '10.0.1.134:22',
    username: 'root',
    password: ''
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { connectToSwitch } = useSwitchData();

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConnecting(true);
    setConnectionStatus('idle');

    try {
      await connectToSwitch(credentials.ip, credentials.username, credentials.password);
      setConnectionStatus('success');
      setIsExpanded(false);
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
            <FontAwesomeIcon icon={faPlug} className="h-5 w-5" />
            <span>Switch Connection</span>
          </h3>
          <span className="text-gray-400">
            {isExpanded ? '−' : '+'}
          </span>
        </button>
      </div>

      {isExpanded && (
        <div className="p-6">
          <form onSubmit={handleConnect} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Switch IP:Port
              </label>
              <input
                type="text"
                value={credentials.ip}
                onChange={(e) => setCredentials(prev => ({ ...prev, ip: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="10.0.1.134:22"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="root"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
                required
              />
            </div>

            {connectionStatus === 'success' && (
              <div className="flex items-center space-x-2 text-green-600">
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
                <span className="text-sm">Connected successfully!</span>
              </div>
            )}

            {connectionStatus === 'error' && (
              <div className="flex items-center space-x-2 text-red-600">
                <FontAwesomeIcon icon={faExclamationTriangle} className="h-4 w-4" />
                <span className="text-sm">Connection failed. Please check credentials.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isConnecting}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {isConnecting ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faPlug} className="h-4 w-4" />
                  <span>Connect to Switch</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Integration Status</h4>
            <p className="text-xs text-blue-700">
              This form demonstrates the frontend integration. To connect to real switches, 
              replace the API endpoint in <code>/api/switch-data/route.ts</code> with your Rust backend URL.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
