const ROUNDING_METHODS = [
	"up",
	"down",
	"towards_zero",
	"away_zero",
	"half_up",
	"half_down",
	"half_towards_zero",
	"half_away_zero",
];

ROUNDING_METHODS.forEach(function(method, idx) {
	numi.setVariable("rounding_" + method, idx);
});

numi.addFunction({ "id": "roundTo", "phrases": "roundTo" }, function(values) {
	const number = values[0].double || 0;
	const precision = values[1].double || 0;
	const roundMethod = ROUNDING_METHODS[values[2] ? values[2].double : 0];

	const roundableNumber = number * Math.pow(10, precision);
	let roundedInteger = 0;

	switch (roundMethod) {
		case "up":
			roundedInteger = Math.ceil(roundableNumber);
			break;

		case "down":
			roundedInteger = Math.floor(roundableNumber);
			break;

		case "towards_zero":
			if (roundableNumber >= 0) { roundedInteger = Math.floor(roundableNumber); }
			else { roundedInteger = Math.ceil(roundableNumber); }

		case "away_zero":
			if (roundableNumber >= 0) { roundedInteger = Math.ceil(roundableNumber); }
			else { roundedInteger = Math.floor(roundableNumber); }

		case "half_up":
			if (roundableNumber % 1 >= 0.5) { roundedInteger = Math.ceil(roundableNumber); }
			else { roundedInteger = Math.floor(roundableNumber); }

		case "half_down":
			if (roundableNumber % 1 > 0.5) { roundedInteger = Math.ceil(roundableNumber); }
			else { roundedInteger = Math.floor(roundableNumber); }

		case "half_towards_zero":
			if (roundableNumber >= 0) {
				if (roundableNumber % 1 > 0.5) { roundedInteger = Math.ceil(roundableNumber); }
				else { roundedInteger = Math.floor(roundableNumber); }
			} else {
				if (roundableNumber % 1 >= 0.5) { roundedInteger = Math.ceil(roundableNumber); }
				else { roundedInteger = Math.floor(roundableNumber); }
			}

		case "half_away_zero":
			if (roundableNumber >= 0) {
				if (roundableNumber % 1 >= 0.5) { roundedInteger = Math.ceil(roundableNumber); }
				else { roundedInteger = Math.floor(roundableNumber); }
			} else {
				if (roundableNumber % 1 > 0.5) { roundedInteger = Math.ceil(roundableNumber); }
				else { roundedInteger = Math.floor(roundableNumber); }
			}
	}

	return { "double": roundedInteger / Math.pow(10, precision), unitId: values[0].unitId };
});
