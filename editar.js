const API = "https://musicasbackend-six.vercel.app";

const id = new URLSearchParams(window.location.search).get("id");

const campoTitulo = document.getElementById("titulo");
const campoArtista = document.getElementById("artista");
const campoGenero = document.getElementById("genero");
const campoAno = document.getElementById("ano");
const campoDuracao = document.getElementById("duracao");
const botaoSalvar = document.getElementById("botaoSalvar");

async function carregarMusica() {
    if (!id) {
        alert("Nenhuma música selecionada.");
        window.location.href = "index.html";
        return;
    }

    const resposta = await fetch(`${API}/${id}`);

    if (!resposta.ok) {
        alert("Música não encontrada.");
        window.location.href = "index.html";
        return;
    }

    const musica = await resposta.json();

    campoTitulo.value = musica.titulo;
    campoArtista.value = musica.artista;
    campoGenero.value = musica.genero;
    campoAno.value = musica.ano;
    campoDuracao.value = musica.duracao;
}

botaoSalvar.addEventListener("click", async () => {
    const musica = {
        titulo: campoTitulo.value.trim(),
        artista: campoArtista.value.trim(),
        genero: campoGenero.value.trim(),
        ano: Number(campoAno.value),
        duracao: Number(campoDuracao.value),
    };

    if (!musica.titulo || !musica.artista) {
        alert("Preencha pelo menos título e artista.");
        return;
    }

    const resposta = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musica),
    });

    if (!resposta.ok) {
        alert("Erro ao salvar as alterações.");
        return;
    }

    window.location.href = "index.html";
});

carregarMusica();