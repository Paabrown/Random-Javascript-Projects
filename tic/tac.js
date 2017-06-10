//x is 1
//o is -1
//Free space aka "[ ]" is 0
//disabled free space is -2
"use strict"

const START = document.getElementById('start')
const HTMLBOARD = document.getElementById('board');
const MESSAGE = document.getElementById('message');
const COMPUTERBUTTON = document.getElementById('computerToggle')
const DIFFICULTYAREA = document.getElementById('difficultyArea')
const CONTROLMESSAGE = document.getElementById('controlPanelMessage')
const BOARDSIZE = 3;

var activePlayer = 1;
var computerOn = true;
var difficulty = 3;

START.addEventListener('click', start);
COMPUTERBUTTON.addEventListener('click', toggleComputer);

generateDifficultyButtons();

//Basic Board Functions

function generateDifficultyButtons() {
	var modes = ['easy', 'medium', 'impossible'];
	var diff;

	for (var i = 0; i <= 2; i++) {
		diff = i + 1;
		var button = document.createElement('button')
		button.className = 'difficultyButton';
		button.id = 'difficultyButton-' + diff;
		button.type = 'button'
		button.difficulty = diff;
		button.innerHTML = modes[i];
		button.addEventListener('click', function() {
			difficulty = this.difficulty; 
			CONTROLMESSAGE.innerHTML = 'Difficulty is now ' + this.innerHTML;
		});
		DIFFICULTYAREA.appendChild(button);
	}
}

function boardConstructor(size) {
	var board = {};

	for (var y = 0; y < size; y++) {
		for (var x = 0; x < size; x++) {
			var key = keyMaker(y, x);
			board[key] = 0;
		}
	}
	return board;
}

function keyMaker(y, x) {
	return y + ',' + x;
}

function placePiece(board, spaceKey, piece) {
	CONTROLMESSAGE.innerHTML = '';
	board[spaceKey] = piece;
	renderBoard(board);
	return board;
}

function checkIfPlayerWon(board, piece) {
	var winningSum = piece * BOARDSIZE;

	return !!checkLines(board, checkLineBySum, winningSum);
}

function checkIfTie(board) {
	return objectValues(board).every(function(value) {return (value === -1 || value === 1)})
}

function checkLines(board, lineTest, value) {
	var lines = collectLines(board);

	for (var i = 0; i < lines.length; i++) {
		var line = lines[i];
		if (lineTest(line, value)) {
			return lines[i];
		}
	} return false;
}

function checkLineBySum(line, value) {
	var sums = [].slice.call(arguments).slice(1);
	var lineSum = sum(objectValues(line));
	
	return sums.reduce(function(some, sum) {
		if (sum === lineSum) {
			return true;
		} return some;
	}, false);
}

function collectLines(board) {
	return collectRows(board).concat(collectColumns(board)).concat(collectDiagonals(board));
}

function collectRows(board) {
	var rows = [];
	var row;
	var key;

	for (var y = 0; y < BOARDSIZE; y++) {
		row = {};

		for (var x = 0; x < BOARDSIZE; x++) {
			key = keyMaker(y, x);
			row[key] = board[key];
		} 

		rows.push(row);
	} return rows
}

function collectColumns(board) {
	var columns = [];
	var column;
	var key;

	for (var x = 0; x < BOARDSIZE; x++) {
		column = {};

		for (var y = 0; y < BOARDSIZE; y++) {
			key = keyMaker(y, x);
			column[key] = board[key];
		} 

		columns.push(column);
	}

	return columns
}

function collectDiagonals(board) {
	var diagonals = [{}, {}];
	var key1;
	var key2;

	for (var xy = 0; xy < BOARDSIZE; xy++) {
		key1 = keyMaker(xy, xy);
		key2 = keyMaker(xy, BOARDSIZE - 1 - xy);

		diagonals[0][key1] = board[key1];
		diagonals[1][key2] = board[key2];
	} return diagonals;
}

function returnEmptySpaces(spaces) {
	return filterObj(spaces, function(spaceValue) {
		return spaceValue === 0;
	}, 'value');
}

function resetBoard(board) {
	for (space in board) {
		board[space] = 0;
	}

	renderBoard(board);
	return board;
}

function renderBoard(board) {
	HTMLBOARD.innerHTML = '';
	var spaceKey;

	for (var y = 0; y < BOARDSIZE; y++) {
	 	HTMLBOARD.appendChild(document.createElement('br'));
	 	for (var x = 0; x < BOARDSIZE; x++) {
	 		spaceKey = keyMaker(y, x)
	 		renderButton(board, spaceKey);
	 	}
	}
}

