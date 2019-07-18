const path = require('path');
module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'root',
    DB_PASS: 'P@ssw0rd',
    DB_NAME: 'cpts',

    ADMIN_PREFIX: '_1',

    HTTP_ROOT: 'http://localhost:8080',
    PORT: '8080',
    UPLOAD_DIR:path.resolve(__dirname,'./static/upload')

};