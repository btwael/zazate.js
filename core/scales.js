var intervals = require('./intervals.js'),
	notes = require('./notes.js'),
	get_notes = require('./diatonic.js').get_notes,
	_ = require('../node_modules/underscore');

// The diatonic scales and its modes

function diatonic(note) {
	return get_notes(note);
}

function ionian(note) {
	return diatonic(note);
}

function dorian(note) {
	var i = ionian(intervals.minor_seventh(note));
	var arr = i.slice(1, i.length);
	arr.push(i[0]);
	return arr;
}

function phrygian(note) {
	var i = ionian(intervals.minor_sixth(note));
	var arr = i.slice(2, i.length);
	for (var k = 0; k < 2; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function lydian(note) {
	var i = ionian(intervals.perfect_fifth(note))
	var arr = i.slice(3, i.length);
	for (var k = 0; k < 3; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function mixolydian(note) {
	var i = ionian(intervals.perfect_fourth(note))
	var arr = i.slice(4, i.length);
	for (var k = 0; k < 4; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function aeolian(note) {
	var i = ionian(intervals.minor_third(note))
	var arr = i.slice(5, i.length);
	for (var k = 0; k < 5; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function locrian(note) {
	var i = ionian(intervals.minor_second(note))
	var arr = i.slice(6, i.length);
	for (var k = 0; k < 6; k++) {
		arr.push(i[k]);
	};
	return arr;
}

// The minor modes

function natural_minor(note) {
	var i = get_notes(notes.to_major(note));
	var arr = i.slice(5, i.length);
	for (var k = 0; k < 5; k++) {
		arr.push(i[k]);
	};
	return arr;
}

function harmonic_minor(note) {
	var nat = natural_minor(note);
	nat[6] = notes.augment(nat[6]);
	return nat;
}

function melodic_minor(note) {
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

	var arr = scale.slice(1, scale.length);
	for (var i = 0; i < arr.length; i++) {
		var note = arr[i];
		intval = intervals.determine(tonic, note);
		temp = [];
		for (var k = 0; k < possible_result.length; k++) {
			var x = possible_result[k];
			if(x[1][n] == intval) {
				temp.push(x);
			}
		}
		n += 1;

		possible_result = temp;
	};

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