var common_time = [4, 4],
	cut_time = [2, 2];

function valid_beat_duration(duration) {
	if(duration == 0) {
		return false;
	} else if(duration == 1) {
		return true;
	} else {
		r = duration;
		while(r != 1) {
			if(r % 2 == 1) {
				return false;
			}
			r /= 2;
		}
		return true;
	}
}

function is_valid(meter) {
	return meter[0] > 0 && valid_beat_duration(meter[1]);
}

function is_compound(meter) {
	return is_valid(meter) && meter[0] % 3 == 0;
}

function is_simple(meter) {
	return is_valid(meter);
}

function is_asymmetrical(meter) {
	return is_valid(meter) && meter[0] % 2 == 1;
}
//export
exports.common_time = common_time;
exports.cut_time = cut_time;
exports.valid_beat_duration = valid_beat_duration;
exports.is_valid = is_valid;
exports.is_compound = is_compound;
exports.is_asymmetrical = is_asymmetrical;
exports.is_simple = is_simple;