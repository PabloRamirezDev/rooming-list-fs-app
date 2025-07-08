import { TransformFnParams } from 'class-transformer';

export const transformArray = ({ value }: TransformFnParams) => {
  if (typeof value !== 'string') return null;

  return value.split(',');
};
