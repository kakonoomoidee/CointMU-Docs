# CointMU CLI Reference

`cmu` is an all-in-one CLI toolkit for building, compiling, deploying, and auditing Web3 applications on the CointMU private network ecosystem. It abstracts the complexity of blockchain execution into instant terminal commands.

## Command Overview

| Command        | Purpose                                                                     |
| -------------- | --------------------------------------------------------------------------- |
| `cmu create`   | Scaffold a new CointMU project from a selectable template.                  |
| `cmu compile`  | Compile Solidity contracts and generate contract artifacts.                 |
| `cmu deploy`   | Execute deployment scripts sequentially from the `deploy/` directory.       |
| `cmu test`     | Run the contract test suite against an ephemeral local DevNet.              |
| `cmu audit`    | Run dependency checks and Solidity static analysis.                         |
| `cmu wallet`   | Generate wallets and manage the encrypted local session.                    |
| `cmu network`  | Save, list, switch, and ping the RPC networks available to the CLI.         |
| `cmu node`     | Test RPC connectivity or start a local development network.                 |
| `cmu mine`     | Start and stop block mining on the active network.                          |
| `cmu explorer` | Open the configured block explorer in the default browser.                  |
| `cmu version`  | Print CLI, runtime, and dependency versions.                                |
| `cmu update`   | Upgrade the CLI to the latest release from the npm registry.                |

::: tip
Run `cmu <command> -h` to see the detailed options for any individual command. Every command also accepts `-v, --verbose` to print full stack traces instead of a single-line error.
:::

## Typical Workflow

Most CointMU projects follow this sequence:

```bash
cmu create <project> [options]
cd <project>
cmu compile
cmu deploy
```

After deployment, use the remaining commands to validate and operate the project environment:

| Command             | When to use                                           |
| ------------------- | ----------------------------------------------------- |
| `cmu test`          | Run contract tests against a throwaway local chain.   |
| `cmu audit`         | Security review for dependencies and smart contracts. |
| `cmu node connect`  | Verify RPC endpoint connectivity.                     |
| `cmu network --list`| Review which networks are saved and which is active.  |
| `cmu explorer open` | Inspect the chain via browser.                        |
| `cmu wallet create` | Generate wallets for local development.               |

## Command Reference

Use the linked pages for full command-specific behavior, options, and validation rules.

- [cmu create](/docs/cli/create)
- [cmu compile](/docs/cli/compile)
- [cmu deploy](/docs/cli/deploy)
- [cmu audit](/docs/cli/audit)
- [cmu test](/docs/cli/test)
- [cmu mine](/docs/cli/mine)
- [cmu wallet](/docs/cli/wallet)
- [cmu network](/docs/cli/network)
- [cmu node](/docs/cli/node)
- [cmu explorer](/docs/cli/explorer)
- [cmu version](/docs/cli/version)
- [cmu update](/docs/cli/update)
