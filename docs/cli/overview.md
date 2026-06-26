# CointMU CLI Reference

The `cmu` CLI provides the core workflow for creating, compiling, deploying, auditing, and interacting with CointMU projects.

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

After deployment, you can use the remaining commands to validate and operate the project environment:

- `cmu audit` for security review.
- `cmu node connect` for RPC connectivity checks.
- `cmu explorer open` for browser-based chain inspection.
- `cmu wallet create` for generating local development wallets.

## Command Reference

Use the linked pages for full command-specific behavior, options, and validation rules.

- [cmu create](/docs/cli/create)
- [cmu compile](/docs/cli/compile)
- [cmu deploy](/docs/cli/deploy)
- [cmu wallet create](/docs/cli/wallet)
- [cmu node connect](/docs/cli/node)
- [cmu explorer open](/docs/cli/explorer)
- [cmu audit](/docs/cli/audit)
