# Introduction

CointMU is a private Ethereum-compatible blockchain network designed for controlled, enterprise-grade Web3 development. This documentation covers everything you need to build, compile, deploy, and audit smart contracts on the CointMU ecosystem — from initial project setup to production-ready deployment pipelines.

## What is CointMU?

CointMU is built on a hardened Geth node running with Chain ID `1912`. Unlike public testnets, CointMU operates as an isolated private network, giving teams full control over the chain environment without exposure to external actors.

The ecosystem ships with three tightly integrated components:

| Component                  | Role                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| **CointMU Network (Geth)** | Private Ethereum-compatible chain running on Geth with Chain ID `1912`.                    |
| **CointMU CLI (`cmu`)**    | All-in-one developer toolkit for scaffolding, compiling, deploying, and auditing projects. |
| **Nginx Security Proxy**   | Reverse proxy layer enforcing strict IP whitelisting before traffic reaches the Geth node. |

## Architecture

All smart contract tooling communicates with the blockchain node through a controlled ingress layer. Direct access to the Geth HTTP API is never exposed to the outside.

```text
Developer Machine
  └─ cmu create | cmu compile | cmu deploy
       │
       ▼ JSON-RPC Request
Nginx Security Proxy (Port 8585)
  └─ IP Whitelist Enforcement
       │
       ▼ proxy_pass
Geth Node HTTP API (127.0.0.1:8545, Chain ID 1912)
```

This design ensures that only approved traffic originating from whitelisted sources can interact with the node, reducing the attack surface of the private network.

## Core Concepts

**Private Network Isolation**
CointMU does not connect to any public Ethereum network. All transactions, contract deployments, and chain state are contained within the private network segment. This makes it suitable for internal development, staging environments, and permissioned enterprise deployments.

**CLI-First Workflow**
The `cmu` CLI is the primary interface for all developer operations. From project scaffolding to contract deployment, every step in the development lifecycle is accessible through a single terminal command.

**Proxy-Enforced Access**
The Nginx Security Proxy sits between the developer machine and the Geth node. It listens on port `8585`, forwards approved traffic to `127.0.0.1:8545`, and rejects any request that does not originate from a whitelisted IP address.

## Prerequisites

Before getting started, ensure the following are in place:

| Requirement           | Details                                                                    |
| --------------------- | -------------------------------------------------------------------------- |
| Node.js               | Required to run the `cmu` CLI and project tooling.                         |
| Network access        | Access to the local CointMU network segment or an approved VPN connection. |
| Proxy endpoint access | Connectivity to the Nginx proxy endpoint exposed by the node operator.     |

## Next Steps

Once your environment is ready, start with the CLI reference to scaffold your first CointMU project:

- [CLI Overview](/cli/overview)
- [cmu create](/cli/create)
- [cmu compile](/cli/compile)
- [cmu deploy](/cli/deploy)
