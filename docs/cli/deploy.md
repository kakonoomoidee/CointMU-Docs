# cmu deploy

`cmu deploy` sequentially executes every deployment script in the `deploy/` directory.

## Usage

```bash
cmu deploy
```

## Requirements

`cmu deploy` must be executed from the root of a CointMU project.

::: warning

- If the `deploy/` directory does not exist, the command exits with an error.
- If no matching scripts are found, the command prints a notice and exits successfully.
  :::

## Supported Script Extensions

| Extension | Runtime    |
| --------- | ---------- |
| `.ts`     | TypeScript |
| `.js`     | JavaScript |

Scripts are sorted lexicographically before execution, so naming conventions like `01_init.ts` → `02_deploy.ts` work as expected.

## Execution Model

Each deployment script is executed in a separate child process with inherited standard I/O. The CLI resolves each script extension internally and selects the correct runtime automatically.

```bash
cmu deploy
```

::: tip
Do not invoke individual deployment scripts directly. Always use `cmu deploy` to ensure correct runtime resolution and sequential ordering.
:::

## Sequential Behavior

- The command waits for each script to finish before starting the next one.
- If any script exits with a non-zero exit code, deployment **stops immediately**.
- The command reports the failing script name and the exit code.

This makes the deployment pipeline deterministic and suitable for multi-step contract initialization.

## Success Output

When all scripts complete successfully:

```bash
✅ All deployment scripts executed successfully.
```
