var notes = require('./notes.js'),
	diatonic = require('./diatonic.js');
	_ = require('../node_modules/underscore');

function unison(note) {
	return note
}

// Diatonic intervals.
// Needs a note and a key.

function second(note, key) {
	return diatonic.interval(key, note, 1);
}

function third(note, key) {
	return diatonic.interval(key, note, 2);
}

function fourth(note, key) {
	return diatonic.interval(key, note, 3);
}

function fifth(note, key) {
	return diatonic.interval(key, note, 4);
}

function sixth(note, key) {
	return diatonic.interval(key, note, 5);
}

function seventh(note, key) {
	return diatonic.interval(key, note, 6);
}

// Absolute intervals
// Needs a note

function minor_unison(note) {
	return notes.diminish(note);
}

function major_unison(note) {
	return note;
}

function augmented_unison(note) {
	return notes.augment(note);
}

function minor_second(note) {
	sec = second(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sec, 1);
}

function major_second(note) {
	sec = second(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sec, 2);
}

function minor_third(note) {
	trd = third(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, trd, 3);
}
function major_third(note) {
	trd = third(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, trd, 4);
}
function minor_fourth(note) {
	frt = fourth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, frt, 4);
}

function major_fourth(note) {
	frt = fourth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, frt, 5);
}

function perfect_fourth(note) {
	return major_fourth(note);
}

function minor_fifth(note) {
	fif = fifth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, fif, 6);
}

function major_fifth(note) {
	fif = fifth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, fif, 7);
}

function perfect_fifth(note) {
	return major_fifth(note);
}

function minor_sixth(note) {
	sth = sixth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sth, 8);
}

function major_sixth(note) {
	sth = sixth(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sth, 9);
}

function minor_seventh(note) {
	sth = seventh(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sth, 10);
}

function major_seventh(note) {
	sth = seventh(note[0], 'C');
	return augment_or_diminish_until_the_interval_is_right(note, sth, 11);
}

function get_interval(note, interval, key) {
	 if (key == null) {
		key = 'C';
	}
	intervals = [0, 2, 4, 5, 7, 9, 11].map(function(x) {
		return (notes.note_to_int(key) + x) % 12;
	});
	key_notes = diatonic.get_notes(key);

	var result, x, _i, _len;
	for (_i = 0, _len = key_notes.length; _i < _len; _i++) {
	x = key_notes[_i];
		if (x[0] === note[0]) {
			result = (intervals[key_notes.indexOf(x)] + interval) % 12;
		}
	}

	var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	if (__indexOf.call(intervals, result) >= 0) {
		return key_notes[intervals.indexOf(result)] + note.slice(1, note.length);
	} else {
		return notes.diminish(key_notes[intervals.indexOf((result + 1) % 12)] + note.slice(1, note.length));
	}
}

function measure(note1, note2) {
	res = notes.note_to_int(note2) - notes.note_to_int(note1);
	if(res < 0) {
		return 12 - (res * (-1));
	} else {
		return res;
	}
}

function augment_or_diminish_until_the_interval_is_right(note1, note2, interval) {
	var cur, note2;

	cur = measure(note1, note2);

	while(cur !== interval) {
		if (cur > interval) {
			note2 = notes.diminish(note2);
		} else if (cur < interval) {
			note2 = notes.augment(note2);
		}
		cur = measure(note1, note2);
	}

	// We are practically done right now, but we need to be able to create
	// the minor seventh of Cb and get Bbb instead of B######### as the result
	var token, val, _i, _len, _ref;

	val = 0;

	_ref = note2.slice(1, note2.length);
	for(_i = 0, _len = _ref.length; _i < _len; _i++) {
		token = _ref[_i];
		if (token === '#') {
			val += 1;
		} else if (token === 'b') {
			val -= 1;
		}
	}

	// These are some checks to see if we have generated too much #'s
	// or too much b's. In these cases we need to convert #'s to b's
	// and vice versa. 
	
	if (val > 6) {
		val = val % 12;
		val = -12 + val;
	} else if (val < -6) {
		val = val % -12;
		val = 12 + val;
	}

	// Rebuild the note
	result = note2[0]

	while (val > 0) {
		result = notes.augment(result);
		val -= 1;
	}

	while (val < 0) {
		result = notes.diminish(result);
		val += 1;
	}

	return result;
}

function invert(interval) {
	res = interval.reverse();
	return res;
}

