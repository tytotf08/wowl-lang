#!/usr/bin/env node
// Wowl - a language for Maths.
'use strict';
const [, , ...sys_args] = process.argv; // system arguments
const util = require('util');
const fs = require('fs'); // Filesystem module.
const path = require('path');
// the interpreter will convert the file given into code here when we do that
const file = path.resolve(sys_args[0]);
const parseStatement = function(line) {
  console.log(line);
  let object = {};
  let splitStatement = line.split(':');
  if (splitStatement.length === 2) {
    object.type = 'variable';
    object.definition = splitStatement[0];
    object.value = splitStatement[1]; // 6, x, x+y+6
  }
  return object;
}
fs.readFile(file, 'utf8', function(err, data) {
  if (err) {
    return console.log(err);
  }
  const rawCode = data;
	let ast = []; // Abstract Syntax Tree.
	let namespace = {}; // NameSpace Object.
  let cc = '';

  let codeArray = rawCode.split('\n');
  // add to the ast array
  for (let i = 1; i < codeArray.length + 1; i += 1) {
    // does it have a semicolon
    // is it a variable def

    let line = codeArray[i-1];

    if(line.startsWith('#')){
      continue;
    }
    if(line.replace(/\s/g, '') === ''){
      continue;
    }
    if(!line.endsWith(';')){
      console.log("All lines must have a semicolon. (line " + i + ')');
      process.exit();
    }

    let statements = line.split(';');
    statements.pop();
    
    for(let j=0; j<statements.length; j++){
      ast.push(parseStatement(statements[j]));
    }
  }

  // so we gonna now filter through the ast
  for (let i = 0; i < ast.length; i += 1) {
    
    cc += ast[i].definition + ' = ' + ast[i].value + ';\n'; // add to the compiled code letiable!
    cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely   	
  }
  try {
    global.eval(cc);
  } catch(ReferenceError) {
    console.log('Bleh! Bad, fatal, lethal, error. You referenced a nonexistent letiable!');
    console.log(ReferenceError);
    console.log(util.inspect(ReferenceError).split('\n')[3].split(':')[1]);
  }
});