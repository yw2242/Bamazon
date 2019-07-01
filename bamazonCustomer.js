var mysql = require("mysql");
require('dotenv').config();
var inquirer = require("inquirer");
var columnify = require('columnify');
var maintable=[];
// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  listOfProducts();
});


function listOfProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        // console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        maintable.push(res[i]);
      }
      var columns = columnify(maintable, {
        columnSplitter: ' | '
        
      })
      console.log(columns);

      console.log("----------------------------------------------------");
    });
  }