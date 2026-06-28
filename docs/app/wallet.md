# Wallet

The Wallet page provides a comprehensive interface for managing local Externally Owned Accounts (EOA). It serves as the primary gateway for signing transactions, monitoring balances, and interacting with the CointMU network across multiple accounts.

![CointMU Wallet](/images/wallet-page.png)

## Account Sidebar

The left sidebar allows you to organize and switch between multiple accounts.

| Element                | Description                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- |
| Accounts               | Quick-switch list of active local accounts, showing truncated addresses and current CMU balances.               |
| Watch List             | Monitor public addresses without holding their private keys. Add any address to track its balance and activity. |
| Import Wallet          | Recover or add an existing account by injecting its private key or seed phrase into the local keyring.          |
| Manage Hidden Accounts | Show or hide accounts from the active account list without deleting them.                                       |

## Account Detail Panel

The main panel displays the full details of the currently selected account.

| Element       | Description                                                                    |
| ------------- | ------------------------------------------------------------------------------ |
| Account Name  | Display name and EOA badge identifying the account type.                       |
| Full Address  | Complete cryptographic address with a scannable QR code for mobile receiving.  |
| Live Balance  | Exact CMU balance fetched directly from the local node (e.g., `9,076.06 CMU`). |
| Quick Actions | Inline buttons for Send, Receive, Swap, and Copy address.                      |

## Activity, Tokens, and NFTs

The tabbed panel below the account detail provides a complete view of on-chain assets and history.

**Activity**

A chronological ledger of all transactions associated with the selected account. Each entry shows the transaction type, source block, amount, timestamp, and confirmation count.

**Tokens**

A portfolio view of all ERC-20 tokens held by the active address. Token balances are resolved via the embedded node without requiring an external indexer.

**NFTs**

A gallery of ERC-721 and ERC-1155 non-fungible tokens minted or acquired by the active address.

## Global Controls

| Control     | Description                                                                |
| ----------- | -------------------------------------------------------------------------- |
| Synced      | Indicates the current node synchronization state.                          |
| Backup      | Export private keys or keystore files to prevent loss of account access.   |
| New Account | Generate a new cryptographic keypair and add it to the active wallet list. |

::: warning
The Backup function exports unencrypted private key material. Store exported files in a secure, offline location and never share them.
:::
