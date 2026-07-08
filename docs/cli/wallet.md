# cmu wallet

`cmu wallet` provides wallet management commands for generating, authenticating, and inspecting EVM-compatible wallets on the CointMU network.

## Usage

```bash
cmu wallet <subcommand>
```

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

Authenticates into an existing wallet using its private key and creates an AES-256-CBC encrypted session file at `.cmu-session`.

### Usage

```bash
cmu wallet login
```

### Behavior

The command prompts for two inputs:

| Prompt           | Description                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------ |
| Private Key      | The wallet's private key. Input is masked. Validated as a valid EVM key before proceeding. |
| Session Password | A password used to encrypt the private key in the session file. Minimum 6 characters.      |

The private key is encrypted using:

- **Algorithm** — `AES-256-CBC`
- **Key derivation** — `PBKDF2` with `SHA-256`, 100,000 iterations, random 16-byte salt
- **IV** — random 16-byte initialization vector per session

The resulting session file (`.cmu-session`) stores the encrypted key, salt, IV, wallet address, and active network name.

### Output

```bash
Wallet session encrypted and saved successfully!
Logged in as: 0x...
```

::: info
The default active network after login is set to `local`. Use `cmu network --use <name>` to switch to a different network.
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

| Field           | Description                                               |
| --------------- | --------------------------------------------------------- |
| `address`       | The public address of the logged-in wallet.               |
| `activeNetwork` | The name of the currently selected network.               |
| `encryptedKey`  | The AES-256-CBC encrypted private key.                    |
| `salt`          | Hex-encoded PBKDF2 salt used for key derivation.          |
| `iv`            | Hex-encoded initialization vector used during encryption. |

::: warning
`.cmu-session` contains encrypted key material. Do not commit this file to version control. Add it to `.gitignore`.
:::
