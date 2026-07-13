const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// إعدادات البوت
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

const TARGET_CHANNEL_ID = '1512519523058716862';

client.on('messageCreate', async message => {
    // تجاهل رسائل البوتات
    if (message.author.bot) return;

    // التأكد من أن الرسالة تبدأ بـ !تنبيه
    if (message.content.startsWith('!تنبيه')) {
        // فصل الأمر عن الرسالة
        const fullMessage = message.content.slice(6).trim();
        const lines = fullMessage.split('\n');
        
        // السطر الأول هو العنوان، والباقي هو النص
        const title = lines[0] || "تنبيه";
        const description = lines.slice(1).join('\n') || " ";

        // إنشاء الامبيد باللون المطلوب 0x161E31
        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(0x161E31)
            .setImage("https://cdn.discordapp.com/attachments/1501300022808023351/1526284053056065546/IMG_9244.jpg?ex=6a56764b&is=6a5524cb&hm=86c27f99f88f214c5d35f1bd92bb239590171b9e4fa3e5610850442111eb04bd&");

        // إرسال الامبيد للروم المحدد
        try {
            const channel = await client.channels.fetch(TARGET_CHANNEL_ID);
            if (channel) {
                await channel.send({ embeds: [embed] });
                await message.reply("✅ تم إرسال التنبيه بنجاح!");
            }
        } catch (error) {
            console.error(error);
            await message.reply("❌ عذراً، لم أتمكن من العثور على الروم المحددة أو إرسال الرسالة.");
        }
    }
});

// تشغيل البوت باستخدام التوكن من ملف البيئة
client.login(process.env.TOKEN);
