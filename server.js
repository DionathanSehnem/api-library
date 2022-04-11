import app from './src/app.js';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    let date = new Date();
    console.log(`${date.getHours()}:${date.getMinutes()} - Server listening in http://localhost:${port}`)
})