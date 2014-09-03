var intervals = require('./intervals.js'),
	notes = require('./notes.js'),
	diatonic = require('./diatonic.js'),
	_ = require('underscore');
__indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_triads_cache = {};
_sevenths_cache = {};

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
	return [note, intervals.third(note, key), intervals.fifth(note, key)]
}

function triads(key) {
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
	return [note, intervals.major_third(note), intervals.perfect_fifth(note)];
}

function minor_triad(note) {
	return [note, intervals.minor_third(note), intervals.perfect_fifth(note)];
}

function diminished_triad(note) {
	return [note, intervals.minor_third(note), intervals.minor_fifth(note)];
}

function augmented_triad(note) {
	return [note, intervals.major_third(note), notes.augment(intervals.major_fifth(note))];
}


/*===================================================================
							Sevenths
===================================================================*/

// diatonic

function seventh(note, key) {
	var arr = triad(note, key);
	arr.push(intervals.seventh(note, key));
	return arr;
}


function sevenths(key) {
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
	var arr = major_triad(note);
	arr.push(intervals.major_seventh(note));
	return arr;
}

function minor_seventh(note) {
	var arr = minor_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function dominant_seventh(note) {
	var arr = major_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function half_diminished_seventh(note) {
	var arr = diminished_triad(note);
	arr.push(intervals.minor_seventh(note));
	return  arr;
}

function minor_seventh_flat_five(note) {
	return half_diminished_seventh(note);
}

function diminished_seventh(note) {
	var arr = diminished_triad(note);
	arr.push(notes.diminish(intervals.minor_seventh(note)));
	return arr;
}

function minor_major_seventh(note) {
	var arr = minor_triad(note);
	arr.push(intervals.major_seventh(note));
	return arr;
}

/*===================================================================
							Sixths
===================================================================*/

// absolute

function minor_sixth(note) {
	var arr = minor_triad(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}

function major_sixth(note) {
	var arr = major_triad(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}

function dominant_sixth(note) {
	var arr = major_sixth(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function sixth_ninth(note) {
	var arr = major_sixth(note);
	arr.push(intervals.major_second(note));
	return arr;
}

/*===================================================================
							Ninths
===================================================================*/

// absolute

function minor_ninth(note) {
	var arr = minor_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function major_ninth(note) {
	var arr = major_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function dominant_ninth(note) {
	var arr = dominant_seventh(note);
	arr.push(intervals.major_second(note));
	return arr;
}

function dominant_flat_ninth(note) {
	var res = dominant_ninth(note);
	res[4] = intervals.minor_second(note);
	return res;
}

function dominant_sharp_ninth(note) {
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
	return [note, intervals.perfect_fifth(note), intervals.minor_seventh(note), intervals.perfect_fourth(note)];
}

function minor_eleventh(note) {
	var arr = minor_seventh(note);
	arr.push(intervals.perfect_fourth(note));
	return arr;
}

/*===================================================================
							Thirteenths
===================================================================*/

// absolute

function minor_thirteenth(note) {
	var arr = minor_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}


function major_thirteenth(note) {
	var arr = major_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}


function dominant_thirteenth(note) {
	var arr = dominant_ninth(note);
	arr.push(intervals.major_sixth(note));
	return arr;
}

/*===================================================================
							Suspended Chords
===================================================================*/

// absolute

function suspended_triad(note) {
	return suspended_fourth_triad(note)
}


function suspended_second_triad(note) {
	return [note, intervals.major_second(note), intervals.perfect_fifth(note)];
}


function suspended_fourth_triad(note) {
	return [note, intervals.perfect_fourth(note), intervals.perfect_fifth(note)]
}

function suspended_seventh(note) {
	var arr = suspended_fourth_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

function suspended_fourth_ninth(note) {
	var arr = suspended_fourth_triad(note);
	arr.push(intervals.minor_second(note));
	return arr;
}

/*===================================================================
							Augmented Chords
===================================================================*/

function augmented_major_seventh(note) {
	var arr = augmented_triad(note);
	arr.push(intervals.major_seventh(note));
	return arr;
}

function augmented_minor_seventh(note) {
	var arr = augmented_triad(note);
	arr.push(intervals.minor_seventh(note));
	return arr;
}

/*===================================================================
							Various, Altered and Special chords
===================================================================*/

function dominant_flat_five(note) {
	var res = dominant_seventh(note)
	res[2] = notes.diminish(res[2])
	return res;
}

function lydian_dominant_seventh(note) {
	var arr = dominant_seventh(note);
	arr.push(notes.augment(intervals.perfect_fourth(note)));
	return arr;
}

function hendrix_chord(note) {
	var arr = dominant_seventh(note);
	arr.push(intervals.minor_third(note));
	return arr;
}

/*===================================================================
							Chords by harmonic function
===================================================================*/

function tonic(key) {
	return triads(key)[0];
}

function tonic7(key) {
	return sevenths(key)[0];
}

function supertonic(key) {
	return triads(key)[1];
}

function supertonic7(key) {
	return sevenths(key)[1];
}

function mediant(key) {
	return triads(key)[2];
}

function mediant7(key) {
	return sevenths(key)[2];
}

function subdominant(key) {
	return triads(key)[3];
}

function subdominant7(key) {
	return sevenths(key)[3];
}

function dominant(key) {
	return triads(key)[4];
}

function dominant7(key) {
	return sevenths(key)[4];
}

function submediant(key) {
	return triads(key)[5];
}

function submediant7(key) {
	return sevenths(key)[5];
}

function subtonic(key) {
	return triads(key)[6];
}

function subtonic7(key) {
	return sevenths(key)[6];
}

/*===================================================================
							Aliases
===================================================================*/

function I(key) {
	return tonic(key);
}

function I7(key) {
	return tonic7(key);
}

function ii(key) {
	return supertonic(key);
}

function II(key) {
	return supertonic(key);
}

function ii7(key) {
	return supertonic7(key);
}

function II7(key) {
	return supertonic7(key);
}

function iii(key) {
	return mediant(key);
}

function III(key) {
	return mediant(key);
}

function iii7(key) {
	return mediant7(key);
}

function III7(key) {
	return mediant7(key);
}

function IV(key) {
	return subdominant(key);
}

function IV7(key) {
	return subdominant7(key);
}

function V(key) {
	return dominant(key);
}

function V7(key) {
	return dominant7(key);
}

function vi(key) {
	return submediant(key);
}

function VI(key) {
	return submediant(key);
}

function vi7(key) {
	return submediant7(key);
}

function VI7(key) {
	return submediant7(key);
}

function vii(key) {
	return subtonic(key);
}

function VII(key) {
	return subtonic(key);
}

function vii7(key) {
	return subtonic(key);
}

function VII7(key) {
	return subtonic7(key);
}

/*===================================================================
							Inversions
===================================================================*/

function invert(chord) {
	var a = chord.slice(1, chord.length);
	a.push(chord[0]);
	return a;
}

function first_inversion(chord) {
	return invert(chord)
}

function second_inversion(chord) {
	return invert(invert(chord))
}

function third_inversion(chord) {
	return invert(invert(invert(chord)))
}

/*===================================================================
							Other
===================================================================*/

function from_shorthand(shorthand_string, slash) {
	//warning reduce?? 
	if(typeof shorthand_string == 'array'){
		var res = [];
		for(var i = 0; i < shorthand_string.length; i++) {
			res.push(from_shorthand(shorthand_string[i]));
		};
		return res;
	}
	if(__indexOf.call(["NC", "N.C."], shorthand_string) >= 0) {
		return [];
	}

	//Shrink shorthand_string to a format recognised by chord_shorthand
	shorthand_string = shorthand_string.replace('min', 'm');
	shorthand_string = shorthand_string.replace('mi', 'm');
	shorthand_string = shorthand_string.replace('-', 'm');

	shorthand_string = shorthand_string.replace('maj', 'M');
	shorthand_string = shorthand_string.replace('ma', 'M');

	//Get the note name
	if(!notes.is_valid_note(shorthand_string[0])) {
		throw "NoteFormatError: Unrecognised note '" + shorthand_string[0] + "' in chord '" + shorthand_string + "'";
	}

	name = shorthand_string[0];

	//Look for accidentals
	for (_i = 0, _len = shorthand_string.slice(1, shorthand_string.length).length; _i < _len; _i++) {
		n = shorthand_string.slice(1, shorthand_string.length)[_i];
		if (n === '#') {
			name += n;
		} else if (n === 'b') {
			name += n;
		} else {
			break;
		}
	}

	//Look for slashes and polychords '|'
	slash_index = -1;
	s = 0;
	rest_of_string = shorthand_string.slice(name.length, shorthand_string.length);
	for (_i = 0, _len = rest_of_string.length; _i < _len; _i++) {
		n = rest_of_string[_i];
		if (n === '/') {
			slash_index = s;
		} else if (n === '|') {
			//Generate polychord
			return from_shorthand(shorthand_string.slice(0, name.length + s), from_shorthand(shorthand_string.slice(name.length + s + 1, shorthand_string.length)));
		}
		s += 1;
	}

	//Generate slash chord
	if(slash_index != -1 && !(__indexOf.call(["m/M7", "6/9", "6/7"], rest_of_string) >= 0)) {
		res = shorthand_string.slice(0, name.length + slash_index);
		return from_shorthand(shorthand_string.slice(0, name.length + slash_index), shorthand_string.slice(name.length + slash_index + 1, shorthand_string.length))
	}

	shorthand_start = name.length;

	//Return chord
	short_chord = shorthand_string.slice(shorthand_start, shorthand_string.length);
	if(chord_shorthand.hasOwnProperty(short_chord)) {
		res = chord_shorthand[short_chord](name);
		if(slash != null) {
			//Add slashed chords
			if(typeof slash == 'string') {
				if(notes.is_valid_note(slash)) {
					res.unshift(slash);
				} else {
					throw "NoteFormatError: Unrecognised note '" + slash + "' in slash chord '" + shorthand_string + "'";
				}
			//Add polychords
			} else if(typeof slash == 'object') {
				r = slash;
				for (_i = 0, _len = res.length; _i < _len; _i++) {
					n = res[_i];
					if (n !== r[r.length-1]) {
						r.push(n);
					}
				}
				return r;
			}
		}
		return res;
	} else {
		throw "FormatError: Unknown shorthand: " + shorthand_string;
	}
}

/*===================================================================
							Chord recognition
===================================================================*/

function determine(chord, shorthand, no_inversions, no_polychords) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversions == null) {
		no_inversions = false;
	}
	if(no_polychords == null) {
		no_polychords = false;
	}
	if(chord == []) {
		return [];
	} else if(chord.length == 1) {
		return chord;
	} else if(chord.length == 2) {
		return [intervals.determine(chord[0], chord[1])];
	} else if(chord.length == 3) {
		return determine_triad(chord, shorthand, no_inversions, no_polychords);
	} else if(chord.length == 4) {
		return determine_seventh(chord, shorthand, no_inversions, no_polychords);
	} else if(chord.length == 5) {
		return determine_extended_chord5(chord, shorthand, no_inversions, no_polychords);
	} else if(chord.length == 6) {
		return determine_extended_chord6(chord, shorthand, no_inversions, no_polychords);
	} else if(chord.length == 7) {
		return determine_extended_chord7(chord, shorthand, no_inversions, no_polychords);
	} else {
		return determine_polychords(chord, shorthand);
	}
}


function determine_triad(triad, shorthand, no_inversions, placeholder) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversions == null) {
		no_inversions = false;
	}
	if(triad.length != 3) {
		//warning: raise exception: not a triad
		return false;
	}

	function inversion_exhauster(triad, shorthand, tries, resulta) {
		/*Recursive helper function that runs tries every inversion
		and saves the result.*/
		var result = resulta;
		var intval1 = intervals.determine(triad[0], triad[1], true);
		var intval2 = intervals.determine(triad[0], triad[2], true);

		function add_result(short) {
			result.push([short, tries, triad[0]]);
		}

		intval = intval1 + intval2;
		if(intval == "25") {
			add_result("sus2");
		} else if(intval == "3b7") {
			add_result("dom7"); // changed from just '7'
		} else if(intval == "3b5") { 
			add_result("7b5"); // why not b5?
		} else if(intval == "35") {
			add_result("M");
		} else if(intval == "3#5") {
			add_result("aug");
		} else if(intval == "36") {
			add_result("M6");
		} else if(intval == "37") {
			add_result("M7");
		} else if(intval == "b3b5") {
			add_result("dim");
		} else if(intval == "b35") {
			add_result("m");
		} else if(intval == "b36") {
			add_result("m6");
		} else if(intval == "b3b7") {
			add_result("m7");
		} else if(intval == "b37") {
			add_result("m/M7");
		} else if(intval == "45") {
			add_result("sus4");
		} else if(intval == "5b7") {
			add_result("m7");
		} else if(intval == "57") {
			add_result("M7");
		}

		if(tries != 3 && !no_inversions) {
			var arr = [triad[triad.length-1]];
			var m = triad.slice(0, triad.length-1);
			for (var i = 0; i < m.length; i++) {
				arr.push(m[i]);
			};
			return inversion_exhauster(arr, shorthand, tries + 1, result);
		} else {
			res = [];
			for (var i = 0; i < result.length; i++) {
				r = result[i];
				if(shorthand){
					res.push(r[2] + r[0]);
				} else {
					res.push(r[2] + chord_shorthand_meaning[r[0]] + int_desc(r[1]));
				}
			};
			return res;
		}
	}

	return inversion_exhauster(triad, shorthand, 1, []);
}

function determine_seventh(seventh, shorthand, no_inversion, no_polychords) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversion == null) {
		no_inversion = false;
	}
	if(no_polychords == null) {
		no_polychords = false;
	}
	if(seventh.length != 4) {
		//warning raise exception: seventh chord is not a seventh chord
		return false
	}

	function inversion_exhauster(seventh, shorthand, tries, resulta, polychordsa) {
		/*determine sevenths recursive functions*/

		// Check whether the first three notes of seventh 
		// are part of some triad.
		var result = resulta;
		var polychords = polychordsa;
		var triads = determine_triad(seventh.slice(0, 3), true, true);

		// Get the interval between the first and last note
		var intval3 = intervals.determine(seventh[0], seventh[3]);

		function add_result(short, poly) {
			// helper function
			if(poly == null) {
				poly = false;
			}
			result.push([short, tries, seventh[0], poly]);
		}

		// Recognizing polychords
		if(tries == 1 && !no_polychords) {
			var p = determine_polychords(seventh, shorthand);
			for (var i = 0; i < p.length; i++) {
				polychords.push(p[i]);
			};
		}

		// Recognizing sevenths
		for(var i = 0; i < triads.length; i++) {
			var triad = triads[i];
			// Basic triads
			triad = triad.slice(seventh[0].length, triad.length);
			if(triad == "m") {
				if(intval3 == "minor seventh") {
					add_result("m7");
				} else if(intval3 == "major seventh") {
					add_result("m/M7");
				} else if(intval3 == "major sixth") {
					add_result("m6");
				}
			} else if(triad == "M") {
				if(intval3 == "major seventh") {
					add_result("M7");
				} else if(intval3 == "minor seventh") {
					add_result("7");
				} else if(intval3 == "major sixth") {
					add_result("M6");
				}
			} else if(triad == "dim") {
				if(intval3 == "minor seventh") {
					add_result("m7b5");
				} else if(intval3 == "diminished seventh") {
					add_result("dim7");
				}
			} else if(triad == "aug") {
				if(intval3 == "minor seventh") {
					add_result("m7+");
				}
				if(intval3 == "major seventh") {
					add_result("M7+");
				}
			} else if(triad == "sus4") {
				if(intval3 == "minor seventh") {
					add_result("sus47");
				} else if(intval3 == "minor second") {
					add_result("sus4b9");
				}
			// Other
			} else if(triad == 'm7') {
				if(intval3 == 'perfect fourth') {
					add_result("11");
				}
			} else if(triad == '7b5') {
				if(intval3 == 'minor seventh') {
					add_result("7b5");
				}
			}
		}
		// Loop until we have exhausted all the inversions
		if(tries != 4 && !no_inversion) {
			var arg1 = seventh.slice(0, seventh.length - 1);
			arg1.unshift(seventh[seventh.length - 1]);
			return inversion_exhauster(arg1, shorthand, tries + 1, result, polychords);
		} else {
			// Return results
			var res = [];
			// Reset seventh
			var arr = seventh.slice(0, 3);
			arr.unshift(seventh[3]);
			seventh = arr;
			for(var i = 0; i < result.length; i++) {
				var x = result[i];
				if(shorthand) {
					res.push(x[2] + x[0]);
				} else {
					res.push(x[2] + chord_shorthand_meaning[x[0]] + int_desc(x[1]));
				}
			}
			for(var i = 0; i < polychords.length; i++) {
				res.push(polychords[i]);
			};
			return res;
		}
	}
	return inversion_exhauster(seventh, shorthand, 1, [], []);
}

function determine_extended_chord5(chord, shorthand, no_inversions, no_polychords) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversions == null) {
		no_inversions = false;
	}
	if(no_polychords == null) {
		no_polychords = false;
	}
	if(chord.length != 5) {
		//warning raise exeption: not an extended chord
		return false;
	}

	function inversion_exhauster(chord, shorthand, tries, resulta, polychordsa) {
		/*Recursive helper function*/
		var polychords = polychordsa;
		var result = resulta;

		function add_result(short) {
			result.push([short, tries, chord[0]]);
		}

		var triads = determine_triad(chord.slice(0, 3), true, true);
		var sevenths = determine_seventh(chord.slice(0, 4), true, true, true);

		// Determine polychords
		if(tries == 1 && !no_polychords){
			var p = determine_polychords(chord, shorthand);
			for (var i = 0; i < p.length; i++) {
				polychords.push(p[i]);
			};
		}

		// Determine 'normal' chords
		var intval4 = intervals.determine(chord[0], chord[4]);
		for(var i = 0; i < sevenths.length; i++) {
			var seventh = sevenths[i];
			seventh = seventh.slice(chord[0].length, seventh.length)
			if(seventh == "M7") {
				if(intval4 == 'major second') {
					add_result("M9");
				}
			} else if(seventh == "m7") {
				if(intval4 == 'major second') {
					add_result("m9");
				} else if(intval4 == 'perfect fourth') {
					add_result("m11");
				}
			} else if(seventh == "7") {
				if(intval4 == 'major second') {
					add_result("9");
				} else if(intval4 == 'minor second') {
					add_result("7b9");
				} else if(intval4 == 'augmented second') {
					add_result("7#9");
				} else if(intval4 == 'minor third') {
					add_result("7b12");
				} else if(intval4 == 'augmented fourth') {
					add_result("7#11");
				} else if(intval4 == 'major sixth') {
					add_result("13");
				}
			} else if(seventh == "M6") {
				if(intval4 == "major second") {
					add_result("6/9");
				} else if(intval4 == "minor seventh") {
					add_result("6/7");
				}
			}
		}

		if (tries != 5 && !no_inversions) {
			var arg1 = chord.slice(0, chord.length - 1);
			arg1.unshift(chord[chord.length - 1]);
			return inversion_exhauster(arg1, shorthand, tries + 1, result, polychords);
		} else {
			var res = []
			for(var i = 0; i < result.length; i++) {
				var r = result[i];
				if(shorthand) {
					res.push(r[2] + r[0])
				} else {
					res.push(r[2] + chord_shorthand_meaning[r[0]] + int_desc(r[1]))
				}
			}
			for(var i = 0; i < polychords.length; i++) {
				res.push(polychords[i]);
			};
			return res;
		}
	}
	return inversion_exhauster(chord, shorthand, 1, [], [])
}

function determine_extended_chord6(chord, shorthand, no_inversions, no_polychords) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversions == null) {
		no_inversions = false;
	}
	if(no_polychords == null) {
		no_polychords = false;
	}

	if(chord.length != 6) {
		//warning raise exeption: not an extended chord
		return false;
	}

	function inversion_exhauster(chord, shorthand, tries, resulta, polychordsa) {
		/*Recursive helper function*/
		var polychords = polychordsa;
		var result = resulta;
		// Determine polychords
		if(tries == 1 && !no_polychords) {
			var p = determine_polychords(chord, shorthand);
			for (var i = 0; i < p.length; i++) {
				polychords.push(p[i]);
			};
		}

		function add_result(short) {
			result.push([short, tries, chord[0]]);
		}

		var ch = determine_extended_chord5(chord.slice(0, 5), true, true, true);
		var intval5 = intervals.determine(chord[0], chord[5]);

		for(var i = 0; i < ch.length; i++) {
			var c = ch[i];
			c = c.slice(chord[0].length, c.length);
			if(c == '9') {
				if(intval5 == 'perfect fourth') {
					add_result('11');
				} else if(intval5 == 'augmented fourth') {
					add_result('7#11');
				} else if(intval5 == 'major sixth') {
					add_result('13');
				}
			} else if(c == 'm9') {
				if(intval5 == 'perfect fourth') {
					add_result('m11');
				} else if(intval5 == 'major sixth') {
					add_result('m13');
				}
			} else if(c == 'M9') {
				if(intval5 == 'perfect fourth') {
					add_result('M11');
				} else if(intval5 == 'major sixth') {
					add_result('M13');
				}
			}
		}

		if(tries != 6 && !no_inversions) {
			var arg1 = chord.slice(0, chord.length - 1);
			arg1.unshift(chord[chord.length - 1]);
			return inversion_exhauster(arg1, shorthand, tries + 1, result, polychords)
		} else {
			var res = []
			for(var i = 0; i < result.length; i++) {
				var r = result[i];
				if(shorthand) {
					res.push(r[2] + r[0])
				} else {
					res.push(r[2] + chord_shorthand_meaning[r[0]] + int_desc(r[1]))
				}
			}
			for(var i = 0; i < polychords.length; i++) {
				res.push(polychords[i]);
			};
			return res;
		}
	}
	return inversion_exhauster(chord, shorthand, 1, [], []);
}

