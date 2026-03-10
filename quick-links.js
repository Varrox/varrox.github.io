

const links = {
    "godot" : "https://godotengine.org",
    "youtube" : "https://youtube.com/@Varrox",
    "github" : "https://github.com/varrox",
    "bluesky" : "https://bsky.app/profile/varrox.bsky.social",
    "Non-Existence" : "https://realbucketofchicken.github.io/nonexistance/",
    "femtanyl" : "https://soundcloud.com/femtanyl",
    "tyler-the-creator" : "https://soundcloud.com/tylerthecreatorofficial",
    "golemm" : "https://soundcloud.com/golemm/",
    "email" : "mailto:info@example.com?subject=Inquiry&body=Hello, I would like to know more about..."
}

const class_name = "quicklink"

function apply_links()
{
    var elements = document.getElementsByClassName(class_name)
    for(var i = 0; i < elements.length; i++){
        change_to_link(elements[i])
        i--
    }
}

function change_to_link(element){
    var link = ""
    var classes = element.classList;
    for(var i = 0; i < classes.length; i++){
        if(classes[i] != class_name && Object.keys(links).includes(classes[i])){
            link = classes[i]
            break;
        }
    }
    
    var a = document.createElement("a")
    a.href = links[link]
    a.target = "_blank"
    a.innerText = element.innerText
    element.replaceWith(a)
}