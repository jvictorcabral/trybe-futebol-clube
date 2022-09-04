import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './teams';

class Matches extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
    // field: 'home_team',
  },
  homeTeamsGoals: {
    type: INTEGER,
    allowNull: false,
    // field: 'home_team_goals',

  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    // field: 'away_team',

  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    // field: 'away_team_goals',

  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    // field: 'in_progress',

  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Matches;
