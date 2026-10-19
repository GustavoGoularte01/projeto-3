
const botaoIniciar = document.getElementById("iniciar");
const alvo = document.getElementById("alvo");
const areaJogo = document.getElementById("area-jogo");

const elementoTempo = document.getElementById("tempo");
const elementoPontuacao = document.getElementById("pontuacao");

let tempo = 10;
let pontuacao = 0;
let intervalo;

function moverAlvo() {
    const larguraArea = areaJogo.clientWidth;
    const alturaArea = areaJogo.clientHeight;

    const larguraAlvo = alvo.offsetWidth;
    const alturaAlvo = alvo.offsetHeight;

    const x = Math.random() * (larguraArea - larguraAlvo);
    const y = Math.random() * (alturaArea - alturaAlvo);

    alvo.style.left = x + "px";
    alvo.style.top = y + "px";
}

function finalizarJogo() {
    clearInterval(intervalo);

    alvo.hidden = true;
    botaoIniciar.disabled = false;

    alert("Fim de jogo! Pontuação final: " + pontuacao);
}

function iniciarJogo() {
    tempo = 10;
    pontuacao = 0;

    elementoTempo.textContent = tempo;
    elementoPontuacao.textContent = pontuacao;

    botaoIniciar.disabled = true;
    alvo.hidden = false;

    moverAlvo();

    intervalo = setInterval(function() {
        tempo--;

        elementoTempo.textContent = tempo;

        if (tempo <= 0) {
            finalizarJogo();
        }
    }, 1000);
}

alvo.addEventListener("click", function() {
    if (alvo.hidden || tempo <= 0) {
        return;
    }

    pontuacao++;

    elementoPontuacao.textContent = pontuacao;

    moverAlvo();
});

botaoIniciar.addEventListener("click", iniciarJogo);
