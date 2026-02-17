let users = [];
let nextUserId = 1

module.exports = {
    users,
    getNextUserId: ()=> nextUserId++
};