function renderButton(board, spaceKey) {
	var button = document.createElement('button');
	button.type = 'button'
	button.class = 'space';
	var value = board[spaceKey];

	if (value === 0) {
		button.innerHTML = '[ ]';
		button.addEventListener('click', function() {
			oneTurn(board, spaceKey);
		});
	} else if (value === 1) {
		button.innerHTML = ' x ';
		button.disabled = true
	} else if (value === -1) {
		button.innerHTML = ' o ';
		button.disabled = true;
	} else if (value === -2) {
		button.innerHTML = '[ ]';
		button.disabled = true;
	} else {
		throw new Error('bad type')
	}

	button.id = 'button-' + spaceKey;

	HTMLBOARD.appendChild(button);
}

function disableBoard(board) {
	for (var space in board) {
		if (board[space] === 0) {
			board[space] = -2;
		} 
	} renderBoard(board);
}

function togglePieces() {
	if (activePlayer === 1) {
		activePlayer = -1;
	} else {
		activePlayer =  1;
	}
}

function toggleComputer() {
	if (computerOn) {
		computerOn = false;
		COMPUTERBUTTON.innerHTML = 'Turn computer on';
		CONTROLMESSAGE.innerHTML = 'Computer is now off'
	} else {
		computerOn = true;
		COMPUTERBUTTON.innerHTML = 'Turn computer off';
		CONTROLMESSAGE.innerHTML = 'Computer is now on'
	}
}

function setDifficulty(level) {
	difficulty = level;
	alert('level', level);
}

//Game Flow

function oneTurn(board, spaceKey) {
	placePiece(board, spaceKey, activePlayer);
	
	var gameEnd = checkforEndingConditions(board, activePlayer)

	togglePieces();

	if (!gameEnd && computerOn) {
		var compChoice = computerChoice(board, activePlayer);
		placePiece(board, compChoice, activePlayer);

		checkforEndingConditions(board, activePlayer);

		togglePieces();
	}

}

function checkforEndingConditions(board, piece) {
	var player = identifyPlayer(piece)

	if (checkIfPlayerWon(board, piece)) {
		disableBoard(board);
		MESSAGE.innerHTML = player.toString().toUpperCase() + ' wins!';
		return true;
	} else if (checkIfTie(board)) {
		disableBoard(board);
		MESSAGE.innerHTML = 'It\'s a tie!';
		return true;
	} return false;
}

function identifyPlayer(piece) {
	var players = {'-1': 'o', '0': '[ ]', '1': 'x'}
	return players[piece.toString()];
}

function start() {
	START.style.display = 'none';
	MESSAGE.innerHTML = 'Fight!';
	CONTROLMESSAGE.innerHTML = '';
	var board = boardConstructor(BOARDSIZE);
	renderBoard(board);

	activePlayer = 1;
}

function startAsO() {
	if (computerOn) {
		activePlayer = 1;
	} else {
		activePlayer = -1;
	}

	START.style.display = 'none';
	MESSAGE.innerHTML = 'Fight!';
	CONTROLMESSAGE.innerHTML = '';

	var board = boardConstructor(BOARDSIZE);
	renderBoard(board);
	
	if (computerOn) {
		var compChoice = computerChoice(board, activePlayer);
		placePiece(board, compChoice, activePlayer);
		togglePieces();
	}
}


//AI Section

function computerChoice(board, piece) {
	console.log('board is ', board);
	var winningMove = findWinningMove(board, piece);
	var stopOpponent = findWinningMove(board, piece * -1);
	var opportunitySpace = findOpportunitySpaces(board, piece);
	var stopOpportunity = findOpportunitySpaces(board, piece * -1)
	var cornerToChoose = chooseRandomAvailableCorner(board);
	var forceMove = chooseRandomForceMove(board, piece);
	var random = chooseRandomEmptySpace(board);

	if (winningMove) {
		console.log('returning winningMove', winningMove)
		return winningMove;
	} else if (stopOpponent && difficulty > 1) {
		console.log('returning stopOpponent', stopOpponent)
		return stopOpponent;
	} else if (opportunitySpace && difficulty > 2) {
		console.log('returning opportunitySpace', opportunitySpace)
		return opportunitySpace[0];
	} else if (stopOpportunity && stopOpportunity.length === 1 && difficulty > 2) {
		console.log('returning stopOpportunity[0]', stopOpportunity[0])
		return stopOpportunity[0];
	} else if (stopOpportunity && difficulty > 2) {
		var blockMultipleOps = forceMoveToBlockOpportunities(board, piece)
		console.log('returning blockMultipleOps', blockMultipleOps);
		return blockMultipleOps;
	} else if (board['1,1'] === 0 && difficulty > 1) {
		console.log('returning center 1,1')
		return '1,1';
	} else if (forceMove && difficulty > 1) {
		console.log('forcing random move by placing at', forceMove);
		return forceMove;
	} else if (cornerToChoose && difficulty > 1) {
		console.log('returning random corner', cornerToChoose);
		return cornerToChoose;
	} else {
		console.log('returning random', random);
		return random;
	}
}

