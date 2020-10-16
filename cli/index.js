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
  const rawCode = data;
  let statementType;
  let cc = "";
  let i; // Iterator.
  let ast = []; // Abstract Syntax Tree.
  const cleanCode = rawCode.replace(/\s/g, ''); // remove all whitespace
  const codeArray = cleanCode.split(';'); // array of statements.
  if (codeArray.slice(-1)[0] === '') {
    codeArray.pop(); // remove the empty character at the end.
  }
  // add to the ast array
  for (i = 0; i < codeArray.length; i += 1) {
    let object = {};
    let splitStatement = codeArray[i].split(':');
    if (splitStatement.length === 2) {
      if (String(Number(splitStatement[1])) === 'NaN') {
        console.error('Sorry! Wowl can only process variables with number values!');
        process.exit();
      } else {
        object.type = 'variable';
        object.definition = splitStatement[0];
        object.value = splitStatement[1];
        ast.push(object);
      }
    }
  }
  // so we gonna now filter through the ast
  for (i = 0; i < ast.length; i += 1) {
    if (ast[i].type === 'variable') {
      cc += 'var ' + ast[i].definition + ' = ' + ast[i].value + ';\n'; // add to the compiled code variable!
      cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely
    }
  }
  eval(cc);
});

