const express = require('express');
const catalogoRouter = express.Router();

const slqite3 = require('sqlite3');
const db = new slqite3.Database('./database.sqlite');

catalogoRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Catalogo', (err, catalogoItems) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({ catalogoItems: catalogoItems })
        }
    })
})

catalogoRouter.post('/', (req, res, next) => {
    const sku = req.body.catalogoItem.sku,
        stock = req.body.catalogoItem.stock,
        size = req.body.catalogoItem.size,
        name = req.body.catalogoItem.name,
        price = req.body.catalogoItem.price;
    if (!sku || !stock || !size || !name || !price) {
        res.status(400).send('faltan datos animal');
    }
    db.run('INSERT INTO Catalogo (sku, stock, size, name, price) VALUES ($sku, $stock, $size, $name, $price)', {
        $sku: sku,
        $stock: stock,
        $size: size,
        $name: name,
        $price: price
    }, function (err) {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Catalogo WHERE id = ${this.lastID}`, (err, newCatalogoItem) => {
                res.status(200).json({ catalogoItem: newCatalogoItem })
            })
        }
    })
})

catalogoRouter.param('itemId', (req, res, next, itemId) => {
    db.get('SELECT * FROM Catalogo WHERE id = $itemId', {
        $itemId: itemId
    }, (err, catalogoItem) => {
        if (err) {
            next(err)
        } else if (catalogoItem) {
            req.catalogoItem = catalogoItem;
            next();
        } else {
            res.sendStatus(404);
        }
    })
})

catalogoRouter.get('/:itemId', (req, res, next) => {
    res.status(200).json({ catalogoItem: req.catalogoItem })
})

catalogoRouter.put('/:itemId', (req, res, next) => {
    const sku = req.body.catalogoItem.sku,
        stock = req.body.catalogoItem.stock,
        size = req.body.catalogoItem.size,
        name = req.body.catalogoItem.name,
        price = req.body.catalogoItem.price;
    if (!sku || !stock || !size || !name || !price) {
        res.status(400).send('te falta data para actualizar maquina');
    }
    db.run('UPDATE Catalogo SET sku = $sku, stock = $stock, size = $size, name = $name, price = $price WHERE id = $itemId', {
        $sku: sku,
        $stock: stock,
        $size: size,
        $name: name,
        $price: price,
        $itemId: req.params.itemId
    }, function (err) {
        if (err) {
            next(err);
        } else {
            db.get('SELECT * FROM Catalogo WHERE id = $itemId', (err, updatedCatalogoItem) => {
                res.status(200).json({ catalogoItem: updatedCatalogoItem })
            })
        }
    })
})

catalogoRouter.delete('/:itemId', (req, res, next) => {
    db.run('DELETE FROM Catalogo WHERE id = $itemId', {
        $itemId: req.params.itemId
    }, function(err) {
        if (err) {
            next(err)
        } else {
            res.status(204).send('elimina3');
        }
    })
})

module.exports = catalogoRouter;