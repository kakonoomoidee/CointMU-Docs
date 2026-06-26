# cmu deploy

`cmu deploy` sequentially executes every deployment script in the `deploy/` directory.

## Usage

```bash
cmu deploy
```

## Overview

The command scans the local `deploy/` folder, filters deployment scripts, sorts them lexicographically, and executes them one at a time.

Supported script extensions:

- `.ts`
- `.js`

This ordering allows files such as `01_init.ts` to run before `02_deploy.ts`.

## Requirements

`cmu deploy` must be executed from the root of a CointMU project.

- If `deploy/` does not exist, the command exits with an error.
- If no matching scripts are found, the command prints a notice and exits successfully.

## Execution Model

Each deployment script is executed by `cmu deploy` in a child process with inherited standard I/O.

The CLI resolves each script extension internally and selects the correct runtime automatically.

```bash
cmu deploy
```

You should not invoke individual deployment scripts directly as the normal workflow.

## Sequential Behavior

Deployment scripts are executed one after another.

- The command waits for each script to finish before starting the next one.
- If any script exits with a non-zero code, deployment stops immediately.
- The command reports the failing script name and the exit code.

This makes the deployment pipeline deterministic and suitable for multi-step contract initialization.

## Success Output

When all scripts complete successfully, the command prints a final confirmation message.

```bash
✅ All deployment scripts executed successfully.
```
