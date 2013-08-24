var intervals = require('./intervals.js'),
	_ = require('../node_modules/underscore');


// _note_dict is a mapping of the C scale to half notes. It is used to calculate 
// for instance C# (add 1 to 0), Fb (substract 1 from 5), etc. in note_to_int
// and it is also used in is_valid_note to check formatting validity.
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

//Find object in array function
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
	/* Converts integers in the range of 0-11 to notes in the 
	form of C or C# (no Cb). You can use int_to_note in diatonic_key to
	do theoretically correct conversions that bear the key in mind. */

	if(!_.range(0,12).hasObject(note_int)) {
		throw "RangeError: int out of bounds (0-11):" + note_int;
	}
	n = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
	return n[note_int];
}


function is_enharmonic(note1, note2) {
	// Test whether note1 and note2 are enharmonic, ie. they sound the same
	return note_to_int(note1) == note_to_int(note2);
}

function is_valid_note(note) {
	// Returns true if note is in a recognised format. False if not
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
	/* Converts notes in the form of C, C#, Cb, C##, etc. to 
	an integer in the range of 0-11. Throws an !NoteFormatError
	exception if the note format is not recognised. */
	if(is_valid_note(note)) {
		val = _note_dict[note[0]];
	} else {
		throw "NoteFormatError: Unknown note format '" + note + "'";
	}
	// Check for '#' and 'b' postfixes
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
	/* Removes redundant #'s and b's from the given note. \
	For example: C##b becomes C#, Eb##b becomes E, etc. */
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
	/* Augments a given note. 
	Examples:
	>>> augment("C") // return 'C#'
	>>> augment("Cb") // return 'C' */
	if(note[note.length-1] != 'b') {
		return note + '#';
	} else {
		return note.slice(0, note.length-1);
	}
}

function diminish(note) {
	/* Diminishes a given note.
	Examples:
	>>> diminish("C") // return 'Cb'
	>>> diminish("C#") //return 'C' */
	if(note[note.length-1] != '#') {
		return note + 'b';
	} else {
		return note.slice(0, note.length-1);
	}
}

function to_major(note) {
	/* Returns the major of `note`.
	Example:
	>>> to_major("A") // return 'C' */
	return intervals.minor_third(note);
}

function to_minor(note) {
	/* Returns the minor of note.
	Example:
	>>> to_minor("C") // return 'A' */
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