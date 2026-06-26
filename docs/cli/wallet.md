# cmu wallet create

`cmu wallet create` generates a new crypto wallet and prints the public address together with the private key.

## Usage

```bash
cmu wallet create
```

## Overview

The command creates a random wallet using `ethers.Wallet.createRandom()` and writes the key material to standard output.

Output includes:

- Wallet address
- Private key

## Security Notice

The command prints the private key directly in the terminal.

- Do not share the private key.
- Do not store the output in an unprotected location.
- Use the generated wallet only in trusted environments.

This command is intended for development and local workflow setup, not for exposing production credentials.

## Example Output

```text
New CointMU Wallet Created:
---------------------------
Address:     0x...
Private Key: 0x...
---------------------------
Warning: Keep your private key safe and never share it!
```
