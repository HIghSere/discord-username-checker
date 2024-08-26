"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
// Import functions files
const usernameCheck_1 = require("./src/usernameCheck");
const sleep_1 = require("./util/sleep");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`
 _____                                            _____  _              _             
|  |  | ___  ___  ___  ___  ___  _____  ___  ___ |     || |_  ___  ___ | |_  ___  ___ 
|  |  ||_ -|| -_||  _||   || .'||     || -_||___||   --||   || -_||  _|| '_|| -_||  _|
|_____||___||___||_|  |_|_||__,||_|_|_||___|     |_____||_|_||___||___||_,_||___||_|  
`);
        const proxies = fs_1.default.readFileSync("data/proxies.txt", "utf-8").split("\n").map(proxy => proxy.trim());
        if (proxies.length < 2 && proxies.shift() === "") {
            console.log(":( Missing proxies.");
            return process.stdin.resume();
        }
        while (true) {
            const proxy = proxies[Math.floor(Math.random() * proxies.length)];
            const username = prompt("username> ");
            if (!username || username.length < 2) {
                console.log("This username is invalid.");
                yield (0, sleep_1.sleep)(3000);
                continue;
            }
            else {
                yield (0, usernameCheck_1.usernameCheck)(username, proxy);
            }
        }
    });
}
main();
process.on("uncaughtException", (e) => {
    console.error("ExceptionError:", e);
});
