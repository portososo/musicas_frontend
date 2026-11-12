const API = "https://musicasbackend-six.vercel.app";

const botaoCadastrar = document.getElementById("botaoCadastrar");

botaoCadastrar.addEventListener("click", async () => {
    const musica = {
        titulo: document.getElementById("titulo").value.trim(),
        artista: document.getElementById("artista").value.trim(),
        genero: document.getElementById("genero").value.trim(),
        ano: Number(document.getElementById("ano").value),
        duracao: Number(document.getElementById("duracao").value),
    };

    if (!musica.titulo || !musica.artista) {
        alert("Preencha pelo menos título e artista.");
        return;
    }

    const resposta = await fetch(`${API}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(musica),
    });

    if (!resposta.ok) {
        alert("Erro ao cadastrar a música.");
        return;
    }

    window.location.href = "index.html";
});