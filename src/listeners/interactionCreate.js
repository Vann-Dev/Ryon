module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply().catch(e => { });
        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "❌ An error occured" });

        const args = [];

        for (let options of interaction.options.data) {
            if (options.type === "SUB_COMMAND") {
                if (options.name) args.push(options.name);
                options.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(options.value);
        }

        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }
}