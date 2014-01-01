var notes = require('./notes.js'),
	_ = require('../node_modules/underscore');

basic_keys = ["Gb", "Db", "Ab", "Eb", "Bb", "F", "C", "G", "D", "A", "E", "B", "F#", "C#", "G#", "D#", "A#"];

_key_cache = {};

function get_notes(key) {
	//check cache
	var key_dict;
	if(_key_cache.hasOwnProperty(key)) {
		return _key_cache[key];
	} else if (!notes.is_valid_note(key)) {
		throw "NoteFormatError: Unrecognised format for key '" + key + "'";
	}

	var fifth_index = notes.fifths.indexOf(key[0]);

	var result = [];

	// fifth_index = 0 is a special case. It's the key of F and needs 
	// Bb instead of B included in the result.
	if(fifth_index != 0) {
		var x, _i, _j, _len, _len1, _ref, _ref1;
		result.push(notes.fifths[(fifth_index - 1) % 7] + key.slice(1, key.length));
		_ref = notes.fifths.slice(fifth_index, notes.fifths.length);
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			x = _ref[_i];
			result.push(x + key.slice(1, key.length));
		}
		_ref1 = notes.fifths.slice(0, fifth_index - 1);
		for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
			x = _ref1[_j];
			result.push(x + key.slice(1, key.length) + "#");
		}
	} else {
		var x, _i, _len, _ref;
		_ref = notes.fifths.slice(0, 6);
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			x = _ref[_i];
			result.push(x + key.slice(1, key.length));
		}
		result.push("Bb" + key.slice(1, key.length))
	}

	result.sort();

	// Remove redundant #'s and b's from the result
	result = result.map(notes.remove_redundant_accidentals);
	tonic = result.indexOf(notes.remove_redundant_accidentals(key))

	var el, pre_result, _i, _len;
	pre_result = result.slice(0, tonic);
	result = result.slice(tonic, result.length);
	for (_i = 0, _len = pre_result.length; _i < _len; _i++) {
		el = pre_result[_i];
		result.push(el);
	}

	// Save result to cache
	_key_cache[key] = result;
	return result;
}

function int_to_note(note_int, key) {
	if(!_.range(0,12).hasObject(note_int)) {
		throw "RangeError: Integer not in range 0-11.";
	}

	var intervals = [0, 2, 4, 5, 7, 9, 11];

	var current = notes.note_to_int(key);
	var known_intervals = intervals.map(function(x){
		(x + current) % 12;
	});

	known_notes = get_notes(key)
	var _ref, _ref1,
	__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

	if(__indexOf.call(known_intervals, note_int) >= 0) {
		return known_notes[known_intervals.index(note_int)];
	} else {
		if(_ref = note_int - 1, __indexOf.call(known_intervals, _ref) >= 0) {
			return notes.remove_redundant_accidentals(known_notes[known_intervals.indexOf(note_int - 1)] + "#");
		} else if (_ref1 = note_int + 1, __indexOf.call(known_intervals, _ref1) >= 0) {
			return notes.remove_redundant_accidentals(known_notes[known_intervals.indexOf(note_int + 1)] + "b");
		}
	}
}

function interval(key, start_note, interval) {
	if(!notes.is_valid_note(start_note)) {
		throw "KeyError: The start note '" + start_note + "' is not a valid note";
	}

	notes_in_key = get_notes(key);

	var index, n, _i, _len;

	for (_i = 0, _len = notes_in_key.length; _i < _len; _i++) {
		n = notes_in_key[_i];
		if(n[0] === start_note[0]) {
			index = notes_in_key.indexOf(n);
		}
	}
	return notes_in_key[(index + interval) % 7];
}

//export
exports.basic_keys = basic_keys;
exports._key_cache = _key_cache;
exports.get_notes = get_notes;
exports.int_to_note = int_to_note;
exports.interval = interval;