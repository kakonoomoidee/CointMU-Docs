# Installation

`cmu` is distributed as an npm package and can be installed globally or built from source for local development.

## Requirements

| Requirement | Version                  |
| ----------- | ------------------------- |
| Node.js     | v18 or later recommended  |
| npm         | Bundled with Node.js      |
| Git         | Required for source builds |

## Install via npm (recommended)

Install the CLI globally to make the `cmu` command available system-wide:

```bash
npm install -g cointmu-cli
```

Verify the installation:

```bash
cmu --version
cmu --help
```

## Build from Source

Use this method to contribute to the CLI or test unreleased changes.

```bash
git clone https://github.com/kakonoomoidee/CointMU-CLI.git
cd CointMU-CLI
npm install
npm run build
npm install -g .
```

### Using Makefile

The repository also provides `make` targets for common development tasks:

| Command              | Description                                    |
| --------------------- | ----------------------------------------------- |
| `make build`           | Compile the TypeScript source.                  |
| `make dev`             | Run the CLI in watch mode for local development. |
| `make install-global`  | Build and link the CLI globally from source.    |

## Updating

Reinstall the package to pull the latest published version:

```bash
npm install -g cmu-cli@latest
```

## Uninstalling

```bash
npm uninstall -g cmu-cli
```

## Next Steps

Continue to the [CLI Reference](/docs/cli/overview) for a full command overview, or jump directly to [cmu create](/docs/cli/create) to scaffold your first project.
