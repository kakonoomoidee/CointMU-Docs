# Self-Healing Embedded Node

CointMU runs a full Geth node directly inside the application as a managed child process. There is no external node to configure, no RPC provider to connect to, and no separate daemon to keep alive — the application handles the entire node lifecycle automatically.

## How It Works

The Geth node is spawned by the Electron Main process at application startup and terminated cleanly when the application closes. All communication between the UI and the node happens through the local JSON-RPC API exposed by the embedded Geth instance.

```text
Electron Main Process
  └─ Spawns Geth as a child process
       │
       ▼
Geth Node (127.0.0.1:8545)
  └─ Exposes JSON-RPC API
       │
       ▼
React Renderer (via IPC Bridge)
  └─ Wallet, Dashboard, Explorer, Mining UI
```

## Node Lifecycle

| Phase    | Behavior                                                              |
| -------- | --------------------------------------------------------------------- |
| Startup  | Geth is spawned automatically when the application launches.          |
| Running  | The node syncs with the CointMU network and serves JSON-RPC requests. |
| Shutdown | Geth is terminated gracefully when the application is closed.         |
| Crash    | The application detects the unexpected exit and attempts a restart.   |

No manual intervention is required at any lifecycle phase.

## Self-Healing Architecture

CointMU continuously monitors the health of the underlying LevelDB database used by Geth to store chain state. If corruption is detected, the application performs automatic recovery without requiring user action.

**Recovery sequence:**

1. Corruption detected in the LevelDB data directory.
2. Application halts the current Geth process.
3. Corrupted database files are cleared.
4. Geth is re-initialized with a clean state.
5. Node resumes normal operation and begins resyncing.

::: warning
The self-healing process results in a full chain resync from the network. Locally mined blocks and transaction history are preserved on the network but the local database is rebuilt from scratch.
:::

## Network Configuration

The embedded node connects to the CointMU private network using the following defaults:

| Parameter  | Value                   |
| ---------- | ----------------------- |
| Network    | CointMU Mainnet         |
| Chain ID   | `1912`                  |
| RPC URL    | `http://127.0.0.1:8545` |
| Consensus  | Proof of Work (PoW)     |
| Block Time | ~30 seconds             |

These values are bundled with the application and do not require manual configuration.

## Troubleshooting

| Symptom                    | Likely Cause                              | Resolution                                               |
| -------------------------- | ----------------------------------------- | -------------------------------------------------------- |
| Node stuck on startup      | Corrupted LevelDB database                | Self-healing triggers automatically on next launch.      |
| Disconnected from network  | No peers available or network unreachable | Check network access and verify VPN or LAN connectivity. |
| RPC requests failing       | Geth process crashed unexpectedly         | Restart the application to respawn the node.             |
| Chain height not advancing | Miner stopped or no peers connected       | Verify mining status and peer count on the Dashboard.    |
