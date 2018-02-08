"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const debt_registry_1 = require("../types/generated/debt_registry");
const dummy_token_registry_1 = require("../types/generated/dummy_token_registry");
const repayment_router_1 = require("../types/generated/repayment_router");
const terms_contract_registry_1 = require("../types/generated/terms_contract_registry");
const SimpleInterestTermsContract = artifacts.require("SimpleInterestTermsContract");
const TermsContractRegistry = artifacts.require("TermsContractRegistry");
module.exports = (deployer, network, accounts) => {
    const TX_DEFAULTS = { from: accounts[0], gas: 4000000 };
    deployer.deploy(TermsContractRegistry).then(() => __awaiter(this, void 0, void 0, function* () {
        const debtRegistry = yield debt_registry_1.DebtRegistryContract.deployed(web3, TX_DEFAULTS);
        const repaymentRouter = yield repayment_router_1.RepaymentRouterContract.deployed(web3, TX_DEFAULTS);
        const termsContractRegistry = yield terms_contract_registry_1.TermsContractRegistryContract.at(TermsContractRegistry.address, web3, TX_DEFAULTS);
        const symbolToTermsContractAddress = {};
        if (network !== "live") {
            const dummyTokenRegistry = yield dummy_token_registry_1.DummyTokenRegistryContract.deployed(web3, TX_DEFAULTS);
            const dummyREPTokenAddress = yield dummyTokenRegistry.getTokenAddress.callAsync("REP");
            const dummyMKRTokenAddress = yield dummyTokenRegistry.getTokenAddress.callAsync("MKR");
            const dummyZRXTokenAddress = yield dummyTokenRegistry.getTokenAddress.callAsync("ZRX");
            const simpleInterestREPTermsContract = yield SimpleInterestTermsContract.new(debtRegistry.address, dummyREPTokenAddress, repaymentRouter.address);
            const simpleInterestMKRTermsContract = yield SimpleInterestTermsContract.new(debtRegistry.address, dummyMKRTokenAddress, repaymentRouter.address);
            const simpleInterestZRXTermsContract = yield SimpleInterestTermsContract.new(debtRegistry.address, dummyZRXTokenAddress, repaymentRouter.address);
            symbolToTermsContractAddress["REP"] = simpleInterestREPTermsContract.address;
            symbolToTermsContractAddress["MKR"] = simpleInterestMKRTermsContract.address;
            symbolToTermsContractAddress["ZRX"] = simpleInterestZRXTermsContract.address;
        }
        else {
            // TODO fill in mainnet implementation
        }
        for (const symbol in symbolToTermsContractAddress) {
            if (symbolToTermsContractAddress.hasOwnProperty(symbol)) {
                yield termsContractRegistry.setSimpleInterestTermsContractAddress.sendTransactionAsync(symbol, symbolToTermsContractAddress[symbol]);
            }
        }
    }));
};
//# sourceMappingURL=4_deploy_terms_contracts.js.map