function determine_extended_chord7(chord, shorthand, no_inversions, no_polychords) {
	if(shorthand == null) {
		shorthand = false;
	}
	if(no_inversions == null) {
		no_inversions = false;
	}
	if(no_polychords == null) {
		no_polychords = false;
	}

	if(chord.length != 7) {
		//warning raise exeption: not an extended chord
		return false;
	}

	function inversion_exhauster(chord, shorthand, tries, resulta, polychordsa) {
		/*Recursive helper function*/
		var polychords = polychordsa;
		var result = resulta;
		// Determine polychords
		if(tries == 1 && !no_polychords) {
			var p = determine_polychords(chord, shorthand);
			for (var i = 0; i < p.length; i++) {
				polychords.push(p[i]);
			};
		}

		function add_result(short) {
			result.push([short, tries, chord[0]]);
		}

		var ch = determine_extended_chord6(chord.slice(0, 6), true, true, true);
		var intval6 = intervals.determine(chord[0], chord[6]);

		for(var i = 0; i < ch.length; i++) {
			var c = ch[i]; 
			c = c.slice(chord[0].length, c.length);
			if(c == '11') {
				if(intval6 == 'major sixth') {
					add_result('13');
				}
			} else if(c == 'm11'){
				if(intval6 == 'major sixth') {
					add_result('m13');
				}
			} else if(c == 'M11'){
				if(intval6 == 'major sixth') {
					add_result('M13');
				}
			}
		}
				
		if(tries != 6) {
			var arg1 = chord.slice(0, chord.length - 1);
			arg1.unshift(chord[chord.length - 1]);
			return inversion_exhauster(arg1, shorthand, tries + 1, result, polychords);
		} else {
			var res = [];
			for(var i = 0; i < result.length; i++) {
				var r = result[i];
				if(shorthand) {
					res.push(r[2] + r[0]);
				} else {
					res.push(r[2] + chord_shorthand_meaning[r[0]] + int_desc(r[1]));
				}
			}
			for(var i = 0; i < polychords.length; i++) {
				res.push(polychords[i]);
			};
			return res;
		}
	}
	return inversion_exhauster(chord, shorthand, 1, [], []);
}

