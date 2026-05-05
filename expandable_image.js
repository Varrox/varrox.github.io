const elements = document.getElementsByClassName("expandable-image");

let is_open = false

function apply_image_expand(){
    for(let i = 0; i < elements.length; i++){
        elements[i].addEventListener("click", function(){open_image_full(elements[i])})
    }
}

function open_image_full(img){
    if(is_open) return;
    is_open = true;
    
    let btn = document.createElement("button");
    btn.classList.add("expandable-button-image")
    
    let sep_img = document.createElement("img");
    sep_img.src = img.src;

    btn.appendChild(sep_img)

    let background = document.createElement("button");
    background.classList.add("expandable-button-background");

    background.onclick = function(){
        background.remove();
        is_open = false;
    }

    document.body.appendChild(background);

    background.appendChild(btn)
}