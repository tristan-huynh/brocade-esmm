
use std::net::TcpStream;
use ssh2::Session;
use std::io::prelude::*;
use serde::{Serialize, Deserialize};

pub fn get_switch_information(ip: &str, username: &str, password: &str) -> Result<(), Box<dyn std::error::Error>> {
    let tcp = TcpStream::connect(ip)?;
    let mut session = Session::new()?;
    session.set_tcp_stream(tcp);
    session.set_timeout(30000);

    session.method_pref(ssh2::MethodType::Kex, "diffie-hellman-group1-sha1")?;
    session.method_pref(ssh2::MethodType::HostKey, "ssh-rsa")?;
    session.method_pref(ssh2::MethodType::MacCs, "hmac-sha1")?;
    session.method_pref(ssh2::MethodType::MacSc, "hmac-sha1")?;


    session.handshake()?;

    session.userauth_password(username, password)?;
    if !session.authenticated() {
        return Err("Authentication failed".into());
    }

    // let mut channel = session.channel_session()?;
    // channel.request_pty("vt100", None, None)?;
    // channel.shell()?;
    
    // channel.write_all(b"skip-page-display\nsh chassis\n")?;
    
    // std::thread::sleep(std::time::Duration::from_secs(3));
    
    // let mut output = String::new();
    // channel.read_to_string(&mut output)?;
    // println!("{}", output);
    let mut channel = session.channel_session()?;
    channel.request_pty("vt100", None, None)?;
    channel.shell()?;
    
    // Send the command
    channel.write_all(b"skip-page-display\nsh chassis\n")?;
    channel.flush()?;
    
    // Wait for output
    std::thread::sleep(std::time::Duration::from_secs(5));
    
    let mut buf = Vec::new();
    let mut temp = [0u8; 8192];
    
    // Read all available data
    loop {
        match channel.read(&mut temp) {
            Ok(0) => break,
            Ok(n) => {
                buf.extend_from_slice(&temp[..n]);
                // Short delay to allow more data to arrive
                std::thread::sleep(std::time::Duration::from_millis(50));
            }
            Err(_) => break,
        }
    }
    
    let output = String::from_utf8_lossy(&buf);
    println!("{}", output);

    channel.close()?;
    println!("Exit status: {}", channel.exit_status()?);
    Ok(())
}

fn main() {
    if let Err(e) = get_switch_information("10.0.1.134:22", "root", "thuynh12") {
        eprintln!("Connection failed: {}", e);
    }
}

