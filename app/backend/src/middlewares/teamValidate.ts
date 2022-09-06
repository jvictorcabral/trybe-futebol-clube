import { Request, Response, NextFunction } from 'express';
import Matches from '../database/models/matches';

const teamValid = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  const homeTeamValidate = await Matches.findByPk(homeTeam);
  const awayTeamValidate = await Matches.findByPk(awayTeam);

  if (!homeTeamValidate || !awayTeamValidate) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default teamValid;
