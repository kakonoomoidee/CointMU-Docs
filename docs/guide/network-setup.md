# Network & Node Setup

CointMU runs as a private Geth network with a fixed Chain ID of `1912`. The Chain ID is embedded in every signed transaction to prevent replay attacks and to ensure that all wallets, scripts, and deployment tools are bound to the CointMU chain only.

## Genesis Configuration

The genesis file defines the initial network state, including the consensus rules, pre-funded accounts, and the chain identity. For CointMU, the most important settings are:

- `chainId: 1912` in the `config` block.
- A private network allocation suitable for local development or controlled deployment.
- Any pre-funded deployer accounts required by your workflow.

A minimal genesis file should keep the network deterministic and stable across all nodes. Every node started against the same genesis must use the same `chainId` and genesis hash.

## Starting the Geth Node

Use the following script to start the node with the JSON-RPC HTTP API exposed on port `8545`.

```bash
#!/usr/bin/env bash
set -euo pipefail

DATA_DIR="./data"
GENESIS_FILE="./genesis.json"
RPC_ADDR="127.0.0.1"
RPC_PORT="8545"
CHAIN_ID="1912"

if [ ! -d "$DATA_DIR/geth" ]; then
  geth --datadir "$DATA_DIR" init "$GENESIS_FILE"
fi

geth \
  --datadir "$DATA_DIR" \
  --networkid "$CHAIN_ID" \
  --http \
  --http.addr "$RPC_ADDR" \
  --http.port "$RPC_PORT" \
  --http.api "eth,net,web3,personal,miner,admin" \
  --http.corsdomain "*" \
  --allow-insecure-unlock \
  --unlock 0 \
  --password ./password.txt
```

The key operational detail is the HTTP endpoint on `127.0.0.1:8545`. The node should not be exposed directly to untrusted clients.

## Nginx Reverse Proxy

CointMU uses Nginx as a security layer in front of Geth. The proxy listens on port `8585`, forwards traffic to the local JSON-RPC endpoint on `127.0.0.1:8545`, and restricts access to approved IP ranges.

```nginx
server {
    listen 8585;
    server_name _;

    location / {
        allow 10.0.0.0/8;
        deny all;

        proxy_pass http://127.0.0.1:8545;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

This pattern keeps the Geth HTTP API reachable only through a controlled ingress path. Clients inside the whitelisted `10.x.x.x` network can connect to `http://10.64.24.248:8585`, while all other requests are rejected at the proxy boundary.

## Operational Notes

- Use `1912` consistently in wallets, deployment scripts, and local tooling.
- Keep the Geth HTTP API bound to localhost when possible.
- Treat the Nginx proxy as the only external entry point for JSON-RPC access.
- Start mining before sending transactions if the network does not produce blocks automatically.
