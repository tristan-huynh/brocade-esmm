'use client';

import React, { useState } from 'react';
import SwitchVisualization from '@/components/switches/SwitchVisualization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

export default function SwitchDemoPage() {
  const [selectedModel, setSelectedModel] = useState<'24p' | '48p'>('24p');

  const switchModels = {
    '24p': {
      name: 'us-grrapids-sw-01',
      model: 'ICX7250-24P',
      description: '24-port Gigabit Switch with 4 SFP+ uplinks'
    },
    '48p': {
      name: 'us-grrapids-sw-02', 
      model: 'ICX7450-48P',
      description: '48-port Gigabit Switch with 4 SFP+ uplinks'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Interactive Brocade Switch Visualization
          </h1>
          <p className="text-gray-600">
            Click on any port to configure it. Hover to see port details. LEDs show status and speed.
          </p>
        </div>

        {/* Model Selector */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Switch Model</h2>
              <p className="text-sm text-gray-600">Select a switch model to view its port layout</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setSelectedModel('24p')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedModel === '24p'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <FontAwesomeIcon icon={faNetworkWired} className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">ICX7250-24P</div>
                  <div className="text-xs opacity-75">24 + 4 SFP+</div>
                </div>
              </button>
              <button
                onClick={() => setSelectedModel('48p')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedModel === '48p'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <FontAwesomeIcon icon={faNetworkWired} className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">ICX7450-48P</div>
                  <div className="text-xs opacity-75">48 + 4 SFP+</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Switch Visualization */}
        <SwitchVisualization
          switchId={selectedModel === '24p' ? 'sw-001' : 'sw-002'}
          switchName={switchModels[selectedModel].name}
          switchModel={switchModels[selectedModel].model}
        />

        {/* Features List */}
        <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Interactive Port Management</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click any port to open configuration modal</li>
                <li>• Enable/disable ports individually</li>
                <li>• Configure speed, duplex, and VLAN settings</li>
                <li>• Manage PoE settings per port</li>
                <li>• Add port descriptions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Visual Status Indicators</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>Green LED: Port up / 1 Gbps</li>
                <li>• <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>Yellow LED: 100 Mbps</li>
                <li>• <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>Red LED: Port down / 10 Mbps</li>
                <li>• <span className="inline-block w-2 h-2 bg-gray-500 rounded-full mr-2"></span>Gray LED: Disabled / No link</li>
                <li>• Hover over ports for instant details</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
