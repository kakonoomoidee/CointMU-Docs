# Installation

`cmu` is distributed as an npm package and can be installed globally or built from source for local development.

## Requirements

| Requirement | Version                     |
| ----------- | --------------------------- |
| Node.js     | v20 or later (enforced)     |
| npm         | Bundled with Node.js        |
| Git         | Required for source builds  |

::: warning
Node.js 20 is a hard requirement, not a recommendation. The CLI checks `process.version` before any command runs and exits with code `1` on older runtimes. Releases are tested against Node 20, 22, and 24.
:::

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

| Command               | Description                                  |
| --------------------- | -------------------------------------------- |
| `make build`          | Compile the TypeScript source.               |
| `make install-global` | Build and link the CLI globally from source. |
| `make clean`          | Remove the build output directory.           |

## Updating

The CLI can update itself from the npm registry:

```bash
cmu update
```

To pin a specific published version instead of the latest release:

```bash
cmu update --to 1.3.2
```

Reinstalling manually achieves the same result:

```bash
npm install -g cointmu-cli@latest
```

See [cmu update](/docs/cli/update) for version pinning rules and validation behavior.

## Uninstalling

```bash
npm uninstall -g cointmu-cli
```

## Next Steps

Continue to the [CLI Reference](/docs/cli/overview) for a full command overview, or jump directly to [cmu create](/docs/cli/create) to scaffold your first project.
