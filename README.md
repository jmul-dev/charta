<img src="https://s3-us-west-2.amazonaws.com/dharma-assets/logo+orange.png"  width=300/>

------------

> 'Charta' is the latin word for 'letter or document'.  We loosely appropriate this term as a codename for the smart contracts comprising the business logic of Dharma protocol.

**This codebase is a work-in-progress -- we welcome open-source contributions and emphasize that the code contained herein is pre-alpha, unstable, and potentially  unsafe.**

[Dharma](https://dharma.io) is a protocol for generic tokenized debt issuance and fundraising on blockchains supporting requisite smart contract functionality (i.e. EVM blockchains).  For a full description of the protocol's mechanics, a thorough overview can be found in the [Dharma Protocol Whitepaper](https://whitepaper.dharma.io/).  This repository contains the core contracts that compromise the business logic for issuing and administering debt crypto-assets on-chain.

We use truffle for deployment, testing, and development, and use [Typescript](https://www.typescriptlang.org/) for testing and deployment.

[Join us on our chat](https://chat.dharma.io) for any technical or general questions.

### Setup
---------------
##### Dependencies

Install dependencies:
```
npm install
```

##### Testing

Start `testrpc`:
```
npm run testrpc
```
Run `truffle` tests:
```
npm test
```


### Contract Architecture
---------------

1. [DebtRegistry.sol](https://github.com/dharmaprotocol/contracts/blob/master/contracts/LoanLib.sol)

The "Debt Registry" is 



Boilerplate migration code used by the truffle framework.