#!/usr/bin/env node
// Wowl - a language for Maths.
'use strict';
let i; // Iterator.
let ast = []; // Abstract Syntax Tree.
const fs = require('fs'); // Filesystem nodule.
const [,,...args] = process.argv; // system arguments
const rawCode = 'x:3;b:6;c:9;'; // not processing files, working on actual translation for now.
const cleanCode = rawCode.replace(/\s/g,''); // remove all whitespace
const codeArray = cleanCode.split(';'); // array of statements.
if (codeArray.slice(-1)[0] === '') {
	codeArray.pop(); // remove the empty character at the end.
}
for (i = 0; i < codeArray.length; i+=1) {
	let object = {};
	let splitStatement = codeArray[i].split(':');
	if (splitStatement.length === 2) {
		if (String(Number(splitStatement[1])) === 'NaN') {
			console.error('Sorry! Wowl can only process variables with number values!');
			process.exit();
		} else {
			object.type =  'variable';
			object.definition = splitStatement[0];
			object.value = splitStatement[1];
			ast.push(object);
		}
	} 
}
console.log(ast);