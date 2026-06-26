# cmu explorer open

`cmu explorer open` opens the configured local CointMU block explorer in the default browser.

## Usage

```bash
cmu explorer open
```

## Overview

The command resolves the explorer URL from the active CointMU configuration and opens it with the platform-specific browser launcher.

If no configuration value is available, it falls back to the default placeholder URL:

```text
http://localhost:3000
```

## Configuration Source

The command reads the explorer endpoint from the loaded configuration:

- `network.explorerUrl`

If that property is present, it overrides the default URL. If configuration loading fails, the command continues with the fallback value.

## URL Validation

Before launching the browser, the command validates the final URL.

- Only `http:` and `https:` URLs are accepted.
- Invalid URLs cause the command to exit with an error.

This prevents unsupported schemes and avoids opening non-web targets.

## Browser Launch Behavior

The command uses a platform-specific launcher without invoking a shell.

### Windows

On Windows, the command spawns `cmd /c start` with the target URL.

### macOS

On macOS, the command uses `open`.

### Linux

On Linux and other Unix-like systems, the command uses `xdg-open`.

This approach keeps the browser launch cross-platform while reducing shell injection risk.

## Example Flow

```bash
cmu explorer open
```

The command prints the resolved URL, validates it, and opens the explorer in the default browser.
