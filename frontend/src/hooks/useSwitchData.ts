'use client';

import { useState, useEffect } from 'react';

// TODO: BACKEND INTEGRATION - Define interfaces that match your Rust backend response
export interface SwitchData {
  chassis: {
    power_supplies: Array<{
      id: number;
      status: string;
      present: boolean;
      psu_type?: string;
    }>;
    fans: Array<{
      id: number;
      status: string;
      speed: string;
      direction?: string;
    }>;
    temperatures: Array<{
      location: string;
      value: number;
      unit: string;
    }>;
    raw_output: string;
  };
  configuration: {
    version?: string;
    hostname?: string;
    vlans: Array<{
      id: number;
      name?: string;
      tagged_ports: string[];
      untagged_ports: string[];
    }>;
    interfaces: Array<{
      name: string;
      ip_address?: string;
      subnet_mask?: string;
      status?: string;
    }>;
    ip_routes: string[];
    raw_config: string;
  };
}

export const useSwitchData = () => {
  const [data, setData] = useState<SwitchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // TODO: BACKEND INTEGRATION - Replace with your Rust backend URL
      // Example: const response = await fetch('http://localhost:8080/api/switch-data');
      const response = await fetch('/api/switch-data');
      
      if (!response.ok) {
        throw new Error('Failed to fetch switch data');
      }
      const switchData = await response.json();
      setData(switchData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const connectToSwitch = async (ip: string, username: string, password: string) => {
    try {
      setLoading(true);
      
      // TODO: BACKEND INTEGRATION - Replace with your Rust backend endpoint
      // This should call your Rust function: get_switch_information(ip, username, password)
      // Example: const response = await fetch('http://localhost:8080/api/connect-switch', {
      const response = await fetch('/api/switch-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // TODO: AUTHENTICATION - Add authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ ip, username, password }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to connect to switch');
      }
      
      const result = await response.json();
      setData(result.data);
      setError(null);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // TODO: BACKEND INTEGRATION - Only fetch on mount if you have persistent data
    // You might want to conditionally fetch based on site selection
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    connectToSwitch,
  };
};
