require("dotenv").config();
const {
    Bot,
    GrammyError,
    HttpError,
    session,
    SessionFlavor,
    Keyboard,
} = require("grammy");
const { conversations, createConversation } = require("@grammyjs/conversations");
const bot = new Bot(process.env.BOT_API_KEY);
// const axios = require("axios");

// let curr = 0;
// async function fetchCurrency() {
//     const response = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");
//     curr = response.data.Valute.CNY.Value;
// }
// fetchCurrency();

bot.use(
    session({
        initial() {
            // return empty object for now
            return {};
        },
    })
);

// Install the conversations plugin.
bot.use(conversations());

bot.api.setMyCommands([
    { command: "start", description: "Начальное сообщение" },
    // { command: "price", description: "Расчитать стоимость вещи" },
]);

const keyboard = new Keyboard()
    .text("Курс ¥")
    .text("Рассчитать стоимость 💴")
    .text("Срок доставки 🚀")
    .row()
    .text("INST 🪩")
    .text("Отзывы 💌")
    .text("Личная связь ❤️")
    .row()
    .text("Хочу скидку 🤩")
    .resized();

async function getClothesPrice(conversation, ctx) {
    await ctx.reply("Напиши стоимость товара в юанях.");
    const { message } = await conversation.wait();

    if (!isNaN(Number(message.text))) {
        const sum = message.text * 13.7 + 1113 + 400;
        await ctx.reply(
            `Итоговая цена составила всего ${Math.round(
                sum
            )} рублей.\n\nПерейти к оформлению заказа\n👉🏻 <b>@icytrill</b> `,
            {
                reply_markup: keyboard,
                parse_mode: "HTML",
            }
        );
    } else if (message.text == "Назад в меню >") {
        await ctx.reply(
            `Привет, уважаемый покупатель, рад тебя видеть ! 👋🏻   

Я помощник <a href="https://t.me/BOGDANBUTIK">BOGDAN | BUTIK </a>

Чем я могу помочь ? 👇🏻`,
            {
                parse_mode: "HTML",
                reply_markup: keyboard,
                disable_web_page_preview: true,
            }
        );
    } else {
        const priceKeyboard = new Keyboard()
            .text("Кроссовки 👟")
            .text("Одежда 👕")
            .row()
            .text("Аксессуары 👛")
            .text("Электроника 🤖")
            .row()
            .text("Назад в меню >")
            .resized();
        await ctx.reply("Нужно ввести число, попробуйте ещё раз.", {
            reply_markup: priceKeyboard,
        });
    }
}

bot.use(createConversation(getClothesPrice));

bot.hears("Одежда 👕", async (ctx) => {
    await ctx.conversation.enter("getClothesPrice");
});

async function getSneakersPrice(conversation, ctx) {
    await ctx.reply("Напиши стоимость товара в юанях.");
    const { message } = await conversation.wait();

    if (!isNaN(Number(message.text))) {
        const sum = message.text * 13.7 + 1613 + 400;
        await ctx.reply(
            `Итоговая цена составила всего ${Math.round(
                sum
            )} рублей.\n\nПерейти к оформлению заказа\n👉🏻 <b>@icytrill</b> `,
            {
                reply_markup: keyboard,
                parse_mode: "HTML",
            }
        );
    } else if (message.text == "Назад в меню >") {
        await ctx.reply(
            `Привет, уважаемый покупатель, рад тебя видеть ! 👋🏻   

Я помощник <a href="https://t.me/BOGDANBUTIK">BOGDAN | BUTIK </a>

Чем я могу помочь ? 👇🏻`,
            {
                parse_mode: "HTML",
                reply_markup: keyboard,
                disable_web_page_preview: true,
            }
        );
    } else {
        const priceKeyboard = new Keyboard()
            .text("Кроссовки 👟")
            .text("Одежда 👕")
            .row()
            .text("Аксессуары 👛")
            .text("Электроника 🤖")
            .row()
            .text("Назад в меню >")
            .resized();
        await ctx.reply("Нужно ввести число, попробуйте ещё раз.", {
            reply_markup: priceKeyboard,
        });
    }
}

bot.use(createConversation(getSneakersPrice));

bot.hears(["Аксессуары 👛", "Электроника 🤖"], async (ctx) => {
    await ctx.reply(
        "Расчет выбранного тобой товара производится в личных сообщениях\n\n👉🏻 <b>@icytrill</b>",
        {
            parse_mode: "HTML",
        }
    );
});

bot.hears("Кроссовки 👟", async (ctx) => {
    await ctx.conversation.enter("getSneakersPrice");
});

bot.hears("Рассчитать стоимость 💴", async (ctx) => {
    const priceKeyboard = new Keyboard()
        .text("Кроссовки 👟")
        .text("Одежда 👕")
        .row()
        .text("Аксессуары 👛")
        .text("Электроника 🤖")
        .row()
        .text("Назад в меню >")
        .resized();

    await ctx.reply("Пожалуйста, выберите товар, который нужно рассчитать 👇🏻", {
        reply_markup: priceKeyboard,
    });
});

