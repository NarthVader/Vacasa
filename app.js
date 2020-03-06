// Import express modules
var express = require('express');
var request = require('request');

// Instantiates Express and assigns app variable to it
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Listen to specified ngrok port (default=80)

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
// Start server
// index page
app.get('/', function(req, res) {
  request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = objects(JSON.parse(body).order);
          res.render('pages/index', {
                  dummy: dummy
            });
    })

});

app.get('/awaitingReverse', function(req, res) {
  request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment&sort=order_placed_date',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = objects(JSON.parse(body).order);
          res.render('pages/awaitingReverse', {
                  dummy: dummy
            });
    })

});

//Handler for GET requests from Vacasa exercise
app.get('/awaiting', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = objects(JSON.parse(body).order);
          res.send(dummy);
    })
});

app.get('/awaitingOverdue', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueObjects(JSON.parse(body).order);
          res.render('pages/awaitingOverdue', {
                            dummy: dummy
                      });
    })
});

app.get('/dropshipOverdue', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueObjects(JSON.parse(body).order);
          res.render('pages/dropshipOverdue', {
                            dummy: dummy
                      });
    })
});

app.get('/awaitingOverdueSortAsc', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueAsc(JSON.parse(body).order);
          res.render('pages/awaitingOverdueSortAsc', {
                            dummy: dummy
                      });
    })
});

app.get('/dropshipOverdueSortAsc', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueAsc(JSON.parse(body).order);
          res.render('pages/dropshipOverdueSortAsc', {
                            dummy: dummy
                      });
    })
});

app.get('/awaitingOverdueSortDsc', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueDsc(JSON.parse(body).order);
          res.render('pages/awaitingOverdueSortDsc', {
                            dummy: dummy
                      });
    })
});

app.get('/dropshipOverdueSortDsc', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueDsc(JSON.parse(body).order);
          res.render('pages/dropshipOverdueSortDsc', {
                            dummy: dummy
                      });
    })
});

app.get('/awaitingOverdueReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment&sort=order_placed_date',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueObjects(JSON.parse(body).order);
          res.render('pages/awaitingOverdueReverse', {
                            dummy: dummy
                      });
    })
});

app.get('/dropshipOverdueReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested&sort=order_placed_date',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = overdueObjects(JSON.parse(body).order);
          res.render('pages/dropshipOverdueReverse', {
                            dummy: dummy
                      });
    })
});

app.get('/awaitingStarfish', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment&tag=STARFISH',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = starfish(JSON.parse(body).order);
           res.render('pages/awaitingStarfish', {
                            dummy: dummy
                      });
    })
});

app.get('/awaitingStarfishReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment&tag=STARFISH&sort=order_placed_date',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = starfish(JSON.parse(body).order);
           res.render('pages/awaitingStarfishReverse', {
                            dummy: dummy
                      });
    })
});

app.get('/dropshipStarfish', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
          method: 'GET',
          url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested&tag=STARFISH',
          headers: {
            'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
          }}, function (error, response, body) {
          var dummy = starfish(JSON.parse(body).order);
          res.send(dummy);
    })
});

app.get('/dropship', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = objects(JSON.parse(body).order);
                   res.render('pages/dropship', {
                           dummy: dummy
                     });
       })

});

app.get('/awaitingDue', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = sortByDueAsc(JSON.parse(body).order);
                   res.render('pages/index', {
                           dummy: dummy
                     });
       })
});

app.get('/dropshipDue', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = sortByDueAsc(JSON.parse(body).order);
                   res.render('pages/dropship', {
                           dummy: dummy
                     });
       })
});

app.get('/dropshipDueReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = sortByDueDsc(JSON.parse(body).order);
                   res.render('pages/dropshipDueReverse', {
                           dummy: dummy
                     });
       })
});

app.get('/awaitingDueReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=awaiting_fulfillment',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = sortByDueDsc(JSON.parse(body).order);
                   res.render('pages/awaitingDueReverse', {
                           dummy: dummy
                     });
       })
});

