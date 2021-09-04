'use strict';
/*
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
        "id": 1,
        "question": "Who is the most attractive male killer in Dead By Daylight?",
        "options": response_maleKillers
    },
    {
        "id": 2,
        "question": "Who is the most attractive male survivor in Dead By Daylight?",
        "options": response_maleSurvs
    }
]*/

$.getJSON( "https://young-brushlands-41877.herokuapp.com/return_questions/", function( data ) {
    
    render_page(data["response"])
})

function render_page(response) {
    $("body").html(``)

    for (let i = 0; i < response.length; i++) {
        console.log(response[i])
        let options = create_pollOptions(response[i]["options"])

        $("body").append(`
        <div class= "entire_poll_container">
            <div class="poll_question" data-question_id="${response[i]["id"]}">
                ${response[i]["question"]}
            </div>

            <div class="poll_options_container">
                ${options}
            </div>
        </div>
        `)
    }

    $(".poll_options_container").on("click", "> div", function() {
        //gets the name of the character from the option div you clicked on. Then it sends this name to the backend.

        let name = $(this).attr("data-name")
        let id = $(this).parent().parent().children(".poll_question").attr("data-question_id")
        console.log(name)
        //to do: instead of logging only the name, log a JS object that looks like
        let vote_object = {
            "question_id": id,
            "vote_cast": name
        }
        console.log(vote_object) 
        cast_vote(vote_object)

        $(this).addClass("selected_option")
        $(this).parent().addClass("reveal_percentages")
        $(this).parent().off("click")
        
    })

}

function cast_vote(vote_object) {
    $.ajax({
        url: 'https://young-brushlands-41877.herokuapp.com/cast_vote/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(vote_object),
        dataType: 'text',
        success: function(result) {
            console.log(result.Result)
        }
    })
}

function create_pollOptions(option) {
    //takes data and creates html

    let total_votes = 0

    for (let i = 0; i < option.length; i++) {
        //calculating total votes
        total_votes += option[i]["vote_count"]
    }
    let options = ""
    for (let i = 0; i < option.length; i++) {
        let percentage = option[i]["vote_count"] / total_votes * 100
        percentage = Math.round(percentage)
        option[i]["percentage"] = percentage
        
        //creating divs
        let character_name = option[i]["name"]
        let vote_count = option[i]["vote_count"]
        let current_option = 
            `<div data-name="${character_name}" data-vote="${vote_count}">
                <div class="filled_bar" style="width: ${percentage}%"></div>
                <div class="option_text">${character_name} <br> ${vote_count}</div>
            </div>`
        options += current_option
    }
    return options
}
