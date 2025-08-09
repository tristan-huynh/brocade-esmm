'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircle,
    faEthernet,
    faWifi,
    faExclamationTriangle,
    faCheckCircle,
    faClock
} from '@fortawesome/free-solid-svg-icons';

interface Switch {
    id: string;
    name: string;
    ip: string;
    model: string;
    status: 'online' | 'offline' | 'warning';
    ports: {
        total: number;
        active: number;
        disabled: number;
    };
    uptime: string;
    temperature: number;
    powerSupplies: {
        total: number;
        active: number;
    };
}

const mockSwitches: Switch[] = [
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE

    {
        id: '1',
        name: 'us-grrapids-sw-01',
        ip: '10.0.1.134',
        model: 'ICX7250-24P',
        status: 'online',
        ports: { total: 24, active: 18, disabled: 2 },
        uptime: '45 days',
        temperature: 72,
        powerSupplies: { total: 2, active: 1 }
    },
    {
        id: '2',
        name: 'us-grrapids-sw-02',
        ip: '10.0.1.132',
        model: 'ICX6450-24',
        status: 'online',
        ports: { total: 24, active: 2, disabled: 0 },
        uptime: '9 days',
        temperature: 68,
        powerSupplies: { total: 2, active: 2 }
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case 'online': return 'text-green-500';
        case 'offline': return 'text-red-500';
        case 'warning': return 'text-yellow-500';
        default: return 'text-gray-500';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'online': return faCheckCircle;
        case 'offline': return faCircle;
        case 'warning': return faExclamationTriangle;
        default: return faCircle;
    }
};

export default function SwitchManagement() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Switch Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Add Switch
                </button>
            </div>

            <div className="grid gap-6">
                {mockSwitches.map((switchDevice) => (
                    <div key={switchDevice.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <FontAwesomeIcon
                                    icon={getStatusIcon(switchDevice.status)}
                                    className={`h-5 w-5 ${getStatusColor(switchDevice.status)}`}
                                />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">{switchDevice.name}</h3>
                                    <p className="text-sm text-gray-500">{switchDevice.model} • {switchDevice.ip}</p>
                                </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${switchDevice.status === 'online'
                                    ? 'bg-green-100 text-green-800'
                                    : switchDevice.status === 'warning'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                {switchDevice.status.charAt(0).toUpperCase() + switchDevice.status.slice(1)}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faEthernet} className="h-4 w-4 text-blue-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Ports Active</p>
                                    <p className="text-sm font-medium text-gray-600">{switchDevice.ports.active}/{switchDevice.ports.total}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-green-500" />
                                <div>
                                    <p className="text-xs text-gray-500">Uptime</p>
                                    <p className="text-sm font-medium text-gray-600">{switchDevice.uptime}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} className={`h-4 w-4 ${switchDevice.temperature > 75 ? 'text-red-500' :
                                        switchDevice.temperature > 70 ? 'text-yellow-500' : 'text-green-500'
                                    }`} />
                                <div>
                                    <p className="text-xs text-gray-500">Temperature</p>
                                    <p className="text-sm font-medium text-gray-600">{switchDevice.temperature}°C</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FontAwesomeIcon icon={faCircle} className={`h-4 w-4 ${switchDevice.powerSupplies.active === switchDevice.powerSupplies.total
                                        ? 'text-green-500' : 'text-red-500'
                                    }`} />
                                <div>
                                    <p className="text-xs text-gray-500">Power Supplies</p>
                                    <p className="text-sm font-medium text-gray-600">
                                        {switchDevice.powerSupplies.active}/{switchDevice.powerSupplies.total}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex space-x-3">
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                Configure
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                Monitor
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                                Restart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
