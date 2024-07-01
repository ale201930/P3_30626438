const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite', (err) =>{
    if(err) console.log(err);
    db.run('CREATE TABLE IF NOT EXISTS simoncito (id INTEGER PRIMARY KEY AUTOINCREMENT, simoncito TEXT, codigo TEXT, nombre TEXT, direccion TEXT, referencia TEXT, escuela TEXT, DEA TEXT, director TEXT, telefono TEXT, correo TEXT, municipio_id INTEGER, FOREIGN KEY(municipio_id) REFERENCES municipio(id))');
    db.run('CREATE TABLE IF NOT EXISTS municipio (id INTEGER PRIMARY KEY AUTOINCREMENT, municipio TEXT)');

    db.run('CREATE TABLE IF NOT EXISTS nomina (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, apellido TEXT, cedula TEXT, n_niños INTEGER, cargo TEXT, estatus TEXT, correo TEXT, telefono TEXT, cuenta_bancaria TEXT, simoncito_id INTEGER, FOREIGN KEY(simoncito_id) REFERENCES simoncito(id))');

    db.run('CREATE TABLE IF NOT EXISTS matricula (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre_niño TEXT, apellido_niño TEXT, edad INTEGER, genero TEXT, nombre_representante TEXT, cedula TEXT, parentesco TEXT, telefono TEXT, direccion TEXT, nomina_id INTEGER, FOREIGN KEY(nomina_id) REFERENCES nomina(id))');
console.log('base de datos creada')
});
module.exports = db; 