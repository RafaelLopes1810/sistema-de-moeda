const vantagens = [
  { nome: "Caneca Personalizada", categoria: "brindes", valor: 50, imagem: "IMG/caneca.png" },
  { nome: "Livro de Programação", categoria: "livros", valor: 120, imagem: "IMG/livro.webp" },
  { nome: "Curso de Inglês Online", categoria: "cursos", valor: 300, imagem: "IMG/curso.jpeg" },
  { nome: "Sorteio de Fone Bluetooth", categoria: "sorteios", valor: 200, imagem: "IMG/fone.webp" },
  { nome: "Camiseta Oficial", categoria: "brindes", valor: 80, imagem: "IMG/camisa.webp" }
];

const lista = document.getElementById("lista-vantagens");
const busca = document.getElementById("busca");
const filtro = document.getElementById("filtro");

function renderizar(listaFiltrada) {
  lista.innerHTML = "";
  listaFiltrada.forEach(v => {
    lista.innerHTML += `
      <div class="card">
        <img src="${v.imagem}" alt="${v.nome}">
        <h3>${v.nome}</h3>
        <p class="valor">${v.valor} moedas</p>
        <p>Categoria: ${v.categoria}</p>
        <button class="btn-resgatar">Resgatar</button>
      </div>
    `;
  });
}

function filtrar() {
  const texto = busca.value.toLowerCase();
  const categoria = filtro.value;
  const resultado = vantagens.filter(v =>
    (categoria === "todos" || v.categoria === categoria) &&
    v.nome.toLowerCase().includes(texto)
  );
  renderizar(resultado);
}

busca.addEventListener("input", filtrar);
filtro.addEventListener("change", filtrar);

renderizar(vantagens);