function int_desc(tries) {
	if(tries == 1) {
		return "";
	} else if(tries == 2) {
		return ", first inversion";
	} else if(tries == 3) {
		return ", second inversion";
	} else if(tries == 4) {
		return ", third inversion";
	}
}

function determine_polychords(chord, shorthand) {
	if(shorthand == null) {
		shorthand = false;
	}
	var polychords = []

	var function_list = [determine_triad, determine_seventh, determine_extended_chord5, determine_extended_chord6, determine_extended_chord7];

	// Range tracking. 
	if(chord.length <= 3) {
		return [];
	} else if(chord.length > 14) {
		return [];
	} else if(chord.length - 3 <= 5) {
		function_nr = _.range(0, chord.length - 3);
	} else {
		function_nr = _.range(0, 5);
	}

	for(var i = 0; i < function_nr.length; i++) {
		var f = function_nr[i];
		for (var k = 0; k < function_nr.length; k++) {
			var f2 = function_nr[k]
			var r1 = function_list[f](chord.slice(chord.length -(3 + f), chord.length), true, true, true);
			for(var j = 0; j < r1.length; j++) {
				var chord1 = r1[j];
				var r2 = function_list[f2](chord.slice(0, f2+3), true, true, true);
				for(var l = 0; l < r2.length; l++) {
					var chord2 = r2[l];
					polychords.push(chord1 + '|' + chord2);
				}
			}
		}
	}

	if(shorthand) {
		for(var i = 0; i < polychords.length; i++) {
			var p = polychords[i];
			p = p + " polychord";
		};
	}

	return polychords;
}

