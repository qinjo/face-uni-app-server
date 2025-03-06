import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import faceRoutes from './routes/face.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

// 用户相关路由
app.use('/api/user', userRoutes);

// 路由
app.use('/api/face', faceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;