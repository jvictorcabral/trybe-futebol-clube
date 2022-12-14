import { Request, Response } from 'express';
import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

const getMatches = async (req: Request, res: Response) => {
  const { inProgress } = req.query;

  const matches = await Matches.findAll(
    {
      include: [
        { model: Teams, as: 'teamHome', attributes: ['teamName'] },
        { model: Teams, as: 'teamAway', attributes: ['teamName'] },
      ],
    },
  );

  if (inProgress === 'true') {
    const filterInProgress = matches.filter((match) => match.inProgress === true);

    return res.status(200).json(filterInProgress);
  }

  if (inProgress === 'true') {
    const filterFinished = matches.filter((match) => match.inProgress !== true);

    return res.status(200).json(filterFinished);
  }

  return res.status(200).json(matches);
};

const postMatches = async (req: Request, res: Response) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

  const createMatch = await Matches.create({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });

  return res.status(201).json(createMatch);
};

const finishMatches = async (req: Request, res: Response) => {
  const { id } = req.params;

  Matches.update(
    {
      inProgress: false,
    },
    { where: { id } },
  );

  return res.status(200).json({ message: 'Finished' });
};

const updateMatch = async (req: Request, res: Response) => {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  const { id } = req.params;

  await Matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );

  const updatedMatch = await Matches.findByPk(id);

  return res.status(200).json(updatedMatch);
};

export default {
  getMatches,
  postMatches,
  finishMatches,
  updateMatch,
};
