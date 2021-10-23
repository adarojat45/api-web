const errorHandler = (err, req, res, next) => {
	let code = 500;
	let name = "InternalServerError";
	let messages = [];

	switch (err.name) {
		case "NotFound":
			code = err.code;
			name = err.name;
			messages = [err.message];
			break;
		case "ApiError":
			code = err.status;
			name = err.name;
			messages = [err.message];
			break;
		case "RetryError":
			code = 403;
			name = err.name;
			messages = [err.message];
			break;

		default:
			messages = ["Internal server error"];
			break;
	}
	res.status(code).json({
		code,
		name,
		messages,
	});
};

module.exports = errorHandler;
