import { getPort } from '../utils/getPort';
import { parseArgs } from '../utils/parseArgs';

const PORT = getPort();
const args = parseArgs();

export const start = (): void => {
  console.log(PORT);
  console.log(args);
};
