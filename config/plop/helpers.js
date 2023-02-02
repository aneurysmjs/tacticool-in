module.exports = {
    curlyMe: (text) => `{${text}}`,
    prefixMe: (suffix, text) => `${suffix}${text}`,
    suffixMe: (text, suffix) => `${text}${suffix}`,
    appendType: (prefix, text, suffix = '') => `${prefix}${text}${suffix}`,
};