app.get('/dropshipReverse', function(req, res) {
    var params = req.query.q;
    //var retVal = paramsHandler(params);
    request({
         method: 'GET',
         url: 'https://apiverson.ordoro.com/order?limit=1000&status=dropshipment_requested&sort=order_placed_date',
         headers: {
           'Authorization': 'Basic ZGF2aWRAdGhlZmluY2hmYXJtLmNvbTpUdXJ0bGUyMDE3IQ=='
         }}, function (error, response, body) {
            var dummy = objects(JSON.parse(body).order);
                   res.render('pages/dropshipReverse', {
                           dummy: dummy
                     });
       })

});

function starfish(json) {
    var arr = json;
    returnJSON = [];
    for(var i = 0; i < arr.length; i++) {
        objectJSON = {};
        var obj = arr[i];
        var d = new Date(obj.order_placed_date.substr(0, 10));
        objectJSON.order = obj.order_number;
        objectJSON.date = addDays(d,1).toString().substr(0, 15);
        objectJSON.tag = "STARFISH";
        returnJSON.push(objectJSON);
    }
    return returnJSON;
}

function sortByDueAsc(json) {
        var arr = json;
        var retVal = {};
        returnJSON = [];
        for (var i = 0; i < arr.length; i++){
            objectJSON = {};
            var obj = arr[i];
            var d = new Date(obj.order_placed_date.substr(0, 10));
            if("none"!=reconvert(tagParse(obj.tags))) {


                var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
                var now = Date.now()
                var overdue = "";
                if(due<now) {
                    overdue="OVERDUE"
                };
                objectJSON.order = obj.order_number;
                objectJSON.placed = addDays(d,1).toString().substr(0, 15);
                var dateObj = new Date(addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15));
                objectJSON.due = dateObj.valueOf();
                objectJSON.overdue = overdue;
                returnJSON.push(objectJSON);
            }
        }
        returnJSON.sort(function(obj1, obj2) {
            return obj1.due - obj2.due;
        });
        for(var x = 0; x < returnJSON.length; x++) {
            var z = returnJSON[x].due
            returnJSON[x].due = addDays(z,0).toString().substr(0, 15);
        }
        return returnJSON;
}

function sortByDueDsc(json) {
        var arr = json;
        var retVal = {};
        returnJSON = [];
        for (var i = 0; i < arr.length; i++){
            objectJSON = {};
            var obj = arr[i];
            var d = new Date(obj.order_placed_date.substr(0, 10));
            if("none"!=reconvert(tagParse(obj.tags))) {


                var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
                var now = Date.now()
                var overdue = "";
                if(due<now) {
                    overdue="OVERDUE"
                };
                objectJSON.order = obj.order_number;
                objectJSON.placed = addDays(d,1).toString().substr(0, 15);
                var dateObj = new Date(addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15));
                objectJSON.due = dateObj.valueOf();
                objectJSON.overdue = overdue;
                returnJSON.push(objectJSON);
            }
        }
        returnJSON.sort(function(obj1, obj2) {
            return obj2.due - obj1.due;
        });
        for(var x = 0; x < returnJSON.length; x++) {
            var z = returnJSON[x].due
            returnJSON[x].due = addDays(z,0).toString().substr(0, 15);
        }
        return returnJSON;
}

function objects(object) {
    var count = 0;
    var count2=0;
    var arr = object;
    var retVal = {};
    returnJSON = [];
    for (var i = 0; i < arr.length; i++){
        objectJSON = {};
        var obj = arr[i];
        var d = new Date(obj.order_placed_date.substr(0, 10));
        if("none"!=reconvert(tagParse(obj.tags))) {
            count++;
            //var d = new Date(obj.order_placed_date.substr(0, 10));
            var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
            var now = Date.now()
            var overdue = "";
            if(due<now) {
                overdue="OVERDUE"
            };
            objectJSON.order = obj.order_number;
            objectJSON.placed = addDays(d,1).toString().substr(0, 15);
            objectJSON.due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15);
            objectJSON.overdue = overdue;
            returnJSON.push(objectJSON);
        } else if(tagParse(obj.tags)=="STARFISH") {
            count++;
            objectJSON.order = obj.order_number;
            objectJSON.placed = addDays(d,1).toString().substr(0, 15);
            objectJSON.due = "STARFISH";
            objectJSON.overdue = "";
            returnJSON.push(objectJSON);
        }
    }
    return returnJSON;
};

