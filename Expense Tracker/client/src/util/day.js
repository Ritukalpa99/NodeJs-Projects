function groupByDay(data) {
	const groupedData = {};

	data.forEach((item) => {
		const createdAt = new Date(item.createdAt);
		const dayKey = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1)
			.toString()
			.padStart(2, "0")}-${createdAt
			.getDate()
			.toString()
			.padStart(2, "0")}`;

		if (!groupedData[dayKey]) {
			groupedData[dayKey] = [item];
		} else {
			groupedData[dayKey].push(item);
		}
	});

	const result = Object.keys(groupedData).map((key) => ({
		day: key,
		items: groupedData[key],
	}));

	return result;
}

export default groupByDay;
