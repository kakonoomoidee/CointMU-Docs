# cmu node connect

`cmu node connect` verifies connectivity to the configured CointMU JSON-RPC endpoint.

## Usage

```bash
cmu node connect
```

## Overview

The command resolves the node RPC URL from the active CointMU configuration and uses an Ethereum JSON-RPC provider to test connectivity.

If no configuration value is present, the command falls back to the default endpoint:

```text
http://localhost:8545
```

## Configuration Source

The RPC endpoint is read from:

- `network.rpcUrl`

If configuration loading fails or the property is missing, the command uses the fallback URL.

## Connection Checks

After resolving the RPC endpoint, the command performs the following checks:

- Opens a JSON-RPC provider with the resolved URL.
- Reads the connected network metadata.
- Fetches the latest block number.

If any of these steps fail, the command reports that the node is unreachable or unavailable.

## Output

On success, the command prints:

- The resolved network name
- The Chain ID
- The latest block number

This makes it useful for quickly validating that the local or remote CointMU node is responding correctly.
