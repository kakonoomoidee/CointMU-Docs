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

If the property is present, it overrides the default URL. If configuration loading fails, the command silently falls back to the default URL and continues.

## URL Validation

Before launching the browser, the command validates the resolved URL using the native `URL` parser:

- Only `http:` and `https:` schemes are accepted.
- Any URL that fails to parse or uses an unsupported scheme causes the command to exit with an error.

::: warning
Invalid or unsupported URLs cause the command to exit immediately without opening the browser.
:::

## Browser Launch Behavior

The command uses a platform-specific launcher **without invoking a shell** to reduce shell injection risk.

| Platform          | Launcher                               |
| ----------------- | -------------------------------------- |
| Windows           | `cmd /c start "" <url>` (shell: false) |
| macOS             | `open <url>`                           |
| Linux / Unix-like | `xdg-open <url>`                       |

::: info
On Windows, an empty string is passed as the window title argument before the URL to ensure `start` correctly interprets the target as a URL rather than a window title.
:::

## Output

When the URL is valid and the browser is launched successfully:

```bash
Opening CointMU explorer at http://localhost:3000...
```

If the browser launcher encounters an error after spawning, the error message is printed but the command does not exit with a failure code.
