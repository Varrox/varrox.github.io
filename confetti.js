const PARTICLE_COUNT = 8;
const CONFETTI_BUTTONS = document.getElementsByClassName("confetti");
const COLORS = ['#f00', '#0f0', '#00f', 'rgba(255, 255, 0, 1)', 'rgba(210, 55, 210, 1)', 'rgba(74, 223, 249, 1)'];
const CONFETTI_SFX = "Assets/SFX/confetti-pop-sound.mp3"

function apply_confetti(){
    for(var i = 0; i < CONFETTI_BUTTONS.length; i++){
        let button = CONFETTI_BUTTONS[i];
        button.addEventListener("click", function(){spawn_confetti(button);});
    }
}

function spawn_confetti(element){
    const audio = new Audio(CONFETTI_SFX);
    audio.play();

    const BACKGROUND = document.getElementsByClassName("background")[0]
    for (let i = 0; i < PARTICLE_COUNT; i++) 
    {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti_particle');
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
        var rect = element.getBoundingClientRect();
        confetti.style.left = rect.right + (Math.random() * 2 - 2) * 170 + 'px';
        confetti.style.top = rect.top + (Math.random()) * 110 + 'px';

        BACKGROUND.appendChild(confetti);

        setTimeout(() => { confetti.remove(); }, 2000)
    }
}