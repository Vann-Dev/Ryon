const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { promisify } = require("util");
const config = require("../../config.json");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const glob = require("glob");
const globPromise = promisify(glob);

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    shards: "auto",
    allowedMentions: {
        users: [],
        repliedUser: false,
        roles: [],
    }
});

client.slashCommands = new Collection();
client.config = require("../../config.json");
client.utils = require("../utils/message");

process.on('unhandledRejection', error => { console.log(error) });
process.on('uncaughtException', error => { console.log(error) });

async function init() {
    let events = fs.readdirSync("src/listeners/").filter(file => file.endsWith(".js"));
    for (let e of events) {
        let eventFile = require(`../listeners/${e}`);
        let eventName = e.split(".")[0];
        client.on(eventName, eventFile.bind(null, client))
    }

    const slashCommands = await globPromise(`${process.cwd()}/src/commands/*/*.js`);
    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);
        arrayOfSlashCommands.push(file);
    });

    client.on("ready", async () => {
        await client.guilds.cache
            .get("833915847562231808")
            .commands.set(arrayOfSlashCommands);

    })

    client.login(config.token);
}

init();