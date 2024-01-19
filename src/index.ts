import 'reflect-metadata';

import app from './app';
import mongoose from 'mongoose';

mongoose.set('debug', true);
mongoose.connect('mongodb+srv://danielbusettodb:Rabbit69@cluster0.u58z1in.mongodb.net/Esercitazioni?retryWrites=true&w=majority')
  .then(_ => {
    console.log('Connected to db');
    app.listen(8080, () => {
      console.log('Server listening on port 8080');
    });
  })
  .catch(err => {
    console.error(err);
  })
