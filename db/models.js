
const db = require('./connection');

let querys = {
    getsimoncitos: 'SELECT * FROM simoncito',
    getsimoncitosID: 'SELECT * FROM simoncito WHERE id = ?',
    insertsimoncitos: 'INSERT INTO simoncito (simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updatesimoncitos: 'UPDATE simoncito SET simoncito = ?, codigo = ?, nombre = ?, direccion = ?, referencia = ?, escuela = ?, DEA = ?, director = ?, telefono = ?, correo = ? WHERE id = ?',
    deletesimoncitos: 'DELETE FROM simoncito WHERE id = ?',
    getproductoMU: 'SELECT * FROM producto WHERE municipio_id = ?',


    getmunicipios: 'SELECT * FROM municipio',
    getmunicipiosID: 'SELECT * FROM municipio WHERE id = ?',
    insertmunicipios: 'INSERT INTO municipio (municipio) VALUES(?)',
    updatemunicipios: 'UPDATE municipio SET municipio = ? WHERE id = ?',
    deletemunicipios: 'DELETE FROM municipio WHERE id = ?',

    getnomina: 'SELECT * FROM nomina',
    getnominaID: 'SELECT * FROM nomina WHERE id = ?',
    insertnomina: 'INSERT INTO nomina (nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updatenomina: 'UPDATE nomina SET nombre = ?, apellido = ?, cedula = ?, n_niños = ?, cargo = ?, estatus = ?, correo = ?, telefono = ?, cuenta_bancaria = ? WHERE id = ?',
    deletenomina: 'DELETE FROM nomina WHERE id = ?',

    getmatricula: 'SELECT * FROM matricula',
    getmatriculaID: 'SELECT * FROM matricula WHERE id = ?',
    insertmatricula: 'INSERT INTO matricula (nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updatematricula: 'UPDATE matricula SET nombre_niño = ?, apellido_niño = ?, edad = ?, genero = ?, nombre_representante = ?, cedula = ?, parentesco = ?, telefono = ?, direccion = ? WHERE id = ?',
    deletematricula: 'DELETE FROM matricula WHERE id = ?',




    getproducto: 'SELECT * FROM producto',
    getproductoID: 'SELECT * FROM producto WHERE id = ?',
    getproductoNO: 'SELECT * FROM producto ORDER BY name DESC',
    getproductoDE: 'SELECT * FROM producto ORDER BY description DESC',
    getproductoCA: 'SELECT * FROM producto ORDER BY category_id DESC',
    getproductoMO: 'SELECT * FROM producto ORDER BY model DESC',
    getproductoPO: 'SELECT * FROM producto ORDER BY power DESC',
    getproductoPU: 'SELECT * FROM producto JOIN promedio ON producto.id = promedio.producto_id ORDER BY promedio DESC',
    getimagenID: 'SELECT * FROM imagen WHERE id = ?',
    insertproducto: 'INSERT INTO producto (code, name, power, model, description, price, category_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
    getimagen: 'SELECT * FROM imagen',
    getpromedio: 'SELECT * FROM promedio',
    getcategory: 'SELECT * FROM category',
    getcategoryID: 'SELECT * FROM category WHERE id = ?',
    insertimagen: 'INSERT INTO imagen (url, producto_id, destacado) VALUES(?, ?, ?)',
    insertcategory: 'INSERT INTO category(name) VALUES(?)',
    updateproducto: 'UPDATE producto SET code = ?, name = ?, power = ?, model = ?, description = ?, price = ?, category_id = ? WHERE id = ?',
    updateimagen: 'UPDATE imagen SET url = ?, producto_id = ?, destacado = ? WHERE id = ?',
    updatecategory: 'UPDATE category SET name = ? WHERE id = ?',
    deleteproducto: 'DELETE FROM producto WHERE id = ?',
    deleteimagen: 'DELETE FROM imagen WHERE id = ?',
    deletecategory: 'DELETE FROM category WHERE id = ?',
    insertclient: 'INSERT INTO client (email, pass) VALUES(?, ?)',
    getclient: 'SELECT * FROM client',
    getcompra: 'SELECT * FROM compra',
    insertcompra: 'INSERT INTO compra (cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente) VALUES(?, ?, ?, ?, ?, ?)',
    insertpuntaje: 'INSERT INTO calificaciones (qualification, producto_id) VALUES(?, ?)'
    
}
module.exports = {

    // simoncitos

    getsimoncitos(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getsimoncitos, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertsimoncitos(simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertsimoncitos, [simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getsimoncitosID(id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getsimoncitosID, [id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    getsimoncitosMU(municipio_id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getsimoncitosMU, [municipio_id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    updatesimoncitos(id, simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo){
        return new Promise((resolve, reject) => {
            db.run(querys.updatesimoncitos, [simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deletesimoncitos(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deletesimoncitos, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    // municipios 

    getmunicipios(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getmunicipios, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertmunicipios(municipio){
        return new Promise((resolve, reject) => {
            db.run(querys.insertmunicipios, [municipio], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getmunicipiosID(id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getmunicipiosID, [id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    updatemunicipios(id, municipio){
        return new Promise((resolve, reject) => {
            db.run(querys.updatemunicipios, [municipio, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deletemunicipios(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deletemunicipios, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    // nomina

    getnomina(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getnomina, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertnomina(nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id ){
        return new Promise((resolve, reject) => {
            db.run(querys.insertnomina, [nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id ], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getnominaID(id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getnominaID, [id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    updatenomina(id, nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria){
        return new Promise((resolve, reject) => {
            db.run(querys.updatenomina, [nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deletenomina(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deletenomina, [id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    // matricula

    getmatricula(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getmatricula, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertmatricula(nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertmatricula, [nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getmatriculaID(id){
        return new Promise((resolve, reject)=>{
            db.all(querys.getmatriculaID, [id], (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    updatematricula(id, nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion){
        return new Promise((resolve, reject) => {
            db.run(querys.updatematricula, [nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, id], (err) => {
                if(err) reject(err);
                resolve();
            })
        })
    },

    deletematricula(id){
        return new Promise((resolve, reject) => {
            db.run(querys.deletematricula, [id], (err) => {
                if(err) reject(err);
                resolve();
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

    insertpuntaje(qualification, producto_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertpuntaje, [qualification, producto_id], (err) => {
                if(err) reject(err);
                    resolve()
            })
        })
    
    },

    getpromedio(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getpromedio, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
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

    getproducto(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproducto, (err,rows)=>{
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

    getproductoPU(){
        return new Promise((resolve, reject)=>{
            db.all(querys.getproductoPU, (err,rows)=>{
                if(err) reject(err);
                resolve(rows);
            })
        })
    },

    insertproducto(code, name, power, model, description, price, category_id){
        return new Promise((resolve, reject) => {
            db.run(querys.insertproducto, [code, name, power, model, description, price, category_id], (err) => {
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

    updateproducto(id, code, name, power, model, description, price, category_id){
        return new Promise((resolve, reject) => {
            db.run(querys.updateproducto, [code, name, power, model, description, price, category_id, id], (err) => {
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