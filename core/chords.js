var intervals = require('./intervals.js'),
	notes = require('./notes.js'),
	diatonic = require('./diatonic.js');

// A cache for composed triads
_triads_cache = {};
// A cache for composed sevenths
_sevenths_cache = {};

// A dictionairy that can be used to present
// lookup chord abbreviations. This dictionairy is also
// used in determine_seventh()
chord_shorthand_meaning = {
		// Triads
		"m" : " minor triad",
		"M" : " major triad",
		"" : " major triad",
		"dim" : " diminished triad",

		// Augmented chords
		"aug" : " augmented triad",
		"+" : " augmented triad",
		"7#5" : " augmented minor seventh",
		"M7+5" : " augmented minor seventh",
		"M7+" : " augmented major seventh",
		"m7+" : " augmented minor seventh",
		"7+" : " augmented major seventh",

		// Suspended chords
		"sus47" :" suspended seventh",
		"sus4" :" suspended fourth triad",
		"sus2" :" suspended second triad",
		"sus" :" suspended fourth triad",
		"11" :" eleventh",
		"sus4b9" :" suspended fourth ninth",
		"susb9" :" suspended fourth ninth",

		// Sevenths
		"m7" :" minor seventh",
		"M7" :" major seventh",
		"dom7" :" dominant seventh",
		"7" :" dominant seventh",
		"m7b5" :" half diminished seventh",
		"dim7" :" diminished seventh",
		"m/M7" :" minor/major seventh",
		"mM7" :" minor/major seventh",
		
		// Sixths
		"m6" : " minor sixth",
		"M6" : " major sixth",
		"6" : " major sixth", 
		"6/7" : " dominant sixth",
		"67": " dominant sixth",
		"6/9" :" sixth ninth",
		"69" : " sixth ninth",

		// Ninths
		"9" : " dominant ninth",
		"7b9" : " dominant flat ninth",
		"7#9" :" dominant sharp ninth",
		"M9" :" major ninth",
		"m9" :" minor ninth",

		// Elevenths
		"7#11" :" lydian dominant seventh",
		"m11" :" minor eleventh",

		// Thirteenths
		"M13" :" major thirteenth",
		"m13" :" minor thirteenth",

		"13" :" dominant thirteenth",

		// Altered Chords
		"7b5" :" dominant flat five",
		
		// Special
		"hendrix" :" hendrix chord",
		"7b12" :" hendrix chord",
		"5" :" perfect fifth"
};

/*===================================================================
							Triads
===================================================================*/

// diatonic

function triad(note, key) {
	/*Returns the triad on note in key as a list.
	Examples:
	>>> triad("E", "C") /return ["E", "G", "B"]
	>>> triad("E", "B") // return ["E", "G#", "B"]
	*/
	return [note, intervals.third(note, key), intervals.fifth(note, key)]
}

function triads(key) {
	//Returns all the triads in key. Implemented using a cache.
	if(_triads_cache.hasOwnProperty(key)) {
		return _triads_cache[key];
	}
	var res = diatonic.get_notes(key).map(function (x) {
		return triad(x, key);
	});
	_triads_cache[key] = res;
	return res;
}

// absolute

function major_triad(note) {
	/*Builds a major triad on note.
	Example:
	{{{
	>>> major_triad("C")
	["C", "E", "G"]
	*/
	return [note, intervals.major_third(note), intervals.perfect_fifth(note)];
}

function minor_triad(note) {
	/* Builds a minor triad on note.
	Example:
	{{{
	>>> minor_triad("C")
	["C", "Eb", "G"]
	}}} */
	return [note, intervals.minor_third(note), intervals.perfect_fifth(note)];
}

function diminished_triad(note) {
	/* Builds a diminished triad on note.
	Example:
	{{{
	>>> diminished_triad("C")
	["C", "Eb", "Gb"]
	}}}*/
	return [note, intervals.minor_third(note), intervals.minor_fifth(note)];
}

function augmented_triad(note) {
	/*Builds an augmented triad on note.
	Example:
	{{{
	>>> augmented_triad("C")
	["C", "E", "G#"]
	}}}*/
	return [note, intervals.major_third(note), notes.augment(intervals.major_fifth(note))];
}


