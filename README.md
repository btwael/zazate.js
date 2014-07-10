zazate.js
=========

Zazate.js is music theory and notation package or module for Javascript, can be used by programmers, musicians, composers and researchers to make and investigate music. Zazate.js is integrated with a big numbers of functions related to find notes, chords and intervals.

## Installation
via npm:
```bash
$ npm install zazate.js
```

## Usage
```js
var zazate = require('zazate.js');
var result = zazate.notes.augment('C');
console.log(result); // print 'C#'
```
Use this syntax
```js
var zazate = require('zazate.js');
zazate.<library>.<function>(arg1, arg2...);
```
In zazatz.js, there are the following libraries:
* notes
* diatonic
* intervals
* chords
* scales
* meter

See functions of each library in documentation below.

## Documentation
### Index
* [notes](#notes)
	* [fifths](#notes_fifths) - attribute
	* [augment(note)](#notes_augment) - function
	* [diminish(note)](#notes_diminish) - function
	* [is_enharmonic(note1, note2)](#notes_is_enharmonic) - function
	* [is_valid_note(note)](#notes_is_valid_note) - function
	* [note_to_int(note)](#notes_note_to_int) - function
	* [int_to_note(note_int)](#notes_int_to_note) - function
	* [remove_redundant_accidentals(note)](#notes_remove_redundant_accidentals) - function
	* [to_major(note)](#notes_to_major) - function
	* [to_minor(note)](#notes_to_minor) - function
* [diatonic](#diatonic)
	* [basic_keys](#diatonic_basic_keys) - attribute
	* [get_notes(key)](#diatonic_get_notes) - function
	* [int_to_note(note_int, key)](#diatonic_int_to_note) - function
	* [interval(key, start_note, interval)](#diatonic_interval) - function
* [intervals](#intervals)
	* augmented_unison(note1, note2, shorthand) - function
	* [determine(note1, note2, shorthand)](#intervals_determine) - function
	* [fifth(note, key)](#intervals_fifth) - function
	* [fourth(note, key)](#intervals_fourth) - function
	* [from_shorthand(note, interval, up)](#intervals_from_shorthand) - function
	* [get_interval(note, interval, key)](#intervals_get_interval) - function
	* [interval(interval)](#intervals_interval) - function
	* [is_consonant(note1, note2, include_fourths)](#intervals_is_consonant) - function
	* [is_dissonant(note1, note2, include_fourths)](#intervals_is_dissonant) - function
	* [is_imperfect_consonant(note1, note2)](#intervals_is_imperfect_consonant) - function
	* [is_perfect_consonant(note1, note2, include_fourths)](#intervals_is_perfect_consonant) - function
	* major_fifth(note) - function
	* major_fourth(note) - function
	* major_second(note) - function
	* major_seventh(note) - function
	* major_sixth(note) - function
	* major_third(note) - function
	* major_unison(note) - function
	* [measure(note1, note2)](#intervals_measure) - function
	* minor_fifth(note) - function
	* minor_fourth(note) - function
	* minor_second(note) - function
	* minor_seventh(note) - function
	* minor_sixth(note) - function
	* minor_third(note) - function
	* minor_unison(note) - function
	* perfect_fifth(note) - function
	* perfect_fourth(note) - function
	* [second(note, key)](#intervals_second) - function
	* [seventh(note, key)](#intervals_seventh) - function
	* [sixth(note, key)](#intervals_sixth) - function
	* [third(note, key)](#intervals_third) - function
	* [unison(note, key)](#intervals_unison) - function
* [chords](#chords)
	* I(key) - function
	* I7(key) - function
	* II(key) - function
	* II7(key) - function
	* III(key) - function
	* III7(key) - function
	* IV(key) - function
	* IV7(key) - function
	* V(key) - function
	* V7(key) - function
	* VI(key) - function
	* VI7(key) - function
	* VII(key) - function
	* VII7(key) - function
	* [augmented_major_seventh(note)](#chords_augmented_major_seventh) - function
	* [augmented_minor_seventh(note)](#chords_augmented_minor_seventh) - function
	* [augmented_triad(note)](#chords_augmented_triad) - function
	* [determine(chord, shorthand, no_inversions, no_polychords)](#chords_determine) - function
	* [determine_extended_chord5(chord, shorthand, no_inversions, no_polychords)](#chords_determine_extended_chord5) - function
	* [determine_extended_chord6(chord, shorthand, no_inversions, no_polychords)](#chords_determine_extended_chord6) - function
	* [determine_extended_chord7(chord, shorthand, no_inversions, no_polychords)](#chords_determine_extended_chord7) - function
	* [determine_polychords(chord, shorthand)](#chords_determine_polychords) - function
	* [determine_seventh(seventh, shorthand, no_inversion, no_polychords)](#chords_determine_seventh) - function
	* [diminished_seventh(note)](#chords_diminished_seventh) - function
	* [diminished_triad(note)](#chords_diminished_triad) - function
	* [dominant(key)](#chords_dominant) - function
	* [dominant7(key)](#chords_dominant7) - function
	* [dominant_flat_five(note)](#chords_dominant_flat_five) - function

**More documentation is coming soon!!**

<a name="notes" />
### notes
---------------------------------------
<a name="notes_fifths" />
#### fifths
Just a list(array): ['F', 'C', 'G', 'D', 'A', 'E', 'B'] 

---------------------------------------
<a name="notes_augment" />
#### augment(note)
Augments the given note
```js
zazate.notes.augment('C'); // return 'C#'
zazate.notes.augment('Cb'); // return 'C'
```

---------------------------------------
<a name="notes_diminish" />
#### diminish(note)
Diminishes the given note
```js
zazate.notes.diminish('C'); // return 'Cb'
zazate.notes.diminish('C#'); // return 'C'
```

---------------------------------------
<a name="notes_is_enharmonic" />
#### is_enharmonic(note1, note2)
Test whether note1 and note2 are enharmonic, ie. they sound the same 

---------------------------------------
<a name="notes_is_valid_note" />
#### is_valid_note(note)
Returns true if note is in a recognised format. false if not 

---------------------------------------
<a name="notes_note_to_int" />
#### note_to_int(note)
Converts notes in the form of C, C#, Cb, C##, etc. to an integer in the range of 0-11. Throws an Error exception if the note format is not recognised. 

---------------------------------------
<a name="notes_int_to_note" />
#### int_to_note(note_int)
Converts integers in the range of 0-11 to notes in the form of C or C# (no Cb). You can use int_to_note in diatonic_key to do theoretically correct conversions that bear the key in mind. Throws a Error exception if the note_int is not in range(0,12).  

---------------------------------------
<a name="notes_remove_redundant_accidentals" />
#### remove_redundant_accidentals(note)
Removes redundant #'s and b's from the given note. For example: C##b becomes C#, Eb##b becomes E, etc.  

---------------------------------------
<a name="notes_to_major" />
#### to_major(note)
Returns the major of note. 
```js
zazate.notes.to_major('A'); // return 'C'
```

---------------------------------------
<a name="notes_to_minor" />
#### to_minor(note)
Returns the minor of note. 
```js
zazate.notes.to_minor('C'); // return 'A'
```

---------------------------------------
<a name="diatonic" />
### diatonic
---------------------------------------
<a name="diatonic_basic_keys" />
#### basic_keys
Just a list(array): ['Gb', 'Db', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#']

---------------------------------------
<a name="diatonic_get_notes" />
#### get_notes(key)
Returns an ordered list of the notes in this key. For example: if the key is set to 'F', this function will return ['F', 'G', 'A', 'Bb', 'C', 'D', 'E']. Exotic or ridiculous keys like 'C####' or even 'Gbb##bb#b##' will work; Note however that the latter example will also get cleaned up to 'G'. This function will raise an Error if the key isn't recognised 

---------------------------------------
<a name="diatonic_int_to_note" />
#### int_to_note(note_int, key)
A better implementation of int_to_note found in the [notes](#notes) module. This version bears the key in mind and thus creates theoretically correct notes. Will throw an Error if note_int is not in range(0,12) 

---------------------------------------
<a name="diatonic_interval" />
#### interval(key, start_note, interval)
Returns the note found at the interval starting from start_note in the given key. For example interval('C', 'D', 1) will return 'E'. Will raise an Error if the start_note is not a valid note. 

---------------------------------------
<a name="intervals" />
### intervals
---------------------------------------
<a name="intervals_determine" />
#### determine(note1, note2, shorthand)
* **Default values**: shorthand = false 
* Names the interval between note1 and note2.

```js
zazate.intervals.determine("C", "E"); // return 'major third'
zazate.intervals.determine("C", "Eb"); // return 'minor third'
zazate.intervals.determine("C", "E#"); // return 'augmented third'
zazate.intervals.determine("C", "Ebb"); // return 'diminished third'
zazate.intervals.determine("C", "G"); // return 'perfect fifth'
zazate.intervals.determine("C", "F"); // return 'perfect fourth'
```

---------------------------------------
<a name="intervals_fifth" />
#### fifth(note, key)
Take the diatonic fifth of note in key. 
```js
zazate.intervals.fifth("E", "C"); // return 'B'
zazate.intervals.fifth("E", "F"); // return 'Bb'
```

---------------------------------------
<a name="intervals_fourth" />
#### fourth(note, key)
Take the diatonic fourth of note in key. 
```js
zazate.intervals.fourth("E", "C"); // return 'A'
zazate.intervals.fourth("E", "B"); // return 'A#'
```

---------------------------------------
<a name="intervals_from_shorthand" />
#### from_shorthand(note, interval, up)
* **Default values**: up = true 
* Returns the note on interval up or down. 

```js
zazate.intervals.from_shorthand("A", "b3"); // return 'C'
zazate.intervals.from_shorthand("D", "2"); // return 'A'
zazate.intervals.from_shorthand("E", "2", false); // return 'D'
```

---------------------------------------
<a name="intervals_get_interval" />
#### get_interval(note, interval, key)
* **Default values**: key = 'C' 
* Gets the note an interval (in half notes) away from the given note. This will produce mostly theoretical sound results, but you should use the minor and major functions to work around the corner cases. 

---------------------------------------
<a name="intervals_invert" />
#### invert(interval)
Invert an interval represented as [note1, note2]. 
```js
zazate.intervals.invert(["C", "E"]); // return ["E", "C"]
```

---------------------------------------
<a name="intervals_is_consonant" />
#### is_consonant(note1, note2, include_fourths)
* **Default values**: include_fourths = true 
* A consonance is a harmony, chord, or interval considered stable, as opposed to a dissonance (see is_dissonant). This function tests whether the given interval is consonant. This basically means that it checks whether the interval is (or sounds like) a unison, third, sixth, perfect fourth or perfect fifth. In classical music the fourth is considered dissonant when used contrapuntal, which is why you can choose to exclude it. 

---------------------------------------
<a name="intervals_is_dissonant" />
#### is_dissonant(note1, note2, include_fourths)
* **Default values**: include_fourths = true 
* Tests whether an interval is considered unstable, dissonant. In the default case perfect fourths are considered consonant, but this can be changed with the exclude_fourths flag.  

---------------------------------------
<a name="intervals_is_imperfect_consonant" />
#### is_imperfect_consonant(note1, note2)
Imperfect consonances are either minor or major thirds or minor or major sixths. 

---------------------------------------
<a name="intervals_is_perfect_consonant" />
#### is_perfect_consonant(note1, note2, include_fourths)
* **Default values**: include_fourths = true
* Perfect consonances are either unisons, perfect fourths or fifths, or octaves (which is the same as a unison in this model; see the container.Note class for more). Perfect fourths are usually included as well, but are considered dissonant when used contrapuntal, which is why you can exclude them.  

---------------------------------------
<a name="intervals_measure" />
#### measure(note1, note2)
Returns an integer in the range of 0-11, determining the half note steps between note1 and note2. 
```js
zazate.intervals.measure("C", "D"); // return 2
zazate.intervals.measure("D", "C"); // return 10
```

---------------------------------------
<a name="intervals_second" />
#### second(note, key)
Take the diatonic second of note in key. 
```js
zazate.intervals.second("E", "C"); // return 'F'
zazate.intervals.second("E", "D"); // return 'F#'
```

---------------------------------------
<a name="intervals_seventh" />
#### seventh(note, key)
Take the diatonic seventh of note in key. 
```js
zazate.intervals.seventh("E", "C"); // return 'D'
zazate.intervals.seventh("E", "B"); // return 'D#'
```

---------------------------------------
<a name="intervals_sixth" />
#### sixth(note, key)
Take the diatonic sixth of note in key. 
```js
zazate.intervals.sixth("E", "C"); // return 'C'
zazate.intervals.sixth("E", "B"); // return 'C#'
```

---------------------------------------
<a name="intervals_third" />
#### third(note, key)
Take the diatonic third of note in key. 
```js
zazate.intervals.third("E", "C"); // return 'G'
zazate.intervals.third("E", "E"); // return 'G#'
```

---------------------------------------
<a name="intervals_from_shorthand" />
#### unison(note, key)
* **Default values**: key = null 
* One of the most useless methods ever written, which returns the unison of note. The key is not at all important, but is here for consistency reasons only.

```js
zazate.intervals.unison("C"); // return 'C'
```

---------------------------------------
<a name="chords" />
### chords
---------------------------------------
<a name="chords_augmented_major_seventh" />
#### augmented_major_seventh(note)
Builds an augmented major seventh chord on note. 
```js
zazate.chords.augmented_major_seventh("C") // ["C", "E", "G#", "B"]
```

---------------------------------------
<a name="chords_augmented_minor_seventh" />
#### augmented_minor_seventh(note)
Builds an augmented minor seventh chord on note. 
```js
zazate.chords.augmented_minor_seventh("C") // ["C", "E", "G#", "Bb"]
```

---------------------------------------
<a name="chords_augmented_triad" />
#### augmented_triad(note)
Builds an augmented triad on note. 
```js
zazate.chords.augmented_triad("C") // ["C", "E", "G#"]
```

---------------------------------------
<a name="chords_determine" />
#### determine(chord, shorthand, no_inversions, no_polychords)
* **Default values**: shorthand = False, no_inversions = False, no_polychords = False 
* Names a chord. Can determine almost every chord, from a simple triad to a fourteen note polychord. 

---------------------------------------
<a name="chords_determine_extended_chord5" />
#### determine_extended_chord5(chord, shorthand, no_inversions, no_polychords)
* **Default values**: shorthand = False, no_inversions = False, no_polychords = False 
* Determines the names of an extended chord 

---------------------------------------
<a name="chords_determine_extended_chord6" />
#### determine_extended_chord6(chord, shorthand, no_inversions, no_polychords)
* **Default values**: shorthand = False, no_inversions = False, no_polychords = False 
* Determines the names of an 6 note chord 

---------------------------------------
<a name="chords_determine_extended_chord7" />
#### determine_extended_chord7(chord, shorthand, no_inversions, no_polychords)
* **Default values**: shorthand = False, no_inversions = False, no_polychords = False 
* Determines the names of an 7 note chord 

---------------------------------------
<a name="chords_determine_polychords" />
#### determine_polychords(chord, shorthand)
* **Default values**: shorthand = False 
* Determines the polychords in chord. Can handle anything from polychords based on two triads to 6 note extended chords. 

---------------------------------------
<a name="chords_determine_seventh" />
#### determine_seventh(seventh, shorthand, no_inversion, no_polychords)
* **Default values**: shorthand = False, no_inversion = False, no_polychords = False  
* Determines the type of seventh chord. Returns the results in a lists, ordered on inversions. Expects seventh to be a list of 4 notes. If shorthand is set to True, results will be returned in chord shorthand ('Cmin7', etc.) - inversions will be dropped in that case. 
```js
zazate.chords.determine_seventh(['C', 'E', 'G', 'B']) // ['C major seventh']
```

---------------------------------------
<a name="chords_determine_triad" />
#### determine_triad(triad, shorthand, no_inversions, placeholder)
* **Default values**: shorthand = False, no_inversions = False, placeholder = None 
* Names the triad. Returns answers in a list. The third argument should not be given. If shorthand is True the answers will be in abbreviated form.

Can determine major, minor, diminished and suspended triads. Also knows about invertions. 
```js
zazate.chords.determine_triad(["A", "C", "E"]) // 'A minor triad'
zazate.chords.determine_triad(["C", "E", "A"]) // 'A minor triad, first inversion'
zazate.chordsdetermine_triad(["A", "C", "E"], True) // 'Am'
```

---------------------------------------
<a name="chords_diminished_seventh" />
#### diminished_seventh(note)
Builds a diminished seventh chord on note. 
```js
zazate.chords.diminished_seventh("C") // ["C", "Eb", "Gb", "Bbb"]
```

---------------------------------------
<a name="chords_diminished_triad" />
#### diminished_triad(note)
Builds a diminished triad on note.
```js
zazate.chords.diminished_triad("C") // ["C", "Eb", "Gb"]
```

---------------------------------------
<a name="chords_dominant" />
#### dominant(key)
Returns the dominant chord in key. 
```js
zazate.chords.dominant("C")  // ["G", "B", "D"]
```

---------------------------------------
<a name="chords_dominant7" />
#### dominant7(key)
Same as [dominant(key)](#chords_dominant), but returns seventh chord 

---------------------------------------
<a name="chords_dominant_flat_five" />
#### dominant_flat_five(note)
Builds a dominant flat five chord on note.  
```js
zazate.chords.dominant_flat_five("C") // ['C', 'E', 'Gb', 'Bb']
```

---------------------------------------
