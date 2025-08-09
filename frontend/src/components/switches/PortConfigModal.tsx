'use client';

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faEthernet,
  faToggleOn,
  faToggleOff,
  faSave,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

interface Port {
  id: string;
  name: string;
  status: 'up' | 'down' | 'disabled';
  speed: string;
  duplex: string;
  vlan: string;
  description?: string;
  poeEnabled: boolean;
  poeUsage: number;
}

interface PortConfigModalProps {
  port: Port | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (portId: string, config: Partial<Port>) => void;
}

const PortConfigModal: React.FC<PortConfigModalProps> = ({
  port,
  isOpen,
  onClose,
  onSave
}) => {
  const [config, setConfig] = useState<Partial<Port>>({});
  const [hasChanges, setHasChanges] = useState(false);

  React.useEffect(() => {
    if (port) {
      setConfig({
        status: port.status,
        speed: port.speed,
        duplex: port.duplex,
        vlan: port.vlan,
        description: port.description,
        poeEnabled: port.poeEnabled
      });
      setHasChanges(false);
    }
  }, [port]);

  const handleChange = (field: keyof Port, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    if (port) {
      onSave(port.id, config);
      setHasChanges(false);
      onClose();
    }
  };

  const handleReset = () => {
    if (port) {
      setConfig({
        status: port.status,
        speed: port.speed,
        duplex: port.duplex,
        vlan: port.vlan,
        description: port.description,
        poeEnabled: port.poeEnabled
      });
      setHasChanges(false);
    }
  };

  if (!isOpen || !port) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FontAwesomeIcon icon={faEthernet} className="h-5 w-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Port {port.id}</h3>
              <p className="text-sm text-gray-500">Port Configuration</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Port Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Port Status
            </label>
            <select
              value={config.status || 'disabled'}
              onChange={(e) => handleChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="up">Enabled</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>

          {/* Speed/Duplex */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed
              </label>
              <select
                value={config.speed || 'auto'}
                onChange={(e) => handleChange('speed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Auto</option>
                <option value="1000">1 Gbps</option>
                <option value="100">100 Mbps</option>
                <option value="10">10 Mbps</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duplex
              </label>
              <select
                value={config.duplex || 'auto'}
                onChange={(e) => handleChange('duplex', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="auto">Auto</option>
                <option value="full">Full</option>
                <option value="half">Half</option>
              </select>
            </div>
          </div>

          {/* VLAN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              VLAN
            </label>
            <input
              type="text"
              value={config.vlan || '1'}
              onChange={(e) => handleChange('vlan', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="VLAN ID"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={config.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Port description"
            />
          </div>

          {/* PoE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Power over Ethernet (PoE)
            </label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleChange('poeEnabled', !config.poeEnabled)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md border ${
                  config.poeEnabled
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-gray-50 border-gray-200 text-gray-700'
                }`}
              >
                <FontAwesomeIcon
                  icon={config.poeEnabled ? faToggleOn : faToggleOff}
                  className={`h-4 w-4 ${config.poeEnabled ? 'text-green-600' : 'text-gray-400'}`}
                />
                <span>{config.poeEnabled ? 'Enabled' : 'Disabled'}</span>
              </button>
              {config.poeEnabled && (
                <span className="text-sm text-gray-500">
                  Current: {port.poeUsage}W
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleReset}
            disabled={!hasChanges}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md border ${
              hasChanges
                ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                : 'border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FontAwesomeIcon icon={faUndo} className="h-4 w-4" />
            <span>Reset</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md ${
                hasChanges
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FontAwesomeIcon icon={faSave} className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortConfigModal;