/*===================================================================
							Sevenths
===================================================================*/

// diatonic

function seventh(note, key) {
	/*Returns the seventh chord on note in key.
	Example:
	{{{
	>>> seventh("C", "C")
	["C", "E", "G", "B"]
	}}}*/
	var arr = triad(note, key);
	arr.push(intervals.seventh(note, key));
	return arr;
}


function sevenths(key) {
	/*Returns all the sevenths chords in key in a list*/
	if(_sevenths_cache.hasOwnProperty(key)) {
		return _sevenths_cache[key];
	}

	res = diatonic.get_notes(key).map(function (x) {
		return seventh(x, key);
	});
	_sevenths_cache[key] = res;
	return res;
}

//absolute

function major_seventh(note) {
	/*Builds a major seventh on note.
	Example:
	{{{
	>>> major_seventh("C") 
	["C", "E", "G", "B"]
	}}}*/
	var arr = major_triad(note);
	arr.push(intervals.major_seventh(note));
	return arr;
}

function minor_seventh(note) {
	/*Builds a minor seventh on note.
	Example:
	{{{
	>>> minor_seventh("C")
	["C", "Eb", "G", "Bb"]
	}}}*/
	var arr = minor_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function dominant_seventh(note) {
	/*Builds a dominant seventh on note.
	Example:
	{{{
	>>> dominant_seventh("C")
	["C", "E", "G", "Bb"]
	}}}*/
	var arr = major_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function half_diminished_seventh(note) {
	/*Builds a half diminished seventh (=minor seventh flat five) \
	chord on note.
		Example:
	{{{
	>>> half_diminished_seventh("C")
	["C", "Eb", "Gb", "Bb"]
	}}}*/
	var arr = diminished_triad(note);
	arr.push(intervals.minor_seventh(note));
	return  arr;
}

function minor_seventh_flat_five(note) {
	/*See half_diminished_seventh(note) for docs*/
	return half_diminished_seventh(note);
}

function diminished_seventh(note) {
	/*Builds a diminished seventh chord on note.
	Example:
	{{{
	>>> diminished_seventh("C") 
	["C", "Eb", "Gb", "Bbb"]
	}}}*/
	var arr = diminished_triad(note);
	arr.push(notes.diminish(intervals.minor_seventh(note)));
	return arr;
}

function minor_major_seventh(note) {
	/*Builds a minor major seventh chord on note.
	Example:
	{{{
	>>> minor_major_seventh("C")
	["C", "Eb", "G", "B"]
	}}}*/
	var arr = minor_triad(note);
	arr.push(intervals.major_seventh(note));
	return arr;
}

/*===================================================================
							Sixths
===================================================================*/

// absolute

function minor_sixth(note) {
	/*Builds a minor sixth chord on note.
	Example:
	{{{
	>>> minor_sixth("C")
	['C', 'Eb', 'G', 'A']
	}}}*/
	var arr = minor_triad(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}

function major_sixth(note) {
	/*Builds a major sixth chord on note.
	Example:
	{{{
	>>> major_sixth("C")
	['C', 'E', 'G', 'A']
	}}}*/
	var arr = major_triad(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}

function dominant_sixth(note) {
	/*Builds the altered chord 6/7 on note.
	Example:
	{{{
	>>> dominant_sixth("C")
	['C', 'E', 'G', 'A', 'Bb']
	}}}*/
	var arr = major_sixth(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function sixth_ninth(note) {
	/*Builds the sixth/ninth chord on note.
	Example:
	{{{
	>>> sixth_ninth('C')
	['C', 'E', 'G', 'A', 'D']
	}}}*/
	var arr = major_sixth(note);
	arr.push(intervals.major_second(note));
	return arr;
}

/*===================================================================
							Ninths
===================================================================*/

// absolute

function minor_ninth(note) {
	/*Builds a minor ninth chord on note.
	Example:
	{{{
	>>> minor_ninth("C")
	['C', 'Eb', 'G', 'Bb', 'D']
	}}}*/
	var arr = minor_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function major_ninth(note) {
	/*Builds a major ninth chord on note.
	Example:
	{{{
	>>> major_ninth("C")
	['C', 'E', 'G', 'B', 'D']
	}}}*/
	var arr = major_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function dominant_ninth(note) {
	/*Builds a dominant ninth chord on note.
	Example:
	{{{
	>>> dominant_ninth("C")
	['C', 'E', 'G', 'Bb', 'D']
	}}}*/
	var arr = dominant_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function dominant_flat_ninth(note) {
	/*Builds a dominant flat ninth chord on note.
	Example:
	{{{
	>>> dominant_ninth("C")
	['C', 'E', 'G', 'Bb', 'Db']
	}}}*/
	var res = dominant_ninth(note);
	res[4] = intervals.minor_second(note);
	return res;
}

function dominant_sharp_ninth(note) {
	/*Builds a dominant sharp ninth chord on note.
	Example:
	{{{
	>>> dominant_ninth("C")
	['C', 'E', 'G', 'Bb', 'D#']
	}}}*/
	var res = dominant_ninth(note);
	res[4] = notes.augment(intervals.major_second(note));
	return res;
}

/*===================================================================
							Elevenths
===================================================================*/

// diatonic


// absolute


function eleventh(note) {
	/*Builds an eleventh chord on note.
	Example:
	{{{
	>>> eleventh("C")
	['C', 'G', 'Bb', 'F']
	}}}*/
	return [note, intervals.perfect_fifth(note), intervals.minor_seventh(note), intervals.perfect_fourth(note)];
}

function minor_eleventh(note) {
	/*Builds a minor eleventh chord on note.
	Example:
	{{{
	>>> minor_eleventh("C")
	['C', 'Eb', 'G', 'Bb', 'F']
	}}}*/
	var arr = minor_seventh(note);
	arr.push(intervals.perfect_fourth(note));
	return arr;
}

/*===================================================================
							Thirteenths
===================================================================*/

// absolute

function minor_thirteenth(note) {
	/*Builds a minor thirteenth chord on note.
	Example:
	{{{
	>>> minor_thirteenth('C')
	['C', 'Eb', 'G', 'Bb', 'D', 'A']
	}}}*/
	var arr = minor_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}


function major_thirteenth(note) {
	/*Builds a major thirteenth chord on note.
	Example:
	{{{
	>>> major_thirteenth('C')
	['C', 'E', 'G', 'B', 'D', 'A']
	}}}*/
	var arr = major_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}


function dominant_thirteenth(note) {
	/*Builds a dominant thirteenth chord on note.
	Example:
	{{{
	>>> dominant_thirteenth('C')
	['C', 'E', 'G', 'Bb', 'D', 'A']
	}}}*/
	var arr = dominant_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}
//export
exports._triads_cache = _triads_cache;
exports._sevenths_cache = _sevenths_cache;
exports.chord_shorthand_meaning = chord_shorthand_meaning;
exports.triad = triad;
exports.triads = triads;
exports.major_triad = major_triad;
exports.minor_triad = minor_triad;
exports.diminished_triad = diminished_triad;
exports.augmented_triad = augmented_triad;
exports.major_seventh = major_seventh;
exports.minor_seventh = minor_seventh;
exports.dominant_seventh = dominant_seventh;
exports.half_diminished_seventh = half_diminished_seventh;
exports.minor_seventh_flat_five = minor_seventh_flat_five;
exports.diminished_seventh = diminished_seventh;
exports.minor_major_seventh = minor_major_seventh;
exports.minor_sixth = minor_sixth;
exports.major_sixth = major_sixth;
exports.dominant_sixth = dominant_sixth;
exports.sixth_ninth = sixth_ninth;
exports.minor_ninth = minor_ninth;
exports.major_ninth = major_ninth;
exports.dominant_ninth = dominant_ninth;
exports.dominant_flat_ninth = dominant_flat_ninth
exports.dominant_sharp_ninth = dominant_sharp_ninth;
exports.eleventh = eleventh;
exports.minor_eleventh = minor_eleventh;
exports.minor_thirteenth = minor_thirteenth;
exports.major_thirteenth = major_thirteenth;
exports.dominant_thirteenth = dominant_thirteenth;