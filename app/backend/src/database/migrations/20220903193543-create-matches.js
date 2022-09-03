'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team'
      },
      homeTeamsGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'home_team_goals'

      },
      awayTeams: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_teams'

      },
      awayTeamsGoals: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'away_teams_goals'

      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        field: 'in_progress'

      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};