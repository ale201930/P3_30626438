var express = require('express');
var router = express.Router();
const db = require('../db/models');
require('dotenv').config()
const IP = require ('ip');
const { body, validationResult } = require('express-validator');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cards = require('../config/cards');
const database = require('../config/database');
const request = require ('request');
const nodemailer = require('nodemailer');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
};

router.get('/sesion', (req, res) => {
  res.render('sesion')
} )

router.post('/sesion', (req, res) => {
  const email = req.body.email; 
  const pass = req.body.pass;
  const bd = require('../db/connection');
  bd.get('SELECT * FROM client WHERE email = ? AND pass = ?', [email, pass], (err, row) => {
    if (err) {
      console.error(err);
      // Manejar el error
    } else {
      if (row) {
        // Los datos son iguales, redirigir a otra vista
        res.redirect('/puntaje');
      } else {
        // Los datos no son iguales, manejar según sea necesario
        res.redirect('/client');
      }
    }
  });
});


router.get('/puntaje', (req, res)=>{
  db.getproducto()
  .then(data => {        
    console.log(data)
    res.render('puntaje', { producto: data });
})
.catch(err => {
    res.render('puntaje', { producto: [] });
})
})

router.post('/puntaje', (req, res) => {
  const {producto_id, puntos} = req.body;
  if (puntos >= 6 || puntos <= 0) {
    db.getproducto()
    .then(data => {        
      console.log(data)
      res.render('puntaje', { producto: data });
  })
  .catch(err => {
      res.render('puntaje', { producto: [] });
  })
  } else {
    db.insertpuntaje(puntos, producto_id)
    .then(() => {
       res.redirect('puntuado')
    })
    .catch(err => {
      console.log(err);
    })
  }
});

router.get('/puntuado', (req, res) => {
 
  res.render('puntuado')

})





router.get('/', (req, res) => {
  res.render('vista1')
} )

router.get('/nosotros', (req, res) => {
  res.render('nosotros')
} )

router.get('/login', (req, res) => {
  res.render('login')
} )

router.get('/client', (req, res) => {
  res.render('client')
} )

router.get('/tabclient', (req, res) => {
  db.getclient()
    .then(data => {        
      console.log(data)
      res.render('tabclient', { client: data });
  })
  .catch(err => {
      res.render('tabclient', { client: [] });
  })

});

router.get('/tabcompra', (req, res) => {
  db.getcompra()
    .then(data => {        
      console.log(data)
      res.render('tabcompra', { compra: data });
  })
  .catch(err => {
      res.render('tabcompra', { compra: [] });
  })
});

router.post('/client', (req, res) => {

  const captcha = req.body['g-recaptcha-response'];
  const secretKey = process.env.SecretKey;
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;
  const {email, pass} = req.body;
  db.insertclient(email, pass)
  .then(() => {
     res.redirect('client')
  })
  .catch(err => {
    console.log(err);
  })

  const transporter = nodemailer.createTransport({
    host: process.env.hostemail,
    port: 465,
    secure: true,
    auth: {
        user: process.env.useremail,
        pass: process.env.passemail
    }
  });

  const mailOptions = {
    from: process.env.useremail,
    //Lista de correos 
    to: [email],
    subject: 'Task 4: Additional features ',
    text: "Bienvenido, se ha registrado exitosamente en Vitality.com"
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }});


});



router.get('/begin', (req, res) => {
  res.render('begin')
} )

router.post('/begin', (req, res) => {
  const email = req.body.email; 
  const pass = req.body.pass;
  const bd = require('../db/connection');
  bd.get('SELECT * FROM client WHERE email = ? AND pass = ?', [email, pass], (err, row) => {
    if (err) {
      console.error(err);
      // Manejar el error
    } else {
      if (row) {
        // Los datos son iguales, redirigir a otra vista
        res.redirect('/compra');
      } else {
        // Los datos no son iguales, manejar según sea necesario
        res.redirect('/client');
      }
    }
  });
});

router.get('/compra', (req, res) => {
  db.getproducto()
  .then(data =>{
    db.getclient()
    .then (cliente => { 
      res.render ('compra', { producto: data, client: cliente });
    })
    .catch (err => {
      res.render ('compra', { producto: data, client: cliente  });
    })
  })     
  .catch (err => {
    res.render ('compra', { producto: [], client: [] });
  });
} )

router.post('/compra', function(req, res, next) {
  let date = new Date();
  let Datetime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  let fecha = Datetime;
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const ip_cliente = ip.split(",")[0];
  const cliente_id = req.body.cliente_id
  const producto_id = req.body.producto_id
  const cantidad = req.body.cantidad
  const bd = require('../db/connection');
  let sql = `SELECT price FROM producto WHERE id = ?`;
  let SQL = `SELECT email FROM client WHERE id = ?`;
  let precio;
 let email;

 bd.get(SQL, [cliente_id], (err, row) => {
   if (err) {
     console.error(err.message);
   }
   email = row.email;
 });

  bd.get(sql, [producto_id], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    precio = row.price;
    console.log(`El precio del producto ${producto_id} es: ${precio}`);
   
    let total_pagado = precio * cantidad;
    console.log(`El resultado de la multiplicación es: ${total_pagado}`);

    db.insertcompra(cliente_id, producto_id, cantidad, total_pagado, fecha, ip_cliente)
    .then(() => {
       res.redirect('payments')
    })
    .catch(err => {
      console.log(err);
    })

    const transporter = nodemailer.createTransport({
      host: process.env.hostemail,
      port: 465,
      secure: true,
      auth: {
          user: process.env.useremail,
          pass: process.env.passemail
      }
    });
    const mailOptions = {
      from: process.env.useremail,
      //Lista de correos 
      to: [email],
      subject: 'Task 4: Additional features ',
      text: "Felicidades, ha completado una compra exitosamente en Vitality.com"
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          console.log(error);
      } else {
          console.log('Correo electrónico enviado: ' + info.response);
      }});


  });

})