chord_shorthand = {
		// Triads
		"m" : minor_triad,
		"M" : major_triad, 
		"" : major_triad,
		"dim" : diminished_triad,

		// Augmented chords
		"aug" : augmented_triad,
		"+" : augmented_triad,
		"7#5" : augmented_minor_seventh,
		"M7+5" : augmented_minor_seventh,
		"M7+" : augmented_major_seventh,
		"m7+" : augmented_minor_seventh,
		"7+" : augmented_major_seventh,

		// Suspended chords
		"sus47" : suspended_seventh,
		"sus4" : suspended_fourth_triad,
		"sus2" : suspended_second_triad,
		"sus" : suspended_triad,
		"11" : eleventh,
		"sus4b9" : suspended_fourth_ninth,
		"susb9" : suspended_fourth_ninth,

		// Sevenths
		"m7" : minor_seventh,
		"M7" : major_seventh,
		"7" : dominant_seventh,
		"dom7" : dominant_seventh,
		"m7b5" : minor_seventh_flat_five,
		"dim7" : diminished_seventh,
		"m/M7" : minor_major_seventh,
		"mM7" : minor_major_seventh,
		
		
		// Sixths
		"m6" : minor_sixth,
		"M6" : major_sixth,
		"6" : major_sixth, 
		"6/7" : dominant_sixth,
		"67": dominant_sixth,
		"6/9" : sixth_ninth,
		"69" : sixth_ninth,

		// Ninths
		"9" : dominant_ninth,
		"7b9" : dominant_flat_ninth,
		"7#9" : dominant_sharp_ninth,
		"M9" : major_ninth,
		"m9" : minor_ninth,

		// Elevenths
		"7#11" : lydian_dominant_seventh,
		"m11" : minor_eleventh,

		// Thirteenths
		"M13" : major_thirteenth,
		"m13" : minor_thirteenth,

		"13" : dominant_thirteenth,

		// Altered Chords
		"7b5" : dominant_flat_five,
		
		// Special
		"hendrix" : hendrix_chord,
		"7b12" : hendrix_chord,
		"5" : function(x) {
			return [x, intervals.perfect_fifth(x)];
		}
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
exports.suspended_triad = suspended_triad;
exports.suspended_second_triad = suspended_second_triad;
exports.suspended_fourth_triad = suspended_fourth_triad;
exports.suspended_seventh = suspended_seventh;
exports.suspended_fourth_ninth = suspended_fourth_ninth;
exports.augmented_major_seventh = augmented_major_seventh;
exports.augmented_minor_seventh = augmented_minor_seventh;
exports.dominant_flat_five = dominant_flat_five;
exports.lydian_dominant_seventh = lydian_dominant_seventh;
exports.hendrix_chord = hendrix_chord;
exports.tonic = tonic;
exports.tonic7 = tonic7;
exports.supertonic = supertonic;
exports.supertonic7 = supertonic7;
exports.mediant = mediant;
exports.mediant7 = mediant7;
exports.subdominant = subdominant;
exports.subdominant7 = subdominant7;
exports.dominant = dominant;
exports.dominant7 = dominant7;
exports.submediant = submediant;
exports.subdominant7 = subdominant7;
exports.subtonic = subtonic;
exports.subtonic7 = subtonic7;
exports.I = I;
exports.I7 = I7;
exports.ii = ii;
exports.II = II;
exports.ii7 = ii7;
exports.II7 = II7;
exports.iii = iii;
exports.III = III;
exports.iii7 = iii7;
exports.III7 = III7;
exports.IV = IV;
exports.IV7 = IV7;
exports.V = V;
exports.V7 = V7;
exports.vi = vi;
exports.VI = VI;
exports.vi7 = vi7;
exports.VI7 = VI7;
exports.vii = vii;
exports.VII = VII;
exports.vii7 = vii7;
exports.VII7 = VII7;
exports.invert = invert;
exports.first_inversion = first_inversion;
exports.second_inversion = second_inversion;
exports.third_inversion = third_inversion;
exports.from_shorthand = from_shorthand;
exports.chord_shorthand = chord_shorthand;
exports.determine = determine;
exports.determine_triad = determine_triad;
exports.determine_seventh = determine_seventh;
exports.determine_extended_chord5 = determine_extended_chord5;
exports.determine_extended_chord6 = determine_extended_chord6;
exports.determine_extended_chord7 = determine_extended_chord7;
exports.determine_polychords = determine_polychords;