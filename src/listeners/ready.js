const chalk = require("chalk");

module.exports = async (client) => {
    client.user.setActivity({
        name: `/help`,
        type: "PLAYING"
    });

    console.log(chalk.green(`Logged in as ${chalk.white(client.user.username)}`))
}