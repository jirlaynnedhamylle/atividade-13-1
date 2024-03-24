const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

// Dados simulados de livros
const livros = [
    { id: 1, titulo: "O Segredo", autor: "Rhonda Byrne", ano: 2006 },
    {
        id: 2,
        titulo: "Um Conto de Duas Cidades",
        autor: "Charles Dickens",
        ano: 1859,
    },
    // Adicionando mais livros
    { id: 3, titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", ano: 1997 },
    { id: 4, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", ano: 1954 },
    { id: 5, titulo: "O Não Segredo", autor: "Rhonda Byrne", ano: 2006 },
    { id: 6, titulo: "Dom Quixote", autor: "Miguel de Cervantes", ano: 1605 },
    { id: 7, titulo: "As Crônicas de Nárnia", autor: "C.S. Lewis", ano: 1950 },
    { id: 8, titulo: "Harry Potter", autor: "J.K. Rowling", ano: 1997 },
    { id: 9, titulo: "Cem Anos de Solidão", autor: "Gabriel García Márquez", ano: 1967 },
    { id: 10, titulo: "1984", autor: "George Orwell", ano: 1949 }
];

// Rota principal
app.get("/", (req, res) => {
    // Renderiza a página inicial com todos os livros
    res.render("index", { resultados: livros });
});

// Rota para buscar livros por título
app.get("/buscar", (req, res) => {
    const tituloBusca = req.query.titulo ? req.query.titulo.toLowerCase() : '';
    const anoBusca = req.query.ano ? parseInt(req.query.ano) : 0;

    let resultados = livros;

    if (tituloBusca && !anoBusca) {
        resultados = livros.filter((livro) => livro.titulo.toLowerCase().includes(tituloBusca));
    } else if (!tituloBusca && anoBusca) {
        resultados = livros.filter((livro) => livro.ano === anoBusca);
    } else if (tituloBusca && anoBusca) {
        resultados = livros.filter((livro) => livro.titulo.toLowerCase().includes(tituloBusca) && livro.ano === anoBusca);
    }

    res.render("index", { resultados, titulo: req.query.titulo, ano: req.query.ano });
});

// Rota para limpar a busca
app.get("/limpar", (req, res) => {
    res.redirect("/");
});

// Configuração do EJS como motor de visualização
app.set("view engine", "ejs");

// Middleware para lidar com dados de formulário
app.use(express.urlencoded({ extended: true }));

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
