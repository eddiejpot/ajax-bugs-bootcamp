module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ---------------------------------------- USERS TABLE
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

    });

    // -------------------------------ADD  NEW COLUMN TO BUGS TABLE
    await queryInterface.addColumn(
      'bugs', // table name
      'user_id', // new field name
      {
        allowNull: true,
        type: Sequelize.INTEGER,
        references:
          {
            model: 'users',
            key: 'id',
          },
      },
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('bugs', 'user_id');
    await queryInterface.dropTable('users');
  },
};
