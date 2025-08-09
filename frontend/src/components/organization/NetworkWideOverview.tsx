'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faNetworkWired,
    faBuilding,
    faExclamationTriangle,
    faCheckCircle,
    faClock,
    faChartLine
} from '@fortawesome/free-solid-svg-icons';

export default function NetworkWideOverview() {
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // Temp Temperature Data
    const stats = {
        totalSites: 4,
        onlineSites: 3,
        totalDevices: 18,
        onlineDevices: 15,
        criticalAlerts: 3,
        warnings: 5,
        networkUptime: '99.2%',
        avgLatency: '12ms'
    };
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE 
    const recentActivity = [
        {
            id: 1,
            type: 'alert',
            message: 'Power supply failure at Headquarters',
            site: 'Headquarters',
            time: '5 minutes ago',
            severity: 'critical'
        },
        {
            id: 2,
            type: 'device',
            message: 'Switch came online at Downtown Branch',
            site: 'Downtown Branch',
            time: '15 minutes ago',
            severity: 'info'
        },
        {
            id: 3,
            type: 'config',
            message: 'VLAN configuration updated at Warehouse',
            site: 'Warehouse Facility',
            time: '1 hour ago',
            severity: 'info'
        },
        {
            id: 4,
            type: 'alert',
            message: 'High temperature warning at Remote Office',
            site: 'Remote Office',
            time: '2 hours ago',
            severity: 'warning'
        }
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'text-red-600';
            case 'warning': return 'text-yellow-600';
            case 'info': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return faExclamationTriangle;
            case 'warning': return faExclamationTriangle;
            case 'info': return faCheckCircle;
            default: return faCheckCircle;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Network-wide Overview</h1>
                <p className="text-gray-600">Monitor your entire network infrastructure</p>
            </div>

            {/* Organization Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FontAwesomeIcon icon={faBuilding} className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active Sites</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.onlineSites}/{stats.totalSites}</p>
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
                            <p className="text-2xl font-bold text-gray-900">{stats.onlineDevices}/{stats.totalDevices}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-red-50 rounded-lg">
                            <FontAwesomeIcon icon={faExclamationTriangle} className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.criticalAlerts}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Network Uptime</p>
                            <p className="text-2xl font-bold text-gray-900">{stats.networkUptime}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Network Health */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg ${activity.severity === 'critical' ? 'bg-red-50' :
                                        activity.severity === 'warning' ? 'bg-yellow-50' : 'bg-blue-50'
                                        }`}>
                                        <FontAwesomeIcon
                                            icon={getSeverityIcon(activity.severity)}
                                            className={`h-4 w-4 ${getSeverityColor(activity.severity)}`}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                                        <div className="flex items-center space-x-2 mt-1">
                                            <span className="text-xs text-gray-500">{activity.site}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <div className="flex items-center space-x-1">
                                                <FontAwesomeIcon icon={faClock} className="h-3 w-3 text-gray-400" />
                                                <span className="text-xs text-gray-500">{activity.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Network Performance */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Network Performance</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Network Uptime</span>
                                    <span className="font-medium text-gray-900">{stats.networkUptime}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '99.2%' }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Device Health</span>
                                    <span className="font-medium text-gray-900">{Math.round((stats.onlineDevices / stats.totalDevices) * 100)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${(stats.onlineDevices / stats.totalDevices) * 100}%` }}></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-600">Average Latency</span>
                                    <span className="font-medium text-gray-900">{stats.avgLatency}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                        </div>
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
                            <p className="text-gray-500">Interactive network topology coming soon</p>
                            <p className="text-xs text-gray-400 mt-2">Visualize connections between sites and devices</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
