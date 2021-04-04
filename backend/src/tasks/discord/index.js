import discord from "discord.js";

async function setupDiscord() {
  const client = new discord.Client();
  client.login(process.env.DISCORD_TOKEN);

  client.on("ready", () => {
    console.log("Bot ready");
  });
}

async function sendServerMessage() {
  setupDiscord();
}

export { sendServerMessage };
