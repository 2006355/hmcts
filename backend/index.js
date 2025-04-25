import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import roots from './Roots/taskRoots.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { access } from 'fs';

 
const app = express();
const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.DATABASE_URL || "mongodb+srv://Jon:ROAG9EbbqUP3xpm5@testforcloudform.beyvtfq.mongodb.net/";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const corsOptions = {
origin: `*`, // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});
app.use('/', roots);



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });

