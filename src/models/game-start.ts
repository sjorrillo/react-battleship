import { MAX_ATTEMPS, MIN_ATTEMPS } from './../constants/application';
/* eslint-disable no-template-curly-in-string */
import { InferType, number, object, string } from 'yup';
import { Level } from '../hooks/use-battleship-context';

export const GameStartSchema = object({
  level: string().required(),
  attemps: number()
    .typeError('Attemps must be a number')
    .required('Insert the number of attemps')
    .min(MIN_ATTEMPS)
    .when('level', {
      is: Level.Hard,
      then: number().typeError('Attemps must be a number').max(MAX_ATTEMPS.Hard),
    })
    .when('level', {
      is: Level.Mediun,
      then: number().typeError('Attemps must be a number').max(MAX_ATTEMPS.Mediun),
    }),
});

export type GameStartType = InferType<typeof GameStartSchema>;
