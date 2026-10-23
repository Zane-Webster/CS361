function groupByRole(items) {
    const groups = {};

    for (const item of items) {
        if (!groups[item.role]) {
            groups[item.role] = [];
        }

        groups[item.role].push(item);
    }

    return Object.entries(groups).map(([role, items]) => {
        return {
            role: role,
            items: items
        };
    });
}

module.exports = groupByRole;