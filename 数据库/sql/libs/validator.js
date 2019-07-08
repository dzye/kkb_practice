module.exports = {
    username(username) {
        if (!username) {
            return '用户名不能为空';
        } else if (username.length > 32) {
            return '用户名长度不能超过32'
        } else if (!/^\w{4,32}$/.test(username)) {
            return '格式错误'
        } else {
            return null;
        }
    },
    password(password) {
        if (!password) {
            return '用户名不能为空';
        } else if (password.length > 32) {
            return '用户名长度不能超过32'
        } else {
            return null;
        }
    }
}