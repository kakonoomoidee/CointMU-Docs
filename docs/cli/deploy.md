# cmu deploy

`cmu deploy` compiles and sequentially executes every deployment script in the `deploy/` directory against the configured CointMU network.

## Usage

```bash
cmu deploy [options]
```

## Requirements

`cmu deploy` must be executed from the root of a CointMU project.

- A `PRIVATE_KEY` must be defined in the `.env` file or network configuration.
- The `deploy/` directory must exist and contain at least one `.ts` or `.js` script.

::: warning

- If the `deploy/` directory does not exist, the command exits with an error.
- If `PRIVATE_KEY` is missing or invalid, the command exits before executing any script.
- If no matching scripts are found, the command prints a notice and exits successfully.
  :::

## Options

| Flag                   | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| `-c, --config`         | Display the current deployment configuration and exit without deploying. |
| `-p, --ping`           | Ping the configured RPC endpoint to verify connectivity and exit.        |
| `-n, --network <name>` | Specify the target network to deploy to.                                 |

## Pre-Deployment Steps

Before executing any deployment script, the command performs the following steps automatically:

1. **Compile** — triggers `cmu compile` to ensure all contract artifacts are up to date.
2. **Load environment** — reads `.env` from the project root and resolves the active network configuration.
3. **Validate private key** — verifies the `PRIVATE_KEY` is present and produces a valid wallet address.
4. **Print deployment metadata** — outputs a summary before any script is executed.

```bash
--- Deployment Metadata ---
Network Name  : cointmu
RPC URL       : http://localhost:8545
Chain ID      : 1912
Deployer      : 0x...
---------------------------
```

::: info
When `--config` is provided, the private key is printed in masked form (e.g., `0xabc...ef01`) and the command exits without deploying.
:::

## Supported Script Extensions

| Extension | Runtime       |
| --------- | ------------- |
| `.ts`     | `npx ts-node` |
| `.js`     | `node`        |

Scripts are sorted lexicographically before execution, so naming conventions like `01_init.ts` → `02_deploy.ts` work as expected.

## Execution Model

Each deployment script is executed using `execFileSync` in a separate child process with inherited standard I/O. The correct runtime is selected automatically based on the script extension.

The following environment variables are injected into each script at runtime:

| Variable       | Description                                        |
| -------------- | -------------------------------------------------- |
| `CMU_RPC_URL`  | The resolved RPC URL of the active network.        |
| `CMU_CHAIN_ID` | The chain ID of the active network as a string.    |
| `PRIVATE_KEY`  | The deployer private key for signing transactions. |

::: tip
Do not invoke individual deployment scripts directly. Always use `cmu deploy` to ensure correct environment injection, runtime resolution, and sequential ordering.
:::

::: warning
`PRIVATE_KEY` is removed from the parent process environment after it is captured, preventing accidental leakage to unrelated child processes.
:::

## Sequential Behavior

- The command waits for each script to finish before starting the next one.
- If any script exits with a non-zero exit code, deployment **stops immediately**.
- The command reports the failing script name and the exit code.

This makes the deployment pipeline deterministic and suitable for multi-step contract initialization.

## Connectivity Check

Use `--ping` to verify RPC connectivity before committing to a full deployment run:

```bash
cmu deploy --ping
```

The command opens a JSON-RPC provider connection and waits up to **3 seconds** for a response. On success, it prints the connected network name and chain ID, then exits. On failure, it reports the unreachable URL and exits with code `1`.

## Success Output

When all scripts complete successfully:

```bash
All deployment scripts executed successfully.
```
