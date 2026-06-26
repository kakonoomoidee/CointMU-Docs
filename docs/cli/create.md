# cmu create

`cmu create` scaffolds a new CointMU project and initializes the project directory with a template-selected smart contract workspace.

## Usage

```bash
cmu create <project> [options]
```

## Arguments

### `<project>`

The name of the project directory to create.

Validation rules enforced by the command:

- The value must not contain path separators.
- The target directory must not already exist.
- The project path is resolved against the current working directory before generation begins.

If validation fails, the command exits before any files are generated.

## Options

| Flag                        | Description                                        | Allowed Values                                                                                                |
| --------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `-t, --template <template>` | Selects the scaffold template to generate.         | `blank`, `erc20`, `erc721`, `erc1155`, `dao`, `marketplace`, `staking`, `airdrop`, `vault`, `kyberion`, `nft` |
| `-l, --language <language>` | Selects the project language used by the scaffold. | `typescript`, `javascript`                                                                                    |

## Interactive Mode

If `--template` or `--language` is omitted, the command prompts for the missing value using Inquirer.

- Template selection is presented as a list prompt.
- Language selection is presented as a list prompt.
- The command resumes after both values are resolved.

The implementation also validates the final selections before project generation.

The prompt choices now mirror the expanded scaffold registry used by the generator.

## Template Validation

The command accepts the following template identifiers during validation:

- `blank`
- `erc20`
- `erc721`
- `erc1155`
- `dao`
- `marketplace`
- `staking`
- `airdrop`
- `vault`
- `kyberion`
- `nft`

The `nft` identifier is accepted by the validator as an alias for `erc721`.

## Available Templates

- **Blank**: Generates a minimal project skeleton with the default directory structure and a placeholder deploy script.
- **ERC20**: Scaffolds a fungible token project with a standard ERC20 contract and deployment script.
- **ERC721**: Scaffolds a non-fungible token project with a standard ERC721 contract and deployment script.
- **ERC1155**: Scaffolds a multi-token project with a standard ERC1155 contract and deployment script.
- **DAO**: Scaffolds a basic decentralized autonomous organization contract and deployment script.
- **Marketplace**: Scaffolds an NFT marketplace contract and deployment script.
- **Staking**: Scaffolds an ERC20 staking and yield farming project.
- **Airdrop**: Scaffolds a Merkle tree token airdrop project.
- **Vault**: Scaffolds a multisig timelock treasury project.
- **Kyberion**: Scaffolds a post-quantum cryptography research prototype.

## Post-Creation Workflow

After a successful scaffold, the CLI prints the standard next steps:

```bash
cd <project>
cmu compile
cmu deploy
```

This workflow moves into the generated project, compiles the contracts, and then deploys them to the configured CointMU network.
