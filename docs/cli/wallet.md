# cmu wallet create

`cmu wallet create` generates a new crypto wallet and prints the public address together with the private key to standard output.

## Usage

```bash
cmu wallet create
```

## Overview

The command creates a random wallet using `ethers.Wallet.createRandom()`.

**Output includes:**

- Wallet address
- Private key

## Example Output

```text
New CointMU Wallet Created:
---------------------------
Address:     0x...
Private Key: 0x...
---------------------------
Warning: Keep your private key safe and never share it!
```

## Security Notice

::: danger WARNING
This command prints the **private key directly in the terminal**.

- Do not share the private key with anyone.
- Do not store the output in an unprotected location.
- Only use the generated wallet in trusted environments.

This command is intended for **development and local workflow setup only**, not for production credentials.
:::
