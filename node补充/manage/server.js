const db = require('./libs/database');
const http = require('./libs/http');
const {
    addRouter
} = require('./libs/router');

function writeJson(data) {
    return JSON.stringify(data);
}

addRouter('get', '/list', async (res, get, post, files) => {
    let data = await db.query('SELECT * FROM item_table');
    res.write(writeJson({
        error: 0,
        data
    }));
    res.end();
})
addRouter('get', '/add', async (res, get, post, files) => {
    await db.query(`INSERT INTO item_table (title,price,count) VALUES (?,?,?)`, [get['a'], get['b'], get['c']]);
})