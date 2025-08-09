'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNetworkWired, 
  faExclamationTriangle, 
  faCheckCircle, 
  faThermometerHalf,
  faBolt,
  faFan,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
// TODO: BACKEND INTEGRATION - This hook fetches data from your API routes
// Make sure your useSwitchData hook is configured to call your Rust backend
import { useSwitchData } from '@/hooks/useSwitchData';
import ConnectionPanel from './ConnectionPanel';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: any;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  status?: 'success' | 'warning' | 'error' | 'info';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, status = 'info' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success': return 'bg-green-50 text-green-600 border-green-200';
      case 'warning': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'error': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-blue-50 text-blue-600 border-blue-200';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend.isPositive ? '↗' : '↘'} {Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getStatusColor()}`}>
          <FontAwesomeIcon icon={icon} className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

// TODO: BACKEND INTEGRATION - This component displays real-time switch data
// The data comes from useSwitchData hook which should connect to your Rust backend
// Make sure your backend returns data in the SwitchData interface format
export default function DashboardOverview() {
  // TODO: REAL-TIME UPDATES - Consider adding WebSocket connection for live updates
  // TODO: ERROR HANDLING - Add retry logic and better error messages
  const { data, loading, error } = useSwitchData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-blue-500 animate-spin mb-4" />
          <p className="text-gray-500">Loading switch data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faExclamationTriangle} className="h-5 w-5 text-red-600" />
          <span className="text-red-800 font-medium">Error loading data: {error}</span>
        </div>
      </div>
    );
  }

  const chassisData = data?.chassis;
  const configData = data?.configuration;
  
  // Calculate stats from real data
  const activePowerSupplies = chassisData?.power_supplies.filter(ps => ps.present).length || 0;
  const totalPowerSupplies = chassisData?.power_supplies.length || 0;
  const avgTemperature = chassisData?.temperatures.length 
    ? Math.round(chassisData.temperatures.reduce((sum, temp) => sum + temp.value, 0) / chassisData.temperatures.length)
    : 0;
  const activeVLANs = configData?.vlans.length || 0;

  const stats = [
    {
      title: 'Power Supplies',
      value: `${activePowerSupplies}/${totalPowerSupplies}`,
      icon: faBolt,
      status: activePowerSupplies === totalPowerSupplies ? 'success' as const : 'warning' as const
    },
    {
      title: 'System Status',
      value: chassisData ? 'Online' : 'Offline',
      icon: faCheckCircle,
      status: chassisData ? 'success' as const : 'error' as const
    },
    {
      title: 'Active VLANs',
      value: activeVLANs,
      icon: faNetworkWired,
      status: 'success' as const
    },
    {
      title: 'Avg Temperature',
      value: `${avgTemperature}°C`,
      icon: faThermometerHalf,
      status: avgTemperature > 75 ? 'error' as const : avgTemperature > 70 ? 'warning' as const : 'success' as const
    }
  ];

  // Generate alerts from real data
  const recentAlerts: Array<{
    id: string;
    message: string;
    severity: string;
    time: string;
    icon: any;
  }> = [];
  
  if (chassisData) {
    // Check power supplies
    chassisData.power_supplies.forEach(ps => {
      if (!ps.present) {
        recentAlerts.push({
          id: `ps-${ps.id}`,
          message: `Power supply ${ps.id} is not present`,
          severity: 'critical',
          time: 'Current',
          icon: faBolt
        });
      }
    });

    // Check temperatures
    chassisData.temperatures.forEach(temp => {
      if (temp.value > 75) {
        recentAlerts.push({
          id: `temp-${temp.location}`,
          message: `High temperature detected: ${temp.location} (${temp.value}°C)`,
          severity: 'warning',
          time: 'Current',
          icon: faThermometerHalf
        });
      }
    });

    // Check fans
    chassisData.fans.forEach(fan => {
      if (fan.status !== 'OK') {
        recentAlerts.push({
          id: `fan-${fan.id}`,
          message: `Fan ${fan.id} status: ${fan.status}`,
          severity: 'warning',
          time: 'Current',
          icon: faFan
        });
      }
    });
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Connection Panel */}
      <ConnectionPanel />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Alerts</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200">
                <div className={`p-2 rounded-lg ${getSeverityColor(alert.severity)}`}>
                  <FontAwesomeIcon icon={alert.icon} className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  alert.severity === 'critical' 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Topology Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Network Topology</h3>
        </div>
        <div className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FontAwesomeIcon icon={faNetworkWired} className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Network topology visualization coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
