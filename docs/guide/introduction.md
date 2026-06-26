# Introduction

Welcome to the CointMU Network documentation. This guide provides the technical baseline for building, compiling, and deploying smart contracts on a private blockchain environment.

## Core Components

- **CointMU Network (Geth):** A private Ethereum-compatible network running on Geth with Chain ID `1912`.
- **CointMU CLI (`cmu`):** A command-line toolkit used to scaffold projects, compile Solidity contracts, and execute deployments.
- **Nginx Security Proxy:** A reverse proxy layer that listens on port `8585`, forwards approved traffic to `127.0.0.1:8545`, and enforces strict IP whitelisting.

## Architecture Flow

```text
Developer Machine
  -> cmu create | cmu compile | cmu deploy
  -> JSON-RPC Request
Nginx Security Proxy (Port 8585)
  -> proxy_pass
Geth Node HTTP API (127.0.0.1:8545, Chain ID 1912)
```

This architecture ensures that smart contract tooling reaches the blockchain node only through a controlled ingress layer.

## Prerequisites

- Node.js installed on the development machine.
- Access to the local CointMU network segment or approved VPN.
- Connectivity to the Nginx proxy endpoint exposed by the node operator.
