
module.exports.add_numbers = function (req, res, next) {

	
	var number_a = req.query.a;
	console.log(req.query);
	var number_b = req.query.b;

	var answer = {};
	if(isNaN(number_a + '') || isNaN(number_b + ''))//validate for a number
	{	
		answer = {
			result: "Not a number"
		}
		res.type('json');
		res.send(JSON.stringify(answer));
		return;
	}
	number_a = parseFloat(number_a); //now we parse it, after validation
	res.type('json');
	number_b = parseFloat(number_b);//now we parse it, after validation
	
	answer = number_a + number_b;	//calculate
	res.send(JSON.stringify({result: answer}));

	return;
}


module.exports.sub_numbers = function (req, res, next) {
	var number_a = req.query.a;
	console.log(req.query);
	var number_b = req.query.b;

	var answer = {};
	if(isNaN(number_a + '') || isNaN(number_b + ''))//validate for a number
	{	
		answer = {
			result: "Not a number"
		}
		res.type('json');
		res.send(JSON.stringify(answer));
		return;
	}
	number_a = parseFloat(number_a); //now we parse it, after validation
	res.type('json');
	number_b = parseFloat(number_b);//now we parse it, after validation
	
	answer = number_a - number_b;	//calculate
	res.send(JSON.stringify({result: answer}));

	return;
	
}

module.exports.mul_numbers = function (req, res, next) {
	
	var number_a = req.query.a;
	console.log(req.query);
	var number_b = req.query.b;

	var answer = {};
	if(isNaN(number_a + '') || isNaN(number_b + ''))//validate for a number
	{	
		answer = {
			result: "Not a number"
		}
		res.type('json');
		res.send(JSON.stringify(answer));
		return;
	}
	number_a = parseFloat(number_a); //now we parse it, after validation
	res.type('json');
	number_b = parseFloat(number_b);//now we parse it, after validation
	
	answer = number_a * number_b;	//calculate
	res.send(JSON.stringify({result: answer}));

	return;
}

module.exports.div_numbers = function (req, res, next) {
	var number_a = req.query.a;
	console.log(req.query);
	var number_b = req.query.b;

	var answer = {};
	if(isNaN(number_a + '') || isNaN(number_b + ''))//validate for a number
	{	
		answer = {
			result: "Not a number"
		}
		res.type('json');
		res.send(JSON.stringify(answer));
		return;
	}
	number_a = parseFloat(number_a); //now we parse it, after validation
	res.type('json');
	number_b = parseFloat(number_b);//now we parse it, after validation
	
	answer = number_a / number_b;	//calculate
	res.send(JSON.stringify({result: answer}));

	return;
	
}