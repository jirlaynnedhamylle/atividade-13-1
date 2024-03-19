const express = require('express');
const app = express();
const PORT = 3000;

// Dados simulados de livros
const livros = [
    { id: 1, titulo: 'O Segredo', autor: 'Rhonda Byrne', ano: 2006 },
    { id: 2, titulo: 'Um Conto de Duas Cidades', autor: 'Charles Dickens', ano: 1859 },
   
];

// Rota principal
app.get('/', (req, res) => {
    // Inicialize resultados como um array vazio
    let resultados = [];
    
    res.render('index', { resultados });
});

// Rota para buscar livros
app.get('/buscar', (req, res) => {
    let resultados = livros;

    // Verificar se a busca é por título
    if (req.query.tipoBusca === 'titulo' && req.query.titulo) {
        const termoBusca = req.query.titulo.toLowerCase();
        resultados = resultados.filter(livro => livro.titulo.toLowerCase().includes(termoBusca));
    }

    res.render('index', { resultados });
});


app.get('/buscar/ano', (req, res) => {
    const anoBusca = parseInt(req.query.ano);
    const resultados = livros.filter(livro => livro.ano === anoBusca);
    res.render('index', { resultados });
});


// Configuração do EJS como motor de visualização
app.set('view engine', 'ejs');

// Middleware para lidar com dados de formulário
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});