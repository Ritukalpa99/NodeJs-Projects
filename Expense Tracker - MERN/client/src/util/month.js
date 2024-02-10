function groupByMonth(data) {
	const groupedData = {};

	data.forEach((item) => {
		const createdAt = new Date(item.createdAt);
		const monthKey = `${createdAt.getFullYear()}-${(
			createdAt.getMonth() + 1
		)
			.toString()
			.padStart(2, "0")}`;

		if (!groupedData[monthKey]) {
			groupedData[monthKey] = [item];
		} else {
			groupedData[monthKey].push(item);
		}
	});

	const result = Object.keys(groupedData).map((key) => ({
		month: key,
		items: groupedData[key],
	}));

	return result;
}

export default groupByMonth;
