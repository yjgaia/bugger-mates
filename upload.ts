import BuggerMatesContract from "./src/BuggerMatesContract";
import SkyFiles from "skyfiles";
import mateMetadata from "./mateMetadata.json";

(async () => {
    const ids = ["220",
        "2192",
        "2286",
        "4756",
        "4772",
        "4806",
        "4920",
        "4924",
        "5009",
        "5043",
        "5045",
        "5075",
        "5094",
        "5126",
        "5130",
        "5134",
        "5292",
        "5358",
        "5362",
        "5365",
        "5397",
        "9615",
        "9619",
        "9622",
        "9623",
        "9631",
        "9649",
        "9651",
        "9656",
        "9659",
        "9662",
        "9664",
        "9672",
        "9674",
        "9678",
        "9679",
        "9688",
        "9705",
        "9715",
        "9722",
        "9728",
        "9738",
        "9739",
        "9741",
        "9744",
        "9758",
        "9760",
        "9775",
        "9777",
        "9781"];
    for (const id of ids) {
        const buffer = await SkyFiles.readBuffer(`images/${id}.png`);
        const image = `data:image/png;base64,${buffer.toString("base64")}`;

        await BuggerMatesContract.mint(id, image);
        await BuggerMatesContract.setAttributes(id, JSON.stringify((mateMetadata as any)[id].attributes));

        console.log(`#${id} done.`);
    }
})();
