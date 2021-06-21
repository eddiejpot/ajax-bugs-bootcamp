export default function initBugModel(sequelize, DataTypes) {
  return sequelize.define(
    'bugs',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      problem: {
        // allowNull: false,
        type: DataTypes.STRING,
      },
      errorText: {
        // allowNull: true,
        type: DataTypes.STRING,
      },
      commit: {
        // allowNull: true,
        type: DataTypes.STRING,
      },
      featureId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'features',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
