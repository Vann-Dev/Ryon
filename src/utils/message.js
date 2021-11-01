const { MessageEmbed } = require("discord.js");
const configColor = require("../../config.json").color;

module.exports.embed = function (color, description) {
    let embeds = new MessageEmbed()
        .setColor('#e6c94c')
    if (description) embeds.setDescription(description);
    return embeds;
}