import express from 'express';
import cors from 'cors';
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import roots from './Roots/taskRoots.js';
import dotenv from 'dotenv';
import { connectDB} from './config/db.js';
import mongoose from 'mongoose';
import { access } from 'fs';

 
const app = express();
const __dirname = path.resolve();
dotenv.config();
const PORT = process.env.PORT || 5000;


const corsOptions = {
origin: `*`, // Allow all origins (not recommended for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});
app.use('/', roots);
app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
  
    connectDB()
        .then(() => {
            console.log('MongoDB connected successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
    console.log(`Server is running on port ${PORT}`);
    });
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('MongoDB connection closed');
        process.exit(0);
    });
}
);
