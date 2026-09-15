# cmu network

`cmu network` manages the RPC networks saved on the machine and controls which one the active wallet session points at.

## Usage

```bash
cmu network [options]
cmu network <subcommand>
```

## Options

| Flag                  | Description                                                              |
| --------------------- | ------------------------------------------------------------------------ |
| `-s, --save <url>`    | Save a new network or update an existing one. Requires `--name`.         |
| `-n, --name <name>`   | The name of the network to save. Used only together with `--save`.       |
| `-u, --use <name>`    | Switch the active network to the specified name.                         |
| `-l, --list`          | List all saved networks.                                                 |
| `-D, --delete <name>` | Delete a saved network.                                                  |
| `-v, --verbose`       | Enable verbose logging for debugging.                                    |

::: warning
The delete flag is a **capital** `-D`. A lowercase `-d` is not registered and is rejected as an unknown option.
:::

## Option Precedence

Only one action runs per invocation. The command evaluates its options in a fixed order and returns after the first match:

1. `--save`
2. `--delete`
3. `--use`
4. `--list`

Running `cmu network` with no options behaves identically to `cmu network --list`. Any other combination — for example `--name` without `--save` — matches none of the branches, and the command prints a usage hint without modifying anything:

```bash
Please provide a valid network command option. Run 'cmu network --help' for usage.
```

## Subcommands

| Subcommand                 | Description                                        |
| -------------------------- | -------------------------------------------------- |
| `cmu network info`         | Display the active network configuration.          |
| `cmu network ping [name]`  | Ping a network to check connectivity and latency.  |

---

## cmu network --save

Saves a network to the local network store, or overwrites the RPC URL of an existing entry with the same name.

### Usage

```bash
cmu network --save http://10.64.24.248:8585 --name mainnet
```

### Behavior

`--name` is required. If it is omitted, the command exits with:

```bash
--name is required when using --save.
```

Saving does not change the active network. Use `--use` to switch to it afterwards.

### Output

```bash
Successfully saved network 'mainnet' (http://10.64.24.248:8585)
```

---

## cmu network --use

Switches the active network recorded in the current wallet session.

### Usage

```bash
cmu network --use mainnet
```

### Requirements

An active wallet session must exist. Run `cmu wallet login` first. Without a session file the command exits with `No active wallet session found. Please run 'cmu wallet login' first.`

The target network must already be saved. An unknown name exits with `Network '<name>' not found.`

### Behavior

The command rewrites the `activeNetwork` field inside `.cmu-session` in the current working directory. All commands that resolve a network from the session — including `cmu wallet balance`, `cmu mine start`, and `cmu network ping` — use the new selection immediately.

### Output

```bash
Successfully switched active network to: mainnet
```

---

## cmu network --delete

Removes a network from the saved network store.

### Usage

```bash
cmu network --delete staging
```

### Behavior

The command refuses to delete the network currently selected in the session:

```bash
Cannot delete the currently active network ('local'). Please switch to another network first using 'cmu network --use <name>'.
```

Switch to a different network with `--use` before deleting.

### Output

```bash
Successfully deleted network 'staging'.
```

---

## cmu network --list

Prints every saved network and marks the active one with `[*]`.

### Usage

```bash
cmu network
cmu network --list
```

### Output

```bash

Saved Networks
==========================================================================
| Active | Name                 | RPC URL
--------------------------------------------------------------------------
| [*]    | local                | http://127.0.0.1:8585
|        | mainnet              | http://10.64.24.248:8585
==========================================================================

```

::: info
If no session file exists, the listing falls back to marking `local` as active. The list itself is still printed in full.
:::

---

## cmu network info

Displays the active network name and RPC URL resolved from the current session.

### Usage

```bash
cmu network info
```

### Options

| Flag            | Description                            |
| --------------- | -------------------------------------- |
| `-v, --verbose` | Enable verbose logging for debugging.  |

### Requirements

An active wallet session with a selected network must exist. The command exits with code `1` if the session file is missing, if the session has no `activeNetwork`, or if the recorded network name is not present in the saved network store.

### Output

```bash
--- Active Network Info ---
Network Name : local
RPC URL      : http://127.0.0.1:8585
---------------------------
```

---

## cmu network ping [name]

Measures round-trip latency to a network by requesting its current block number.

### Usage

```bash
cmu network ping
cmu network ping mainnet
```

### Arguments

| Argument | Description                                                                                  |
| -------- | -------------------------------------------------------------------------------------------- |
| `[name]` | Optional. The saved network to ping. Defaults to the session's active network when omitted.  |

### Options

| Flag            | Description                            |
| --------------- | -------------------------------------- |
| `-v, --verbose` | Enable verbose logging for debugging.  |

### Behavior

When `[name]` is supplied, the network is looked up in the saved network store and no session is required. When it is omitted, the command reads `activeNetwork` from `.cmu-session` and therefore requires an active session.

Latency is measured as the elapsed time around a single `eth_blockNumber` call, so it reflects RPC round-trip time rather than block production speed.

### Output

```bash
Pinging local (http://127.0.0.1:8585)...
--- Ping Results ---
Network Name : local
Block Number : 1482
Latency      : 12ms
--------------------
```

The command exits with code `1` if the endpoint is unreachable.

---

## Network Storage

Saved networks are kept in `.cmu-networks.json` as an array of entries:

| Field    | Description                             |
| -------- | --------------------------------------- |
| `name`   | The identifier used by `--use` and `--delete`. |
| `rpcUrl` | The JSON-RPC endpoint of the network.   |

On first read the file is seeded with a single entry, `local` pointing at `http://127.0.0.1:8585`.

::: info
`.cmu-networks.json` is stored in your **home directory**, not in the project. The saved network list is therefore shared by every CointMU project on the machine. The active network *selection* is not shared — it lives in each project's own `.cmu-session` file.
:::

::: warning
Both `.cmu-networks.json` and `.cmu-session` are listed in the `.gitignore` generated by `cmu create`. Do not commit either file to version control.
:::
