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
exports.usernameCheck = usernameCheck;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const https_proxy_agent_1 = require("https-proxy-agent");
// Import finctions files
const color_1 = require("../../util/color");
function usernameCheck(username, proxy) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!username || !proxy) {
            console.log("userTag or proxies are invalid.");
        }
        try {
            yield axios_1.default.post("https://discord.com/api/v9/unique-username/username-attempt-unauthed", {
                "username": username.trim()
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                httpsAgent: new https_proxy_agent_1.HttpsProxyAgent(`http://${proxy.trim()}`),
                timeout: 6000
            }).then((response) => {
                if (response.status === 200 && response.data["taken"] === false) {
                    console.log(`${color_1.color.green}✓ ${username} is valid${color_1.color.white}`);
                    fs_1.default.appendFileSync("data/validUsername.txt", `${username}\n`, "utf-8");
                }
                else {
                    console.log(`${color_1.color.red}✖ ${username} is invalid${color_1.color.white}`);
                }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 429) {
                        console.log(`${color_1.color.yellow}△ ${proxy} is limited${color_1.color.white}`);
                    }
                    else {
                        console.log(`${color_1.color.red}✖ error${color_1.color.white}`);
                    }
                }
                else {
                    console.log(`${color_1.color.red}✖ error${color_1.color.white}`);
                }
            });
        }
        catch (e) {
            console.error("Error:", e);
        }
    });
}
process.on("uncaughtException", (e) => {
    console.error("ExceptionError:", e);
});
