var express = require('express');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()



router.get('/', (req, res) => {
  res.render('vista1')
} )

router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )

router.get('/login', (req, res) => {
  res.render('login')
} )


router.post('/login', (req,res) =>{
  let user = req.body.user
  let pass = req.body.pass
  if (user == process.env.usuario && pass == process.env.contrasena) {
    res.render('administrar')
  } else {
   res.render('login', { error: 'Datos incorrectos' });
  }
})


router.get('/listado', (req, res) => {
  db.getproducto()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})


router.get('/nombre', (req, res) => {
  db.getproductoNO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})

router.get('/descripcion', (req, res) => {
  db.getproductoDE()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})

router.get('/laboratorio', (req, res) => {
  db.getproductoMO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})

router.get('/categoria', (req, res) => {
  db.getproductoCA()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})

router.get('/cantidad', (req, res) => {
  db.getproductoPO()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('listado', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('listado', { producto: [], imagen: [] });
    });
})





router.get('/cuadricula', (req, res) => {
  db.getproducto()  
    .then(data => {   
      db.getimagen()
      .then (images => { 
        res.render ('cuadricula', { producto: data, imagen: images });
      })
      .catch (err => {
        res.render ('cuadricula', { producto: data, imagen: [] });
      })
    })     
    .catch (err => {
      res.render ('cuadricula', { producto: [], imagen: [] });
    }); 
})



router.get('/producto/:id', (req, res)=>{
  const id = req.params.id
  db.getproductoID(id)
  .then(data =>{
    db.getimagen()
    .then (images => { 
      res.render ('producto', { producto: data[0], imagen: images });
    })
    .catch (err => {
      res.render ('producto', { producto: data[0], imagen: [] });
    })
  })     
  .catch (err => {
    res.render ('producto', { producto: [], imagen: [] });
  });
})

router.get('/filtrado', (req, res) => {
  res.render('filtrado')
} )

router.get('/compra', (req, res) => {
  res.render('compra') 
} )










//productos
router.get('/productos', (req, res) => {
  db.getproducto()
    .then(data => {        
      console.log(data)
      res.render('productos', { producto: data });
  })
  .catch(err => {
      res.render('productos', { producto: [] });
  })

  

});



router.get('/categorias', (req, res) => {
  db.getcategory()
    .then(data => {        
      console.log(data)
      res.render('categorias', { category: data });
  })
  .catch(err => {
      res.render('categorias', { category: [] });
  })

});

router.get('/imagenes', (req, res) => {
  db.getimagen()
    .then(data => {        
      console.log(data)
      res.render('imagenes', { imagen: data });
  })
  .catch(err => {
      res.render('imagenes', { imagen: [] });
  })

});


router.get('/insertcat', (req, res) => {
  res.render('insertcat')
} )

router.get('/insertima', (req, res) => {
  res.render('insertima')
} )

//insertar producto
router.get('/insert_producto', (req, res) => {
  res.render('insert_producto')
} )


router.post('/insert_producto', (req, res) => {
  const {code, name, lab, quantity, description, price, category_id} = req.body;
  console.log(code, name, lab, quantity, description, price, category_id);
  db.insertproducto(code, name,lab,quantity,description,price,category_id)
  .then(() => {
     res.redirect('productos')
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/insertcat', (req, res) => {
  const {name} = req.body;
  console.log(name);
  db.insertcategory(name)
  .then(() => {
     res.redirect('categorias')
  })
  .catch(err => {
    console.log(err);
  })
});

router.post('/insertima', (req, res) => {
  const {url, producto_id, destacado} = req.body;
  console.log(url, producto_id, destacado);
  db.insertimagen(url, producto_id, destacado)
  .then(() => {
     res.redirect('imagenes')
  })
  .catch(err => {
    console.log(err);
  })
});



//editar producto
router.post('/edit_producto/', (req, res)=>{
  const {id, code, name, lab, quantity, description, price, category_id,} = req.body;
  db.updateproducto(id, code, name, lab, quantity, description, price, category_id)
  .then(() =>{
    res.redirect('/productos');
  })
  .catch(err =>{
    console.log(err);

  })
});

router.post('/editcat/', (req, res)=>{
  const {id, name} = req.body;
  db.updatecategory(id, name)
  .then(() =>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.log(err);

  })
});



router.post('/editima/', (req, res)=>{
  const {id, url, producto_id, destacado} = req.body;
  db.updateimagen(id, url, producto_id, destacado)
  .then(() =>{
    res.redirect('/imagenes');
  })
  .catch(err =>{
    console.log(err);

  })
});



router.get('/edit_producto/:id', (req, res)=>{
  const id = req.params.id
  db.getproductoID(id)
  .then(data =>{
    console.log(data)
    res.render('edit_producto', {producto: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('edit_producto', {producto: []})
    }) 


    
})

router.get('/editima/:id', (req, res)=>{
  const id = req.params.id
  db.getimagenID(id)
  .then(data =>{
    console.log(data)
    res.render('editima', {imagen: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editima', {imagen: []})
    }) 


    
})

router.get('/editcat/:id', (req, res)=>{
  const id = req.params.id
  db.getcategoryID(id)
  .then(data =>{
    console.log(data)
    res.render('editcat', {category: data[0]})
  })
    .catch(err =>{
      console.log(err);
      res.render('editcat', {category: []})
    }) 
})

router.get('/delete/:id', (req, res)=>{
  const id = req.params.id;
  db.deleteproducto(id)
    .then(() => {
    res.redirect('/productos');
  })
  .catch(err => {
  console.log(err);
  });
})

router.get('/administrar', (req, res) =>{
  res.render('administrar')
})

router.get('/categorias', (req, res) =>{
  res.render('categorias')
})

router.get('/deletecat/:id', (req, res)=>{
  const id = req.params.id;
  db.deletecategory(id)
    .then(() => {
    res.redirect('/categorias');
  })
  .catch(err => {
  console.log(err);
  });
})

router.get('/deleteima/:id', (req, res)=>{
  const id = req.params.id;
  db.deleteimagen(id)
    .then(() => {
    res.redirect('/imagenes');
  })
  .catch(err => {
  console.log(err);
  });
})




module.exports = router;