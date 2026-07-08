# cmu create

`cmu create` scaffolds a new CointMU project and initializes the project directory with a template-selected smart contract workspace.

## Usage

```bash
cmu create [project] [options]
```

## Arguments

| Argument    | Description                                                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------------- |
| `[project]` | The name of the project directory to create. Optional — if omitted, the command prompts for it interactively. |

**Project name validation rules:**

- Only alphanumeric characters, hyphens (`-`), and underscores (`_`) are allowed.
- The target directory must not already exist.
- The project path is resolved against the current working directory before generation begins.

If validation fails, the command exits before any files are generated.

## Options

| Flag                        | Description                                   | Allowed Values                                                                                                |
| --------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `-t, --template <template>` | Select the scaffold template to generate.     | `blank`, `erc20`, `erc721`, `erc1155`, `dao`, `marketplace`, `staking`, `airdrop`, `vault`, `kyberion`, `nft` |
| `-l, --language <language>` | Select the project language for the scaffold. | `typescript`, `javascript`                                                                                    |

## Interactive Mode

If `[project]`, `--language`, or `--template` is omitted, the command prompts for each missing value using Inquirer.

Prompt order:

1. **Project name** — if not provided as an argument.
2. **Language** — if `--language` is not provided.
3. **Template** — if `--template` is not provided.

All values are validated against their respective allowed values before project generation begins.

## Available Templates

| Template      | Description                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `blank`       | Minimal project skeleton with the default directory structure and a placeholder deploy script. |
| `erc20`       | Fungible token project with a standard ERC20 contract and deployment script.                   |
| `erc721`      | Non-fungible token project with a standard ERC721 contract and deployment script.              |
| `erc1155`     | Multi-token project with a standard ERC1155 contract and deployment script.                    |
| `dao`         | Basic decentralized autonomous organization contract and deployment script.                    |
| `marketplace` | NFT marketplace contract and deployment script.                                                |
| `staking`     | ERC20 staking and yield farming project.                                                       |
| `airdrop`     | Merkle tree token airdrop project.                                                             |
| `vault`       | Multisig timelock treasury project.                                                            |
| `kyberion`    | Post-quantum cryptography research prototype.                                                  |
| `nft`         | Alias for `erc721`.                                                                            |

## Post-Creation Output

After a successful scaffold, the CLI prints a confirmation banner and the standard next steps:

```bash
[SUCCESS] CointMU project '<project>' initialized!

[>] Next steps to start building:
  1. cd <project>
  2. cmu compile
  3. cmu deploy
```

::: tip
A random motivational quote is printed after each successful project creation.
:::
