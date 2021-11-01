const { MessageEmbed } = require("discord.js");
const { userBadge } = require("../../utils/emoji");

module.exports = {
    name: "user",
    description: "View users profile",
    options: [
        {
            type: "SUB_COMMAND",
            name: "view",
            description: "View users information",
            options: [
                {
                    name: "user",
                    description: "Users name",
                    type: "USER",
                    required: true
                }
            ]
        },
        {
            type: "SUB_COMMAND",
            name: "avatar",
            description: "View users avatar",
            options: [
                {
                    name: "user",
                    description: "Users name",
                    type: "USER",
                    required: true
                }
            ]
        }
    ],

    run: async (client, interaction, args) => {
        let userId = args[1]
        let userInfo = await interaction.guild.members.fetch(userId)

        if (args[0] === 'view') {
            interaction.followUp({
                embeds: [client.utils.embed('normal')
                    .setTitle(`${userInfo.user.username}#${userInfo.user.discriminator}`)
                    .setDescription(`${userBadge[userInfo.user.flags.toArray()] ? userBadge[userInfo.user.flags.toArray()] : ""}`)
                    .addField("Account created at", `<t:${Math.round(userInfo.user.createdTimestamp / 1000)}>`)
                    .addField("Bot?", `${userInfo.bot ? "Yes" : "No"}`)
                    .addField("Id", `${userInfo.id}`)
                    .addField("Discriminator", `#${userInfo.user.discriminator}`)
                    .setThumbnail(userInfo.displayAvatarURL())
                ]
            })
        }

        if (args[0] === 'avatar') {
            interaction.followUp({
                embeds: [client.utils.embed()
                    .setImage(`${userInfo.displayAvatarURL({ dynamic: true })}?size=4096`)
                    .setAuthor(`${userInfo.user.username}#${userInfo.user.discriminator}`, undefined, userInfo.displayAvatarURL())
                ]
            })
        }
    },
};