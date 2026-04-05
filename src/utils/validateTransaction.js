/**
 * Validate transaction input before DB operations
 */

const validateTransaction = (data) => {
    const { amount, type, category } = data;

    if (!amount || amount <= 0) {
        return "Amount must be greater than 0";
    }

    if (!["income", "expense"].includes(type)) {
        return "Type must be either 'income' or 'expense'";
    }

    if (!category || category.trim() === "") {
        return "Category is required";
    }

    return null;
};

module.exports = validateTransaction;
