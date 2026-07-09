import discord
from discord.ext import commands

# إعدادات البوت
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# رقم الروم المخصص
TARGET_CHANNEL_ID = 1512519523058716862

@bot.command() # تم التصحيح هنا
async def تنبيه(ctx, *, message: str):
    # تقسيم الرسالة إلى سطر أول (عنوان) وباقي الأسطر (نص)
    lines = message.split('\n', 1)
    title = lines[0]
    description = lines[1] if len(lines) > 1 else ""

    # إنشاء الامبيد
    embed = discord.Embed(
        title=title,
        description=description,
        color=0x161E31
    )

    # إضافة الصورة التي حددتها
    embed.set_image(url="https://cdn.discordapp.com/attachments/1501300022808023351/1524400406426423387/SPOILER_IMG_8689.jpg?ex=6a50ed82&is=6a4f9c02&hm=4ad77fce13d73b8fc556383fbd86830cf4bbecd66a2a9cf1fdafce7217a038bd&")

    # إرسال الامبيد للروم المحدد
    channel = bot.get_channel(TARGET_CHANNEL_ID)
    if channel:
        await channel.send(embed=embed)
        await ctx.send("✅ تم إرسال التنبيه بنجاح!")
    else:
        await ctx.send("❌ عذراً، لم أتمكن من العثور على الروم المحددة.")

# تشغيل البوت
client.login(process.env.TOKEN);