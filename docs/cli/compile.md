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

```ts
// cmu.config.ts
export default {
  compiler: {
    settings: {
      evmVersion: "london",
    },
  },
};
```

::: info
When a `.ts` config file is detected, the command loads it using `ts-node` in transpile-only mode. No full type checking is performed at this stage.
:::

**Default values when no config is provided:**

| Setting           | Default                                     |
| ----------------- | ------------------------------------------- |
| `evmVersion`      | `paris`                                     |
| `outputSelection` | ABI + `evm.bytecode.object` always emitted. |

If the config file cannot be loaded, the command prints a warning and continues with defaults.

## Import Resolution

The compiler uses a custom import callback to resolve Solidity dependencies:

- **Local imports** — resolved relative to the current working directory. The resolved path is validated to remain within the project root before the file is read.
- **Package imports** — resolved from `node_modules`. The resolved path is validated to remain within the `node_modules` directory before the file is read.

```solidity
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
```

::: info
Imports that resolve outside the project root or `node_modules` boundary are rejected with a `File not found or access denied` error. This prevents path traversal during compilation.
:::

## Compilation Behavior

| Condition                                  | Result                                                    |
| ------------------------------------------ | --------------------------------------------------------- |
| No `.sol` files found in `contracts/`      | Prints a notice and exits successfully.                   |
| Compiler error reported (severity `error`) | Prints all errors, stops the process, exits with failure. |
| Non-fatal warning                          | Prints the warning and continues compilation.             |
| Compilation succeeds                       | Writes artifact to `artifacts/<ContractName>.json`.       |

## Output Artifacts

Each generated artifact is written as a formatted JSON file containing the compiled contract output from `solc`:

| Field                 | Description                                    |
| --------------------- | ---------------------------------------------- |
| `abi`                 | Interface definition for contract interaction. |
| `evm.bytecode.object` | Compiled contract binary for deployment.       |

These artifacts are consumed by deployment scripts and other build-time tooling in the pipeline.
