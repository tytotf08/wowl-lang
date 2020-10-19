#!/usr/bin/env node
// Wowl - a language for Maths.
'use strict';
const [, , ...sys_args] = process.argv; // system arguments
const fs = require('fs'); // Filesystem module.
const path = require('path');
// the interpreter will convert the file given into code here when we do that
const file = path.resolve(sys_args[0]);
fs.readFile(file, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  const rawCode = data += '\n';
  let i; // Iterator.
	let ast = []; // Abstract Syntax Tree.
	let namespace = {}; // NameSpace Object.
  let statementType;
  let cc = "";
  let cleanCode = rawCode.replace(/^\#.*\n/g, '').replace(/\s/g, ''); // remove all whitespace and comments
  const codeArray = cleanCode.split(';'); // array of statements.
  if (codeArray.slice(-1)[0] === '') {
    codeArray.pop(); // remove the empty character at the end.
  }
  // add to the ast array
  for (i = 0; i < codeArray.length; i += 1) {
    let object = {};
    let splitStatement = codeArray[i].split(':');
    if (splitStatement.length === 2) {
      object.type = 'variable';
      object.definition = splitStatement[0];
      object.value = splitStatement[1]; // 6, x, x+y+6
      ast.push(object);
    }
  }
  // so we gonna now filter through the ast
  for (i = 0; i < ast.length; i += 1) {
    if (ast[i].type === 'variable') {
    	if (String(Number(ast[i].value)) !== 'NaN') {
    		namespace[ast[i].definition] = ast[i].value;
      	cc += 'var ' + ast[i].definition + ' = ' + ast[i].value + ';\n'; // add to the compiled code variable!
      	cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely
      } else if (namespace[ast[i].value]) {
      		namespace[ast[i].definition] = namespace[ast[i].value];
      		cc += 'var ' + ast[i].definition + ' = ' + namespace[ast[i].value] + ';\n'; // add to the compiled code variable!
      		cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely
      } else {
      	console.log("Bleh bleh. Error.");
      }

    }    	
  }
  eval(cc);
});

