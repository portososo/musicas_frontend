const API = "https://musicasbackend-six.vercel.app";

const listaMusicas = document.getElementById("listaMusicas");

async function carregarMusicas() {
    listaMusicas.innerHTML = "<p>Carregando...</p>";

    try {
        const resposta = await fetch(`${API}/`);
        const musicas = await resposta.json();

        listaMusicas.innerHTML = "";

        if (musicas.length === 0) {
            listaMusicas.innerHTML = "<p>Nenhuma música cadastrada.</p>";
            return;
        }

        for (const musica of musicas) {
            const card = document.createElement("article");
            card.className = "musica";
            card.innerHTML = `
                <h2>${musica.titulo}</h2>
                <p class="artista">${musica.artista}</p>
                <p class="detalhes">${musica.genero} | ${musica.ano} | ${musica.duracao} min</p>
                <div class="acoes">
                    <a class="editar" href="editar.html?id=${musica.id}">Editar</a>
                    <button class="apagar">Apagar</button>
                </div>
            `;

            card.querySelector(".apagar").addEventListener("click", () => apagarMusica(musica.id));

            listaMusicas.appendChild(card);
        }
    } catch (erro) {
        console.error(erro);
        listaMusicas.innerHTML = "<p>Erro ao carregar as músicas.</p>";
    }
}

async function apagarMusica(id) {
    if (!confirm("Tem certeza que quer apagar esta música?")) return;

    const resposta = await fetch(`${API}/${id}`, { method: "DELETE" });

    if (!resposta.ok) {
        alert("Erro ao apagar a música.");
        return;
    }

    carregarMusicas();
}

carregarMusicas();