const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    db.run('DROP TABLE IF EXISTS Catalogo');
    db.run('CREATE TABLE Catalogo (id INTEGER PRIMARY KEY NOT NULL, sku TEXT NOT NULL, stock INTEGER NOT NULL DEFAULT 1, size INTEGER NOT NULL, name TEXT NOT NULL, price INTEGER NOT NULL)');
    db.run('INSERT INTO Catalogo (sku, stock, size, name, price) VALUES ("gpt-3", 3, 34, "zapato urban", 5000)');
})