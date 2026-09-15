# cmu test

`cmu test` compiles smart contracts and executes the automated test suite against an ephemeral local DevNet. The network is spun up automatically before tests run and shut down immediately after, leaving no persistent state.

## Usage

```bash
cmu test [options]
```

## Options

| Flag            | Description                                                                                                        |
| --------------- | ------------------------------------------------------------------------------------------------------------------ |
| `--gas`         | Enable the gas profiler to report gas consumed per transaction during tests.                                       |
| `--allow-cors`  | Allow browser (cross-origin) access to the local test RPC proxy. Off by default to prevent DNS-rebinding attacks.   |
| `-v, --verbose` | Enable verbose logging for debugging.                                                                              |

## Requirements

- A `test/` directory must exist in the project root containing `.ts` or `.js` test files.
- Test files are executed using **Mocha** as the test runner.
- TypeScript test files are loaded via `ts-node/register` automatically.

::: warning
If the `test/` directory does not exist, the command exits with an error before starting the DevNet.
:::

## Pre-Test Steps

Before running any test file, the command performs the following steps automatically:

1. **Compile** — triggers `cmu compile` to ensure all contract artifacts are up to date.
2. **Start ephemeral DevNet** — starts an in-process EVM network and fronts it with a local JSON-RPC proxy on port `8555` with Chain ID `1912`.
3. **Inject environment** — passes network credentials to the test process via environment variables.

## Ephemeral DevNet

The test DevNet is created fresh for every `cmu test` run and destroyed immediately after all tests complete.

| Parameter       | Value                   |
| --------------- | ----------------------- |
| RPC URL         | `http://127.0.0.1:8555` |
| Chain ID        | `1912`                  |
| Accounts        | 10 pre-funded accounts  |
| Default Balance | `100 ETH` each          |
| Mining Mode     | Strict instamine        |
| Logging         | Quiet (suppressed)      |

The first generated account's private key is automatically used as the deployer for test transactions. Accounts are derived from a random mnemonic on every run, so the deployer address differs between invocations.

::: info
On Windows, a process already holding port `8555` is detected and terminated before the proxy binds. On Linux and macOS this reclaim step is a no-op and always reports the port as free, so free the port manually if the proxy fails to start.
:::

## RPC Access Control

The test RPC proxy listens only on `127.0.0.1` and additionally rejects requests that look like they originate from a web page. A request is refused when it carries an `Origin` header, or when its `Host` header is not one of `127.0.0.1:8555`, `localhost:8555`, or `[::1]:8555`.

Refused requests receive HTTP `403` with a JSON-RPC error of code `-32600`:

```bash
Forbidden: cross-origin or non-local request rejected. Pass --allow-cors to cmu test for browser access.
```

This protects the unlocked test accounts from DNS-rebinding attacks, where a malicious page resolves its own hostname to `127.0.0.1` and issues signed transactions against the local node.

::: danger WARNING
`--allow-cors` disables that protection and responds with `Access-Control-Allow-Origin: *`, letting **any** website reach the test RPC and its pre-funded accounts while `cmu test` is running. Use it only when a browser-based test harness genuinely requires it. The command prints a warning at startup when the flag is active.
:::

## Environment Injection

The following variables are injected into the test process at runtime:

| Variable       | Value                        |
| -------------- | ---------------------------- |
| `CMU_RPC_URL`  | `http://127.0.0.1:8555`      |
| `CMU_CHAIN_ID` | `1912`                       |
| `PRIVATE_KEY`  | Private key of account `[0]` |

These variables are available inside test files for constructing providers and signers.

## Test Runner

Test files are detected and executed based on extension:

| File Type | Runner Command                               |
| --------- | -------------------------------------------- |
| `.ts`     | `npx mocha -r ts-node/register test/**/*.ts` |
| `.js`     | `npx mocha test/**/*.js`                     |

If the `test/` directory contains `.ts` files, the TypeScript runner is used for the entire suite.

## Gas Profiler

When `--gas` is provided, the command generates a gas usage report after all tests complete by iterating over every block mined during the test session.

```bash
=========================================================================================
Gas Profiler Report
=========================================================================================
| Block | Transaction Hash                                                   | Gas Used |
-----------------------------------------------------------------------------------------
| 1     | 0x...                                                              | 21000    |
| 2     | 0x...                                                              | 84123    |
-----------------------------------------------------------------------------------------
Total Gas Used: 105123
```

::: info
The gas profiler reads from the ephemeral DevNet before it is shut down. If the profiler encounters an error, it prints a warning and the DevNet is still closed cleanly.
:::

## Shutdown

After all tests and the gas profiler complete, the ephemeral DevNet is closed automatically:

```bash
Ephemeral test network successfully shut down.
```

The shutdown runs in a `finally` block, ensuring the DevNet is always stopped even if the test suite fails.

## Success Output

```bash
Triggering automated contract compilation...
Starting ephemeral CointMU DevNet for testing...

========================================
Running tests via Mocha
========================================

[test output]

All tests executed successfully.
Ephemeral test network successfully shut down.
```

If any test fails, the command exits with code `1` and prints the error.