function findWinningMove(board, piece) {
	var winningLineValue = piece * (BOARDSIZE - 1);
	var winningLine = checkLines(board, checkLineBySum, winningLineValue);

	if (winningLine) {
		for (var key in winningLine) {
			if (winningLine[key] === 0) {
				return key;
			}
		} console.log('Error! We should have won!')
	} return false;
}

function findOpportunitySpaces(board, piece) {
	var lines = returnOpportunityLines(board, piece);
	var opp = returnOverlapSpaces(lines)

	if (objectLength(opp) > 0) {
		return Object.keys(opp);
	} else {
		return undefined;
	}
}

function forceMoveToBlockOpportunities(board, piece) {
	var opportunityLines = returnOpportunityLines(board, piece);
	var opponentOpportunitySpaces = findOpportunitySpaces(board, piece * -1);
	var lineToTarget;
	var spaceToTarget;

	for (var i = 0; i < opportunityLines.length; i++) {
		lineToTarget = opportunityLines[i];
		spaceToTarget = canForceOnLine(lineToTarget, opponentOpportunitySpaces);

		if (spaceToTarget) {
			for (var space in lineToTarget) {
				if (space !== spaceToTarget && lineToTarget[space] === 0) {
					return space;
				}
			} console.log('Error - forceMoveToBlockOpportunities found a good space, but could not place there. Unexpected.')
		}
	} return undefined;
}

function returnOpportunityLines(board, piece) {
	var lines = collectLines(board);

	return filterLines(lines, isLineOpportunity, piece);
}

function isLineOpportunity(lineObj, piece) {
	return checkIfLineHasPiece(lineObj, piece) && !checkIfLineHasPiece(lineObj, -1 * piece) && checkLineBySum(lineObj, piece)
}

function canForceOnLine(line, spacesToAvoid) {	
	for (var space in line) {
		if (line[space] === 0 && !spacesToAvoid.includes(space)) {
			return space;
		}
	} return undefined;
}

function filterLines(lines, lineTest, value) {
	var filteredLines = [];
	var line;

	for (var i = 0; i < lines.length; i++) {
		line = lines[i];
		if (lineTest(line, value)) {
			filteredLines.push(line);
		}
	} return filteredLines;
}

function checkIfLineHasPiece(lineObj, piece) {
	var hasPiece = false;

	for (var space in lineObj) {
		if (lineObj[space] === piece) {
			hasPiece = true;
		}
	} return hasPiece;
}

function returnOverlapSpaces(lines) {
	var spaceOverlaps = {};

	lines.forEach(function(line) {
		for (var space in line) {
			if (spaceOverlaps[space] && line[space] === 0) {
				spaceOverlaps[space] = spaceOverlaps[space] + 1;
			} else if (line[space] === 0) {
				spaceOverlaps[space] = 1;
			}
		}
	});

	return filterObj(spaceOverlaps, function(value) {return value > 1}, 'value');
}

function chooseRandomEmptySpace(spaces) {
	var empties = returnEmptySpaces(spaces);
	var options = Object.keys(empties);
	return options[Math.floor(Math.random() * options.length)];
}

function chooseRandomAvailableCorner(board) {
	var corners = filterObj(board, function(key) {
		return ['0,0', '0,2', '2,0', '2,2'].includes(key);
	}, 'key')

	return chooseRandomEmptySpace(corners)
}

function chooseRandomForceMove(board, piece) {
	var oppLines = returnOpportunityLines(board, piece);
	var randomLine = oppLines[Math.floor(Math.random() * oppLines.length)]
	return chooseRandomEmptySpace(randomLine);
}

//Helpers

function sum(array) {
	return array.reduce(function(value, number) {return value + number});
}

function objectValues(object) {
	return Object.keys(object).map(function(key) {return object[key]});
}

function objectLength(object) {
	return Object.keys(object).length;
}

function filterObj(object, test, byKeyOrValue) {
	
	function testByKeyOrValues(object, key) {
		if (byKeyOrValue === 'key') {
			return test(key);
		} else {
			return test(object[key]);
		}
	}

	var newObj = {};

	for (var key in object) {
		if (testByKeyOrValues(object, key)) {
			newObj[key] = object[key];
		}
	}

	return newObj;
}

//TESTING

function assertEqual(actual, expected, testName) {
	if (actual === expected) {
		console.log('Passed:', testName)
	} else {
		console.log('FAILED [' + testName + '] Expected "' + expected + '" but got "' + actual + '"');
	}
}

