# Deploying Your First Token

This guide shows how to create and deploy a basic ERC20 token on CointMU using OpenZeppelin and the `cmu` CLI.

## Prerequisites

- A running CointMU Geth node on Chain ID `1912`.
- The Nginx proxy available at `http://10.64.24.248:8585`.
- A funded deployer account unlocked in the local node.
- The miner started so transactions are included in blocks.

## 1. Create the Token Contract

Use OpenZeppelin's ERC20 implementation as the foundation for the token.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CMUS is ERC20, Ownable {
    constructor() ERC20("CointMU Token", "CMUS") Ownable(msg.sender) {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }
}
```

This example creates `CMUS` with an initial supply minted to the deployer.

## 2. Add the Deployment Script

Place the deployment script in the `deploy/` directory and point it at the Nginx proxy URL.

```typescript
import { ethers } from "ethers";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const rpcUrl = "http://10.64.24.248:8585";
  const provider = new ethers.JsonRpcProvider(rpcUrl, 1912);
  const wallet = new ethers.Wallet(
    process.env.DEPLOYER_PRIVATE_KEY as string,
    provider,
  );

  const artifactPath = path.resolve("artifacts", "CMUS.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    wallet,
  );

  const token = await factory.deploy();
  await token.waitForDeployment();

  console.log("CMUS deployed to:", await token.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

The script uses the proxy endpoint rather than the raw Geth port so that all RPC traffic passes through the IP whitelist and proxy controls.

## 3. Compile the Project

Run the CLI compiler before deployment so the artifacts are available.

```bash
cmu compile
```

If the contract imports OpenZeppelin packages, `cmu compile` resolves them dynamically from `node_modules`.

## 4. Deploy the Token

Run the deployment pipeline after compilation.

```bash
cmu deploy
```

The deployment command executes each file in `deploy/` sequentially, which is useful when the token deployment depends on earlier initialization steps.

## 5. Start Mining

Before sending the deployment transaction, open the Geth console and start the miner.

```bash
miner.start(1)
```

If mining is not active, the transaction may remain pending and the contract will not be mined into a block.

## Verification

After deployment, confirm the contract address in the CLI output and verify the token metadata from a wallet or script connected to the same Chain ID `1912`.
