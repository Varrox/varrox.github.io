window.onload = function(){main()}

async function main() {
    apply_links();
	
    add_ascii(star_01, "star_01");
    add_ascii(star_02, "star_02");
	add_ascii(star_03, "star_03");

    apply_info();
    apply_shake();
    apply_confetti();
    
    await apply_md();

    setup_code_areas();
	play_animation();

	add_blogs();

	const newest_blog = document.getElementById("newest-blog");
	add_newest_blog(newest_blog);
}

let code_snips = {}

function setup_code_areas() 
{
	var code_sections = document.getElementsByClassName("code")

	for (var i = 0; i < code_sections.length; i++) {
		code_snips[i] = code_sections[i].textContent

		switch(code_sections[i].id) // Apply code color coating
		{
			case "py":
				code_sections[i].innerHTML = python(code_sections[i].innerHTML)
				break
			case "cs":
				code_sections[i].innerHTML = python(code_sections[i].innerHTML)
				break
			case "gdscript":
				code_sections[i].innerHTML = python(code_sections[i].innerHTML)
				break
			case "html":
				code_sections[i].innerHTML = html(code_sections[i].innerHTML)
				break
            case "bash":
                code_sections[i].innerHTML = bash(code_sections[i].innerHTML)
                break
            case "sh":
                code_sections[i].innerHTML = bash(code_sections[i].innerHTML)
                break
			case "":
				code_sections[i].innerHTML = default_text(code_sections[i].innerHTML)
				break
		}
        
		code_sections[i].innerHTML = "<button class=\"copy\" onclick=\"copyToClipboard(code_snips[" + i + "]);\">Copy</button>" + code_sections[i].innerHTML
	}

	var code_parts = document.getElementsByClassName("codesnip")

	for(var i = 0; i < code_parts.length; i++)
	{
		code_parts[i].setAttribute("onclick", "copyToClipboard(\"" + code_parts[i].textContent + "\")")
	}
}

async function copyToClipboard(textToCopy) 
{
	if (textToCopy == undefined) {
		return;
	}

	try {
		navigator.clipboard.writeText(textToCopy);
		console.log('Text copied to clipboard');
	} catch (err) {
		console.error('Failed to copy text: ', err);
	}
}