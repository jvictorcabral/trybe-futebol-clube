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
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'home_team_goals',

  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team',

  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
    field: 'away_team_goals',

  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
    field: 'in_progress',

  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.hasOne(Teams, { foreignKey: 'id', as: 'teamHome', sourceKey: 'homeTeam' });
Matches.hasOne(Teams, { foreignKey: 'id', as: 'teamAway', sourceKey: 'awayTeam' });

export default Matches;
