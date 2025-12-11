require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb');
const cloudinaryConfig = require('./config/cloudinary');

const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');

const app = express();

cloudinaryConfig();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/health', (req, res) => res.json({ ok: true, message: 'healthy' }));

app.get('/', (req, res) => res.send('API working'));

// export for Vercel and tests
module.exports = app;

// listen locally only
if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log('Local server running on port', port));
}
