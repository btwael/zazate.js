var intervals = require('./intervals.js'),
	_ = require('underscore');

_note_dict = {
	'C' : 0, 
	'D' : 2,
	'E' : 4,
	'F' : 5, 
	'G' : 7,
	'A' : 9,
	'B' : 11 
};

fifths = ['F', 'C', 'G', 'D', 'A', 'E', 'B'];

Array.prototype.hasObject = (
	!Array.indexOf ? function (o) {
		var l = this.length + 1;
		while (l -= 1){
			if (this[l - 1] === o) {
				return true;
			}
		}
		return false;
	} : function (o) {
		return (this.indexOf(o) !== -1);
	}
);

function int_to_note(note_int) {
	if(!_.range(0,12).hasObject(note_int)) {
		throw "RangeError: int out of bounds (0-11):" + note_int;
	}
	n = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	return n[note_int];
}


function is_enharmonic(note1, note2) {
	return note_to_int(note1) == note_to_int(note2);
}

function is_valid_note(note) {
	if(!_note_dict.hasOwnProperty(note[0])) {
		return false;
	}
	var post, _i, _len, _ref;
	_ref = note.slice(1, note.length);
	for(_i = 0, _len = _ref.length; _i < _len; _i++) {
		post = _ref[_i];
		if (post !== 'b' && post !== '#') {
			return false;
		}
	}
	return true;
}

function note_to_int(note) {
	if(is_valid_note(note)) {
		val = _note_dict[note[0]];
	} else {
		throw "NoteFormatError: Unknown note format '" + note + "'";
	}
	var post, _i, _len, _ref;
	_ref = note.slice(1, note.length);
	for(_i = 0, _len = _ref.length; _i < _len; _i++) {
		post = _ref[_i];
		if (post === 'b') {
			val -= 1;
		} else if (post === '#') {
			val += 1;
		}
	}
	return val % 12;
}

function remove_redundant_accidentals(note) {
	var result, token, val, _i, _len, _ref;
	val = 0;
	_ref = note.slice(1, note.length);
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		token = _ref[_i];
		if (token === 'b') {
			val -= 1;
		} else if (token === '#') {
			val += 1;
		}
	}
	
	result = note[0];
	while (val > 0) {
		result = augment(result);
		val -= 1;
	}

	while (val < 0) {
		result = diminish(result);
		val += 1;
	}

	return result;
}

function augment(note) {
	if(note[note.length-1] != 'b') {
		return note + '#';
	} else {
		return note.slice(0, note.length-1);
	}
}

function diminish(note) {
	if(note[note.length-1] != '#') {
		return note + 'b';
	} else {
		return note.slice(0, note.length-1);
	}
}

function to_major(note) {
	return intervals.minor_third(note);
}

function to_minor(note) {
	return intervals.major_sixth(note);
}

//export
exports._note_dict = _note_dict;
exports.fifths = fifths;
exports.int_to_note = int_to_note;
exports.is_enharmonic = is_enharmonic;
exports.is_valid_note = is_valid_note;
exports.note_to_int = note_to_int;
exports.remove_redundant_accidentals = remove_redundant_accidentals;
exports.augment = augment
exports.diminish = diminish;
exports.to_major = to_major;
exports.to_minor = to_minor;