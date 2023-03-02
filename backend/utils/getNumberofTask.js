const getFilteredTask = async (filterby, model) => {
	switch (filterby) {
		case "day":
			let resultDay = await model.aggregate([
				{
					$group: {
						_id: {
							$dateToString: {
								format: "%Y-%m-%d",
								date: "$date",
							},
						},
						count: { $sum: 1 },
					},
				},
			]);
			return resultDay;
		case "month":
			let resultMonth = await model.aggregate([
				{
					$group: {
						_id: { $month: "$date" },
						count: { $sum: 1 },
					},
				},
			]);
			return resultMonth;
		case "year":
			let resultYear = await model.aggregate([
				{
					$group: {
						_id: { $year: "$date" },
						count: { $sum: 1 },
					},
				}
			]);
			return resultYear;
		default:
			throw Error("Enter valid filterby");
	}
};

module.exports = getFilteredTask;