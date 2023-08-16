const typingText = document.querySelector(".typing-text"),
inputField = document.querySelector(".input-field"),
mistakeTag = document.querySelector(".mistake span"),
cpmTag = document.querySelector(".cpm span"),
timeTag = document.querySelector(".time b"),
wpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector(".btn");

let charIndex = 0, mistake = 0, timer, timeLeft = 60, isTimer = false;


function randomParagraph(){
    let randomWord = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    randomWord.split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        // console.log(spanTag)
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
}
randomParagraph();
document.addEventListener("keydown", () => inputField.focus());
typingText.addEventListener("click", () => inputField.focus());

function initTyping(){
    let characters = typingText.querySelectorAll("span");
    let typingValue = inputField.value.split("")[charIndex];

    if(timeLeft > 0 && charIndex < characters.length - 1){
        // console.log("hi")
        // console.log(typingValue)
        if(!isTimer){
            timer = setInterval(initTimer, 1000);
            isTimer = true;
        }

        if(typingValue == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistake--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }else{
            if(characters[charIndex].innerText == typingValue){
                characters[charIndex].classList.add("correct");
            }else{
                mistake++;
                characters[charIndex].classList.add("incorrect");
            }

            charIndex++;
        }

        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round((((charIndex - mistake) / 5) / (60 - timeLeft)) * 60);
        // console.log(wpm)
        wpm = wpm == Infinity || !wpm ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeTag.innerHTML = mistake;
        cpmTag.innerHTML = charIndex - mistake;
    }else{
        clearInterval(timer);
        inputField.value = "";
        alert(`time over`);
    }
    
}


function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerHTML = timeLeft;
    }else{
        clearInterval(timer);
    }
}

tryAgainBtn.addEventListener("click", () => {
    clearInterval(timer);
    inputField.value = "";
    typingText.innerHTML = "";
    randomParagraph();
    mistake = 0;
    charIndex = 0;
    timeLeft = 60;
    isTimer = false;

    mistakeTag.innerHTML = mistake;
    cpmTag.innerHTML = 0;
    wpmTag.innerHTML = 0;
    timeTag.innerHTML = timeLeft;
});

inputField.addEventListener("input", initTyping);