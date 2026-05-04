const all_blogs = "Blogs/all_blogs.json"
const all_blogs_div = document.getElementById("blogs");

async function load_blogs(){
    const response = await fetch(all_blogs);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${all_blogs}: ${response.status}`);
    }

    return await response.json();
}

async function load_file(file) {
    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${all_blogs}: ${response.status}`);
    }

    const text = await response.text();

    return text;
}

async function add_blogs() {
    const json = await load_blogs();

    for(let i = 0; i < json["blogs"].length; i++){
        await add_blog(json["blogs"][i], all_blogs_div);
    }
}

async function add_blog(blog, parent_element) {
    const file_text = await load_file(blog["file"]);
    const date = blog["date"];

    let date_text = document.createElement("em");
    date_text.classList.add("date");

    let date_obj = new Date(date);

    date_text.innerText = `Posted : ${date_obj.toDateString()}`;

    let panel = document.createElement("div");
    panel.classList.add("panel");

    panel.appendChild(date_text)

    panel.innerHTML += file_text;

    if(parent_element != null){
        parent_element.appendChild(panel);
    }
}

async function add_newest_blog(element) {
    const json = await load_blogs();

    await add_blog(json["blogs"][0], element)
}