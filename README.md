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
<a name="to_major" />
#### to_major(note)
Returns the major of note. 
```js
zazate.notes.to_major('A'); // return 'C'
```

---------------------------------------
<a name="to_minor" />
#### to_minor(note)
Returns the minor of note. 
```js
zazate.notes.to_minor('C'); // return 'A'
```

---------------------------------------