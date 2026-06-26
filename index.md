---
layout: home

hero:
  name: CointMU Network
  text: Documentation
  tagline: Technical reference for the private CointMU blockchain, secure node access, and the cmu deployment workflow.
  actions:
    - theme: brand
      text: Get Started
      link: /docs/guide/introduction
    - theme: alt
      text: View CLI Commands
      link: /docs/cli/overview

features:
  - title: Private Node Security
    details: Run Geth on the local RPC port and expose it only through an Nginx reverse proxy with strict IP whitelisting.
  - title: Custom CLI Tooling
    details: Use cmu to scaffold ERC20 and ERC721 projects, compile Solidity sources, and resolve imports dynamically from node_modules.
  - title: Smart Contract Deployment
    details: Deploy contracts sequentially through the deploy/ pipeline against the CointMU network and proxy endpoint.
---
