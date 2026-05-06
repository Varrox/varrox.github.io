const blogs_container = document.getElementById("blogs");

const blogs = [
    { file : "Blogs/Files/ascii-renderer-cpp.html", date : "2026-5-6"},
    { file : "Blogs/Files/hello.html", date : "2026-5-3" }
]

async function add_blogs() {
    if(blogs_container == null) return;
    for(let i = 0; i < blogs.length; i++){
        await add_blog(blogs[i], blogs_container);
        if(i != blogs.length - 1){
            blogs_container.appendChild(document.createElement("hr"))
        }
    }
}

async function add_newest_blog(parent_element) {
    await add_blog(blogs[0], parent_element)
}

async function load_file(file) {
    const response = await fetch(file);

    if (!response.ok) {
        throw new Error(`Failed to fetch ${file}: ${response.status}`);
    }

    const text = await response.text();

    return text;
}

async function add_blog(blog, parent_element) {
    const file_text = await load_file(blog.file);
    const date = blog.date;

    let date_text = document.createElement("em");
    date_text.classList.add("date");

    date_text.innerText = `Posted : ${(new Date(date)).toDateString()}`;

    let panel = document.createElement("div");
    panel.classList.add("panel");

    panel.appendChild(date_text)

    panel.innerHTML += file_text;

    if(parent_element != null){
        parent_element.appendChild(panel);
    }
}