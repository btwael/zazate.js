var notes = require('./notes'),
	chords = require('./chords'),
	intervals = require('./intervals');

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

var numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII' ],
	numeral_intervals = [0, 2, 4, 5, 7, 9, 11];

function to_chords(progression, key) {
	if(key == null) {
		key = 'C';
	}

	if(typeof progression == 'string') {
		progression = [progression];
	}

	var result = [];
	for (var i = 0; i < progression.length; i++) {
		var chord = progression[i];

		var rslt = parse_string(chord),
			roman_numeral = rslt[0],
			acc = rslt[1],
			suffix = rslt[2],
			r;
		if(!numerals.hasObject(roman_numeral)) {
			return [];
		}

		if(suffix == '7' || suffix == '') {
			roman_numeral += suffix;
			r = chords[roman_numeral](key);
		} else {
			r = chords[roman_numeral](key);
			r = chords.chord_shorthand[suffix](r[0]);
		}

		while(acc < 0) {
			r = r.map(notes.diminish);
			acc += 1;
		}
		while(acc > 0) {
			r = r.map(notes.diminish);
			acc -= 1;
		}

		result.push(r);
	};
	return result;
}

/*
def determine(chord, key, shorthand = False):
	"""Determines the harmonic function of chord in key. This function can also deal with lists of chords. 
{{{ 
>>> determine(["C", "E", "G"], "C") 
['tonic'] 
>>> determine(["G", "B", "D"], "C")
['dominant']
>>> determine(["G", "B", "D", "F"], "C", True)
['V7']
>>> determine([["C", "E", "G"], ["G", "B", "D"]], "C", True)
[['I'], ['V']]
}}}"""

	result = []
	# Handle lists of chords
	if type(chord[0]) == list:
		for c in chord:
			result.append(determine(c, key, shorthand))
		return result
			

	
	func_dict = {
		"I": "tonic",
		"ii": "supertonic",
		"iii": "mediant",
		"IV": "subdominant",
		"V": "dominant",
		"vi": "submediant",
		"vii" : "subtonic",
	}

	expected_chord = [
		["I", "M", "M7"],
		["ii", "m", "m7"],
		["iii", "m", "m7"],
		["IV", "M", "M7"],
		["V", "M", "7"],
		["vi", "m", "m7"],
		["vii", "dim", "m7b5"],
	]

	type_of_chord = chords.determine(chord, True, False, True)
	for chord in type_of_chord:

		name = chord[0]
		# Get accidentals
		a = 1
		for n in chord[1:]:
			if n == 'b':
				name += 'b'
			elif n == '#':
				name += '#'
			else:
				break
			a += 1
		chord_type = chord[a:]

		# Determine chord function
		interval_type, interval = intervals.determine(key, name).split(" ")
		if interval == "unison":
			func = 'I'
		elif interval == "second":
			func = 'ii'
		elif interval == "third":
			func = 'iii'
		elif interval == "fourth":
			func = 'IV'
		elif interval == 'fifth':
			func = 'V'
		elif interval == 'sixth':
			func = 'vi'
		elif interval == 'seventh':
			func = 'vii'

		# Check whether the chord is altered or not
		for x in expected_chord:
			if x[0] == func:
				# Triads
				if chord_type == x[1]:
					if not shorthand:
						func = func_dict[func]
				# Sevenths
				elif chord_type == x[2]:
					if shorthand:
						func += '7'
					else:
						func = func_dict[func] + ' seventh'
				# Other
				else:
					if shorthand:
						func += chord_type
					else:
						func = func_dict[func] + chords.chord_shorthand_meaning[chord_type]

		# Handle b's and #'s (for instance Dbm in key C is bII)
		if shorthand:
			if interval_type == "minor":
				func = "b" + func
			elif interval_type == "augmented":
				func = "#" + func
			elif interval_type == "diminished":
				func = "bb" + func
		else:
			if interval_type == "minor":
				func = "minor " + func
			elif interval_type == "augmented":
				func = "augmented " + func
			elif interval_type == "diminished":
				func = "diminished " + func

		# Add to results
		result.append(func)

	return result
*/
function parse_string(progression) {
	var acc = 0,
		roman_numeral = "",
		suffix = "",
		i = 0;

	for (var j = 0; j < progression.length; j++) {
		var c = progression[j];
		if(c == '#'){
			acc += 1;
		} else if(c == 'b') {
			acc -= 1;
		} else if (c.toUpperCase() == 'I' || c.toUpperCase() == 'V') {
			roman_numeral += c.toUpperCase();
		} else {
			break;
		}
		i += 1;
	};
	suffix = progression.slice(i, progression.length);
	return [roman_numeral, acc, suffix];
}

