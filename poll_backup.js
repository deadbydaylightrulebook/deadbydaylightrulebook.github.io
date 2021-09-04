'use strict';

let response_maleKillers = [
    {
        "name": "Michael Myers",
        "vote count": 3
    },
    {
        "name": "Ghostface",
        "vote count": 2
    },
    {
        "name": "Legion (Frank)",
        "vote count": 1
    },
    {
        "name": "The Doctor",
        "vote count": 1
    }
]

let response_maleSurvs = [
    {
        "name": "Leon S. Kennedy",
        "vote count": 3
    },
    {
        "name": "Felix Richter",
        "vote count": 2
    },
    {
        "name": "David King",
        "vote count": 2
    }
]

let response = [
    {
        "question": "Who is the most attractive male killer in Dead By Daylight?",
        "options": response_maleKillers
    },
    {
        "question": "Who is the most attractive male survivor in Dead By Daylight?",
        "options": response_maleSurvs
    }
]

for (let i = 0; i < response.length; i++) {
    let options = create_pollOptions(response[i]["options"])

    $("body").append(`<div class="poll_question">
        ${response[i]["question"]}
    </div>
    
    <div class="poll_options_container">
        ${options}
    </div>
    `)
}

$(".poll_options_container").on("click", "> div", function() {
    //gets the name of the character from the option div you clicked on. Then it sends this name to the backend.

    let name = $(this).attr("data-name")
    console.log(name)
    //to do: instead of logging only the name, log a JS object that looks like
    let send_to_server = {
        "question": "PUT NAME OF QUESTION HERE",
        "vote_cast": "THE OPTION THEY VOTED FOR"
    }
    console.log(send_to_server)

    $(this).addClass("selected_option")
    $(this).parent().addClass("reveal_percentages")
    $(this).parent().off("click")
    //$(this).parent().parent().child(".poll_question").html()
})


function create_pollOptions(option) {
    //takes data and creates html

    let total_votes = 0

    for (let i = 0; i < option.length; i++) {
        //calculating total votes
        total_votes += option[i]["vote count"]
    }
    let options = ""
    for (let i = 0; i < option.length; i++) {
        let percentage = option[i]["vote count"] / total_votes * 100
        percentage = Math.round(percentage)
        option[i]["percentage"] = percentage
        
        //creating divs
        let character_name = option[i]["name"]
        let vote_count = option[i]["vote count"]
        let current_option = 
            `<div data-name="${character_name}" data-vote="${vote_count}">
                <div class="filled_bar" style="width: ${percentage}%"></div>
                <div class="option_text">${character_name} <br> ${vote_count}</div>
            </div>`
        options += current_option
    }
    return options
}


//console.log("total votes:" + total_votes)
console.log(response_maleKillers)
console.log(response_maleSurvs)