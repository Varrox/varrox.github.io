function convert_md_to_html(md)
{
    var header = 0
    var line_start = true

    md = md.trim()

    for(var i = 0; i < md.length; i++)
    {
        if (md[i - 1] != '\\')
        {
            if((md[i] == '\n'))
            {
                if(header > 0)
                {
                    md = md.slice(0, i) + "</h" + header + ">" + md.slice(i + 1)
                    i += 4
                    header = 0
                }
                else if(header == 0)
                {
                    md = md.slice(0, i) + "<br>" + md.slice(i + 1)
                    i += 3
                }
                
                line_start = true
            }
            else if(line_start && !is_whitespace(md[i])) // Line starts
            {
                if(md[i] == '#') // Headers
                {
                    if(md[i + 1] != '#'){ // Header 1
                        header = 1
                    }
                    else if (md[i + 2] != '#'){ // Header 2
                        header = 2
                    }
                    else if (md[i + 3] != '#'){ // Header 3
                        header = 3
                    }
                    else if (md[i + 4] != '#'){ // Header 4
                        header = 4
                    }
                    else if (md[i + 5] != '#'){ // Header 5
                        header = 5
                    }
                    else{ // Header 6
                        header = 6
                    }

                    md = md.slice(0, i) + "<h" + header + ">" + md.slice(i + header)
                    i += 3
                }
                else if(md[i] == '>')
                {
                    var start = "<span class=\"indent\">"
                    var ending = "</span>"

                    md = md.slice(0, i) + start + md.slice(i + 1)
                    i += start.length

                    var end = md.length

                    for(var j = i + 1; j < md.length; j++)
                    {
                        if((md[j] == '\n'))
                        {
                            md = md.slice(0, j) + "<br>" + md.slice(j + 1)
                            end = j + "<br>".length
                            break
                        }
                        else if(md[j] == '>')
                        {
                            md = md.slice(0, j) + ending + md.slice(j + 1)
                            i = j + ending.length
                            j = i

                            md = md.slice(0, j) + start + md.slice(j)
                            j += start.length
                        }
                    }

                    md = md.slice(0, end) + ending + md.slice(end)
                    i = end + ending.length
                }
                else if(md[i] == '`' && md[i + 1] == '`' && md[i + 2] == '`') // Code
                {
                    var language = ""

                    for(var j = i + 3; j < md.length; j++)
                    {
                        if(md[j] == '\n')
                        {
                            language = md.slice(i + 3, j).trim()
                            break
                        }
                    }

                    var s = "<pre class=\"code\" id=\""
                    var e = "\">"

                    md = md.slice(0, i) + s + language + e + md.slice(i + 4 + language.length)

                    i += 4 + e.length + language.length + s.length

                    var end = 0

                    for(var j = i; j < md.length; j++)
                    {
                        if((md[j] == '`' && md[j + 1] == '`' && md[j + 2] == '`') && md[j - 1] != '\\')
                        {
                            end = j
                            break
                        }
                    }

                    e = "</pre>"

                    md = md.slice(0, end) + e + md.slice(end + 4)
                    
                    // To keep next line safe

                    line_start = false

                    i = end + e.length - 1
                }

                line_start = !line_start // So you can deny it
            }
            else if(md[i] == '*')
            {   
                var type = 0 // Italicized by default
                
                if(md[i + 1] == '*') // Bold
                {
                    type = (md[i + 2] != '*') ? 1 : 2 // Is bold itallic
                }

                var start = ["<i>", "<b>", "<b><i>"][type]
                var ending = ["</i>", "</b>", "</i></b>"][type]

                md = md.slice(0, i) + start + md.slice(i + type + 1)
                i += start.length - 1

                var end = md.length

                for(var j = i + type + 1; j < md.length; j++)
                {
                    if(md[j - 1] == '\\')
                    {
                        continue
                    }

                    if(md[j] == '*')
                    {
                        if(type == 0){
                            end = j
                            break
                        }
                        else if(md[j + 1] == '*' && ((type == 1) == (md[j + 2] != '*')))
                        {
                            end = j
                            break
                        }
                    }
                }

                md = md.slice(0, end) + ending + md.slice(end + type + 1)
                i = end + ending.length - 1
            }
            else if(md[i] == '`')
            {
                var s = "<button class=\"codesnip\"><code>"

                md = md.slice(0, i) + s + md.slice(i + 1)
                i += s.length

                var end = 0

                for(var j = i; j < md.length; j++)
                {
                    if((md[j] == '`') && md[j - 1] != '\\')
                    {
                        end = j
                        break
                    }
                }

                var e = "</code></button>"

                md = md.slice(0, end) + e + md.slice(end + 1)
                i = end + e.length
            }
        }
    }

    return md
}

function insert(text, index, inserting_text)
{
    return text.slice(0, index) + inserting_text + text.slice(index);
}

function is_numeric(str)
{
    return /\d/.test(str);
}

function is_whitespace(str)
{
    return /\s/.test(str);
}

const invalid_variable_name_chars = [
    '!', '=', '&', '[', ']', '*', '/', '%', '+', '-', '(', ')', ',', '.', '<', '>', ':'
]

const python_keywords = [
    "import", "def", "from", "func"
]

const ender = "</span>"
const starter = "<span class=\"codetext"

