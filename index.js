// Import express modules
var express = require('express');

// Instantiates Express and assigns app variable to it
var app = express();

// Listen to specified ngrok port (default=80)
const PORT=80;

// Start server
app.listen(PORT, function () {
    //Callback triggered when server is successful
    console.log("Vacasa app listening on port " + PORT);
});

//Handler for GET requests from Vacasa exercise
app.get('/', function(req, res) {
    var params = req.query.q;
    var retVal = paramsHandler(params);
    res.send(retVal);
});

function paramsHandler(params) {
    if(params=='PING') {
        return 'PONG';
    }
    else if(params=='What is your name?') {
        return 'Nate Berkenmeier';
    }
    else if(params=='What is your quest?') {
        return 'coding';
    }
    else if(params=='Source code for this exercise?') {
        var retVal = finalProduct();
        return retVal;
    }
    //problem set -- 123 + 123 + 123 = ?
    else if(isAddition(params)){
        return addition(params);
    }
    //problem set -- < 1 2 3 4 5 6 7 8 9 10 >
    else if(isTeaser(params)) {
        return teaser(params);
    }
    //problem set -- matrices rules
    else if(isMatrix(params)) {
        return matrix(params);
    }
    //problem set -- random word statistics
    else {
        return wordVowelConsonantCount(params);
    }
};

//problem set -- 123 + 123 + 123 = ? CODE
function addition(params) {
    var retVal = addNumbers(params);
    return retVal;
};

function addNumbers(params) {
    var pattern = /\d+/g;
    var total = params.match(pattern).reduce(function(prev, num) {
      return prev + +num;
    }, 0);
    return total.toString();
};
/////////////////////////////////////////

//problem set -- random word statistics CODE
function wordVowelConsonantCount(params) {
    var wordCount = params.match(/(\w+)/g).length;
    var vowelCount = 0;
    var consonantCount = 0;
    var checkString = params.toLowerCase();
    for (var i = 0; i < checkString.length; i++) {
        if((checkString.charAt(i).match(/[aeiou]/))){
            vowelCount++;
        }
        else if((checkString.charAt(i).match(/[bcdfghjklmnpqrstvwxyz]/))){
            consonantCount++;
        }
    }
    return wordCount + '-' + consonantCount + '-' + vowelCount;
};
////////////////////////////////////////

//problem set -- < 1 2 3 4 5 6 7 8 9 10 > CODE
function teaser(params) {
    var numbers = params.match(/\d+/g).map(Number);
    numbers.sort(function(a, b){return a - b});
    var retVal = processNumbers(numbers);
    return retVal;
};

function processNumbers(numbers) {
    var evenArray = [];
    var oddArray = [];
    var finalArray = [];
    while(numbers.length>0) {
        var first = numbers[0];
        var second;
        if(first%2==0) {
            second = evenNumber(numbers);
            var secondIndex = numbers.indexOf(second);
            evenArray.push((first+second));
            numbers = reduceArray(numbers,secondIndex);
        }
        else {
            second = oddNumber(numbers);
            var secondIndex = numbers.indexOf(second);
            oddArray.push((first+second));
            numbers = reduceArray(numbers,secondIndex);
        }
    }
    evenArray.reverse();
    finalArray = oddArray.concat(evenArray);
    var retVal = finalArray.toString().replace(/,/g, ' ');
    return retVal;
};

function evenNumber(array) {
     array.reverse();
     var found = 0;
     var index = 0;
     var second;
     while(found!=1) {
        if(array[index]%2==1) {
            second = array[index];
            found = 1;
        }
        index++;
     }
     return second;
};

function oddNumber(array) {
    array.reverse();
    var found = 0;
    var index = 0;
    var second;
    while(found!=1) {
        if(array[index]%2==0) {
            second = array[index];
            found = 1;
        }
        index++;
    }
    return second;
};

function reduceArray(numbers,secondIndex) {
    numbers = numbers.slice(0, secondIndex).concat(numbers.slice(secondIndex + 1, numbers.length))
    numbers.reverse();
    numbers = numbers.slice(0, 0).concat(numbers.slice(0 + 1, numbers.length))
    return numbers;
};
////////////////////////////////////////////////////////////////

//problem set -- matrices rules CODE
function matrix(params) {
    var list = new DoublyLinkedList();
    var alpha = [];
    var array = [];

    var lines = params.match(/^.*([\n\r]+|$)/gm);
    for(var a = 1; a<lines.length;a++) {
        list.add(lines[0][a]);
        alpha.push(lines[0][a]);
    }

    lines = transformMatrix(lines);
    findBooleanOrder(lines,alpha,list);

    var retVal = list.listReturn();
    retVal = retVal.replace(/\s/g, '');
    return retVal;
};

