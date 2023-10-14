import express from 'express';
import TranslationRoute from '../src/routes/translateRoute';
const app = express();
app.use(express.json());

//Route
app.use('/api', TranslationRoute);
app.listen(5000, () => {
  console.log('Server Running on PORT 5000');
});
