var express = require('express');
const request = require ('request');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()
let mensaje;

// vista principal
router.get('/', (req, res) => {
  res.render('vista_principal')
} )
router.get('/vista_principal', (req, res) => {
  res.render('vista_principal') 
} )

router.get('/view', (req, res) => {
  res.render('view') 
} )

// mision
router.get('/mision', function(req, res, next) {
  res.render('mision');
});

// vision
router.get('/vision', function(req, res, next) {
  res.render('vision');
});

// proyecciones
router.get('/proyecciones', function(req, res, next) {
  res.render('proyecciones');
});

// logros
router.get('/logros', function(req, res, next) {
  res.render('logros');
});

// blog
router.get('/blog', function(req, res, next) {
  res.render('blog', { mensaje } );
});

// nosotros
router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )

// login
router.get('/login', (req, res) => {
  res.render('login') 
} )

router.post('/login', function(req, res, next) {
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.user && pass == process.env.clave)  {
      res.render('administrar');
  } else {
    
    if (user == process.env.user1 && pass == process.env.clave1)  {
      res.render('administrar1');
  } else {
    res.render('login', { error: 'Datos incorrectos' });
  }

  }
})

//mensaje
router.get('/mensaje', (req, res) =>{
  res.render('mensaje')
})

router.post('/mensaje', function(req, res, next) {
  mensaje = req.body.mensaje
  
  res.render('blog', { mensaje});

})

// administrar
router.get('/administrar', (req, res) =>{
  res.render('administrar')
})

// administrar1
router.get('/administrar1', (req, res) =>{
  res.render('administrar1')
})

//municipios1
router.get('/municipios1', (req, res) => {
  db.getmunicipios()
    .then(data => {        
      console.log(data)
      res.render('municipios1', { municipio: data });
  })
  .catch(err => {
      res.render('municipios1', { municipio: [] });
  })
});

// municipios
router.get('/municipios', (req, res) => {
  db.getmunicipios()
    .then(data => {        
      console.log(data)
      res.render('municipios', { municipio: data });
  })
  .catch(err => {
      res.render('municipios', { municipio: [] });
  })
});

router.get('/insert_municipio', (req, res) => {
  res.render('insert_municipio')
});

