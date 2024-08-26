import fs from "fs";
import promptSync from "prompt-sync";
const prompt = promptSync();

// Import functions files
import { usernameCheck } from "./src/usernameCheck";
import { sleep } from "./util/sleep";

async function main() {

    console.log(`
 _____                                            _____  _              _             
|  |  | ___  ___  ___  ___  ___  _____  ___  ___ |     || |_  ___  ___ | |_  ___  ___ 
|  |  ||_ -|| -_||  _||   || .'||     || -_||___||   --||   || -_||  _|| '_|| -_||  _|
|_____||___||___||_|  |_|_||__,||_|_|_||___|     |_____||_|_||___||___||_,_||___||_|  
`);

    const proxies: string[] = fs.readFileSync("data/proxies.txt", "utf-8").split("\n").map(proxy => proxy.trim());

    if (proxies.length < 2 && proxies.shift() === "") {
        console.log(":( Missing proxies.");
        return process.stdin.resume();
    }

    while (true) {

        const proxy: string = proxies[Math.floor(Math.random() * proxies.length)];
        const username: string = prompt("username> ");

        if (!username || username.length < 2) {
            console.log("This username is invalid.");
            await sleep(3000);
            continue;
        } else {

            await usernameCheck(
                username,
                proxy
            );

        }
    }
}

main();

process.on("uncaughtException", (e) => {
    console.error("ExceptionError:", e);
});