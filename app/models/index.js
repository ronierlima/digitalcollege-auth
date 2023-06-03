const modelsLink = require('./Link');
const modelsUser = require('./User');

const { Link } = modelsLink();
const { User } = modelsUser();

module.exports = { Link, User };