bot.hears("Личная связь", async (ctx) => {
    await ctx.reply("@icytrill");
});

bot.hears("Отзывы", async (ctx) => {
    await ctx.reply("<a href='t.me/feedbackkk25'>Канал с отзывами</a>", {
        parse_mode: "HTML",
    });
});

bot.hears("Курс ¥", async (ctx) => {
    await ctx.reply("На данный момент курс юаня - 13.7");
});

bot.hears("Срок доставки", async (ctx) => {
    await ctx.reply("<a href='t.me/feedbackkk25'>Канал с отзывами</a>", {
        parse_mode: "HTML",
    });
});

bot.hears("О магазине", async (ctx) => {
    await ctx.reply("<a href='t.me/feedbackkk25'>Канал с отзывами</a>", {
        parse_mode: "HTML",
    });
});

bot.hears("Срок доставки 🚀", async (ctx) => {
    const keyboard = new Keyboard()
        .text("🚛 Обычная доставка")
        .text("✈️ Экспресс доставка")
        .row()
        .text("Назад в меню >")
        .resized();

    await ctx.reply("Выберите вид доставки", {
        reply_markup: keyboard,
    });
});

bot.hears("🚛 Обычная доставка", async (ctx) => {
    await ctx.reply(
        "С момента заказа до момента получения заказа мной в Москве ~ 20 дней (бывает и раньше 🥰)"
    );
});

bot.hears("Назад в меню >", async (ctx) => {
    await ctx.reply(
        `Привет, уважаемый покупатель, рад тебя видеть ! 👋🏻   

Я помощник <a href="https://t.me/BOGDANBUTIK">BOGDAN | BUTIK </a>

Чем я могу помочь ? 👇🏻`,
        { parse_mode: "HTML", reply_markup: keyboard, disable_web_page_preview: true }
    );
});

bot.hears("✈️ Экспресс доставка", async (ctx) => {
    await ctx.reply(
        "Ваш товар отправится самолетом и будет доставлен в срок до 8 дней (обращаться по этому запросу строго в личные сообщения)"
    );
});

bot.hears("Отзывы 💌", async (ctx) => {
    await ctx.reply(
        "С отзывами моих клиентов можно ознакомиться <a href='https://t.me/feedbackkk25'>ТУТ</a>\n\nВаша обратная связь мне очень ценна! ❤️",
        {
            parse_mode: "HTML",
        }
    );
});

bot.hears("Личная связь ❤️", async (ctx) => {
    await ctx.reply(
        "Остались вопросы?\n\nЕдинственный контакт - @icytrill.\n\nВсегда жду твоего сообщения, всегда на связи! 😉",
        {
            parse_mode: "HTML",
        }
    );
});

bot.hears("Хочу скидку 🤩", async (ctx) => {
    await ctx.reply(
        "<i>Получить скидку настолько легко, что вы даже не догадываетесь насколько</i> 🤪\n\nУ вас есть выбор:\n\nРепостни любой рилс из моего <a href='https://www.instagram.com/bogdan.butik?igsh=OWdzMXNhOGw3N2I1&utm_source=qr'>инстаграма</a> - получи скидку <b>333₽</b>\n\nЗапиши видеоотзыв на товар заказанный у меня - получи скидку <b>555₽</b>\n\nСними полноценную рекламу про мой бутик - получи <b>1111111₽</b> (*награждение начисляется индивидуально, в зависимости от выполнения работы, но, любой труд оплачивается 😉)\n\nПрояви свою смекалку и придумай интерактив, конкурс, который можно провести в канале, предложения писать в личные сообщения 👉 <b>@icytrill</b>",
        {
            parse_mode: "HTML",
        }
    );
});

bot.hears("INST 🪩", async (ctx) => {
    const text =
        "<a href='https://www.instagram.com/bogdan.butik?igsh=OGQ5ZDc2ODk2ZA%3D%3D&utm_source=qr'>bogdan.butik</a> - здесь создается красивый и интересный контент, которого нет в телеграмм канале.\n\nчасто проходят конкурсы на репосты моих видео, поэтому переходи и присоединяйся, чтоб забрать <b><u>5000</u></b> рублей за просто так! 🤑";
    await ctx.reply(text, {
        parse_mode: "HTML",
    });
});

bot.command("start", async (ctx) => {
    await ctx.reply(
        `Привет, уважаемый покупатель, рад тебя видеть ! 👋🏻   

Я помощник <a href="https://t.me/BOGDANBUTIK">BOGDAN | BUTIK </a>

Чем я могу помочь ? 👇🏻`,
        { parse_mode: "HTML", reply_markup: keyboard, disable_web_page_preview: true }
    );
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

bot.start();
