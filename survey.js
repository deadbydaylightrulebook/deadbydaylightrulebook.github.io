'use strict';

document.getElementById("submit_survey").onclick = survey_result

function survey_result() {
console.log("test")
    let response = ""
    let pc_box = document.getElementById("PC")
    let console_box = document.getElementById("console")
    let mobile_box = document.getElementById("mobile")
    let show_results = true
    let survey_box = document.getElementById("survey_box")


    if (pc_box.checked && mobile_box.checked && console_box.checked) {
        response = "If you want to be part of the superior PC master race, stick to PC."
    }
    else if (pc_box.checked && console_box.checked) {
        response = "Traitor."
    }
    else if (pc_box.checked && mobile_box.checked) {
        response = "Almost as bad as PC and console combo."
    }
    else if (console_box.checked && mobile_box.checked) {
        response = "Double inferiority."
    }
    else if (pc_box.checked) {
        response = "PC master race unite."
    }
    else if (console_box.checked) {
        response = "Uninstall."
    }
    else if (mobile_box.checked) {
        response = "You are irrelevant."
    }
    else {
        show_results = false
    }
    
    if (show_results) {
        survey_box.innerHTML = response
    }
    else {
        document.getElementById("no_option_selected").innerHTML = "<br> Please select an option."
    }
}