router.get('/recuperativo', (req, res) => {
 
  res.render('recuperativo')

})

router.post('/recuperativo', (req, res) => {
  const email = req.body.email; 
  const transporter = nodemailer.createTransport({
    host: process.env.hostemail,
    port: 465,
    secure: true,
    auth: {
        user: process.env.useremail,
        pass: process.env.passemail
    }
  });
  const mailOptions = {
    from: process.env.useremail,
    //Lista de correos 
    to: [email],
    subject: 'Task 4: Additional features ',
    text: "Ingrese en el siguiente link para recuperar su contraseña: https://vitality-4qk4-8bhu.onrender.com/client"
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Correo electrónico enviado: ' + info.response);
    }});

    res.redirect('/sesion');
});





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

        db.getpuntaje()
        .then (promedio => { 

          res.render ('listado', { producto: data, imagen: images, promedio: promedio });
        })
        .catch (err => {
          res.render ('listado', { producto: data, imagen: [], promedio: [] });
        })

      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
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

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
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

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
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

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
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

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
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

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
    })

  })    

  .catch (err => {
    res.render ('listado', { producto: [], imagen: [] });
  });
})

router.get('/promedio', (req, res) => {
  db.getproductoPU()  
  .then(data => { 

    db.getimagen()
    .then (images => { 

      db.getpuntaje()
      .then (promedio => { 

        res.render ('listado', { producto: data, imagen: images, promedio: promedio });
      })
      .catch (err => {
        res.render ('listado', { producto: data, imagen: [], promedio: [] });
      })

    })
    .catch (err => {
      res.render ('listado', { producto: data, imagen: [], promedio: [] });
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
  const producto_id = id
  const bd = require('../db/connection');
  let promedio

  bd.get('SELECT SUM(puntos) AS total, COUNT(puntos) AS num_elementos FROM calificacion WHERE producto_id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
    }
    
    const total = row.total;
    const num_elementos = row.num_elementos;
    
    promedio = total / num_elementos;
    
    // Guardar el promedio en otra tabla
    bd.run('INSERT OR REPLACE INTO puntaje (id, promedio, producto_id) VALUES (?, ?, ?)', [id, promedio, producto_id], (err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Promedio guardado en otra_tabla');
    });
  });

  db.getproductoID(id)
  .then(data =>{
    db.getimagen()
    .then (images => { 
      res.render ('producto', { producto: data[0], imagen: images, promedio: promedio });
    })
    .catch (err => {
      res.render ('producto', { producto: data[0], imagen: [], promedio: promedio });
    })
  })     
  .catch (err => {
    res.render ('producto', { producto: [], imagen: [], promedio: promedio });
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
  db.getcategory()
  .then(data => {
    console.log (data)
    res.render('insert_producto', {category: data});
  })
  .catch(err => {
    res.render('insert_producto', {category: []});
  })
});


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

router.get('/payments', (req, res) => {
  res.render('payments') 
})

router.post('/',
    authenticateToken,
    body('full-name').notEmpty(),
    body('card-number').notEmpty().isCreditCard(),
    body('expiration-month').isLength({ min: 1, max: 2 }),
    body('expiration-year').isLength({ min: 4, max: 4 }),
    body('cvv').isLength({ min: 3, max: 4 }),
    body('amount').notEmpty(),
    body('currency').isLength({ min: 3, max: 3 }),
    body('description').notEmpty(),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const card_number = req.body['card-number'];
        const full_name = req.body['full-name'];

        if (!cards.cardExists(card_number)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid card number',
                code: '001',
            });
        }

        if (full_name == 'REJECTED') {
            return res.status(400).json({
                success: false,
                message: 'Card rejected',
                code: '002',
            });
        }

        if (full_name == 'ERROR') {
            return res.status(400).json({
                success: false,
                message: 'Card error',
                code: '003',
            });
        }

        if (full_name == 'INSUFFICIENT') {
            return res.status(400).json({
                success: false,
                message: 'Insufficient funds',
                code: '004',
            });
        }

        const data = {
            transaction_id: uuidv4(),
            amount: req.body['amount'],
            currency: req.body['currency'],
            description: req.body['description'],
            reference: req.body['reference'] ?? null,
            date: new Date().toISOString(),
        }

        await database.insert(data);

        return res.redirect('/payments/' + data.transaction_id);
    });

    router.get('/cards', function (req, res) {
      res.json(cards.getList());
  });


  router.get('/api-key', function (req, res) {
    const payload = {
        name: 'John Doe',
        date: new Date().toISOString(),
    };

    const apiKey = jwt.sign(payload, process.env.JWT_KEY);
    res.json({ apiKey });
});

router.get('/:id', async function (req, res) {
  const id = req.params.id;
  const transaction = await database.select(id);

  if (!transaction) {
      return res.status(404).json({
          success: false,
          message: 'Transaction not found',
          code: '005',
      });
  }

  return res.status(200).json({
      success: true,
      message: 'Payment successful',
      data: transaction,
  });
});




module.exports = router;