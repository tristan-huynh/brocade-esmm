'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartLine,
    faThermometerHalf,
    faBolt,
    faFan,
    faNetworkWired,
    faClock
} from '@fortawesome/free-solid-svg-icons';

// Temporary data 
const MonitoringDashboard = () => {
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // Temporary Data
    const temperatureData = [
        { time: '00:00', value: 68 },
        { time: '04:00', value: 70 },
        { time: '08:00', value: 72 },
        { time: '12:00', value: 75 },
        { time: '16:00', value: 73 },
        { time: '20:00', value: 71 },
    ];

    const portUtilization = [
        { port: '1/1/1', utilization: 85, status: 'active' },
        { port: '1/1/2', utilization: 42, status: 'active' },
        { port: '1/1/3', utilization: 67, status: 'active' },
        { port: '1/1/4', utilization: 23, status: 'active' },
        { port: '1/1/5', utilization: 0, status: 'inactive' },
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Network Monitoring</h2>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <FontAwesomeIcon icon={faThermometerHalf} className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Avg Temperature</p>
                            <p className="text-2xl font-bold text-gray-900">72°C</p>
                            <p className="text-xs text-red-600">↗ 2°C from last hour</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FontAwesomeIcon icon={faBolt} className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Power Usage</p>
                            <p className="text-2xl font-bold text-gray-900">450W</p>
                            <p className="text-xs text-green-600">Normal range</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FontAwesomeIcon icon={faNetworkWired} className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Ports</p>
                            <p className="text-2xl font-bold text-gray-900">18/24</p>
                            <p className="text-xs text-blue-600">75% utilization</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FontAwesomeIcon icon={faClock} className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Uptime</p>
                            <p className="text-2xl font-bold text-gray-900">45d</p>
                            <p className="text-xs text-purple-600">99.9% availability</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Temperature Chart */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                        <FontAwesomeIcon icon={faChartLine} className="h-5 w-5" />
                        <span>Temperature Trends (24h)</span>
                    </h3>
                </div>
                <div className="p-6">
                    <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <FontAwesomeIcon icon={faChartLine} className="h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-500">Temperature chart visualization</p>
                            <p className="text-xs text-gray-400 mt-2">Chart component integration needed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Port Utilization */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">Port Utilization</h3>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {portUtilization.map((port, index) => (
                            <div key={index} className="flex items-center space-x-4">
                                <div className="w-20 text-sm font-medium text-gray-900">
                                    {port.port}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${port.utilization > 80 ? 'bg-red-500' :
                                                        port.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${port.utilization}%` }}
                                            ></div>
                                        </div>
                                        <div className="w-12 text-sm text-gray-600">
                                            {port.utilization}%
                                        </div>
                                        <div className={`w-16 text-xs font-medium ${port.status === 'active' ? 'text-green-600' : 'text-gray-400'
                                            }`}>
                                            {port.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faFan} className="h-5 w-5" />
                            <span>Fan Status</span>
                        </h3>
                    </div>
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Fan 1</span>
                            <span className="text-sm font-medium text-green-600">OK (Auto)</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Fan 2</span>
                            <span className="text-sm font-medium text-green-600">OK (Auto)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900 flex items-center space-x-2">
                            <FontAwesomeIcon icon={faBolt} className="h-5 w-5" />
                            <span>Power Supplies</span>
                        </h3>
                    </div>
                    <div className="p-6 space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">PSU 1 (AC - PoE)</span>
                            <span className="text-sm font-medium text-green-600">Present, OK</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">PSU 2</span>
                            <span className="text-sm font-medium text-red-600">Not Present</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonitoringDashboard;
