module.exports = {
  up: async (queryInterface) => {
    const featuresList = [
      {
        name: 'NavBar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'FriendList',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'UserProfile',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert categories before items because items reference categories
    queryInterface.bulkInsert('features', featuresList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('bugs', null, {});
    // Delete item before category records because items reference categories
    await queryInterface.bulkDelete('features', null, {});
  },
};
