'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faNetworkWired, 
  faLayerGroup, 
  faChartBar, 
  faCog 
} from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navigation = [
  { id: 'overview', name: 'Overview', icon: faHome },
  { id: 'switch-ports', name: 'Switch Ports', icon: faNetworkWired },
  { id: 'vlans', name: 'VLANs', icon: faLayerGroup },
  { id: 'monitoring', name: 'Monitoring', icon: faChartBar },
  { id: 'configuration', name: 'Configuration', icon: faCog },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Switch Dashboard
        </h2>
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                w-full flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-200
                ${activeTab === item.id
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <FontAwesomeIcon icon={item.icon} className="mr-3 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </div>
      </nav>
      
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm text-gray-600">Online</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}
