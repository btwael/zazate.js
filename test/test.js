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
		})
	});
	describe('#cut_time', function(){
		it('should equal [2, 2].', function(){
			meter.cut_time.should.eql([2, 2]);
		})
	});
	describe('#is_asymmetrical()', function(){
		it('should return true if meter is an asymmetrical meter, false otherwise.', function(){
			for (var i = 0; i < asymmetrical_meters.length; i++) {
				meter.is_asymmetrical(asymmetrical_meters[i]).should.eql(true);
			};
			meter.is_asymmetrical([4,4]).should.eql(false);
		})
	});
	describe('#is_compound()', function(){
		it('should return true if meter is a compund meter, false otherwise.', function(){
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_compound(compound_meters[i]).should.eql(true);
			};
			meter.is_compound([4,4]).should.eql(false);
		})
	});
	describe('#is_simple()', function(){
		it('should return true if meter is a simple meter, false otherwise.', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_simple(simple_meters[i]).should.eql(true);
			};
		})
	});
	describe('#is_valid()', function(){
		it('should return true if meter is a valid array representation of a meter.', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_valid(simple_meters[i]).should.eql(true);
			};
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_valid(compound_meters[i]).should.eql(true);
			};
		})
	});
});

// Test for value
describe('Value', function(){
	var value = zazate.value;
	describe('#base_quintuplets', function(){
		it('should equal [0.3125, 0.625, 1.25, 2.5, 5, 10, 20, 40, 80, 160].', function(){
			value.base_quintuplets.should.eql([0.3125, 0.625, 1.25, 2.5, 5, 10, 20, 40, 80, 160]);
		})
	});
	describe('#base_septuplets', function(){
		it('should equal [0.4375, 0.875, 1.75, 3.5, 7, 14, 28, 56, 112, 224].', function(){
			value.base_septuplets.should.eql([0.4375, 0.875, 1.75, 3.5, 7, 14, 28, 56, 112, 224]);
		})
	});
	describe('#base_triplets', function(){
		it('should equal [0.375, 0.75, 1.5, 3, 6, 12, 24, 48, 96, 192].', function(){
			value.base_triplets.should.eql([0.375, 0.75, 1.5, 3, 6, 12, 24, 48, 96, 192]);
		})
	});
	describe('#base_values', function(){
		it('should equal [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128].', function(){
			value.base_values.should.eql([0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128]);
		})
	});
	describe('#breve', function(){
		it('should equal 0.5.', function(){
			value.breve.should.eql(0.5);
		})
	});
	describe('#crotchet', function(){
		it('should equal 4.', function(){
			value.crotchet.should.eql(4);
		})
	});
	describe('#demisemiquaver', function(){
		it('should equal 32.', function(){
			value.demisemiquaver.should.eql(32);
		})
	});
});