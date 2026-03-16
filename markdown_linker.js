const mds = {
    "simplesound" : {lnk: "https://raw.githubusercontent.com/Varrox/simplesound/main/README.md", link:"https://github.com/Varrox/simplesound/", img: ""},
    "quick-add-menu" : {lnk: "https://raw.githubusercontent.com/Varrox/Quick-Add-Menu/main/README.md", link:"https://github.com/Varrox/Quick-Add-Menu/", img: ""},
    "ascii-renderer" : {lnk: "https://raw.githubusercontent.com/Varrox/ASCII-Renderer/main/README.md", link:"https://github.com/Varrox/ASCII-Renderer/", img: ""}
}

async function apply_md()
{
    const elements = document.getElementsByClassName("md")
    for(var i = 0; i < elements.length; i++){
        await change_to_md(elements[i]);
    }
}

async function change_to_md(element){
    let linkKey = ""
    let classes = element.classList;
    for(var i = 0; i < classes.length; i++){
        if(classes[i] != "md" && Object.keys(mds).includes(classes[i])){
            linkKey = classes[i]
            break;
        }
    }

    if (!linkKey) return;

    try {
        const response = await fetch(mds[linkKey].lnk);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${linkKey}: ${response.status}`);
        }

        const markdownText = await response.text();

        element.innerHTML = convert_md_to_html(markdownText);
		
		add_link(element, mds[linkKey].link);
        remove_afterhead(element);
    } catch (error) {
        console.error("Fetch error:", error);
        element.innerHTML = "<em>Failed to load content.</em>";
    }
}

function add_link(element, link){
	for(var i = 0; i < element.childNodes.length; i++){
		let header = element.childNodes[i];
		if(!header.tagName){
			continue;
		}
		let tag = header.tagName.toLowerCase();
		if(tag.startsWith('h') && tag.length === 2 && !isNaN(tag[1])){
			let a = document.createElement("a");
			a.href = link;
			a.target = "_blank";
			a.classList.add("md-header");

			header.parentNode.insertBefore(a, header);
			a.appendChild(header);

			break;
		}
	}
}

function remove_afterhead(element){
    var c = 0;
	for(var i = 0; i < element.innerHTML.length; i++){
		var header = element.innerHTML.substr(i, '<h1>'.length) == '<h1>';
        
        if (header) {
            c++;
            if (c > 1){
                element.innerHTML = element.innerHTML.substr(0, i - 1);
                break;
            }
            
        }
	}
}