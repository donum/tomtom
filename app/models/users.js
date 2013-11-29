var fs = require('fs');

module.exports = {
    getUsers: function () {

        var users = [];

        var userLines = fs.readFileSync('db/users.txt', 'utf-8').split('\n');

        for (var i = 0; i < userLines.length; i++) {
            var line = userLines[i].split(';');
            users.push({
                'name': line[0].trim(),
                'password': line[1].trim()
            });
        }

        return users;
    },

    authenticate: function (username, password) {
        var users = this.getUsers();

        for (var i = 0; i < users.length; i++) {
            if (username === users[i].name && password === users[i].password) {
                return true;
            }
        }
        return false;
    }
}
