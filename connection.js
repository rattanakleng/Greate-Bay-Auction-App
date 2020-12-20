const mysql = require("mysql");
const inquirer = require("inquirer");

// Create the connection information for the sql database
let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "MySql@&2014",
    database: "greateBay_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    //run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user which action the should take

function start() {
    inquirer.prompt(
        {
            name: "postOrBid",
            type: "list",
            message: "Would you like to [POST] and aution or [BID] on an auction?",
            choices: ["POST", "BID", "EXIT"]
        })
        //based on their answer, either call the bid or the post functions
        .then(function (answer) {
            if (answer.postOrBid === "POST") {
                postAuction();
            } else if (answer.postOrBid === "BID") {
                bidAuction();
            } else {
                connection.end()
            };
        });
};

function postAuction() {
    inquirer.prompt([
        {
            message: "What item would you like to place your auction in?",
            name: "itemType",
            type: "list",
            choices: ["laptop", "bike"]
        },
        {
            message: "What category would yo like to place your auction in?",
            name: "itemCategory",
            type: "list",
            choices: ["sport", "technology"]
        },
        {
            message: "What would you like your starting bid to be?",
            name: "startPrice",
            type: "input"
        }]
    )
        .then(function (response) {
            console.log("Your aution was crated successfully!")
            console.log("Inserting a new auction...\n");

        var query = connection.query(
        "INSERT INTO auctions SET ?",
        {
            item_name: response.itemType,
            category: response.itemCategory,
            starting_bid: response.startPrice
        },
        function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " product inserted!\n");
            // Call updateProduct AFTER the INSERT completes
            start();
        }
    )
        })
}

// function bidAuction() {
//     inquirer.prompt([
//         {
//             message: "What item would you like to bid?",
//             name: "itemType",
//             type: "list",
//             choices: ["laptop", "bike"] //convert to dynamic
//         },
//         {
//             message: "How much would you like to bid?",
//             name: "bidPrice",
//             type: "input"
//         }]
//     )
//         .then(function (response) {

//             if (respond.bidPrice < /)
//             console.log("Your aution was crated successfully!")
//         })
// }


// function insertAuction() {
//     console.log("Inserting a new auction...\n");
//     var query = connection.query(
//         "INSERT INTO auctions SET ?",
//         {
//             item_name: response.itemType,
//             category: response.itemCategory,
//             starting_bid: response.startPrice
//         },
//         function (err, res) {
//             if (err) throw err;
//             console.log(res.affectedRows + " product inserted!\n");
//             // Call updateProduct AFTER the INSERT completes
//             start();
//         }
//     )
// };