function tuple_to_string(prog_tuple) {
	var roman = prog_tuple[0], 
		acc = prog_tuple[1], 
		suff = prog_tuple[2];

	if(acc > 6) {
		acc = 0 - (acc % 6);
	} else if(acc < -6) {
		acc = (acc % 6);
	}
	while(acc < 0) {
		roman = 'b' + roman;
		acc += 1;
	}
	while(acc > 0) {
		roman = '#' + roman;
		acc -= 1;
	}
	return roman + suff;
}
/*
def substitute_harmonic(progression, substitute_index, ignore_suffix = False):
	"""Does simple harmonic substitutions. Returns a \
list of possible substitions for `progression[substitute_index]`. \
If `ignore_suffix` is set to True the suffix of the chord being substituted \
will be ignored. Otherwise only progressions without a suffix, or with suffix '7' \
will be substituted. The following table is used to convert progressions: 
|| I || III || 
|| I || VI || 
|| IV || II || 
|| IV || VI || 
|| V || VII ||"""

	simple_substitutions = [
			("I", "III"),
			("I", "VI"),
			("IV", "II"),
			("IV", "VI"),
			("V", "VII"),
			]
	res = []
	roman, acc, suff = parse_string(progression[substitute_index])
	if suff == '' or suff == '7' or ignore_suffix:
		for subs in simple_substitutions:
			r = subs[1] if roman == subs[0] else None
			if r == None:
				r = subs[0] if roman == subs[1] else None
			if r != None:
				suff = suff if suff == '7' else ''
				res.append(tuple_to_string((r, acc, suff)))
	return res



def substitute_minor_for_major(progression, substitute_index, ignore_suffix = False):
	"""Substitutes minor chords for its major equivalent. Recognizes 'm' and 'm7' suffixes \
and ['II', 'III', 'VI'] if there is no suffix.
{{{
>>> progressions.substitute_minor_for_major(["VI"], 0)
["I"]
>>> progressions.substitute_minor_for_major(["Vm"], 0)
["bVIIM"]
>>> progressions.substitute_minor_for_major(["VIm7"], 0)
["IM7"]
}}}"""
	roman, acc, suff = parse_string(progression[substitute_index])
	res = []

	# Minor to major substitution
	if suff == 'm' or suff == 'm7' or (suff == '' and roman in ["II", "III", "VI"]) or ignore_suffix:
		n = skip(roman, 2)
		a = interval_diff(roman, n, 3) + acc
		if suff == 'm' or ignore_suffix:
			res.append(tuple_to_string((n, a, 'M')))
		elif suff == 'm7' or ignore_suffix:
			res.append(tuple_to_string((n, a, 'M7')))
		elif suff == '' or ignore_suffix:
			res.append(tuple_to_string((n, a, '')))
	return res




def substitute_major_for_minor(progression, substitute_index, ignore_suffix = False):
	"""Substitutes major chords for their minor equivalent. Recognizes 'M' and 'M7' suffixes \
and ['I', 'IV', 'V'] if there is no suffix.
{{{
>>> progressions.substitute_major_for_minor(["I"], 0)
["VI"]
>>> progressions.substitute_major_for_minor(["VM7"], 0)
["IIIm7"]
}}}"""
	roman, acc, suff = parse_string(progression[substitute_index])
	res = []

	# Major to minor substitution
	if suff == 'M' or suff == 'M7' or (suff == '' and roman in ["I", "IV", "V"]) or ignore_suffix:
		n = skip(roman, 5)
		a = interval_diff(roman, n, 9) + acc
		if suff == 'M' or ignore_suffix:
			res.append(tuple_to_string((n, a, 'm')))
		elif suff == 'M7' or ignore_suffix:
			res.append(tuple_to_string((n, a, 'm7')))
		elif suff == '' or ignore_suffix:
			res.append(tuple_to_string((n, a, '')))
	return res



def substitute_diminished_for_diminished(progression, substitute_index, ignore_suffix = False):
	"""Substitutes a diminished chord for another diminished chord. Recognizes the 'dim' and 'dim7' \
suffix and "VI" if there is no suffix.
{{{
>>> progressions.substitute_diminished_for_diminished(["VII"], 0)
["IIdim", "bIVdim", "bbVIdim"]
}}}"""
	roman, acc, suff = parse_string(progression[substitute_index])
	res = []

	# Diminished progressions
	if suff == 'dim7' or suff == 'dim' or (suff == '' and roman in ["VII"]) or ignore_suffix:
	
		if suff == '': suff = 'dim'

		# Add diminished chord
		last = roman
		for x in range(3):

			next = skip(last, 2)
			acc += interval_diff(last, next, 3)
			res.append(tuple_to_string((next , acc, suff)))
			last = next
	return res



def substitute_diminished_for_dominant(progression, substitute_index, ignore_suffix = False):
	roman, acc, suff = parse_string(progression[substitute_index])
	res = []

	# Diminished progressions
	if suff == 'dim7' or suff == 'dim' or (suff == '' and roman in ["VII"]) or ignore_suffix:
	
		if suff == '': suff = 'dim'

		# Add diminished chord
		last = roman
		for x in range(4):

			next = skip(last, 2)
			dom = skip(last, 5)
			a = interval_diff(last, dom, 8) + acc
			res.append(tuple_to_string((dom, a, 'dom7')))
			last = next
	return res




def substitute(progression, substitute_index, depth = 0):
	"""Gives a list of possible substitutions for \
`progression[substitute_index]`. If depth > 0 the substitutions \
of each result will be recursively added as well.
{{{
>>> progressions.substitute(["I", "IV", "V", "I"], 0)
["III", "VI", etc.
}}}"""
	res = []

	simple_substitutions = [
			("I", "III"),
			("I", "VI"),
			("IV", "II"),
			("IV", "VI"),
			("V", "VII"),
			("V", "VIIdim7"),
			("V", "IIdim7"),
			("V", "IVdim7"),
			("V", "bVIIdim7"),
			]


	p = progression[substitute_index]
	roman, acc, suff = parse_string(p)
	
	# Do the simple harmonic substitutions
	if suff == '' or suff == '7':
		for subs in simple_substitutions:
			r = None
			if roman == subs[0]:
				r = subs[1]
			elif roman == subs[1]:
				r = subs[0]
			if r != None:
				res.append(tuple_to_string((r, acc, '')))
				# Add seventh or triad depending on r
				if r[-1] != "7":
					res.append(tuple_to_string((r, acc, '7')))
				else:
					res.append(tuple_to_string((r[:-1], acc, '')))


	# Add natural seventh
	if suff == '' or suff == 'M' or suff == 'm':
		res.append(tuple_to_string((roman, acc, suff + '7')))


	# Minor to major substitution
	if suff == 'm' or suff == 'm7':
		n = skip(roman, 2)
		a = interval_diff(roman, n, 3) + acc
		res.append(tuple_to_string((n, a, 'M')))
		res.append(tuple_to_string((n, a, 'M7')))

	# Major to minor substitution
	if suff == 'M' or suff == 'M7':
		n = skip(roman, 5)
		a = interval_diff(roman, n, 9) + acc
		res.append(tuple_to_string((n, a, 'm')))
		res.append(tuple_to_string((n, a, 'm7')))

	
	# Diminished progressions
	if suff == 'dim7' or suff == 'dim':
		
		# Add the corresponding dominant seventh
		res.append(tuple_to_string((skip(roman, 5), acc, 'dom7')))


		# Add chromatic dominant seventh
		n = skip(roman, 1)
		res.append(tuple_to_string((n, acc + interval_diff(roman, n, 1), 'dom7')))

		# Add diminished chord
		last = roman
		for x in range(4):
			next = skip(last, 2)
			acc += interval_diff(last, next, 3)
			res.append(tuple_to_string((next , acc, suff)))
			last = next

	res2 = []
	if depth > 0:
		for x in res:
			new_progr = progression
			new_progr[substitute_index] = x
			res2 += substitute(new_progr, substitute_index, depth - 1)
	return res + res2

def interval_diff(progression1, progression2, interval):
	"""Returns the number of half steps progression2 needs to be \
diminished or augmented until the interval between `progression1` \
and `progression2` is `interval`"""
	i = numeral_intervals[numerals.index(progression1)]
	j = numeral_intervals[numerals.index(progression2)]
	acc = 0
	if j < i:
		j += 12
	while j - i > interval:
		acc -= 1
		j -= 1
	while j - i < interval:
		acc += 1
		j += 1
	return acc
*/	

function skip(roman_numeral, skipi) {
	if(skipi == null) {
		skipi = 1;
	}
	var i = numerals.indexOf(roman_numeral) + skipi;
	console.log(i)
	return numerals[i % 7];
}
//export
exports.numerals = numerals;
exports.numeral_intervals = numeral_intervals;
exports.to_chords = to_chords;

exports.parse_string = parse_string;
exports.tuple_to_string = tuple_to_string;

exports.skip = skip;