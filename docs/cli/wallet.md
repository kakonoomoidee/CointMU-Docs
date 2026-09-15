# cmu wallet

`cmu wallet` provides wallet management commands for generating, authenticating, and inspecting EVM-compatible wallets on the CointMU network.

## Usage

```bash
cmu wallet <subcommand> [options]
```

## Options

Every `cmu wallet` subcommand accepts the same option:

| Flag            | Description                            |
| --------------- | -------------------------------------- |
| `-v, --verbose` | Enable verbose logging for debugging.  |

::: info
The flag belongs to the subcommand, not to `cmu wallet` itself. Write `cmu wallet login -v`, not `cmu wallet -v login`.
:::

## Subcommands

| Subcommand           | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `cmu wallet create`  | Generate a new EVM-compatible wallet.                          |
| `cmu wallet login`   | Start an encrypted local session with an existing private key. |
| `cmu wallet balance` | Fetch the native token balance of the logged-in wallet.        |
| `cmu wallet info`    | Display the active wallet session information.                 |

---

## cmu wallet create

Generates a new EVM-compatible wallet using `ethers.Wallet.createRandom()` and prints the address, private key, and mnemonic phrase to standard output.

### Usage

```bash
cmu wallet create
```

### Output

```bash
New CointMU Wallet Created:
===========================
Public Address: 0x...
Private Key:    0x...
Mnemonic:       word1 word2 word3 ... word12
===========================

[WARNING] Please copy and back up your Private Key and Mnemonic phrase immediately!
Store them in a highly secure, offline location. If you lose them, your assets cannot be recovered.

To start an encrypted local session with this new wallet, run:
  cmu wallet login
```

::: danger WARNING
This command prints the **private key and mnemonic phrase directly in the terminal**. Copy them immediately and store them in a secure, offline location. These credentials cannot be recovered if lost.
:::

---

## cmu wallet login

Authenticates into an existing wallet using its private key and creates an AES-256-GCM encrypted session file at `.cmu-session`.

### Usage

```bash
cmu wallet login
```

### Behavior

The command prompts for two inputs:

| Prompt           | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Private Key      | The wallet's private key. Input is masked. Validated as a valid EVM key before proceeding. |
| Session Password | A password used to encrypt the private key in the session file. Must satisfy the password policy below. |

**Password policy:**

- Minimum **12 characters**.
- At least **two** of the following character classes: lowercase, uppercase, digits, symbols.
- Must not appear in the CLI's built-in list of common weak passwords.

The private key is encrypted using:

- **Algorithm** — `AES-256-GCM`
- **Key derivation** — `PBKDF2` with `SHA-256`, 600,000 iterations, random 16-byte salt
- **IV** — random 12-byte initialization vector per session
- **Authentication** — a GCM authentication tag is stored alongside the ciphertext

The resulting session file (`.cmu-session`) stores the encrypted key, salt, IV, authentication tag, iteration count, wallet address, and active network name. It is written with `0600` permissions so it is readable only by the owning user.

::: info
Sessions created before the iteration count was recorded are read back at the legacy work factor of 100,000 iterations. Running `cmu wallet login` again rewrites the session at the current 600,000-iteration default.
:::

### Output

```bash
Wallet session encrypted and saved successfully!
Logged in as: 0x...
```

::: info
The default active network after login is set to `local`. Use [`cmu network --use <name>`](/docs/cli/network) to switch to a different network.
:::

---

## cmu wallet balance

Fetches and displays the native CMU token balance of the currently logged-in wallet from the active network.

### Usage

```bash
cmu wallet balance
```

### Requirements

An active wallet session must exist. Run `cmu wallet login` first.

### Output

```bash
Connecting to cointmu (http://localhost:8545)...
---------------------------
Address: 0x...
Balance: 9076.06 ETH
---------------------------
```

---

## cmu wallet info

Displays the active session's wallet address, network name, and RPC endpoint without exposing any key material.

### Usage

```bash
cmu wallet info
```

### Requirements

An active wallet session must exist. Run `cmu wallet login` first.

### Output

```bash
--- Active Session Info ---
Public Address: 0x...
Active Network: cointmu
RPC Endpoint:   http://localhost:8545
---------------------------
```

---

## Session File

`cmu wallet login` writes a `.cmu-session` file to the current working directory. This file is required by several other `cmu` commands including `cmu mine`, `cmu network`, and `cmu wallet balance`.

| Field           | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `address`       | The public address of the logged-in wallet.                        |
| `activeNetwork` | The name of the currently selected network.                        |
| `encryptedKey`  | The AES-256-GCM encrypted private key.                             |
| `salt`          | Hex-encoded PBKDF2 salt used for key derivation.                   |
| `iv`            | Hex-encoded initialization vector used during encryption.          |
| `authTag`       | Hex-encoded GCM authentication tag. A tampered file is rejected.   |
| `iterations`    | PBKDF2 work factor used for this session. Absent on legacy files.  |

::: warning
`.cmu-session` contains encrypted key material. Do not commit this file to version control. Projects scaffolded with `cmu create` already list it in the generated `.gitignore`.
:::
