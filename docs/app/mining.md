# Mining

The Mining page is the dedicated control center for participating in CointMU network consensus. It provides full control over local hardware allocation, intensity tuning, and reward tracking — all without leaving the application.

![CointMU Mining](/images/mining-page.png)

## Consensus Control

The main banner displays the current mining state and provides the primary start/stop control.

| Element           | Description                                                            |
| ----------------- | ---------------------------------------------------------------------- |
| Status            | Current operational state of the local miner (e.g., `IDLE`, `Mining`). |
| Hashrate          | Real-time computational output in MH/s.                                |
| Target Difficulty | Current network difficulty target (e.g., `0x123957`).                  |
| Block Reward      | Fixed reward per block found (e.g., `2 CMU` per block).                |
| Rewards Today     | Total CMU earned in the current session.                               |
| Start Mining      | Primary action button to join or leave the network consensus.          |

## Performance Metrics

Four telemetry cards track historical and current mining performance.

| Metric           | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| Session Time     | Duration of the current active mining session.                                          |
| Blocks Found     | Total valid blocks mined in the past 24 hours.                                          |
| Total Earned     | Aggregate CMU rewards accumulated across the lifetime of the connected wallet.          |
| Hashrate - 5 Min | Five-minute moving average of computational output, used to monitor hardware stability. |

## Worker Configuration

The Worker Configuration panel controls how the local machine allocates hardware resources to the mining process.

| Setting        | Description                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| Worker Threads | Number of CPU cores dedicated to mining (e.g., `4 of 12 cores`). Adjust using the visual thread selector. |
| Intensity      | Solver aggressiveness preset. Controls heat output and resource utilization.                              |
| Reward Address | The wallet address where block rewards are credited upon a successful solve.                              |

**Intensity presets:**

| Preset     | Behavior                                                    |
| ---------- | ----------------------------------------------------------- |
| `Eco`      | Reduced resource utilization. Lower heat, slower solves.    |
| `Balanced` | Moderate resource utilization. Default recommended setting. |
| `Turbo`    | Maximum resource utilization. Higher heat, fastest solves.  |

::: warning
Running at `Turbo` intensity for extended periods may increase CPU temperature significantly. Ensure adequate system cooling before enabling this preset.
:::

## Mining Activity

The Mining Activity panel provides a detailed ledger of consensus participation and block rewards.

| Tab      | Description                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------- |
| Found    | Blocks successfully found by the local miner, with block height, hash, timestamp, and CMU reward. |
| Shares   | Submitted work shares, used for tracking solver participation.                                    |
| Log      | System-level mining daemon log output.                                                            |
| Activity | Chronological overview of all mining-related events.                                              |

Use the **All Wallets** dropdown to filter the activity ledger by a specific account.
