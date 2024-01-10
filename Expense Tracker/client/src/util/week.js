function groupByWeek(data) {
	const groupedData = {};

	data.forEach((item) => {
		const createdAt = new Date(item.createdAt);

		const weekKey = `${createdAt.getFullYear()}-W${createdAt.toLocaleString(
			"en-US",
			{ week: "iso" }
		)}`;

		if (!groupedData[weekKey]) {
			groupedData[weekKey] = [item];
		} else {
			groupedData[weekKey].push(item);
		}
	});

	const result = Object.keys(groupedData).map((key) => ({
		week: key,
		items: groupedData[key],
	}));

	return result;
}

export default groupByWeek;
