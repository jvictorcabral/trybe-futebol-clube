import { Request, Response, NextFunction } from 'express';
import Matches from '../database/models/matches';

const matchValidate = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res.status(401).json({ message:
      'It is not possible to create a match with two equal teams' });
  }

  const homeTeamValidate = await Matches.findByPk(homeTeam);
  const awayTeamValidate = await Matches.findByPk(awayTeam);

  if (!homeTeamValidate || !awayTeamValidate) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  next();
};

export default matchValidate;
