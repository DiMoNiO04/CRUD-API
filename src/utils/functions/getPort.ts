import { PORT_DEF } from '../consts';

export const getPort = (): number => Number(process.env.PORT) || PORT_DEF;