function overdueObjects(object) {
    var count = 0;
    var count2=0;
    var count3=0;
    var arr = object;
    var retVal = {};
    returnJSON = [];
    for (var i = 0; i < arr.length; i++){
        objectJSON = {};
        var obj = arr[i];
        if("none"!=reconvert(tagParse(obj.tags))) {
            count++;
            var d = new Date(obj.order_placed_date.substr(0, 10));
            var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
            var now = Date.now()
            var overdue = "";
            if(due<now) {
            count2++;
                overdue="OVERDUE"
                objectJSON.order = obj.order_number;
                            objectJSON.placed = addDays(d,1).toString().substr(0, 15);
                            objectJSON.due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15);
                            objectJSON.overdue = overdue;
                            returnJSON.push(objectJSON);
            };

        } else if(tagParse(obj.tags)=="STARFISH") {
            count3++;
        }
    }
    return returnJSON;
};

function overdueAsc(object) {
    var count = 0;
    var count2=0;
    var count3=0;
    var arr = object;
    var retVal = {};
    returnJSON = [];
    for (var i = 0; i < arr.length; i++){
        objectJSON = {};
        var obj = arr[i];
        if("none"!=reconvert(tagParse(obj.tags))) {
            count++;
            var d = new Date(obj.order_placed_date.substr(0, 10));
            var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
            var now = Date.now()
            var overdue = "";
            if(due<now) {
            count2++;
                overdue="OVERDUE"
                objectJSON.order = obj.order_number;
                            objectJSON.placed = addDays(d,1).toString().substr(0, 15);
                            var dateObj = new Date(addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15));
                                            objectJSON.due = dateObj.valueOf();
                            //objectJSON.due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15);
                            objectJSON.overdue = overdue;
                            returnJSON.push(objectJSON);
            };

        } else if(tagParse(obj.tags)=="STARFISH") {
            count3++;
        }
    }
     returnJSON.sort(function(obj1, obj2) {
                return obj1.due - obj2.due;
            });
            for(var x = 0; x < returnJSON.length; x++) {
                var z = returnJSON[x].due
                returnJSON[x].due = addDays(z,0).toString().substr(0, 15);
            }
            return returnJSON;
};

function overdueDsc(object) {
    var count = 0;
    var count2=0;
    var count3=0;
    var arr = object;
    var retVal = {};
    returnJSON = [];
    for (var i = 0; i < arr.length; i++){
        objectJSON = {};
        var obj = arr[i];
        if("none"!=reconvert(tagParse(obj.tags))) {
            count++;
            var d = new Date(obj.order_placed_date.substr(0, 10));
            var due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).valueOf();
            var now = Date.now()
            var overdue = "";
            if(due<now) {
            count2++;
                overdue="OVERDUE"
                objectJSON.order = obj.order_number;
                            objectJSON.placed = addDays(d,1).toString().substr(0, 15);
                            var dateObj = new Date(addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15));
                                            objectJSON.due = dateObj.valueOf();
                            //objectJSON.due = addDays(obj.order_placed_date.substr(0, 10),reconvert(tagParse(obj.tags))).toString().substr(0, 15);
                            objectJSON.overdue = overdue;
                            returnJSON.push(objectJSON);
            };

        } else if(tagParse(obj.tags)=="STARFISH") {
            count3++;
        }
    }
     returnJSON.sort(function(obj1, obj2) {
                return obj2.due - obj1.due;
            });
            for(var x = 0; x < returnJSON.length; x++) {
                var z = returnJSON[x].due
                returnJSON[x].due = addDays(z,0).toString().substr(0, 15);
            }
            return returnJSON;
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

