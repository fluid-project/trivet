"use strict";

const config = require("../_data/config.json");

module.exports = (lang) => {
    /* Trim the country code from the end of the language. */
    const shortLang = lang.split("-")[0];

    /* Create array of all supported language codes with the country code trimmed. */
    const codes = config.languages.reduce((accumulator, currentValue) => {
        let lang = currentValue.code.split("-")[0];
        accumulator[lang] = (++accumulator[lang] || 1);
        return accumulator;
    }, {});

    /* If there is more than one instance of the language code in the array, use the full code with country as the slug. */
    if (codes[shortLang] > 1) {
        return lang.toLowerCase();
    }

    /* Otherwise, use the short code as the slug. */
    return shortLang;
};