function default_text(text){
    return text.replaceAll('\n', "<br>")
}

function python(text)
{
    var inserts = []

    var nl = true

    for(var i = 0; i < text.length; i++)
    {
        if(text[i == '\n']){
            nl = true
        }
        else if (text[i - 1] != '\\')
        {
            if(text[i] == '#') // Comment
            {
                nl = false
                inserts.push([i, starter + " comment\">"])

                for(var j = i; j < text.length; j++)
                {
                    if(text[j] == '\n')
                    {
                        end = j
                        break
                    }
                }

                inserts.push([end + 1, ender])
                i = end
            }
            else if(text[i] == '"' && text[i + 1] == '"' && text[i + 2] == '"') // Large comment / string
            {
                nl = false
                inserts.push([i, starter + " stringcomment\">"])

                for(var j = i + 2; j < text.length; j++)
                {
                    if(text[j] == '"' && text[j + 1] == '"' && text[j + 2] == '"' && text[j - 1] != '\\')
                    {
                        end = j + 3
                        break
                    }
                }

                inserts.push([end + 1, ender])
                i = end
            }
            else if(text[i] == '"' || text[i] == "'") // String or char
            {
                nl = false
                inserts.push([i, starter + " string\">"])

                for(var j = i + 1; j < text.length; j++)
                {
                    if((text[j] == '"' || text[j] == "'") && !(text[j - 1] == '\\'))
                    {
                        end = j
                        break
                    }
                    else if(text[j] == '\\')
                    {
                        inserts.push([j, starter + " backslash\">"])
                        inserts.push([j + 2, ender])
                    }
                }

                inserts.push([end + 1, ender])
                i = end
            }
            else if(is_numeric(text[i]) && (text[i - 1] == ' ' || invalid_variable_name_chars.indexOf(text[i - 1]) != -1)) // Number
            {
                nl = false
                // Highlight self
                inserts.push([i, starter + " numerical\">"])

                var end = 0

                for(var j = i; j < text.length; j++)
                {
                    // if it is not numeric, or it is not a .

                    if(!is_numeric(text[j]) && text[j] != '.')
                    {
                        end = j
                        break
                    }
                }

                inserts.push([end, ender])

                i = end
            }
            
            if(nl)
            {
                
                var word = ""
                for(var j = 0; j < python_keywords; j++){
                    var sl = text.slice(i, python_keywords[j].length)
                    if(sl == python_keywords[j])
                    {
                        word = python_keywords[j]
                        break;
                    }
                }

                if(word != ""){
                    inserts.push([i, starter + " keyword\">"])
                    inserts.push([i + word.length - 1, ender])
                }
            }
        }

        if(text[i] == '(')
        {
            // Go backwards
            var end = 0
            for(var j = i - 1; j > 0; j--)
            {
                if(invalid_variable_name_chars.indexOf(text[j]) != -1 || is_whitespace(text[j]))
                {
                    end = j + 1
                    break
                }
            }

            if(end != i - 1)
            {
                var func_name = text.slice(end, i)

                inserts.push([end, starter + " func\">"])
                inserts.push([i, ender])

                // Highlight self

                inserts.push([i, starter + " func_parenthases\">"])

                if(text[i + 1] == ')')
                {
                    i++
                }
                
                inserts.push([i + 1, ender])
            }
        }
        else if(text[i] == ')')
        {
            // Highlight self
            inserts.push([i, starter + " func_parenthases\">"])
            inserts.push([i + 1, ender])
        }
        else if(invalid_variable_name_chars.indexOf(text[i]) != -1)
        {
            // Highlight self
            var operator = starter + " operator\">"

            inserts.push([i, operator])

            var end = 0
            for(var j = i + 1; j > 0; j++)
            {
                if(!invalid_variable_name_chars.indexOf(text[j]) != -1)
                {
                    end = j
                    break
                }
            }

            inserts.push([end, ender])
        }
    }

    var offset = 0;

    for(var i = 0; i < inserts.length; i++)
    {
        text = insert(text, inserts[i][0] + offset, inserts[i][1])
        offset += inserts[i][1].length
    }
    
    return text.replaceAll('\n', "<br>")
}

function html(text)
{
    var inserts = []

    for(var i = 0; i < text.length; i++)
    {
        if(text[i] == '<')
        {
            inserts.push([i, starter + " operator\">"])
            inserts.push([i + 1, ender + starter + " keyword\">"])
            
        }
        else if(text[i] == '>')
        {
            inserts.push([i, ender + starter + " operator\">"])
            inserts.push([i + 1, ender])
        }
    }

    var offset = 0;

    for(var i = 0; i < inserts.length; i++)
    {
        text = insert(text, inserts[i][0] + offset, inserts[i][1])
        offset += inserts[i][1].length
    }
    
    return text
}

function bash(text){
    var splits = text.trim().split('\n');

    var inserts = []

    var l = 0;

    for(var i = 0; i < splits.length; i++)
    {
        inserts.push([l, starter + " func\">"]);
        inserts.push([l + splits[i].indexOf(' '), ender]);
        l += splits[i].length + 1;
    }

    var offset = 0;

    for(var i = 0; i < inserts.length; i++)
    {
        text = insert(text, inserts[i][0] + offset, inserts[i][1])
        offset += inserts[i][1].length
    }
    
    return text
}