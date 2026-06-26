# cmu compile

`cmu compile` reads Solidity sources from the `contracts/` directory, resolves imports, and compiles contracts into JSON artifacts under `artifacts/`.

## Usage

```bash
cmu compile
```

## Required Project Layout

```text
<project>/
├─ contracts/
│  └─ *.sol
├─ artifacts/
├─ cmu.config.ts   # optional
└─ cmu.config.js   # optional
```

::: warning
The `contracts/` directory **must exist**. If it is missing, the command exits with an error and does not continue.
:::

## Configuration Loading

`cmu compile` looks for compiler settings in the following priority order:

1. `cmu.config.ts`
2. `cmu.config.js`

If a configuration file is found, the command loads `compiler.settings` from the exported config object and merges it into the compiler input before compilation.

**Default values when no config is provided:**

| Setting           | Default                        |
| ----------------- | ------------------------------ |
| `outputSelection` | ABI + bytecode always emitted. |
| `evmVersion`      | `paris`                        |

If the config file cannot be loaded, the command prints a warning and continues with defaults.

## Import Resolution

The compiler uses a custom import callback to resolve Solidity dependencies:

- **Local imports** — resolved relative to the current working directory.
- **Package imports** — resolved from `node_modules`.

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

This allows contracts that depend on installed Solidity libraries to compile without rewriting import paths.

## Compilation Behavior

| Condition                                  | Result                                              |
| ------------------------------------------ | --------------------------------------------------- |
| No `.sol` files found in `contracts/`      | Prints a notice and exits successfully.             |
| Compiler error reported (severity `error`) | Stops the process and exits with failure.           |
| Non-fatal warning                          | Prints the warning and continues compilation.       |
| Compilation succeeds                       | Writes artifact to `artifacts/<ContractName>.json`. |

## Output Artifacts

Each generated artifact contains the compiled contract metadata returned by `solc`, including:

| Field      | Description                                     |
| ---------- | ----------------------------------------------- |
| `abi`      | Interface definition for contract interaction.  |
| `bytecode` | Compiled contract binary for deployment.        |
| Output     | Additional contract-level compilation metadata. |

These artifacts are consumed by deployment scripts and other build-time tooling in the pipeline.
