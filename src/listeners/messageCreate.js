module.exports = async (client, message) => {
    console.log(message.content)
    if (msg.content.toLowerCase() == `<@!${client.user.id}>` || msg.content.toLowerCase() == `<@${client.user.id}>`) {
        return msg.channel.send("a")
    }
}