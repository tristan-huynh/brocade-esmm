'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLayerGroup,
    faNetworkWired,
    faTag,
    faEthernet,
    faPlus,
    faCog
} from '@fortawesome/free-solid-svg-icons';

interface VLAN {
    id: number;
    name: string;
    description?: string;
    taggedPorts: string[];
    untaggedPorts: string[];
    status: 'active' | 'inactive';
}

const mockVLANs: VLAN[] = [
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE
    // REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE REMOVE# REMOVE

    {
        id: 1,
        name: 'DEFAULT-VLAN',
        description: 'Default VLAN',
        taggedPorts: [],
        untaggedPorts: ['1/1/1', '1/1/2', '1/1/3'],
        status: 'active'
    },
    {
        id: 10,
        name: 'OFFICE',
        description: 'Office Network',
        taggedPorts: ['1/1/22', '1/1/24'],
        untaggedPorts: ['1/1/2', '1/1/4', '1/1/6', '1/1/8', '1/1/10', '1/1/12', '1/1/14', '1/1/16', '1/1/20'],
        status: 'active'
    },
    {
        id: 20,
        name: 'GUEST',
        description: 'Guest Network',
        taggedPorts: ['1/1/22', '1/1/24'],
        untaggedPorts: ['1/1/1', '1/1/3', '1/1/5', '1/1/7', '1/1/9'],
        status: 'active'
    },
    {
        id: 30,
        name: 'MANAGEMENT',
        description: 'Management VLAN',
        taggedPorts: ['1/1/22', '1/1/24'],
        untaggedPorts: [],
        status: 'active'
    },
    {
        id: 100,
        name: 'WIRELESS',
        description: 'Wireless Access Points',
        taggedPorts: ['1/1/22', '1/1/24', 'lag 1'],
        untaggedPorts: ['1/1/17', '1/1/18'],
        status: 'active'
    }
];

export default function VLANManagement() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">VLAN Management</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
                    <span>Create VLAN</span>
                </button>
            </div>

            {/* VLAN Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <FontAwesomeIcon icon={faLayerGroup} className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total VLANs</p>
                            <p className="text-2xl font-bold text-gray-900">{mockVLANs.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-50 rounded-lg">
                            <FontAwesomeIcon icon={faNetworkWired} className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Active VLANs</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {mockVLANs.filter(v => v.status === 'active').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center space-x-3">
                        <div className="p-3 bg-purple-50 rounded-lg">
                            <FontAwesomeIcon icon={faEthernet} className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600">Total Ports</p>
                            <p className="text-2xl font-bold text-gray-900">48</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* VLAN Table */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900">VLAN Configuration</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    VLAN ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tagged Ports
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Untagged Ports
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mockVLANs.map((vlan) => (
                                <tr key={vlan.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <FontAwesomeIcon icon={faTag} className="h-4 w-4 text-blue-500" />
                                            <span className="text-sm font-medium text-gray-900">{vlan.id}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{vlan.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{vlan.description || '-'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {vlan.taggedPorts.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {vlan.taggedPorts.slice(0, 3).map((port, index) => (
                                                        <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                            {port}
                                                        </span>
                                                    ))}
                                                    {vlan.taggedPorts.length > 3 && (
                                                        <span className="text-xs text-gray-500">+{vlan.taggedPorts.length - 3} more</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">None</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {vlan.untaggedPorts.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {vlan.untaggedPorts.slice(0, 3).map((port, index) => (
                                                        <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                                            {port}
                                                        </span>
                                                    ))}
                                                    {vlan.untaggedPorts.length > 3 && (
                                                        <span className="text-xs text-gray-500">+{vlan.untaggedPorts.length - 3} more</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">None</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${vlan.status === 'active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {vlan.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-800 mr-3">
                                            <FontAwesomeIcon icon={faCog} className="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
