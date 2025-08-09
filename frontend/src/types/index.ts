// TODO: DATABASE INTEGRATION - These interfaces should match your PostgreSQL database schema
// Consider using Prisma, Drizzle, or another ORM to generate these types automatically
// from your database schema

export interface Site {
  id: string;
  name: string;
  address: string;
  timezone: string;
  status: 'online' | 'offline' | 'warning';
  devices: {
    switches: number;
    online: number;
    offline: number;
  };
  lastSeen: string;
  tags: string[];
  
  // TODO: POSTGRESQL - Add database fields you might need
  // created_at?: Date;
  // updated_at?: Date;
  // organization_id?: string;
  // contact_email?: string;
  // region?: string;
}

export interface Switch {
  id: string;
  name: string;
  ip: string;
  model: string;
  status: 'online' | 'offline' | 'warning';
  site: string;
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
  firmware: string;
  
  // TODO: POSTGRESQL - Add database fields for switch management
  // site_id?: string;
  // last_polled?: Date;
  // credentials_id?: string; // Reference to encrypted credentials
  // configuration_backup?: string; // Latest config backup
  // created_at?: Date;
  // updated_at?: Date;
}

export interface Alert {
  id: string;
  siteId: string;
  deviceId: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
  acknowledged: boolean;
  
  // TODO: POSTGRESQL - Add database fields for alert management
  // resolved?: boolean;
  // resolved_at?: Date;
  // resolved_by?: string;
  // escalated?: boolean;
  // notification_sent?: boolean;
}
