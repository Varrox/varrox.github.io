const animation_info = {
    folder : "Assets/3D/Donut/",
    frames : 30,
    fps : 8,
    repeat : true,
    size_x : 32,
    size_y : 32
}

let images;
let frame = 0;
let play_id;

const canvas = document.getElementById("donut-ascii-canvas");
const text_display = document.getElementById("donut-ascii");

canvas.width = animation_info.size_x;
canvas.height = animation_info.size_y;

const ctx = canvas.getContext("2d");

const ascii_chars = ".:-=+*#%@";

async function get_images(){
    const promises = [];

    for(let i = 0; i <= animation_info.frames; i++){
        const img = new Image();
        img.crossOrigin = "anonymous";

        const p = new Promise((resolve) => {
            img.onload = () => resolve(img);
            img.onerror = () => {
                console.error("Failed to load:", img.src);
                resolve(null);
            };
        });

        img.src = animation_info.folder + '0'.repeat(4 - i.toString().length) + i + ".png";

        promises.push(p);
    }

    const loadedImgs = await Promise.all(promises);

    console.log("loaded images")
    return loadedImgs;
}

function set_frame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[frame], 0, 0);

    create_ascii()

    frame++;

    if(frame > animation_info.frames){
        if(animation_info.repeat){
            frame %= animation_info.frames;
        }
        else{
            clearInterval(play_id);
        }
    }
}

function create_ascii() {
    const img_data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = img_data.data;

    const s = "<span style=\"color:";
    const se = ";\">";
    const e = "</span>";

    let ascii_text = "";

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3] / 255.0;
        const magnitude = Math.sqrt(r * r + g * g + b * b) / 255.0;
        const rgb = `rgb(${r}, ${g}, ${b})`;
        const cs = (ascii_chars.length - 1);

        var lightness = Math.min(Math.max(Math.floor(magnitude * cs), 0), cs);
        ascii_text += a > 0 ? (s + rgb + se + ascii_chars.substring(lightness, lightness + 1) + e) : " ";

        if((i / 4) % canvas.width == 0){
            ascii_text += "<br>";
        }
    }
    text_display.innerHTML = ascii_text;
}

async function play_animation(){
    images = await get_images();
	play_id = setInterval(set_frame, (1.0 / animation_info.fps) * 1000);
}