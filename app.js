const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
// const Routes = require('./rutas');

const app = express();
const port = process.env.PORT || 3000;

// bd en mysql
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'node',
  port: 3306,
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión a MySQL:', err);
  } else {
    console.log('Conectado a MySQL');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(Routes);

// Rutas CRUD para las entradas
  app.get('/entradas', (req, res) => {
    db.query('SELECT * FROM entradas', (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
      } else {
        res.status(200).json(results);
      }
    });
  });

  app.get('/entradas/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM entradas WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
      } else {
        if (results.length === 0) {
          res.status(404).json({ error: 'Error' });
        } else {
          res.status(200).json(results[0]);
        }
      }
    });
  });
  
  app.put('/entradas/:id', (req, res) => {
    const id = req.params.id;
    const { producto, cantidad, fecha } = req.body;
    db.query('UPDATE entradas SET producto = ?, cantidad = ?, fecha = ? WHERE id = ?', [producto, cantidad, fecha, id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar' });
      } else {
        res.status(200).json({ message: 'Se actualizo correctamente' });
      }
    });
  });
  
  app.delete('/entradas/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM entradas WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la entrada' });
      } else {
        res.status(200).json({ message: 'Entrada eliminada correctamente' });
      }
    });
  });

  app.post('/entradas', (req, res) => {
    const { producto, cantidad, fecha } = req.body;
    db.query('INSERT INTO entradas (producto, cantidad, fecha) VALUES (?, ?, ?)', [producto, cantidad, fecha], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error' });
      } else {
        res.status(201).json({ message: 'Se agrego correctamente' });
      }
    });
    });

    // Rutas CRUD para las salidas
    app.get('/salidas', (req, res) => {
        db.query('SELECT * FROM salidas', (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener' });
            } else {
            res.status(200).json(results);
            }
        });
        }
    );

    app.get('/salidas/:id', (req, res) => {
        const id = req.params.id;
        db.query('SELECT * FROM salidas WHERE id = ?', [id], (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al obtener' });
            } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'No se encontro' });
            } else {
                res.status(200).json(results[0]);
            }
            }
        });
        }
    );

    app.put('/salidas/:id', (req, res) => {
        const id = req.params.id;
        const { producto, cantidad, fecha } = req.body;
        db.query('UPDATE salidas SET producto = ?, cantidad = ?, fecha = ? WHERE id = ?', [producto, cantidad, fecha, id], (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
            } else {
            res.status(200).json({ message: 'Salida actualizada correctamente' });
            }
        });
        }
    );

    app.delete('/salidas/:id', (req, res) => {
        const id = req.params.id;
        db.query('DELETE FROM salidas WHERE id = ?', [id], (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar' });
            } else {
            res.status(200).json({ message: 'Se elimino correctamente' });
            }
        });
        }
    );

    app.post('/salidas', (req, res) => {
        const { producto, cantidad, fecha } = req.body;
        db.query('INSERT INTO salidas (producto, cantidad, fecha) VALUES (?, ?, ?)', [producto, cantidad, fecha], (err, results) => {
            if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error' });
            } else {
            res.status(201).json({ message: 'Se creo correctamente' });
            }
        });
        }
    );


    //ejecutar sp
    

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});