# CointMU CLI Reference

`cmu` is an all-in-one CLI toolkit for building, compiling, deploying, and auditing Web3 applications on the CointMU private network ecosystem. It abstracts the complexity of blockchain execution into instant terminal commands.

## Command Overview

| Command             | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `cmu create`        | Scaffold a new CointMU project from a selectable template.            |
| `cmu compile`       | Compile Solidity contracts and generate contract artifacts.           |
| `cmu deploy`        | Execute deployment scripts sequentially from the `deploy/` directory. |
| `cmu wallet create` | Generate a new wallet and print the address and private key.          |
| `cmu node connect`  | Test connectivity to the configured JSON-RPC endpoint.                |
| `cmu explorer open` | Open the configured block explorer in the default browser.            |
| `cmu audit`         | Run dependency checks and Solidity static analysis.                   |

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
| `cmu audit`         | Security review for dependencies and smart contracts. |
| `cmu node connect`  | Verify RPC endpoint connectivity.                     |
| `cmu explorer open` | Inspect the chain via browser.                        |
| `cmu wallet create` | Generate wallets for local development.               |

## Command Reference

Use the linked pages for full command-specific behavior, options, and validation rules.

- [cmu create](/docs/cli/create)
- [cmu compile](/docs/cli/compile)
- [cmu deploy](/docs/cli/deploy)
- [cmu wallet create](/docs/cli/wallet)
- [cmu node connect](/docs/cli/node)
- [cmu explorer open](/docs/cli/explorer)
- [cmu audit](/docs/cli/audit)
