const fps = 8;
const folder = "Assets/3D/Donut/";
const frames = 30;
const repeat = true;
const size_x = 64, size_y = 64;

let images;

async function get_images(){
    const imgs = [];
    let loaded_images = 0;

    for(var i = 0; i <= frames; i++){
        var img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            loaded_images++;
        }

        img.src = folder + '0'.repeat(4 - i.toString().length) + i + ".png";

        
        imgs.push(img);
        promises.push(promise);
    }

    await new Promise((resolve) => {
        const interval = setInterval(() => {
      if (loaded_images == frames) {
        clearInterval(interval);
        resolve();
      }
    }, 100)});

    return imgs;
}

let frame = 0;
let play_id;

const canvas = document.getElementById("donut-ascii");

canvas.width = size_x;
canvas.height = size_y;

const ctx = canvas.getContext("2d");

function set_frame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[frame], 0, 0);

    create_ascii()

    frame++;

    if(frame > frames){
        if(repeat){
            frame %= frames;
        }
        else{
            clearInterval(play_id);
        }
    }
}

const ascii_chars = " .:-=+*#%@█"

function create_ascii() {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255.0;

        const rgbColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        
        
    }
}

async function play_animation(){
    images = await get_images();
	play_id = setInterval(set_frame, (1.0 / fps) * 1000);
}