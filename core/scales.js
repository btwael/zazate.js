var intervals = require('./intervals.js'),
	notes = require('./notes.js'),
	get_notes = require('./diatonic.js').get_notes,
	_ = require('../node_modules/underscore');

// The diatonic scales and its modes

function diatonic(note) {
	/*Returns the diatonic scale starting on note.
	Example:
	{{{
	>>> diatonic("C")
	["C", "D", "E", "F", "G", "A", "B"]
	}}}*/
	return get_notes(note);
}

function ionian(note) {
	/*Returns the ionian mode scale starting on note.
	Example:
	{{{
	>>> ionian("C")
	["C", "D", "E", "F", "G", "A", "B"]
	}}}*/
	return diatonic(note);
}

function dorian(note) {
	/*Returns the dorian mode scale starting on note.
	Example:
	{{{
	>>> dorian("D") 
	["D", "E", "F", "G", "A", "B", "C"]
	}}}*/
	var i = ionian(intervals.minor_seventh(note));
	var arr = i.slice(1, i.length);
	arr.push(i[0]);
	return arr;
}

function phrygian(note) {
	/*Returns the phrygian mode scale starting on note.
	Example:
	{{{
	>>> phrygian("E") 
	["E", "F", "G", "A", "B", "C", "D"]
	}}}*/
	var i = ionian(intervals.minor_sixth(note));
	var arr = i.slice(2, i.length);
	for (var k = 0; k < 2; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function lydian(note) {
	/*Returns the lydian mode scale starting on note.
	Example:
	{{{
	>>> lydian("F") 
	["F", "G", "A", B", "C", "D", "E"]
	}}}*/
	var i = ionian(intervals.perfect_fifth(note))
	var arr = i.slice(3, i.length);
	for (var k = 0; k < 3; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function mixolydian(note) {
	/*Returns the mixolydian mode scale starting on note.
	Example:
	{{{
	>>> mixolydian("G")
	["G", "A", "B", "C", "D", "E", "F"]
	}}}*/
	var i = ionian(intervals.perfect_fourth(note))
	var arr = i.slice(4, i.length);
	for (var k = 0; k < 4; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function aeolian(note) {
	/*Returns the aeolian mode scale starting on note.
	Example:
	{{{
	>>> aeolian("A")
	["A", "B", "C", "D", "E", "F", "G"]
	}}}*/
	var i = ionian(intervals.minor_third(note))
	var arr = i.slice(5, i.length);
	for (var k = 0; k < 5; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function locrian(note) {
	/*Returns the locrian mode scale starting on note.
	Example:
	{{{
	>>> locrian("B")
	["B", "C", "D", "E", "F", "G", "A"]
	}}}*/
	var i = ionian(intervals.minor_second(note))
	var arr = i.slice(6, i.length);
	for (var k = 0; k < 6; k++) {
		arr.push(i[k]);
	};
	return arr;
}

// The minor modes

function natural_minor(note) {
	/*Returns the natural minor scale starting on note.
	Example:
	{{{
	>>> natural_minor("A")
	["A", "B", "C", "D", "E", "F", "G"]
	}}}*/
	var i = get_notes(notes.to_major(note));
	var arr = i.slice(5, i.length);
	for (var k = 0; k < 5; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function harmonic_minor(note) {
	/*Returns the harmonic minor scale starting on note.
	Example:
	{{{
	>>> harmonic_minor("A")
	"A", "B", "C", "D", "E", "F", "G#"]
	}}}*/
	var nat = natural_minor(note);
	nat[6] = notes.augment(nat[6]);
	return nat;
}

function melodic_minor(note) {
	/*Returns the melodic minor scale starting on note.
	Example:
	{{{
	>>> melodic_minor("A")
	["A", "B", "C", "D", "E", "F#", "G#"]
	}}}*/
	var har = harmonic_minor(note);
	har[5] = notes.augment(har[5]);
	return har;
}

// Other scales

function chromatic(note) {
	return _.range(0,12).map(function(x) {
		return intervals.get_interval(note, x);
	});
}

function whole_note(note) {
	/*Returns the whole note scale starting on note.
	Example:
	{{{
	>>> whole_note("C")
	["C", "D", "E", "F#", "G#", "A#"]
	}}}*/
	var n = 0;
	var last = note;
	var res = [last];
	while(n < 5) {
		ne = intervals.major_second(last);
		last = ne;
		res.push(ne);
		n += 1;
	}
	return res
}

function diminished(note) {
	/*Returns the diminshed scale on note.
	Example:
	{{{
	>>> diminished("C")
	['C', 'D', 'Eb', 'F', 'Gb', 'Ab', 'A', 'B']
	}}}*/
	function whole_step_half_step(n) {
		var res = [intervals.major_second(n), intervals.minor_third(n)];
		return res;
	}

	var res = [note];
	var n = _.range(3);
	for (var k = 0; k < n.length; k++) {
		var arr = whole_step_half_step(note);
		for (var i = 0; i < arr.length; i++) {
			res.push(arr[i]);
		};
		note = res[res.length-1];
	};

	res.push(intervals.major_seventh(res[0]));
	res[res.length-2] = intervals.major_sixth(res[0]);
	return res;
}

function determine(scale) {
	/*Determines the kind of scale. Can recognize all the diatonic modes and \
	the minor scales.
	Example:
	{{{
	>>> determine(["C", "D", "E", "F", "G", "A", "B"])
	'C ionian'
	}}}*/

	var possible_result = [
		["ionian",
			["major second", "major third", "perfect fourth", 
			"perfect fifth", "major sixth", "major seventh"]],
		["dorian", 
			["major second", "minor third", "perfect fourth", 
			"perfect fifth", "major sixth", "minor seventh"]],
		["phrygian",
			["minor second", "minor third", "perfect fourth",
			"perfect fifth", "minor sixth", "minor seventh"]],
		["lydian",
			["major second", "major third", "major fourth",
			"perfect fifth", "major sixth", "major seventh"]],
		["mixolydian",
			["major second", "major third", "perfect fourth",
			"perfect fifth", "major sixth", "minor seventh"]],
		["aeolian",
			["major second", "minor third", "perfect fourth",
			"perfect fifth", "minor sixth", "minor seventh"]],
		["locrian",
			["minor second", "minor third", "perfect fourth",
			"minor fifth", "minor sixth", "minor seventh"]],
		["natural minor",
			["major second", "minor third", "perfect fourth",
			"perfect fifth", "minor sixth", "minor seventh"]],
		["harmonic minor",
			["major second", "minor third", "perfect fourth",
			"perfect fifth", "minor sixth", "major seventh"]],
		["melodic minor",
			["major second", "minor third", "perfect fourth",
			"perfect fifth", "major sixth", "major seventh"]],
	];

	var tonic = scale[0];
	var n = 0;

	// -- Describing the algorithm:
	// Filter out all the wrong answers in possible_result
	var arr = scale.slice(1, scale.length);
	for (var i = 0; i < arr.length; i++) {
		var note = arr[i];
		// 1. Determine the interval
		intval = intervals.determine(tonic, note);
		temp = [];
		// 2. Go through possible_result and add it to temp if 
		// it's a hit, do nothing otherwise
		for (var k = 0; k < possible_result.length; k++) {
			var x = possible_result[k];
			if(x[1][n] == intval) {
				temp.push(x);
			}
		}
		n += 1;

		// 3. Set possible_result to temp
		possible_result = temp;
	};

	// Get the results from possible_result and return
	var res = [];
	for (var i = 0; i < possible_result.length; i++) {
		var x = possible_result[i];
		res.push(scale[0] + " " + x[0]);
	};
	return res
}
//export
exports.diatonic = diatonic;
exports.ionian = ionian;
exports.dorian = dorian
exports.phrygian = phrygian;
exports.lydian = lydian;
exports.mixolydian = mixolydian;
exports.aeolian = aeolian;
exports.locrian = locrian;
exports.natural_minor = natural_minor;
exports.harmonic_minor = harmonic_minor;
exports.melodic_minor = melodic_minor;
exports.chromatic = chromatic;
exports.whole_note = whole_note;
exports.diminished = diminished;
exports.determine = determine;