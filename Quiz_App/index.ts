#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// data for quiz 
let apiLink = "https://opentdb.com/api.php?amount=5&category=22&difficulty=easy&type=multiple";

// fetching quiz data
async function fetchdata(data: string) {
    let fetchQuiz: any = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};

let data = await fetchdata(apiLink);

// quiz function
let startQuiz = async () => {
    let score: number = 0;
    // user name prompt
    let user = await inquirer.prompt([
        {
            name: "Name",
            type: "input",
            message: `${chalk.red.bold("Enter your Name: ")}`
        }
    ]);

    for (let i = 0; i < 5; i++) {
        let answer = [...data[i].incorrect_answers, data[i].correct_answer];

        let question = await inquirer.prompt([
            {
                name: "quiz",
                type: "list",
                message: data[i].question,
                choices: answer.map((val: any)=> val),
            }
        ]);

        if (question.quiz == data[i].correct_answer) {
            score++;
        } else {
            console.log(`the correct answer was ${data[i].correct_answer}`)
        }
    };

    console.log(chalk.blue(`Your final score is ${chalk.green(score)}`));
}

startQuiz();