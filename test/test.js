var should = require('should'),
	zazate = require('../core/init.js');

// Test for meter
describe('Meter', function(){
	var meter = zazate.meter,
		simple_meters = [
			[2, 4],
			[3, 4],
			[4, 4],
			[6, 4],
			[8, 4],
			[5, 4],
			[2, 2],
			[1, 2],
			[6, 4]
		],
		compound_meters = [
			[3, 4],
			[6, 4],
			[9, 4],
			[12, 4],
			[3, 8],
			[6, 8],
			[9, 8],
			[12, 8],
			[3, 16],
			[6, 16],
			[9, 16],
			[12, 16]
		],
		asymmetrical_meters = [
			[3, 4],
			[5, 4],
			[7, 4],
			[11, 4],
			[1, 8],
			[3, 8],
			[5, 8],
			[7, 8],
			[3, 16],
			[11, 16],
			[15, 16],
			[17, 16]
		];
	describe('#common_time', function(){
		it('should equal [4, 4].', function(){
			meter.common_time.should.eql([4, 4]);
		});
	});
	describe('#cut_time', function(){
		it('should equal [2, 2].', function(){
			meter.cut_time.should.eql([2, 2]);
		});
	});
	describe('#is_asymmetrical()', function(){
		it('should return true if meter is an asymmetrical meter, false otherwise.', function(){
			for (var i = 0; i < asymmetrical_meters.length; i++) {
				meter.is_asymmetrical(asymmetrical_meters[i]).should.eql(true);
			};
			meter.is_asymmetrical([4,4]).should.eql(false);
		});
	});
	describe('#is_compound()', function(){
		it('should return true if meter is a compund meter, false otherwise.', function(){
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_compound(compound_meters[i]).should.eql(true);
			};
			meter.is_compound([4,4]).should.eql(false);
		});
	});
	describe('#is_simple()', function(){
		it('should return true if meter is a simple meter, false otherwise.', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_simple(simple_meters[i]).should.eql(true);
			};
		});
	});
	describe('#is_valid()', function(){
		it('should return true if meter is a valid array representation of a meter.', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_valid(simple_meters[i]).should.eql(true);
			};
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_valid(compound_meters[i]).should.eql(true);
			};
		});
	});
});

// Test for value
describe('Value', function(){
	var value = zazate.value;
	describe('#base_quintuplets', function(){
		it('should equal [0.3125, 0.625, 1.25, 2.5, 5, 10, 20, 40, 80, 160].', function(){
			value.base_quintuplets.should.eql([0.3125, 0.625, 1.25, 2.5, 5, 10, 20, 40, 80, 160]);
		});
	});
	describe('#base_septuplets', function(){
		it('should equal [0.4375, 0.875, 1.75, 3.5, 7, 14, 28, 56, 112, 224].', function(){
			value.base_septuplets.should.eql([0.4375, 0.875, 1.75, 3.5, 7, 14, 28, 56, 112, 224]);
		});
	});
	describe('#base_triplets', function(){
		it('should equal [0.375, 0.75, 1.5, 3, 6, 12, 24, 48, 96, 192].', function(){
			value.base_triplets.should.eql([0.375, 0.75, 1.5, 3, 6, 12, 24, 48, 96, 192]);
		});
	});
	describe('#base_values', function(){
		it('should equal [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128].', function(){
			value.base_values.should.eql([0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128]);
		});
	});
	describe('#breve', function(){
		it('should equal 0.5.', function(){
			value.breve.should.eql(0.5);
		});
	});
	describe('#crotchet', function(){
		it('should equal 4.', function(){
			value.crotchet.should.eql(4);
		});
	});
	describe('#demisemiquaver', function(){
		it('should equal 32.', function(){
			value.demisemiquaver.should.eql(32);
		});
	});
	//
	describe('#eighth', function(){
		it('should equal 8.', function(){
			value.eighth.should.eql(8);
		});
	});
	describe('#half', function(){
		it('should equal 2.', function(){
			value.half.should.eql(2);
		});
	});
	describe('#hemidemisemiquaver', function(){
		it('should equal 64.', function(){
			value.hemidemisemiquaver.should.eql(64);
		});
	});
	describe('#hundred_twenty_eighth', function(){
		it('should equal 128.', function(){
			value.hundred_twenty_eighth.should.eql(128);
		});
	});
	describe('#longa', function(){
		it('should equal 0.25.', function(){
			value.longa.should.eql(0.25);
		});
	});
	describe('#minim', function(){
		it('should equal 2.', function(){
			value.minim.should.eql(2);
		});
	});
	describe('#musicxml', function(){
		it("should equal  {16: '16th', 1: 'whole', 2: 'half', 4: 'quarter', 32: '32th', 8: 'eighth', 64: '64th', 128: '128th'}.", function(){
			value.musicxml.should.eql({
				16: '16th',
				1: 'whole',
				2: 'half',
				4: 'quarter',
				32: '32th',
				8: 'eighth',
				64: '64th',
				128: '128th'
			});
		});
	});
	describe('#quarter', function(){
		it('should equal 4.', function(){
			value.quarter.should.eql(4);
		});
	});
	describe('#quasihemidemisemiquaver', function(){
		it('should equal 128.', function(){
			value.quasihemidemisemiquaver.should.eql(128);
		});
	});
	describe('#quaver', function(){
		it('should equal 8.', function(){
			value.quaver.should.eql(8);
		});
	});
	describe('#semibreve', function(){
		it('should equal 1.', function(){
			value.semibreve.should.eql(1);
		});
	});
	describe('#semihemidemisemiquaver', function(){
		it('should equal 128.', function(){
			value.semihemidemisemiquaver.should.eql(128);
		});
	});
	describe('#semiquaver', function(){
		it('should equal 16.', function(){
			value.semiquaver.should.eql(16);
		});
	});
	describe('#sixteenth', function(){
		it('should equal 16.', function(){
			value.sixteenth.should.eql(16);
		});
	});
	describe('#sixty_fourth', function(){
		it('should equal 64.', function(){
			value.sixty_fourth.should.eql(64);
		});
	});
	describe('#thirty_second', function(){
		it('should equal 32.', function(){
			value.thirty_second.should.eql(32);
		});
	});
	describe('#whole', function(){
		it('should equal 1.', function(){
			value.whole.should.eql(1);
		});
	});
	describe('#add()', function(){
		it('should return the value of the two combined.', function(){
			value.add(value.eighth, value.quarter).should.eql(2.6666666666666665);
		});
	});
	describe('#determine()', function(){
		it('should analyse the value and return a array containing the parts it\'s made of.', function(){
			value.determine(8).should.eql([8, 0, 1, 1]);
			value.determine(12).should.eql([8, 0, 3, 2]);
			value.determine(14).should.eql([8, 0, 7, 4]);
		});
	});
	describe('#dots()', function(){
		it('should returns the dotted note value.', function(){
			value.dots(value.eighth).should.eql(5.3333333333333333);
			value.dots(value.eighth, 2).should.eql(4.5714285714285712);
			value.dots(value.quarter).should.eql(2.6666666666666665);
		});
	});
	describe('#quintuplet()', function(){
		it('should returns the quintuplet note value.', function(){
			value.quintuplet(8).should.eql(10);
			value.quintuplet(4).should.eql(5);
		});
	});
});