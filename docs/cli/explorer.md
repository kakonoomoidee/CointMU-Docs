# cmu explorer open

`cmu explorer open` opens the configured local CointMU block explorer in the default browser.

## Usage

```bash
cmu explorer open
```

## Overview

The command resolves the explorer URL from the active CointMU configuration and opens it using a platform-specific browser launcher.

**Default fallback if no configuration is present:**

```text
http://localhost:3000
```

## Configuration Source

The explorer endpoint is read from:

```
network.explorerUrl
```

If the property is present, it overrides the default URL. If configuration loading fails, the command continues with the fallback value.

## URL Validation

Before launching the browser, the command validates the resolved URL:

- Only `http:` and `https:` schemes are accepted.
- Invalid URLs cause the command to exit with an error.

::: warning
Unsupported URL schemes will cause the command to exit immediately without opening the browser.
:::

## Browser Launch Behavior

The command uses a platform-specific launcher **without invoking a shell** to reduce shell injection risk.

| Platform          | Launcher             |
| ----------------- | -------------------- |
| Windows           | `cmd /c start <url>` |
| macOS             | `open <url>`         |
| Linux / Unix-like | `xdg-open <url>`     |

## Example Flow

```bash
cmu explorer open
```

The command prints the resolved URL, validates it, then opens the block explorer in the default browser.
