# cmu compile

`cmu compile` reads Solidity sources from the `contracts/` directory, resolves imports, and compiles contracts into JSON artifacts under `artifacts/`.

## Usage

```bash
cmu compile
```

## Overview

The command performs a direct `solc` compilation pass over every `.sol` file found in the top-level `contracts/` directory.

During compilation, it:

- Loads optional compiler settings from `cmu.config.ts` or `cmu.config.js` when present.
- Resolves imports from the project root and from `node_modules`.
- Writes compiled artifacts for each contract into the `artifacts/` directory.

## Required Project Layout

```text
<project>/
├─ contracts/
│  └─ *.sol
├─ artifacts/
├─ cmu.config.ts
└─ cmu.config.js
```

The `contracts/` directory must exist. If it is missing, the command exits with an error and does not continue.

## Configuration Loading

`cmu compile` looks for compiler settings in the following order:

1. `cmu.config.ts`
2. `cmu.config.js`

If a configuration file is found, the command attempts to load `compiler.settings` from the exported config object.

### Supported Settings

The loaded settings are merged into the compiler input before compilation.

- `outputSelection` is always set so that ABI and bytecode are emitted.
- `evmVersion` defaults to `paris` when not provided by the config file.

If the config file cannot be loaded, the command prints a warning and continues with defaults.

## Import Resolution

The compiler uses a custom import callback to resolve Solidity dependencies.

- Local imports are resolved relative to the current working directory.
- Package imports are resolved from `node_modules`.

```bash
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

This makes it possible to compile contracts that depend on installed Solidity libraries without rewriting import paths.

## Compilation Behavior

`cmu compile` scans the `contracts/` directory for files ending in `.sol`.

- If no Solidity files are found, the command prints a notice and exits successfully.
- If compiler errors are reported with severity `error`, the command stops and exits with failure.
- Non-fatal warnings are printed but do not abort the build.

When compilation succeeds, each contract artifact is written as JSON to `artifacts/<ContractName>.json`.

## Output Artifacts

Each generated artifact includes the compiled contract metadata returned by `solc`, including:

- ABI
- bytecode
- contract-level compilation output

These artifacts are consumed by deployment scripts and other build-time tooling.
