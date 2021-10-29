const { ShardingManager } = require("discord.js");
const chalk = require("chalk");
const { join } = require('path');
const config = require("../config.json");

const shardClient = new ShardingManager(join(__dirname, "structures", "index.js"), {
    respawn: true,
    token: config.token,
    totalShards: "auto"
})

shardClient.on("shardCreate", (Shard) => {
    console.log(chalk.greenBright(`Shard spawned: ${chalk.white(Shard.id)}`));
})

shardClient.spawn().catch((error) => console.log(chalk.redBright(`Something error when spawning Shard: ${error.message}`)));