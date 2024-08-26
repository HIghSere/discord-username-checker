import axios from "axios";
import fs from "fs";
import { HttpsProxyAgent } from "https-proxy-agent";

// Import finctions files
import { color } from "../../util/color";

export async function usernameCheck(
    username: string,
    proxy: string
) {
    if (!username || !proxy) {
        console.log("userTag or proxies are invalid.");
    }

    try {

        await axios.post("https://discord.com/api/v9/unique-username/username-attempt-unauthed", {
            "username": username.trim()
        }, {
            headers: {
                "Authority": "canary.discord.com",
                "Accept": "*/*",
                "Accept-Language": "pl,en;q=0.9,en-GB;q=0.8,en-US;q=0.7",
                "Content-Type": "application/json",
                "Origin": "https://canary.discord.com",
                "Referer": "https://canary.discord.com/channels/1275070710653390858/1275084204358504593",
                "Sec-CH-UA": '"Not_A Brand";v="8", "Chromium";v="120", "Microsoft Edge";v="120"',
                "Sec-CH-UA-Mobile": "?0",
                "Sec-CH-UA-Platform": '"Windows"',
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-origin",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
                "X-Context-Properties": "eyJsb2NhdGlvbiI6IkpvaW4gR3VpbGQiLCJsb2NhdGlvbl9ndWlsZF9pZCI6IjUwOTQ1MDMzNDE2NzYyOTgzMCIsImxvY2F0aW9uX2NoYW5uZWxfaWQiOiIxMTk1Nzg1ODI2ODQwMzU0OTM5IiwibG9jYXRpb25fY2hhbm5lbF90eXBlIjowfQ==",
                "X-Debug-Options": "bugReporterEnabled",
                "X-Discord-Locale": "en-US",
                "X-Discord-Timezone": "Europe/Warsaw",
                "X-Super-Properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiQ2hyb21lIiwiZGV2aWNlIjoiIiwic3lzdGVtX2xvY2FsZSI6InBsIiwiYnJvd3Nlcl91c2VyX2FnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEyMC4wLjAuMCBTYWZhcmkvNTM3LjM2IEVkZy8xMjAuMC4wLjAiLCJicm93c2VyX3ZlcnNpb24iOiIxMjAuMC4wLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoiY2FuYXJ5IiwiY2xpZW50X2J1aWxkX251bWJlciI6MjU5MDkxLCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsLCJkZXNpZ25faWQiOjB9",
            },
            httpsAgent: new HttpsProxyAgent(`http://${proxy.trim()}`),
            timeout: 6000
        }).then((response) => {
            if (response.status === 200 && response.data["taken"] === false) {
                console.log(`${color.green}✓ ${username} is valid.${color.white}`);
                fs.appendFileSync("data/validUsername.txt", `${username}\n`, "utf-8");
            } else {
                console.log(`${color.red}✖ ${username} is invalid.${color.white}`);
            }
        }).catch((error) => {
            if (error.response) {
                if (error.response.status === 429) {
                    console.log(`${color.yellow}△ ${proxy} is limited${color.white}`);
                } else {
                    console.log(`${color.red}✖ error status: ${error.response.status}${color.white}`);
                }
            } else {
                console.log(`${color.red}✖ error status: ${error.response.status}${color.white}`);
            }
        });

    } catch (e) {
        console.error("Error:", e);
    }
}

process.on("uncaughtException", (e) => {
    console.error("ExceptionError:", e);
});