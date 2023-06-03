const crypto = require('crypto')

const generateHash = (string) => crypto.createHash('md5').update(string?.trim()?.toLowerCase()).digest('hex');
const gravatarBaseUrl = process.env.GRAVATAR_BASE_URL;

module.exports = {
    render(user) {
        return {
            id: user._id,
            name: user.name,
            email: user.email,
            gravatarUrl: gravatarBaseUrl + generateHash(user.email)+'?s=500',
            createdAt: user.createdAt
        };
    },

    renderMany(user) {
        return user.map(this.render);
    }
};