function determine(note1, note2, shorthand) {
	if (shorthand == null) {
		shorthand = false;
	}
	// Corner case for unisons ('A' and 'Ab', for instance)
	var get_val, x, y;
	if (note1[0] === note2[0]) {
		get_val = function(note) {
			//Private function to count the value of accidentals
			var r, x, _i, _len, _ref;
			r = 0;
			_ref = note.slice(1, note.length);
			for (_i = 0, _len = _ref.length; _i < _len; _i++) {
				x = _ref[_i];
				if (x === 'b') {
					r -= 1;
				} else if (x === '#') {
					r += 1;
				}
			}
			return r;
		};
		x = get_val(note1);
		y = get_val(note2);
		if (x === y) {
			if (!shorthand) {
				return "major unison";
			}
			return "1";
		} else if (x < y) {
			if (!shorthand) {
				return "augmented unison";
			}
			return "#1";
		} else if (x - y === 1) {
			if (!shorthand) {
				return "minor unison";
			}
			return "b1";
		} else {
			if (!shorthand) {
				return "diminished unison";
			}
			return "bb1";
		}
	}

	// Other intervals
	n1 = notes.fifths.indexOf(note1[0]);
	n2 = notes.fifths.indexOf(note2[0]);

	number_of_fifth_steps = n2 - n1;

	if(n2 < n1) {
		number_of_fifth_steps = notes.fifths.length - n1 + n2;
	}
	// [name, shorthand_name, half notes for major version of this interval]
	fifth_steps = [
		["unison", "1", 0],
		["fifth", "5", 7],
		["second", "2", 2],
		["sixth", "6", 9],
		["third", "3", 4],
		["seventh", "7", 11],
		["fourth", "4", 5]
	];

	// Count half steps between note1 and note2
	half_notes = measure(note1, note2);
	// Get the proper list from the number of fifth steps
	current = fifth_steps[number_of_fifth_steps];

	// maj = number of major steps for this interval
	maj = current[2];

	// if maj is equal to the half steps between note1 and note2
	// the interval is major or perfect
	if(maj == half_notes) {
		// Corner cases for perfect fifths and fourths
		if(current[0] == "fifth") {
			if(!shorthand) {
				return "perfect fifth";
			}
		} else if(current[0] == "fourth") {
			if(!shorthand) {
				return "perfect fourth";
			}
		}
		if(!shorthand) {
			return "major " + current[0];
		}
		return current[1];
	} else if(maj + 1 <= half_notes) {
	 // if maj + 1 is equal to half_notes, the interval is augmented.
		if(!shorthand) {
			return "augmented " + current[0];
		}
		return "#" * (half_notes - maj) + current[1];

	// etc.
	} else if(maj - 1 == half_notes) {
		if(!shorthand) {
			return "minor " + current[0];
		}
		return "b" + current[1];

	} else if(maj - 2 >= half_notes) {
		if(!shorthand) {
			return "diminished " + current[0];
		}
		return "b" * (maj - half_notes) + current[1];
	}
}

function from_shorthand(note, interval, up) {
	if (up == null) {
		up = true;
	}

	//warning should be a valid note.
	if(!notes.is_valid_note(note)) {
		return false;
	}

	// [shorthand, interval function up, interval function down]
	shorthand_lookup = [
		["1", major_unison, major_unison],
		["2", major_second, minor_seventh],
		["3", major_third, minor_sixth],
		["4", major_fourth, major_fifth],
		["5", major_fifth, major_fourth],
		["6", major_sixth, minor_third],
		["7", major_seventh, minor_second]
	];

	// Looking up last character in interval in shorthand_lookup
	// and calling that function.
	val = false;
	var shorthand, _i, _len;
	for (_i = 0, _len = shorthand_lookup.length; _i < _len; _i++) {
		shorthand = shorthand_lookup[_i];
		if (shorthand[0] === interval[interval.length-1]) {
			if (up) {
				val = shorthand[1](note);
			} else {
				val = shorthand[2](note);
			}
		}
	}
	
	// warning Last character in interval should be 1-7
	if(val == false) {
		return false;
	}
	// Collect accidentals
	var x, _i, _len;

	for (_i = 0, _len = interval.length; _i < _len; _i++) {
		x = interval[_i];
		if (x === "#") {
			if (up) {
				val = notes.augment(val);
			} else {
				val = notes.diminish(val);
			}
		} else if (x === "b") {
			if (up) {
				val = notes.diminish(val);
			} else {
				val = notes.augment(val);
			}
		} else {
			return val;
		}
	}
}

function is_consonant(note1, note2, include_fourths) {
	if (include_fourths == null) {
		include_fourths = true;
	}
	return is_perfect_consonant(note1, note2, include_fourths) || is_imperfect_consonant(note1, note2);
}

function is_perfect_consonant(note1, note2, include_fourths) {
	if (include_fourths == null) {
		include_fourths = true;
	}
	dhalf = measure(note1, note2);
	return (dhalf === 0 || dhalf === 7) || (include_fourths && dhalf === 5);
}
function is_imperfect_consonant(note1, note2) {
	var _ref;
	return (_ref = measure(note1, note2)) === 3 || _ref === 4 || _ref === 8 || _ref === 9;
}

function is_dissonant(note1, note2, include_fourths) {
	if(include_fourths == null) {
		include_fourths = false;
	}
    return !(is_consonant(note1, note2, !include_fourths));
}
//export
exports.unison = unison;
exports.second = second;
exports.third = third;
exports.fourth = fourth;
exports.fifth = fifth;
exports.sixth = sixth;
exports.seventh = seventh;
exports.minor_unison = minor_unison;
exports.major_unison = major_unison;
exports.augmented_unison = augmented_unison;
exports.minor_second = minor_second;
exports.major_second = major_second;
exports.minor_third = minor_third;
exports.major_third = major_third;
exports.minor_fourth = minor_fourth;
exports.major_fourth = major_fourth;
exports.perfect_fourth =perfect_fourth;
exports.minor_fifth = minor_fifth;
exports.major_fifth = major_fifth;
exports.perfect_fifth =perfect_fifth;
exports.minor_sixth = minor_sixth;
exports.major_sixth = major_sixth;
exports.minor_seventh = minor_seventh;
exports.major_seventh = major_seventh;
exports.get_interval = get_interval;
exports.measure = measure;
exports.augment_or_diminish_until_the_interval_is_right = augment_or_diminish_until_the_interval_is_right;
exports.invert = invert;
exports.determine = determine;
exports.from_shorthand = from_shorthand;
exports.is_consonant = is_consonant;
exports.is_dissonant = is_dissonant;
exports.is_perfect_consonant = is_perfect_consonant;
exports.is_imperfect_consonant = is_imperfect_consonant;