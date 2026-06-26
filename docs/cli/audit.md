# cmu audit

`cmu audit` runs security checks and static analysis across both Node.js dependencies and Solidity smart contracts.

## Usage

```bash
cmu audit [options]
```

## Options

| Flag    | Description                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------- |
| `--fix` | Automatically applies safe patches where the underlying tools support non-breaking remediation. |

## Audit Workflow

`cmu audit` performs two sequential checks.

### Step 1: Dependency Audit

The command executes `npm audit` to scan the current Node.js dependency tree for known vulnerabilities.

If `--fix` is provided, the command appends `fix` and attempts to remediate safe dependency issues automatically.

```bash
npm audit
npm audit fix
```

This step is responsible for identifying vulnerable packages in the project-level JavaScript or TypeScript toolchain.

If you only need to inspect package dependencies directly, you can still run `npm audit` yourself outside of the `cmu` workflow.

### Step 2: Static Analysis

The command then executes `npx solhint "contracts/**/*.sol"` to analyze Solidity contracts under the `contracts/` directory.

If `--fix` is provided, the command appends `--fix` and applies safe linting corrections where supported.

```bash
npx solhint "contracts/**/*.sol"
npx solhint "contracts/**/*.sol" --fix
```

This step checks Solidity sources for security issues, lint violations, and formatting problems.

## Cross-Platform Compatibility

The command uses a cross-platform child process wrapper so execution works reliably across operating systems. On Windows, it safely resolves command entry points such as `.cmd` binaries before spawning the process.
