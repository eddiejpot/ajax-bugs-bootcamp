module.exports = {
  up: async (queryInterface) => {
    // ------------------------------------FEATURES
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

    await queryInterface.bulkInsert('features', featuresList);

    // ------------------------------------USERS
    const usersList = [
      {
        name: 'eddie',
        email: 'eddie@gmail.com',
        password: '1234',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'kai',
        email: 'kai@gmail.com',
        password: '1234',
        created_at: new Date(),
        updated_at: new Date(),
      },

    ];

    await queryInterface.bulkInsert('users', usersList);

    // ------------------------------------BUGS
    const bugsList = [
      {
        problem: 'bug1',
        error_text: 'bug1',
        commit: 'bug1',
        feature_id: 1,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        problem: 'bug2',
        error_text: 'bug2',
        commit: 'bug2',
        feature_id: 2,
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        problem: 'bug3',
        error_text: 'bug3',
        commit: 'bug3',
        feature_id: 1,
        user_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },

    ];

    await queryInterface.bulkInsert('bugs', bugsList);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('bugs', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('features', null, {});
  },
};
