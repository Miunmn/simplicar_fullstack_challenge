import express from 'express';
import userRoute from './backend/routes/userRoute.js';
import taskRoute from './backend/routes/taskRoute.js';

// import taskRoute from 
const app = express();
app.use(express.json())

app.use(userRoute);
app.use(taskRoute);

export default app;