#!/usr/bin/env node
const fs = require('fs'); // Filesystem module.
'use strict';
const wowl =  function(usr_code) {
	let i; // Iterator.
	let ast = []; // Abstract Syntax Tree.
	let namespace = {}; // NameSpace Object.
	const rawCode = usr_code += '\n';
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
    	if (String(Number(splitStatement[1])) !== 'NaN') {
    		namespace[ast[i].definition] = ast[i].value;
      	cc += 'var ' + ast[i].definition + ' = ' + ast[i].value + ';\n'; // add to the compiled code variable!
      	cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely
      } else if (namespace[ast[i].definition]) {
      		namespace[ast[i].definition] = namespace[ast[i].value];
      		cc += 'var ' + ast[i].definition + ' = ' + namespace[ast[i].value] + ';\n'; // add to the compiled code variable!
      		cc += 'console.log(String(' + ast[i].definition + '));\n'; // node paints numbers strangely
      } else {
      	console.log("Bleh bleh. Error.");
      }

    }    	
  }
  eval(cc);
};
module.exports = wowl;