function assertObjectsEqual(actual, expected, testName) {
	actual = JSON.stringify(actual);
	expected = JSON.stringify(expected);

	if (JSON.stringify(actual) === JSON.stringify(expected)) {
		console.log('Passed:', testName)
	} else {
		console.log('FAILED [', testName, '] Expected "', expected, '" but got "', actual, '"');
	}
}

var sampleEmptyBoard = {'0,0':0,'0,1':0,'0,2':0,'1,0':0,'1,1':0,'1,2':0,'2,0':0,'2,1':0,'2,2':0}
var sampleEmptyBoard2 = {'0,0':0,'0,1':0,'0,2':0,'1,0':0,'1,1':0,'1,2':0,'2,0':0,'2,1':0,'2,2':0}
var piecePlacedBoard = {'0,0':0,'0,1':0,'0,2':0,'1,0':0,'1,1':0,'1,2':0,'2,0':0,'2,1':-1,'2,2':0}
var winningBoard = {'0,0':0,'0,1':0,'0,2':0,'1,0':-1,'1,1':-1,'1,2':-1,'2,0':0,'2,1':-1,'2,2':0}
var lineObj = {'0,2':0,'1,0':-1,'1,1':-1}
var almostWinningBoard = {'0,0':0,'0,1':0,'0,2':0,'1,0':-1,'1,1':-1,'1,2':0,'2,0':0,'2,1':-1,'2,2':0}
var boardWithSomeAliveLines = {'0,0': 1,'0,1':-1,'0,2':1,
							   '1,0':-1,'1,1': 1,'1,2':0,
							   '2,0':-1,'2,1': 0,'2,2':0}
var boardWithSomeOpportunityLines = {'0,0': 1,'0,1':-1,'0,2':1,
							         '1,0':-1,'1,1': 0,'1,2':0,
							         '2,0': 1,'2,1': 0,'2,2':0}
var exampleLines = [{'0,2':0,'1,0':0,'1,1':-1}, {'0,2':1,'1,0':-1,'1,1':0}, {'2,0':-1,'2,1': 0,'2,2':0}]
var lineObjAlive = {'0,2':0,'1,0':0,'1,1':-1}
var lineObjDead = {'0,2':1,'1,0':-1,'1,1':0}
var boardWithOneOpportunityForO = {'0,0': 0,'0,1': 0,'0,2': 0,
							       '1,0':-1,'1,1': 1,'1,2': 1,
							       '2,0': 0,'2,1':-1,'2,2': 0}
var boardWithOneOpportunityFor1 =  {'0,0': 0,'0,1':-1,'0,2': 0,
									'1,0': 1,'1,1': 0,'1,2': 0,
									'2,0': 0,'2,1': 1,'2,2': 0}
var boardWithTwoOpportunitiesFor1 =  {'0,0': 0,'0,1': 0,'0,2': 1,
									  '1,0': 0,'1,1':-1,'1,2': 0,
									  '2,0': 1,'2,1': 0,'2,2': 0}

function runUnitTests() {
	assertObjectsEqual(boardConstructor(3), sampleEmptyBoard, 'createBoard')
	assertObjectsEqual(placePiece(sampleEmptyBoard2, '2,1', -1), piecePlacedBoard, 'place piece');
	assertEqual(checkIfPlayerWon(winningBoard, -1), true, 'finds board with winning column');
	assertEqual(sum([1,2,3,4,5]), 15, 'does a stupid sum');
	assertObjectsEqual(objectValues(lineObj), [0,-1,-1], 'converts an object to an array of its values')
	assertEqual(findWinningMove(almostWinningBoard, -1), '1,2', 'finds the right move to win')
	assertEqual(computerChoice(almostWinningBoard, -1), '1,2', 'computer chooses the move that wins')
	assertEqual(checkLineBySum(lineObjAlive, 1, 2, -1, -2), true, 'handles multiple additional arguments')
	assertEqual(checkLineBySum(lineObjDead, 1, 2, -1, -2), false, 'handles multiple additional arguments when line is dead')
	assertObjectsEqual(filterLines(exampleLines, checkLineBySum, -1), [{'0,2':0,'1,0':0,'1,1':-1}, {'2,0':-1,'2,1': 0,'2,2':0}], 'does filterlines work?');
	assertObjectsEqual(findOpportunitySpaces(boardWithOneOpportunityForO, -1), ['2,0'], 'AI can identify opportunity space');
	assertEqual(computerChoice(boardWithOneOpportunityForO, -1), '2,0', 'AI can choose opportunity space');
	assertEqual(computerChoice(boardWithOneOpportunityFor1,-1), '2,0', 'AI can block opponent\'s opportunity space')
	assertEqual(computerChoice(boardWithTwoOpportunitiesFor1,-1), '1,2', 'AI can block opponent\'s opportunity space')
}