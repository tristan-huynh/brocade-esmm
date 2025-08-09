use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct SwitchInfo {
    pub chassis: ChassisInfo,
    pub configuration: ConfigInfo,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ChassisInfo {
    pub power_supplies: Vec<PowerSupply>,
    pub fans: Vec<Fan>,
    pub temperatures: Vec<Temperature>,
    pub raw_output: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ConfigInfo {
    pub version: Option<String>,
    pub hostname: Option<String>,
    pub vlans: Vec<VlanInfo>,
    pub interfaces: Vec<InterfaceInfo>,
    pub ip_routes: Vec<String>,
    pub raw_config: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PowerSupply {
    pub id: u8,
    pub status: String,
    pub present: bool,
    pub psu_type: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Fan {
    pub id: u8,
    pub status: String,
    pub speed: String,
    pub direction: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Temperature {
    pub location: String,
    pub value: f32,
    pub unit: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VlanInfo {
    pub id: u16,
    pub name: Option<String>,
    pub tagged_ports: Vec<String>,
    pub untagged_ports: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InterfaceInfo {
    pub name: String,
    pub ip_address: Option<String>,
    pub subnet_mask: Option<String>,
    pub status: Option<String>,
}