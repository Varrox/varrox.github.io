const birthday = "March 11, 2010"

const boymode = false;

const info = {
    name: !boymode ? "aria" : "alex",
    last_name: "greene",
    birthday: birthday,
    age: get_age(birthday),
    pronouns: !boymode ? "she/her" : "he/him"
}

const experience = {
    "c#" : get_years("December 30, 2023"),
    "c++" : get_years("June 30, 2024"),
    "py" : get_years("August 20, 2024"),
    "webdev" : get_years("June 30, 2024"),
    "gdscript" : get_years("August 20, 2024"),
    "blender" : get_years("December 10, 2021")
}

function apply_info() {
    var names = document.getElementsByClassName("name")
    var name = info.name + " " + info.last_name
    for(var i = 0; i < names.length; i++){
        names[i].innerText = name
    }

    var ages = document.getElementsByClassName("age")
    var age = info.age
    for(var i = 0; i < ages.length; i++){
        ages[i].innerText = age
    }

    var pronounses = document.getElementsByClassName("pronouns")
    var pronouns = info.pronouns
    for(var i = 0; i < pronounses.length; i++){
        pronounses[i].innerText = pronouns
    }

    var experiences = document.getElementsByClassName("exp")
    for(var i = 0; i < experiences.length; i++){
        var a = experience[experiences[i].classList[1]];
        experiences[i].innerText = a + (a > 1 ? " years" : " year");
    }
}