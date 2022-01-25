import EventContainer from "eventcontainer";
import Klaytn from "./Klaytn";

export default abstract class Contract extends EventContainer {

    protected contract: any;

    constructor(public address: string, abi: any) {
        super();
        this.contract = Klaytn.createContract(address, abi);
    }
}
