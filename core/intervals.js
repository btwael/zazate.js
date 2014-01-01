var notes = require('./notes.js'),
	diatonic = require('./diatonic.js');
	_ = require('../node_modules/underscore');

function unison(note) {
	/* One of the most useless methods ever written, which returns the \
	unison of note. The key is not at all important, but is here for \
	consistency reasons only. 
	Example: 
	>>> unison("C") // return 'C' */
	return note
}

// Diatonic intervals.
// Needs a note and a key.

function second(note, key) {
	/*Take the diatonic second of note in key.
	Examples: 
{{{
>>>	second("E", "C") 
'F'
>>> second("E", "D") 
'F#'
}}}
	Raises a !KeyError if the `note` is not found in the `key`. */
	return diatonic.interval(key, note, 1);
}

function third(note, key) {
	/* Take the diatonic third of note in key.
	Examples:
{{{
>>>	third("E", "C") 
'G'
>>>	third("E", "E") 
'G#'
}}}
	Raises a !KeyError if note is not found in key. */
	return diatonic.interval(key, note, 2);
}

function fourth(note, key) {
	/* Take the diatonic fourth of note in key.
	Examples:
{{{
>>>	fourth("E", "C") 
'A'
>>>	fourth("E", "B") 
'A#'
}}}
	Raises a !KeyError if note is not found in key. */
	return diatonic.interval(key, note, 3);
}

function fifth(note, key) {
	/* Take the diatonic fifth of note in key.
	Examples:
{{{
>>>	fifth("E", "C") 
'B'
>>>	fifth("E", "F") 
'Bb'
}}}
	Raises a !KeyError if note is not found in key.*/
	return diatonic.interval(key, note, 4);
}

function sixth(note, key) {
	/* Take the diatonic sixth of note in key.
	Examples:
{{{
>>>	sixth("E", "C") 
'C'
>>> sixth("E", "B") 
'C#'
}}}
	Raises a !KeyError if note is not found in key.*/
	return diatonic.interval(key, note, 5);
}

function seventh(note, key) {
	/* Take the diatonic seventh of note in key.
	Examples:
{{{
>>> seventh("E", "C") 
'D'
>>> seventh("E", "B") 
'D#'
}}}
	Raises a !KeyError if note is not found in key.*/
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
	/* Gets the note an interval (in half notes) away from the given note. \
	This will produce mostly theoretical sound results, but you should \
	use the minor and major functions to work around the corner cases. */
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
	/*Returns an integer in the range of 0-11, determining the half note \
steps between note1 and note2.
	Examples:
{{{
>>>	measure("C", "D")
2
>>>	measure("D", "C") 
10
}}}*/
	res = notes.note_to_int(note2) - notes.note_to_int(note1);
	if(res < 0) {
		return 12 - (res * (-1));
	} else {
		return res;
	}
}

function augment_or_diminish_until_the_interval_is_right(note1, note2, interval) {
	/* A helper function for the minor and major functions. \
	You should probably not use this directly */

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
	/* Invert an interval represented as `[note1, note2]`.
	For example:
{{{
>>> invert["C", "E"]
["E", "C"]
}}}	*/
	res = interval.reverse();
	return res;
}

function determine(note1, note2, shorthand) {
	/*Names the interval between note1 and note2.
	Example:
	{{{
	>>>	determine("C", "E") 
	'major third'
	>>> determine("C", "Eb") 
	'minor third'
	>>> determine("C", "E#") 
	'augmented third'
	>>> determine("C", "Ebb") 
	'diminished third'
	}}}
		
		This works for all intervals. Note that there are corner cases \
	for 'major' fifths and fourths: 
	{{{
	>>> determine("C", "G") 
	'perfect fifth'
	>>> determine("C", "F") 
	'perfect fourth'
	}}}*/

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
	/* Returns the note on interval up or down.
	Example:
	{{{
	>>> from_shorthand("A", "b3")
	'C'
	>>> from_shorthand("D", "2")
	'E'
	>>> from_shorthand("E", "2", False)
	'D'
	}}} */
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
	/* A consonance is a harmony, chord, or interval considered stable, \
	as opposed to a dissonance (see `is_dissonant`). This function tests \
	whether the given interval is consonant. This basically means that it \
	checks whether the interval is (or sounds like) a unison, third, sixth, \
	perfect fourth or perfect fifth. In classical music the fourth is \
	considered dissonant when used contrapuntal, which is why you can choose \
	to exclude it.*/
	if (include_fourths == null) {
		include_fourths = true;
	}
	return is_perfect_consonant(note1, note2, include_fourths) || is_imperfect_consonant(note1, note2);
}

function is_perfect_consonant(note1, note2, include_fourths) {
	/*Perfect consonances are either unisons, perfect fourths or fifths, \
	or octaves (which is the same as a unison in this model; see the \
	`container.Note` class for more). Perfect fourths are usually included \
	as well, but are considered dissonant when used contrapuntal, which is why \
	you can exclude them.*/
	if (include_fourths == null) {
		include_fourths = true;
	}
	dhalf = measure(note1, note2);
	return (dhalf === 0 || dhalf === 7) || (include_fourths && dhalf === 5);
}
function is_imperfect_consonant(note1, note2) {
	/*Imperfect consonances are either minor or major thirds or minor \
	or major sixths.*/
	var _ref;
	return (_ref = measure(note1, note2)) === 3 || _ref === 4 || _ref === 8 || _ref === 9;
}

function is_dissonant(note1, note2, include_fourths) {
	/*Tests whether an interval is considered unstable, dissonant. \
	In the default case perfect fourths are considered consonant, but this can \
	be changed with the `exclude_fourths` flag.*/
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