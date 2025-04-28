
const countdownEl = document.getElementById('countdown');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const intervalSelect = document.getElementById('interval-select');
const alertMessage = document.getElementById('alert-message');

let timerInterval;
let remainingTime; // em segundos
let isRunning = false;

// Função para formatar o tempo em MM:SS
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// Função para atualizar o display do contador
function updateCountdownDisplay() {
    countdownEl.textContent = formatTime(remainingTime);
}

// Função para esconder o alerta
function hideAlert() {
    alertMessage.classList.remove('show');
}

// Função para mostrar o alerta
function showAlert() {
    alertMessage.classList.add('show');
}

// Função para iniciar o timer
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    hideAlert();

    timerInterval = setInterval(() => {
      remainingTime--;
      updateCountdownDisplay();

      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        isRunning = false;
        alert("Hidrate-se e beba sua água!");
      }
      
    }, 1000);
}

// Função para pausar o timer
function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

// Função para resetar o timer
function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    const selectedMinutes = parseInt(intervalSelect.value);
    remainingTime = selectedMinutes * 60;
    updateCountdownDisplay();
    hideAlert();
}

// Evento: alterar intervalo no select
intervalSelect.addEventListener('change', resetTimer);

// Eventos dos botões
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// Inicializa o contador na primeira vez
resetTimer();