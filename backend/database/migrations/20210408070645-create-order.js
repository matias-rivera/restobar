"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            total: {
                type: Sequelize.DOUBLE,
                allowNull: false,
            },
            isPaid: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            delivery: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            note: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            clientId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Clients",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            tableId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: "Tables",
                    key: "id",
                },
                onDelete: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal("NOW()"),
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Orders");
    },
};
