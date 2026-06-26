# cmu node connect

`cmu node connect` verifies connectivity to the configured CointMU JSON-RPC endpoint.

## Usage

```bash
cmu node connect
```

## Overview

The command resolves the node RPC URL from the active CointMU configuration and uses an Ethereum JSON-RPC provider to test connectivity.

**Default fallback if no configuration is present:**

```text
http://localhost:8545
```

## Configuration Source

The RPC endpoint is read from:

```
network.rpcUrl
```

If configuration loading fails or the property is missing, the command uses the fallback URL.

## Connection Checks

After resolving the RPC endpoint, the command performs the following checks in order:

1. Opens a JSON-RPC provider with the resolved URL.
2. Reads the connected network metadata.
3. Fetches the latest block number.

If any step fails, the command reports that the node is unreachable or unavailable.

## Output

On a successful connection, the command prints:

| Field               | Description                             |
| ------------------- | --------------------------------------- |
| Network name        | Name of the connected network.          |
| Chain ID            | Unique identifier of the network.       |
| Latest block number | Most recently confirmed block on-chain. |

This makes it useful for quickly validating that the local or remote CointMU node is responding correctly.
