import fs from "fs";
import { Status, LoadsheddingStage } from "eskom-loadshedding-api";

const delay = 60 * 60 * 1000; // 1 hour in ms
async function grabStatus() {
    console.log("attempting to retrieve data");
    let currentStatus: LoadsheddingStage = -1;
    let delay = null;
    let timestamp = null;
    let timestampStart = Date.now();
    await Status.getStatus().then((status: LoadsheddingStage) => {
        timestamp = new Date();
        delay = timestamp.valueOf() - timestampStart;
        currentStatus = status;
        timestamp = timestamp.toISOString();
    });
    fs.appendFile(
        `${__dirname}/../out.csv`,
        `\n${timestamp},${currentStatus},${delay}`,
        (err: any) => {
            if (err) {
                console.error(err);
                throw err;
            } else {
                console.log("success!");
            }
        }
    );
}

setInterval(grabStatus, delay);
