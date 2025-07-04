import { TransformFnParams } from 'class-transformer';

export const transformInteger = ({ value }: TransformFnParams) =>
  parseInt(value, 10);
