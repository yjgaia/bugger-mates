import { BigNumberish } from "ethers";
import BuggerMatesArtifact from "../artifacts/contracts/BuggerMates.sol/BuggerMates.json";
import Contract from "./Contract";
import Klaytn from "./Klaytn";

class BuggerMatesContract extends Contract {

    constructor() {
        super("0x7f92B68D9eaAE46311Ec448a808919707cDd4C25", BuggerMatesArtifact.abi);
    }

    public async mint(tokenId: BigNumberish, dataURL: string): Promise<void> {
        const register = Klaytn.walletAddress;
        await this.contract.methods.mint(tokenId, dataURL).send({ from: register, gas: 3000000 });
    }

    public async setAttributes(tokenId: BigNumberish, attributes: string): Promise<void> {
        const register = Klaytn.walletAddress;
        await this.contract.methods.setAttributes(tokenId, attributes).send({ from: register, gas: 3000000 });
    }
}

export default new BuggerMatesContract();