function tagParse(tags) {
    var arr = tags;
    var longest = ""
    var compare = 0;
    for (var i = 0; i < arr.length; i++){
        var obj = arr[i];
        if(obj.text=="STARFISH") {
            return "STARFISH";
        }
        var comp = compareInt(obj.text);
        if(comp>compare) {
        compare=comp;}
    }
    return compare;
};

function compareInt(tag) {
    if(tag=="CHEETAH") {
        return 1;}
    else if(tag=="RABBIT") {
        return 2;}
    else if(tag=="TURTLE") {
        return 3;}
    else if (tag=="SNAIL") {
        return 4;}

};

function reconvert(tag) {
    if(tag==1) {
        return 7;}
    else if(tag==2) {
        return 21;}
    else if(tag==3) {
        return 56;}
    else if (tag==4) {
        return 70;}
    else {
        return "none";}
}

//
//function paramsHandler(params) {
//    if(params=='PING') {
//        return 'PONG';
//    }
//    else if(params=='What is your name?') {
//        return 'Nate Berkenmeier';
//    }
//    else if(params=='What is your quest?') {
//        return 'coding';
//    }
//    else if(params=='Source code for this exercise?') {
//        var retVal = finalProduct();
//        return retVal;
//    }
//    //problem set -- 123 + 123 + 123 = ?
//    else if(isAddition(params)){
//        return addition(params);
//    }
//    //problem set -- < 1 2 3 4 5 6 7 8 9 10 >
//    else if(isTeaser(params)) {
//        return teaser(params);
//    }
//    //problem set -- matrices rules
//    else if(isMatrix(params)) {
//        return matrix(params);
//    }
//    //problem set -- random word statistics
//    else {
//        return wordVowelConsonantCount(params);
//    }
//};
//
////problem set -- 123 + 123 + 123 = ? CODE
//function addition(params) {
//    var retVal = addNumbers(params);
//    return retVal;
//};
//
//function addNumbers(params) {
//    var pattern = /\d+/g;
//    var total = params.match(pattern).reduce(function(prev, num) {
//      return prev + +num;
//    }, 0);
//    return total.toString();
//};
///////////////////////////////////////////
//
////problem set -- random word statistics CODE
//function wordVowelConsonantCount(params) {
//    var wordCount = params.match(/(\w+)/g).length;
//    var vowelCount = 0;
//    var consonantCount = 0;
//    var checkString = params.toLowerCase();
//    for (var i = 0; i < checkString.length; i++) {
//        if((checkString.charAt(i).match(/[aeiou]/))){
//            vowelCount++;
//        }
//        else if((checkString.charAt(i).match(/[bcdfghjklmnpqrstvwxyz]/))){
//            consonantCount++;
//        }
//    }
//    return wordCount + '-' + consonantCount + '-' + vowelCount;
//};
//////////////////////////////////////////
//
////problem set -- < 1 2 3 4 5 6 7 8 9 10 > CODE
//function teaser(params) {
//    var numbers = params.match(/\d+/g).map(Number);
//    numbers.sort(function(a, b){return a - b});
//    var retVal = processNumbers(numbers);
//    return retVal;
//};
//
//function processNumbers(numbers) {
//    var evenArray = [];
//    var oddArray = [];
//    var finalArray = [];
//    while(numbers.length>0) {
//        var first = numbers[0];
//        var second;
//        if(first%2==0) {
//            second = evenNumber(numbers);
//            var secondIndex = numbers.indexOf(second);
//            evenArray.push((first+second));
//            numbers = reduceArray(numbers,secondIndex);
//        }
//        else {
//            second = oddNumber(numbers);
//            var secondIndex = numbers.indexOf(second);
//            oddArray.push((first+second));
//            numbers = reduceArray(numbers,secondIndex);
//        }
//    }
//    evenArray.reverse();
//    finalArray = oddArray.concat(evenArray);
//    var retVal = finalArray.toString().replace(/,/g, ' ');
//    return retVal;
//};
//
//function evenNumber(array) {
//     array.reverse();
//     var found = 0;
//     var index = 0;
//     var second;
//     while(found!=1) {
//        if(array[index]%2==1) {
//            second = array[index];
//            found = 1;
//        }
//        index++;
//     }
//     return second;
//};
//
//function oddNumber(array) {
//    array.reverse();
//    var found = 0;
//    var index = 0;
//    var second;
//    while(found!=1) {
//        if(array[index]%2==0) {
//            second = array[index];
//            found = 1;
//        }
//        index++;
//    }
//    return second;
//};
//
//function reduceArray(numbers,secondIndex) {
//    numbers = numbers.slice(0, secondIndex).concat(numbers.slice(secondIndex + 1, numbers.length))
//    numbers.reverse();
//    numbers = numbers.slice(0, 0).concat(numbers.slice(0 + 1, numbers.length))
//    return numbers;
//};
//////////////////////////////////////////////////////////////////
//
////problem set -- matrices rules CODE
//function matrix(params) {
//    var list = new DoublyLinkedList();
//    var alpha = [];
//    var array = [];
//
//    var lines = params.match(/^.*([\n\r]+|$)/gm);
//    for(var a = 1; a<lines.length;a++) {
//        list.add(lines[0][a]);
//        alpha.push(lines[0][a]);
//    }
//
//    lines = transformMatrix(lines);
//    findBooleanOrder(lines,alpha,list);
//
//    var retVal = list.listReturn();
//    retVal = retVal.replace(/\s/g, '');
//    return retVal;
//};
//
//function transformMatrix(matrix) {
//    for(var i = 0; i < matrix.length; i++) {
//        for(var j = 0; j < matrix[i].length; j++) {
//            if(matrix[i][j]=='<') {
//                matrix[j] = setCharAt(matrix[j],i,'>');
//            }
//            if(matrix[i][j]=='>') {
//                matrix[j] = setCharAt(matrix[j],i,'<');
//            }
//        }
//    }
//    return matrix
//};
//
//function findBooleanOrder(lines,alpha,list) {
//    for(var a = 0; a < alpha.length; a++) {
//        for(var i = 1;i<lines.length;i++) {
//            var l = lines[i].search("<");
//            var g = lines[i].search(">");
//            if(l!=-1) {
//                lessThan(alpha[i-1],alpha[l-1],list);
//            }
//            if(g!=-1) {
//                greaterThan(alpha[i-1],alpha[g-1],list);
//            }
//        }
//    }
//};
//
//function lessThan(less,greater,list) {
//    var g = list.findIndex(greater);
//    var l = list.findIndex(less);
//    if(l>g) {
//        list.remove(less);
//        list.insertBefore(less,greater);
//    }
//};
//
//function greaterThan(greater,less,list) {
//    var g = list.findIndex(greater);
//    var l = list.findIndex(less);
//    if(l>g) {
//        list.remove(greater);
//        list.insertAfter(greater,less);
//    }
//};
//
//function setCharAt(str,index,chr) {
//    if(index > str.length-1) return str;
//    return str.substr(0,index) + chr + str.substr(index+1);
//};
/////////////////////////////////////////////////////////////
//
////Node Class For Double Linked List Implementation
//function Node(data) {
//  this.data = data;
//  this.previous = null;
//  this.next = null;
//};
////Double Linked List Implementation
////modified quite a bit but sourced from: http://blog.benoitvallon.com/data-structures-in-javascript/the-doubly-linked-list-data-structure/
//function DoublyLinkedList() {
//  this.head = null;
//  this.tail = null;
//  this.numberOfValues = 0;
//};
//DoublyLinkedList.prototype.add = function (data) {
//  var node = new Node(data);
//  if(!this.head) {
//    this.head = node;
//    this.tail = node;
//  } else {
//    node.previous = this.tail;
//    this.tail.next = node;
//    this.tail = node;
//  }
//  this.numberOfValues++;
//};
//DoublyLinkedList.prototype.remove = function(data) {
//  var current = this.head;
//  while(current) {
//    if(current.data === data) {
//      if(current === this.head && current === this.tail) {
//        this.head = null;
//        this.tail = null;
//      } else if(current === this.head) {
//        this.head = this.head.next;
//        this.head.previous = null;
//      } else if(current === this.tail) {
//        this.tail = this.tail.previous;
//        this.tail.next = null;
//      } else {
//        current.previous.next = current.next;
//        current.next.previous = current.previous;
//      }
//      this.numberOfValues--;
//    }
//    current = current.next;
//  }
//};
//DoublyLinkedList.prototype.insertAfter = function(data, toNodeData) {
//  var current = this.head;
//  while(current) {
//    if(current.data === toNodeData) {
//      var node = new Node(data);
//      if(current === this.tail) {
//        this.add(data);
//      } else {
//        current.next.previous = node;
//        node.previous = current;
//        node.next = current.next;
//        current.next = node;
//        this.numberOfValues++;
//      }
//    }
//    current = current.next;
//  }
//};
//DoublyLinkedList.prototype.traverse = function(fn) {
//  var current = this.head;
//  while(current) {
//    if(fn) {
//      fn(current);
//    }
//    current = current.next;
//  }
//};
//DoublyLinkedList.prototype.traverseReverse = function(fn) {
//  var current = this.tail;
//  while(current) {
//    if(fn) {
//      fn(current);
//    }
//    current = current.previous;
//  }
//};
//DoublyLinkedList.prototype.length = function() {
//  return this.numberOfValues;
//};
//DoublyLinkedList.prototype.print = function() {
//  var string = '';
//  var current = this.head;
//  while(current) {
//    string += current.data + ' ';
//    current = current.next;
//  }
//};
////CRUCIAL FUNCTIONS I ADDED TO ABOVE IMPLEMENTATION
//DoublyLinkedList.prototype.findIndex = function(data) {
//  var current = this.head;
//  var index = 0;
//  while(current) {
//    if(current.data === data) {
//        return index;
//    } else {
//        index++;
//    }
//    current = current.next;
//  }
//  index = -1;
//  return index;
//};
//DoublyLinkedList.prototype.addToFront = function (data) {
//  var node = new Node(data);
//  if(!this.head) {
//    this.head = node;
//    this.tail = node;
//  } else {
//    node.next = this.head;
//    this.head.previous = node;
//    this.head = node;
//  }
//  this.numberOfValues++;
//};
//DoublyLinkedList.prototype.insertBefore = function(data, toNodeData) {
//  var current = this.head;
//  while(current) {
//    if(current.data === toNodeData) {
//      var node = new Node(data);
//      if(current === this.head) {
//        this.addToFront(data);
//      } else {
//        current.previous.next = node;
//        node.next = current;
//        node.previous = current.previous;
//        current.previous = node;
//        this.numberOfValues++;
//      }
//    }
//    current = current.next;
//  }
//};
//DoublyLinkedList.prototype.listReturn = function() {
//  var string = '';
//  var current = this.head;
//  while(current) {
//    string += current.data + ' ';
//    current = current.next;
//  }
//  return string.trim();
//};
//
//function isAddition(params) {
//};
//
//////BOOLEAN FUNCTIONS TO CHECK PROBLEM TYPE
////function isAddition(params) {
////    if (params.includes('+')) {
////        return true;
////    }
////};
////
//function isMatrix(params) {
////    if (params.includes('\r')) {
////            return true;
////        }
//};
//
//function isTeaser(params) {
////    if(params[0]=='<'&&params[(params.length-1)]=='>') {
////        return true;
////    }
////    else {
////        return false;
////    }
//};
/////////////////////////////////////////////
//
////building the nasty toString() for source code return
//function finalProduct() {
//    return  "//code written in Javascript (index.js)\n"+
//            "//GITHUB REPO FOR CODE:\n"+
//            "//   https://github.com/NarthVader/Vacasa\n"+
//            "///////////////////////\n\n"+
//            "// Import express modules\n"+
//            "var express = require('express');\n\n"+
//            "// Instantiates Express and assigns app variable to it\n"+
//            "var app = express();\n\n"+
//            "// Listen to specified ngrok port (default=80)\n"+
//            "const PORT=80;\n\n"+
//            "// Start server\n"+
//            "app.listen(PORT, function () {\n"+
//            "\t//Callback triggered when server is successful\n"+
//            "\tconsole.log(\"Vacasa app listening on port \" + PORT);\n"+
//            "});\n\n"+
//            "//Handler for GET requests from Vacasa exercise\n"+
//            "app.get('/', function(req, res) {\n"+
//            "\tvar params = req.query.q;\n"+
//            "\tvar retVal = paramsHandler(params);\n"+
//            "\tres.send(retVal);\n"+
//            "});\n"+paramsHandler.toString()+";\n\n"+
//            "//problem set -- 123 + 123 + 123 = ? CODE\n"+
//            addition.toString()+";\n\n"+
//            addNumbers.toString()+";\n\n"+
//            "/////////////////////////////////////////\n\n"+
//            "//problem set -- random word statistics CODE\n"+
//            wordVowelConsonantCount.toString()+";\n\n"+
//            "////////////////////////////////////////\n\n"+
//            "//problem set -- < 1 2 3 4 5 6 7 8 9 10 > CODE\n\n"+
//            teaser.toString()+";\n\n"+
//            processNumbers.toString()+";\n\n"+
//            evenNumber.toString()+";\n\n"+
//            oddNumber.toString()+";\n\n"+
//            reduceArray.toString()+";\n\n"+
//            "////////////////////////////////////////////////////////////////\n\n"+
//            "//problem set -- matrices rules CODE\n\n"+
//            matrix.toString()+";\n\n"+
//            transformMatrix.toString()+";\n\n"+
//            findBooleanOrder.toString()+";\n\n"+
//            lessThan.toString()+";\n\n"+
//            greaterThan.toString()+";\n\n"+
//            setCharAt.toString()+";\n\n"+
//            "///////////////////////////////////////////////////////////\n\n"+
//            "//Double Linked List Implementation\n"+
//            "//modified quite a bit but sourced from: http://blog.benoitvallon.com/data-structures-in-javascript/the-doubly-linked-list-data-structure/\n"+
//            DoublyLinkedList.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.add = "+DoublyLinkedList.prototype.add.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.remove = "+DoublyLinkedList.prototype.remove.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.insertAfter = "+DoublyLinkedList.prototype.insertAfter.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.traverse = "+DoublyLinkedList.prototype.traverse.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.traverseReverse = "+DoublyLinkedList.prototype.traverseReverse.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.length = "+DoublyLinkedList.prototype.length.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.print = "+DoublyLinkedList.prototype.print.toString()+";\n\n"+
//            "//CRUCIAL FUNCTIONS I ADDED TO ABOVE IMPLEMENTATION\n"+
//            "DoublyLinkedList.prototype.findIndex = "+DoublyLinkedList.prototype.findIndex.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.addToFront = "+DoublyLinkedList.prototype.addToFront.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.insertBefore = "+DoublyLinkedList.prototype.insertBefore.toString()+";\n\n"+
//            "DoublyLinkedList.prototype.listReturn = "+DoublyLinkedList.prototype.listReturn.toString()+";\n\n"+
//            "//Node Class For Double Linked List Implementation\n"+
//            Node.toString()+";\n\n"+
//            "//BOOLEAN FUNCTIONS TO CHECK PROBLEM TYPE\n"+
//            isAddition.toString()+";\n\n"+
//            isMatrix.toString()+";\n\n"+
//            isTeaser.toString()+";\n\n"+
//            "///////////////////////////////////////////\n\n"+
//            "//building the nasty toString() for source code return\n"+
//            finalProduct.toString();
//}
