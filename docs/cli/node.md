# cmu node

`cmu node` manages the local EVM node for development and testing. It provides subcommands to test connectivity against a configured RPC endpoint and to spin up a local development network with pre-funded accounts.

## Usage

```bash
cmu node [options] <subcommand>
```

## Global Options

| Flag            | Description                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-v, --verbose` | Enable verbose logging for all `cmu node` subcommands. When set, suppressed internal warnings from native dependencies are printed to the console. |

## Subcommands

| Subcommand         | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `cmu node connect` | Ping the configured RPC endpoint to test connectivity.       |
| `cmu node start`   | Start a local Ganache-based DevNet with pre-funded accounts. |

---

## cmu node connect

Verifies connectivity to a configured CointMU JSON-RPC endpoint by fetching network metadata and the latest block number.

### Usage

```bash
cmu node connect [options]
```

### Options

| Flag                   | Description                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `-n, --network <name>` | Specify the named network to connect to. If omitted, the active network from the current session is used. |

### Behavior

The command performs the following steps in order:

1. Resolves the RPC URL from the specified or active network configuration.
2. Opens a JSON-RPC provider with the resolved URL.
3. Fetches the connected network metadata.
4. Fetches the latest block number.

If any step fails, the command reports that the node is unreachable and exits with code `1`.

::: tip
Pass `-v` to print the full error object when a connection attempt fails, which is useful for diagnosing TLS or network-level issues.
:::

### Output

```bash
Pinging CointMU node at http://localhost:8545...
Successfully connected to the CointMU node!
Network Name: cointmu
Chain ID:     1912
Block Number: 5686
```

---

## cmu node start

Starts a local Ganache-based development network with Chain ID `1912`, pre-funded accounts, and an optional custom mnemonic.

### Usage

```bash
cmu node start [options]
```

### Options

| Flag                      | Description                                                                     | Default        |
| ------------------------- | ------------------------------------------------------------------------------- | -------------- |
| `--host <host>`           | Host address to bind the DevNet server to.                                      | `127.0.0.1`    |
| `-p, --port <number>`     | Port to bind the DevNet server to.                                              | `8585`         |
| `-m, --mnemonic <phrase>` | 12-word mnemonic seed phrase to generate deterministic accounts.                | Auto-generated |
| `-l, --log`               | Enable real-time RPC transaction logging for `eth_`, `net_`, and `web3_` calls. | Disabled       |

### Behavior

On startup, the DevNet:

- Spins up a Ganache server on the specified host and port.
- Creates **10 pre-funded accounts** with **100 CMU each**.
- Uses Chain ID `1912` to match the CointMU network.
- Operates in **strict instamine mode** — transactions are mined immediately and deterministically.
- Prints the active mnemonic and a full account table to the console.
- Shuts down gracefully on `SIGINT` (`Ctrl+C`).

### Output

```bash
Local CointMU DevNet is successfully running on http://127.0.0.1:8585
Chain ID: 1912

Mnemonic: word1 word2 word3 ... word12
WARNING: This is a development mnemonic. DO NOT use it on a mainnet.

Pre-funded Developer Accounts (100 ETH each):
===========================================================================================================
| Index | Public Address                             | Private Key                                         |
===========================================================================================================
| [0]   | 0x...                                      | 0x...                                               |
| [1]   | 0x...                                      | 0x...                                               |
...
===========================================================================================================
```

::: danger WARNING
The mnemonic and private keys printed on startup are for **local development only**. Never use them on a live or production network.
:::

::: info
Internal warnings from native dependencies (such as `uws_win32` or µWS fallback messages) are suppressed by default. Pass `-v` to expose them.
:::

### RPC Logging

When `--log` is enabled, the DevNet prints all incoming RPC method calls in real time:

```bash
[RPC] eth_blockNumber
[RPC] eth_getBalance
[RPC] net_version
```

Only `eth_`, `net_`, and `web3_` prefixed methods are logged.
