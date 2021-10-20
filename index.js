const TelegramBot = require('node-telegram-bot-api');
const Axios = require('axios');


const token = '1945579484:AAEHOHnn5mdQtuf3kHDfOCRhN55DPpcaLyY';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/curse/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Выберете интересующию вас валюту', {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "€ - EUR",
                        callback_data: "EUR"
                    },
                    {
                        text: "$ - USD",
                        callback_data: "USD"
                    },
                    {
                        text: "£ - GBP",
                        callback_data: "GBP"
                    }
                ],
                [{
                        text: "₿ - BTC",
                        callback_data: "BTC"
                    },
                    {
                        text: "◊ - ETC",
                        callback_data: "ETC"
                    },
                    {
                        text: "Ł - LTC",
                        callback_data: "LTC"
                    }
                ]
            ]
        }
    })

    bot.on("callback_query", query => {
        const id = query.message.chat.id,
            curData = query.data,
            flag = {
                "RUB": "🇷🇺",
                "EUR": "🇪🇺",
                "USD": "🇺🇸",
                "GBP": "🇬🇧",
                "BTC": "",
                "ETC": "",
                "LTC": "",
            };

        (function () {
            /**
             * @param {String}  type  Тип корректировки.
             * @param {Number}  value Число.
             * @param {Integer} exp   Показатель степени (десятичный логарифм основания корректировки).
             * @returns {Number} Скорректированное значение.
             */
            function decimalAdjust(type, value, exp) {
                // Если степень не определена, либо равна нулю...
                if (typeof exp === 'undefined' || +exp === 0) {
                    return Math[type](value);
                }
                value = +value;
                exp = +exp;

                // Сдвиг разрядов
                value = value.toString().split('e');
                value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
                // Обратный сдвиг
                value = value.toString().split('e');
                return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
            }

            // Десятичное округление к ближайшему
            if (!Math.round10) {
                Round10 = function (value, exp) {
                    return decimalAdjust('round', value, exp);
                }
            }
        })();

        if (curData === "EUR") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        } else if (curData === "USD") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        } else if (curData === "GBP") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/gbp/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        } else if (curData === "BTC") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/btc/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        } else if (curData === "ETC") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/etc/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        } else if (curData === "LTC") {
            Axios.get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/ltc/rub.json")
                .then((res) => {
                    let md = `*${flag[curData]}${curData} ⇌ ${flag.RUB}RUB* \n${Round10(res.data.rub , -1)}`

                    bot.sendMessage(id, md, {
                        parse_mode: 'Markdown'
                    })
                })
        }
    })
})



bot.onText(/\/art/,(msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Выберите жанр', {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "SFW - 🔥",
                    callback_data: "SFW"
                },
                {
                    text: 'NSFW - 🔞',
                    callback_data: "NSFW"
                }]
            ]
        }
    })
})

bot.on("callback_query", query => {

    const id = query.message.chat.id,
    artData = query.data;

    let genresSFW = {
        waifu: "waifu",
        neko: "neko",
        awoo: "awoo",
        blush: "blush",
        bite: "bite",
        slap: "slap",
        happy: "happy"
    }

    let genresNSFW = {
        waifu: "waifu",
        neko: "neko",
        blowjob: "blowjob"
    }

    function randProps(obj) {
        var keys = Object.keys(obj)
        return obj[keys[ keys.length * Math.random() << 0]]; 
    }

    switch(artData){
        case "SFW":
            Axios.get(`https://api.waifu.pics/sfw/${randProps(genresSFW)}`)
            .then((res) => {
                let md = `Ссылка ${res.data.url}`

                bot.sendMessage(id, md)
            })
            break;
        case "NSFW":
            Axios.get(`https://api.waifu.pics/nsfw/${randProps(genresNSFW)}`)
            .then((res) => {
                let md = `Ссылка ${res.data.url}`

                bot.sendMessage(id, md)
            })
            break;
    }
})