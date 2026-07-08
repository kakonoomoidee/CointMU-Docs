# cmu version

`cmu version` prints detailed version information about the CLI, its runtime environment, and its core dependencies.

## Usage

```bash
cmu version
```

## Overview

The command reads version metadata from the local `package.json` and `build-info.json`, queries the active runtime environment, and resolves the current Git commit hash of the CLI installation.

## Output

```bash
cmu
version      : 1.0.0
build        : 2024-01-01T00:00:00.000Z
architecture : x64
node         : v20.11.0
solidity     : 0.8.26+commit.8a97fa7a.Emscripten.clang
ethers       : 6.x.x
git commit   : a1b2c3d
```

## Output Fields

| Field          | Source                       | Description                                                                                  |
| -------------- | ---------------------------- | -------------------------------------------------------------------------------------------- |
| `version`      | `package.json`               | The current semantic version of the `cmu` CLI.                                               |
| `build`        | `build-info.json`            | The build timestamp or identifier of the CLI binary.                                         |
| `architecture` | `process.arch`               | The CPU architecture of the current runtime (e.g., `x64`, `arm64`).                          |
| `node`         | `process.version`            | The active Node.js runtime version.                                                          |
| `solidity`     | `solc` package               | The full version string of the bundled Solidity compiler.                                    |
| `ethers`       | `ethers` package             | The version of the bundled ethers.js library.                                                |
| `git commit`   | `git rev-parse --short HEAD` | The short Git commit hash of the current CLI build. Returns `unknown` if Git is unavailable. |

::: info
`git commit` is resolved by running `git rev-parse --short HEAD` from the CLI installation directory. If Git is not available or the directory is not a Git repository, the field displays `unknown`.
:::
