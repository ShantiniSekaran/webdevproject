module.exports = (sequelize, Sequelize) => {
    const Expense = sequelize.define("expense", {
        date: {
            type: Sequelize.STRING
        },
        item: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        },
    });
    
    return Expense;
};