function transformMatrix(matrix) {
    for(var i = 0; i < matrix.length; i++) {
        for(var j = 0; j < matrix[i].length; j++) {
            if(matrix[i][j]=='<') {
                matrix[j] = setCharAt(matrix[j],i,'>');
            }
            if(matrix[i][j]=='>') {
                matrix[j] = setCharAt(matrix[j],i,'<');
            }
        }
    }
    return matrix
};

function findBooleanOrder(lines,alpha,list) {
    for(var a = 0; a < alpha.length; a++) {
        for(var i = 1;i<lines.length;i++) {
            var l = lines[i].search("<");
            var g = lines[i].search(">");
            if(l!=-1) {
                lessThan(alpha[i-1],alpha[l-1],list);
            }
            if(g!=-1) {
                greaterThan(alpha[i-1],alpha[g-1],list);
            }
        }
    }
};

function lessThan(less,greater,list) {
    var g = list.findIndex(greater);
    var l = list.findIndex(less);
    if(l>g) {
        list.remove(less);
        list.insertBefore(less,greater);
    }
};

function greaterThan(greater,less,list) {
    var g = list.findIndex(greater);
    var l = list.findIndex(less);
    if(l>g) {
        list.remove(greater);
        list.insertAfter(greater,less);
    }
};

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
};
///////////////////////////////////////////////////////////

//Node Class For Double Linked List Implementation
function Node(data) {
  this.data = data;
  this.previous = null;
  this.next = null;
};
//Double Linked List Implementation
//modified quite a bit but sourced from: http://blog.benoitvallon.com/data-structures-in-javascript/the-doubly-linked-list-data-structure/
function DoublyLinkedList() {
  this.head = null;
  this.tail = null;
  this.numberOfValues = 0;
};
DoublyLinkedList.prototype.add = function (data) {
  var node = new Node(data);
  if(!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.previous = this.tail;
    this.tail.next = node;
    this.tail = node;
  }
  this.numberOfValues++;
};
DoublyLinkedList.prototype.remove = function(data) {
  var current = this.head;
  while(current) {
    if(current.data === data) {
      if(current === this.head && current === this.tail) {
        this.head = null;
        this.tail = null;
      } else if(current === this.head) {
        this.head = this.head.next;
        this.head.previous = null;
      } else if(current === this.tail) {
        this.tail = this.tail.previous;
        this.tail.next = null;
      } else {
        current.previous.next = current.next;
        current.next.previous = current.previous;
      }
      this.numberOfValues--;
    }
    current = current.next;
  }
};
DoublyLinkedList.prototype.insertAfter = function(data, toNodeData) {
  var current = this.head;
  while(current) {
    if(current.data === toNodeData) {
      var node = new Node(data);
      if(current === this.tail) {
        this.add(data);
      } else {
        current.next.previous = node;
        node.previous = current;
        node.next = current.next;
        current.next = node;
        this.numberOfValues++;
      }
    }
    current = current.next;
  }
};
DoublyLinkedList.prototype.traverse = function(fn) {
  var current = this.head;
  while(current) {
    if(fn) {
      fn(current);
    }
    current = current.next;
  }
};
DoublyLinkedList.prototype.traverseReverse = function(fn) {
  var current = this.tail;
  while(current) {
    if(fn) {
      fn(current);
    }
    current = current.previous;
  }
};
DoublyLinkedList.prototype.length = function() {
  return this.numberOfValues;
};
DoublyLinkedList.prototype.print = function() {
  var string = '';
  var current = this.head;
  while(current) {
    string += current.data + ' ';
    current = current.next;
  }
};
//CRUCIAL FUNCTIONS I ADDED TO ABOVE IMPLEMENTATION
DoublyLinkedList.prototype.findIndex = function(data) {
  var current = this.head;
  var index = 0;
  while(current) {
    if(current.data === data) {
        return index;
    } else {
        index++;
    }
    current = current.next;
  }
  index = -1;
  return index;
};
DoublyLinkedList.prototype.addToFront = function (data) {
  var node = new Node(data);
  if(!this.head) {
    this.head = node;
    this.tail = node;
  } else {
    node.next = this.head;
    this.head.previous = node;
    this.head = node;
  }
  this.numberOfValues++;
};
DoublyLinkedList.prototype.insertBefore = function(data, toNodeData) {
  var current = this.head;
  while(current) {
    if(current.data === toNodeData) {
      var node = new Node(data);
      if(current === this.head) {
        this.addToFront(data);
      } else {
        current.previous.next = node;
        node.next = current;
        node.previous = current.previous;
        current.previous = node;
        this.numberOfValues++;
      }
    }
    current = current.next;
  }
};
DoublyLinkedList.prototype.listReturn = function() {
  var string = '';
  var current = this.head;
  while(current) {
    string += current.data + ' ';
    current = current.next;
  }
  return string.trim();
};

