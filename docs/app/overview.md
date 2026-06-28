# CointMU App Overview

CointMU is a comprehensive, decentralized desktop application that provides a unified interface for interacting with a custom Proof-of-Work blockchain network. Unlike traditional Web3 clients that rely on external RPC providers, CointMU ships with an embedded Geth node that runs entirely on the user's machine — making it a fully self-contained blockchain environment with no external dependencies.

## Core Features

### Embedded Geth Node

CointMU runs a background Proof-of-Work node tightly integrated with the Electron Main process. The node lifecycle — startup, shutdown, and crash recovery — is managed automatically without requiring any manual configuration from the user.

### Self-Healing Architecture

The application continuously monitors the health of the underlying LevelDB database. If corruption is detected, CointMU automatically re-initializes the node and restores a clean state without user intervention, eliminating the need for manual database repair or chain resyncs.

### Multi-Asset Wallet

The built-in wallet supports both native coins and custom ERC-20 tokens. State is persisted using Zustand Persist, enabling instant loading on application startup and eliminating layout shifts during wallet hydration.

### Integrated Mining

CointMU includes a first-class mining interface with fine-grained control over the mining process:

| Control            | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| Worker threads     | Configure the number of concurrent mining threads.                   |
| Intensity presets  | Choose between `Eco`, `Balanced`, and `Turbo` intensity modes.       |
| Block distribution | View real-time stats on mined block distribution across the network. |

### Real-Time Dashboard

The dashboard aggregates live network data through efficient background polling:

- Network hashrate across all active miners.
- Smart contract deployment activity on the chain.
- Paginated transaction history with low-latency updates.

All data is fetched in the background to keep the UI responsive at all times.

## Architecture Overview

CointMU is structured around three tightly coupled layers:

```text
┌─────────────────────────────────────────┐
│              Electron Shell             │
│   (Main Process — Node Lifecycle,       │
│    IPC Bridge, System Integration)      │
├─────────────────────────────────────────┤
│         React + Vite Renderer           │
│   (UI Layer — Wallet, Dashboard,        │
│    Mining Controls, Token Management)   │
├─────────────────────────────────────────┤
│           Geth Child Process            │
│   (Embedded PoW Node — JSON-RPC API,   │
│    LevelDB State, Mining Engine)        │
└─────────────────────────────────────────┘
```

**Electron** serves as the application shell, managing the Geth child process lifecycle and exposing a secure IPC bridge between the Main process and the renderer.

**React and Vite** power the renderer layer, providing a fast, component-driven UI for wallet management, mining controls, and real-time network data visualization.

**Geth** runs as a managed child process under Electron, exposing a local JSON-RPC API that the renderer consumes through the IPC bridge. All chain state, including account balances, contract deployments, and transaction history, is stored locally in a LevelDB database managed by the Geth process.

## Key Design Principles

| Principle                | Implementation                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------ |
| Zero external dependency | All blockchain operations run locally with no reliance on third-party RPC providers. |
| Resilient by default     | Self-healing node management ensures uptime without manual intervention.             |
| Performance-first UI     | Zustand Persist and background polling keep the interface fast and shift-free.       |
| Developer-accessible     | The embedded JSON-RPC API is compatible with standard Ethereum tooling.              |