router.post('/insert_municipio', (req, res) => {
  const {municipio} = req.body;
  console.log(municipio);
  db.insertmunicipios(municipio)
  .then(() => {
     res.render('insert_municipio')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/edit_municipio/:id', (req, res)=>{
  const id = req.params.id
  db.getmunicipiosID(id)
  .then(data =>{
    console.log(data)
    res.render('edit_municipio', {municipio: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit_municipio', {municipio: []})
    })   
})

router.post('/edit_municipio/', (req, res)=>{
  const {id, municipio} = req.body;
  db.updatemunicipios(id, municipio)
  .then(() =>{
    res.redirect('/municipios');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.get('/delete_municipio/:id', (req, res)=>{
  const id = req.params.id;
  db.deletemunicipios(id)
    .then(() => {
    res.redirect('/municipios');
  })
  .catch(err => {
  console.log(err);
  });
})

//simoncitos1
router.get('/index1', (req, res) => {
  db.getsimoncitos()
    .then(data => {        
      console.log(data)
      res.render('index1', { simoncito: data });
  })
  .catch(err => {
      res.render('index1', { simoncito: [] });
  })
});

// simoncitos
router.get('/index', (req, res) => {
  db.getsimoncitos()
    .then(data => {        
      console.log(data)
      res.render('index', { simoncito: data });
  })
  .catch(err => {
      res.render('index', { simoncito: [] });
  })
});

router.get('/insert', (req, res) => {
  db.getmunicipios()
    .then(data => {        
      console.log(data)
      res.render('insert', { municipio: data });
  })
  .catch(err => {
      res.render('insert', { municipio: [] });
  })
});

router.post('/insert', (req, res) => {
  const {simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id} = req.body;
  console.log(simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id);
  db.insertsimoncitos(simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo, municipio_id)
  .then(() => {
     res.redirect('insert')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/edit/:id', (req, res)=>{
  const id = req.params.id
  db.getsimoncitosID(id)
  .then(data =>{
    console.log(data)
    res.render('edit', {simoncitos: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit', {simoncitos: []})
    })   
})

router.post('/edit/', (req, res)=>{
  const {id, simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo} = req.body;
  db.updatesimoncitos(id, simoncito, codigo, nombre, direccion, referencia, escuela, DEA, director, telefono, correo)
  .then(() =>{
    res.redirect('/index');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  db.deletesimoncitos(id)
    .then(() => {
    res.redirect('/index');
  })
  .catch(err => {
  console.log(err);
  });
})

//nomina1
router.get('/nomina1', (req, res) => {
  db.getnomina()
    .then(data => {        
      console.log(data)
      res.render('nomina1', { nomina: data });
  })
  .catch(err => {
      res.render('nomina1', { nomina: [] });
  })
});

// nomina
router.get('/nomina', (req, res) => {
  db.getnomina()
    .then(data => {        
      console.log(data)
      res.render('nomina', { nomina: data });
  })
  .catch(err => {
      res.render('nomina', { nomina: [] });
  })
});

router.get('/insert_nomina', (req, res) => {
  db.getsimoncitos()
    .then(data => {        
      console.log(data)
      res.render('insert_nomina', { simoncito: data });
  })
  .catch(err => {
      res.render('insert_nomina', { simoncito: [] });
  })
});

router.post('/insert_nomina', (req, res) => {
  const {nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id} = req.body;
  console.log(nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id);
  db.insertnomina(nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria, simoncito_id)
  .then(() => {
     res.redirect('insert_nomina')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/edit_nomina/:id', (req, res)=>{
  const id = req.params.id
  db.getnominaID(id)
  .then(data =>{
    console.log(data)
    res.render('edit_nomina', {nomina: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit_nomina', {nomina: []})
    })   
})

router.post('/edit_nomina/', (req, res)=>{
  const {id, nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria} = req.body;
  db.updatenomina(id, nombre, apellido, cedula, n_niños, cargo, estatus, correo, telefono, cuenta_bancaria)
  .then(() =>{
    res.redirect('/nomina');
  })
  .catch(err =>{
    console.log(err);
  })
});

router.get('/delete_nomina/:id', (req, res)=>{
  const id = req.params.id;
  db.deletenomina(id)
    .then(() => {
    res.redirect('/nomina');
  })
  .catch(err => {
  console.log(err);
  });
})

router.get('/madre/:id', (req, res)=>{
  const id = req.params.id
  db.getnominaID(id)
  .then(data =>{

    db.getsimoncitos()
    .then (simoncito => { 


      
      res.render ('madre', { nomina: data[0], simoncito: simoncito});
    })
    .catch (err => {
      res.render ('madre', { nomina: data[0], simoncito: []});
    })

  })     
  
    .catch(err =>{
      console.log(err);
      res.render('madre', {nomina: []})
    })   
})

router.get('/madre1/:id', (req, res)=>{
  const id = req.params.id
  db.getnominaID(id)
  .then(data =>{

    db.getsimoncitos()
    .then (simoncito => { 


      
      res.render ('madre1', { nomina: data[0], simoncito: simoncito});
    })
    .catch (err => {
      res.render ('madre1', { nomina: data[0], simoncito: []});
    })

  })     
  
    .catch(err =>{
      console.log(err);
      res.render('madre1', {nomina: []})
    })   
})

//matricula1
router.get('/matricula1', (req, res) => {
  db.getmatricula()
    .then(data => {        
      console.log(data)
      res.render('matricula1', { matricula: data });
  })
  .catch(err => {
      res.render('matricula1', { matricula: [] });
  })
});


//matricula
router.get('/matricula', (req, res) => {
  db.getmatricula()
    .then(data => {        
      console.log(data)
      res.render('matricula', { matricula: data });
  })
  .catch(err => {
      res.render('matricula', { matricula: [] });
  })
});

router.get('/insert_matricula', (req, res) => {
  db.getnomina()
    .then(data => {        
      console.log(data)
      res.render('insert_matricula', { nomina: data });
  })
  .catch(err => {
      res.render('insert_matricula', { nomina: [] });
  })
});

router.post('/insert_matricula', (req, res) => {
  const {nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id} = req.body;
  console.log(nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id);
  db.insertmatricula(nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion, nomina_id)
  .then(() => {
     res.redirect('insert_matricula')
  })
  .catch(err => {
    console.log(err);
  })
});

router.get('/edit_matricula/:id', (req, res)=>{
  const id = req.params.id
  db.getmatriculaID(id)
  .then(data =>{
    console.log(data)
    res.render('edit_matricula', {matricula: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit_matricula', {matricula: []})
    })   
})

router.post('/edit_matricula/', (req, res)=>{
  const {id, nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion} = req.body;
  db.updatematricula(id, nombre_niño, apellido_niño, edad, genero, nombre_representante, cedula, parentesco, telefono, direccion)
  .then(() =>{
    res.redirect('/matricula');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.get('/delete_matricula/:id', (req, res)=>{
  const id = req.params.id;
  db.deletematricula(id)
    .then(() => {
    res.redirect('/matricula');
  })
  .catch(err => {
  console.log(err);
  });
})

module.exports = router;