//BOOLEAN FUNCTIONS TO CHECK PROBLEM TYPE
function isAddition(params) {
    if (params.includes('+')) {
        return true;
    }
};

function isMatrix(params) {
    if (params.includes('\r')) {
            return true;
        }
};

function isTeaser(params) {
    if(params[0]=='<'&&params[(params.length-1)]=='>') {
        return true;
    }
    else {
        return false;
    }
};
///////////////////////////////////////////

//building the nasty toString() for source code return
function finalProduct() {
    return  "// Import express modules\n"+
            "var express = require('express');\n\n"+
            "// Instantiates Express and assigns app variable to it\n"+
            "var app = express();\n\n"+
            "// Listen to specified ngrok port (default=80)\n"+
            "const PORT=80;\n\n"+
            "// Start server\n"+
            "app.listen(PORT, function () {\n"+
            "\t//Callback triggered when server is successful\n"+
            "\tconsole.log(\"Vacasa app listening on port \" + PORT);\n"+
            "});\n\n"+
            "//Handler for GET requests from Vacasa exercise\n"+
            "app.get('/', function(req, res) {\n"+
            "\tvar params = req.query.q;\n"+
            "\tvar retVal = paramsHandler(params);\n"+
            "\tres.send(retVal);\n"+
            "});\n"+paramsHandler.toString()+";\n\n"+
            "//problem set -- 123 + 123 + 123 = ? CODE\n"+
            addition.toString()+";\n\n"+
            addNumbers.toString()+";\n\n"+
            "/////////////////////////////////////////\n\n"+
            "//problem set -- random word statistics CODE\n"+
            wordVowelConsonantCount.toString()+";\n\n"+
            "////////////////////////////////////////\n\n"+
            "//problem set -- < 1 2 3 4 5 6 7 8 9 10 > CODE\n\n"+
            teaser.toString()+";\n\n"+
            processNumbers.toString()+";\n\n"+
            evenNumber.toString()+";\n\n"+
            oddNumber.toString()+";\n\n"+
            reduceArray.toString()+";\n\n"+
            "////////////////////////////////////////////////////////////////\n\n"+
            "//problem set -- matrices rules CODE\n\n"+
            matrix.toString()+";\n\n"+
            transformMatrix.toString()+";\n\n"+
            findBooleanOrder.toString()+";\n\n"+
            lessThan.toString()+";\n\n"+
            greaterThan.toString()+";\n\n"+
            setCharAt.toString()+";\n\n"+
            "///////////////////////////////////////////////////////////\n\n"+
            "//Double Linked List Implementation\n"+
            "//modified quite a bit but sourced from: http://blog.benoitvallon.com/data-structures-in-javascript/the-doubly-linked-list-data-structure/\n"+
            DoublyLinkedList.toString()+";\n\n"+
            "DoublyLinkedList.prototype.add = "+DoublyLinkedList.prototype.add.toString()+";\n\n"+
            "DoublyLinkedList.prototype.remove = "+DoublyLinkedList.prototype.remove.toString()+";\n\n"+
            "DoublyLinkedList.prototype.insertAfter = "+DoublyLinkedList.prototype.insertAfter.toString()+";\n\n"+
            "DoublyLinkedList.prototype.traverse = "+DoublyLinkedList.prototype.traverse.toString()+";\n\n"+
            "DoublyLinkedList.prototype.traverseReverse = "+DoublyLinkedList.prototype.traverseReverse.toString()+";\n\n"+
            "DoublyLinkedList.prototype.length = "+DoublyLinkedList.prototype.length.toString()+";\n\n"+
            "DoublyLinkedList.prototype.print = "+DoublyLinkedList.prototype.print.toString()+";\n\n"+
            "//CRUCIAL FUNCTIONS I ADDED TO ABOVE IMPLEMENTATION\n"+
            "DoublyLinkedList.prototype.findIndex = "+DoublyLinkedList.prototype.findIndex.toString()+";\n\n"+
            "DoublyLinkedList.prototype.addToFront = "+DoublyLinkedList.prototype.addToFront.toString()+";\n\n"+
            "DoublyLinkedList.prototype.insertBefore = "+DoublyLinkedList.prototype.insertBefore.toString()+";\n\n"+
            "DoublyLinkedList.prototype.listReturn = "+DoublyLinkedList.prototype.listReturn.toString()+";\n\n"+
            "//Node Class For Double Linked List Implementation\n"+
            Node.toString()+";\n\n"+
            "//BOOLEAN FUNCTIONS TO CHECK PROBLEM TYPE\n"+
            isAddition.toString()+";\n\n"+
            isMatrix.toString()+";\n\n"+
            isTeaser.toString()+";\n\n"+
            "///////////////////////////////////////////\n\n"+
            "//building the nasty toString() for source code return\n"+
            finalProduct.toString();
}
