# Dashboard

The Dashboard is the central command center of the CointMU application. It aggregates real-time wallet balances, node synchronization status, network health metrics, and transaction history into a single unified view — all fetched directly via the embedded JSON-RPC node.

![CointMU Dashboard](/images/dashboard-page.png)

## Main Wallet Panel

The wallet panel displays the active primary account connected to the local node.

| Element        | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| Live Balance   | Current CMU balance fetched directly from the node (e.g., `9,076.06 CMU`). |
| Public Address | Truncated wallet address with a one-click copy function.                   |
| Quick Actions  | Inline buttons for Send, Receive, Stake, and Mining live.                  |

Quick actions allow common wallet operations to be executed without navigating away from the Dashboard.

## Network Health

The network health panel monitors the real-time consensus state of the CointMU blockchain.

| Metric           | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Network Status   | Indicates whether the node is synced and the active consensus mechanism (e.g., `PoW - Block 30s`). |
| Chain Height     | The latest block number confirmed and appended to the chain.                                       |
| Peers            | Number of active gossip connections communicating with the local node.                             |
| Difficulty       | Current cryptographic mining difficulty, automatically adjusted by the network protocol.           |
| Gas (AVG)        | Suggested gas price in `gwei` for efficient transaction execution.                                 |
| Blocks Past Hour | Block production rate over the last hour, visualized as a sparkline chart.                         |

## Node Telemetry

The telemetry row provides a snapshot of local mining participation and on-chain deployment activity.

| Metric             | Description                                                                                        |
| ------------------ | -------------------------------------------------------------------------------------------------- |
| Your Mining        | Personal hashrate in MH/s and current miner status (e.g., `Miner idle`).                           |
| Mined Blocks (24h) | Number of blocks mined and total CMU rewards earned in the last 24 hours.                          |
| Network Hashrate   | Aggregate computational power of the entire CointMU network in KH/s, fetched in real-time via RPC. |
| Smart Contracts    | Total number of smart contracts deployed from the active address.                                  |

## Latest Blocks

The Latest Blocks feed displays a live, network-wide list of the most recently mined blocks.

Each entry includes:

- Block height and miner reward (e.g., `+2 CMU mined`).
- Block hash (truncated) and transaction count.
- Timestamp relative to the current time.
- Miner address responsible for the block.

Select **View all** to navigate to the full block list in the Explorer.

## Your Activity

The Your Activity panel aggregates the transaction history for all connected wallets.

- Displays incoming mining rewards, outbound transfers, and confirmation counts.
- Filterable by wallet using the **All Wallets** dropdown.
- Select **Export** to download the transaction history as a file.

::: tip
The activity feed is updated via background polling, keeping the list current without requiring a manual page refresh.
:::
