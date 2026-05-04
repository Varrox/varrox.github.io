const animation_info = {
    folder : "Assets/3D/Donut/",
    frames : 30,
    fps : 8,
    repeat : true,
    size_x : 32,
    size_y : 32
}

let ascii_images;
let frame = 0;
let play_id;

const canvas = document.getElementById("donut-ascii-canvas");
const text_display = document.getElementById("donut-ascii");

if(canvas != null){
    canvas.width = animation_info.size_x;
    canvas.height = animation_info.size_y;
}

const ctx = canvas != null ? canvas.getContext("2d") : null;

const ascii_chars = "@@@@@#%";

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
    text_display.innerHTML = ascii_images[frame];

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

async function create_ascii_frames(){
    let images = await get_images();
    ascii_images = [];
    for(var i = 0; i < images.length; i++){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[i], 0, 0);

        ascii_images.push(create_ascii())
    }
}

function create_ascii() {
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const s = "<span style=\"color:";
    const se = ";\">";
    const e = "</span>";

    let ascii_text = "";

    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const magnitude = Math.sqrt(r * r + g * g + b * b) / 255.0;
        const cs = (ascii_chars.length - 1);

        const lightness = Math.min(Math.max(Math.floor(magnitude * cs), 0), cs);
        ascii_text += (data[i + 3]) > 0 ? `${s}rgb(${r}, ${g}, ${b})${se}${ascii_chars.charAt(lightness)}${e}` : " ";

        if(((i / 4) + 1) % canvas.width == 0){
            ascii_text += "<br>";
        }
    }
    return ascii_text;
}

async function play_animation(){
    if(canvas == null) return;

    await create_ascii_frames();
    canvas.remove();

	play_id = setInterval(set_frame, (1.0 / animation_info.fps) * 1000);
}