const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello Junction'));
app.listen(5000, () => console.log('server running on 5000'));
