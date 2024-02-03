const db = require('./connection');

let querys = {
    getproducto: 'SELECT * FROM producto',
    getproductoID: 'SELECT * FROM producto WHERE id = ?',
    getproductoNO: 'SELECT * FROM producto ORDER BY name ASC',
    getproductoDE: 'SELECT * FROM producto ORDER BY description ASC',
    getproductoCA: 'SELECT * FROM producto ORDER BY category_id ASC',
    getproductoMO: 'SELECT * FROM producto ORDER BY lab ASC',
    getproductoPO: 'SELECT * FROM producto ORDER BY quantity ASC',
    getproductoPU: 'SELECT * FROM producto JOIN puntaje ON producto.id = puntaje.producto_id ORDER BY promedio DESC',
    getimagenID: 'SELECT * FROM imagen WHERE id = ?',
    insertproducto: 'INSERT INTO producto (code, name, lab, quantity, description, price, category_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
    getimagen: 'SELECT * FROM imagen',
    getcategory: 'SELECT * FROM category',
    getcategoryID: 'SELECT * FROM category WHERE id = ?',
    insertimagen: 'INSERT INTO imagen (url, producto_id, destacado) VALUES(?, ?, ?)',
    insertcategory: 'INSERT INTO category(name) VALUES(?)',
    updateproducto: 'UPDATE producto SET code = ?, name = ?, lab = ?, quantity = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
    updateimagen: 'UPDATE imagen SET url = ?, producto_id = ?, destacado = ? WHERE id = ?',
    updatecategory: 'UPDATE category SET name = ? WHERE id = ?',
    deleteproducto: 'DELETE FROM producto WHERE id = ?',
    deleteimagen: 'DELETE FROM imagen WHERE id = ?',
    deletecategory: 'DELETE FROM category WHERE id = ?',
    insertclient: 'INSERT INTO client (email, pass) VALUES(?, ?)',
    getclient: 'SELECT * FROM client',
    getcompra: 'SELECT * FROM compra',
    insertcompra: 'INSERT INTO compra (cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente) VALUES(?, ?, ?, ?, ?, ?)',
    insertpuntaje: 'INSERT INTO calificacion (puntos, producto_id) VALUES(?, ?)',
    getpuntaje: 'SELECT * FROM puntaje'
}
module.exports = {
    getproducto(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproducto, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoPU(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoPU, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getpuntaje(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getpuntaje, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertpuntaje(puntos, producto_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertpuntaje, [puntos, producto_id], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    insertcompra(cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente){
        return new Promise((resolve, reject) => {
            db.run(querys.insertcompra, [cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    insertclient(email, pass){
        return new Promise((resolve, reject) => {
            db.run(querys.insertclient, [email, pass], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getclient(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getclient, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getcompra(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getcompra, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    
    insertproducto(code, name, lab, quantity, description, price, category_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertproducto, [code, name, lab, quantity, description, price, category_id], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getproductoID(id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoID, [id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoNO(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoNO, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoDE(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoDE, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoCA(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoCA, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoMO(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoMO, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getproductoPO(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoPO, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    updateproducto(id, code, name, lab, quantity, description, price, category_id){
        return new Promise((resolve, reject) => {
            db.run(querys.updateproducto, [code, name, lab, quantity, description, price, category_id, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deleteproducto(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deleteproducto, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },
    getimagen(){
        return new Promise((resolve, reject) => {
            db.all(querys.getimagen, (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    },


    getimagenID(id){
        return new Promise((resolve, reject) => {
            db.all(querys.getimagenID, [id], (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertimagen(url, producto_id, destacado){
        return new Promise((resolve, reject) => {
            db.run(querys.insertimagen, [url, producto_id, destacado], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    updateimagen(id, url, producto_id, destacado){
        return new Promise((resolve, reject) => {
            db.run(querys.updateimagen, [ url, producto_id, destacado, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deleteimagen(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deleteimagen, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    getcategory(){
        return new Promise((resolve, reject) => {
            db.all(querys.getcategory, (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    },
    getcategoryID(id){
        return new Promise((resolve, reject) => {
            db.all(querys.getcategoryID, [id], (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    },
    
    insertcategory(name, id){
        return new Promise((resolve, reject) => {
            db.all(querys.insertcategory, [name, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    updatecategory(id, name){
        return new Promise((resolve, reject) => {
            db.run(querys.updatecategory, [name, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deletecategory(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deletecategory, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },
    
}