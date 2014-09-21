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
		it('returns true if meter is an asymmetrical meter, false otherwise.', function(){
			for (var i = 0; i < asymmetrical_meters.length; i++) {
				meter.is_asymmetrical(asymmetrical_meters[i]).should.eql(true);
			};
			meter.is_asymmetrical([4,4]).should.eql(false);
		})
	});
	describe('#is_compound()', function(){
		it('returns true if meter is a compund meter, false otherwise.', function(){
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_compound(compound_meters[i]).should.eql(true);
			};
			meter.is_compound([4,4]).should.eql(false);
		})
	});
	describe('#is_simple()', function(){
		it('returns true if meter is a simple meter, false otherwise.', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_simple(simple_meters[i]).should.eql(true);
			};
		})
	});
	describe('#is_valid()', function(){
		it('returns true if meter is a valid array representation of a meter', function(){
			for (var i = 0; i < simple_meters.length; i++) {
				meter.is_valid(simple_meters[i]).should.eql(true);
			};
			for (var i = 0; i < compound_meters.length; i++) {
				meter.is_valid(compound_meters[i]).should.eql(true);
			};
		})
	});
})