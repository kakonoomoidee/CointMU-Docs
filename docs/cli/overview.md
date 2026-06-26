# CointMU CLI Reference

The `cmu` CLI is the primary developer tool for scaffolding projects, compiling contracts, and deploying them to the CointMU network. It is designed to work with standard Solidity project layouts and to resolve contract dependencies dynamically from `node_modules`.

## `cmu create`

Scaffold a new smart contract project from a standard template.

Typical templates include:

- `ERC20` for fungible tokens.
- `ERC721` for non-fungible tokens.

Example:

```bash
cmu create my-token --template erc20
cmu create my-collectible --template erc721
```

What this command does:

- Creates the project directory structure.
- Installs or wires the expected Solidity source layout.
- Adds a template contract, deployment entry point, and supporting configuration.
- Prepares the project for compilation and deployment with the rest of the `cmu` toolchain.

## `cmu compile`

Compile Solidity contracts and resolve imports dynamically from `node_modules`.

Example:

```bash
cmu compile
```

Compilation behavior:

- Scans the contract sources in the active project.
- Resolves OpenZeppelin and other package-based imports from `node_modules`.
- Emits build artifacts that can be consumed by deployment scripts.
- Fails fast on syntax errors, unresolved imports, or incompatible Solidity versions.

This import strategy allows contracts to reference dependency packages without hardcoding local relative paths into every source file.

## `cmu deploy`

Execute all deployment scripts found in the `deploy/` directory in sequential order against the configured local network.

Example:

```bash
cmu deploy
```

Deployment behavior:

- Loads each script in `deploy/` using deterministic ordering.
- Runs scripts one after another rather than in parallel.
- Targets the configured RPC endpoint for the active CointMU network.
- Stops on the first failure so that broken state is surfaced immediately.

This makes deployment predictable for multi-step setups where later scripts depend on addresses or artifacts produced by earlier scripts.

## Recommended Workflow

1. Scaffold a project with `cmu create`.
2. Add or customize the Solidity contracts.
3. Run `cmu compile` to validate dependencies and generate artifacts.
4. Run `cmu deploy` to publish contracts to the local CointMU network.
