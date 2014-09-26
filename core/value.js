var _ = require('underscore');

var longa = 0.25,
	breve = 0.5,
	semibreve = 1,
	minim = 2,
	crotchet = 4,
	quaver = 8,
	semiquaver = 16,
	demisemiquaver = 32,
	hemidemisemiquaver = 64,
	quasihemidemisemiquaver = 128,
	semihemidemisemiquaver = 128,
	whole = 1,
	half = 2,
	quarter = 4,
	eighth = 8,
	sixteenth = 16,
	thirty_second = 32,
	sixty_fourth = 64,
	hundred_twenty_eighth = 128,
	musicxml = {
		1: 'whole',
		2: 'half',
		4: 'quarter',
		8: 'eighth',
		16: '16th',
		32: '32th',
		64: '64th',
		128: '128th',
	},
	base_values = [
		0.25,
		0.5,
		1,
		2,
		4,
		8,
		16,
		32,
		64,
		128,
	],
	base_quintuplets = [
		0.3125,
		0.625,
		1.25,
		2.5,
		5,
		10,
		20,
		40,
		80,
		160,
	],
	base_triplets = [
		0.375,
		0.75,
		1.5,
		3,
		6,
		12,
		24,
		48,
		96,
		192,
	],
	base_septuplets = [
		0.4375,
		0.875,
		1.75,
		3.5,
		7,
		14,
		28,
		56,
		112,
		224,
	];

function add(value1, value2) {
	return 1 / (1 / value1 + 1 / value2);
}

function subtract(value1, value2) {
	return 1 / (1.0 / value1 - 1.0 / value2);
}

function dots(value, nr) {
	if(nr == null) {
		nr = 1;
	}
	return (0.5 * value) / (1.0 - Math.pow(0.5, (nr + 1)));
}

function triplet(value) {
	return tuplet(value, 3, 2);
}

function quintuplet(value) {
	return tuplet(value, 5, 4);
}

function septuplet(value, in_fourths) {
	if(in_fourths == null) {
		in_fourths = true;
	}
	if(in_fourths) {
		return tuplet(value, 7, 4);
	} else {
		return tuplet(value, 7, 8);
	}
}

function tuplet(value, rat1, rat2) {
	return (rat1 * value) / rat2;
}

function determine(value) {
	var i = -2,
		v;
	for (var _i = 0; _i < base_values.length; _i++) {
		v = base_values[_i];
		if(value == v) {
			return [value, 0, 1, 1];
		}
		if(value < v) {
			break;
		}
		i++
	};
	var scaled = value / Math.pow(2, i)
	if(scaled >= 0.9375) {
		return [base_values[i], 0, 1, 1];
	} else if(scaled >= 0.8125) {
		return [base_values[i + 1], 0, 7, 4];
	} else if (scaled >= 17 / 24.0) {
		return [base_values[i + 1], 0, 3, 2];
	} else if (scaled >= 31 / 48.0) {
		return [v, 1, 1, 1];
	} else if (scaled >= 67 / 112.0) {
		return [base_values[i + 1], 0, 5, 4];
	}
	var d = 3;
	for (var _i = 0; _i < _.range(2, 5).length; _i++) {
		var x = _.range(2, 5)[_i];
		d += Math.pow(2, x);
		if(scaled == Math.pow(2.0, x / d)) {
			return [v, x, 1, 1];
		}
	};
	return [base_values[i + 1], 0, 1, 1];
}
//exports
exports.longa = longa;
exports.breve = breve;
exports.semibreve = semibreve;
exports.minim = minim;
exports.crotchet = crotchet;
exports.quaver = quaver;
exports.semiquaver = semiquaver;
exports.demisemiquaver = demisemiquaver;
exports.hemidemisemiquaver = hemidemisemiquaver;
exports.quasihemidemisemiquaver = quasihemidemisemiquaver;
exports.semihemidemisemiquaver = semihemidemisemiquaver;
exports.whole = whole;
exports.half = half;
exports.quarter = quarter;
exports.eighth = eighth;
exports.sixteenth = sixteenth;
exports.thirty_second = thirty_second;
exports.sixty_fourth = sixty_fourth;
exports.hundred_twenty_eighth = hundred_twenty_eighth;
exports.musicxml = musicxml;
exports.base_values = base_values;
exports.base_quintuplets = base_quintuplets;
exports.base_triplets = base_triplets;
exports.base_septuplets = base_septuplets;
exports.add = add;
exports.subtract = subtract;
exports.dots = dots;
exports.triplet = triplet;
exports.quintuplet = quintuplet;
exports.septuplet = septuplet;
exports.tuplet = tuplet;
exports.determine = determine;