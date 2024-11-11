const express = require ('express');
const app = express();
const port = 3000;

// Config EJS as an template engine
app.set('view engine', 'ejs');

// Use static files
app.use(express.static('public'));

// main route
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
