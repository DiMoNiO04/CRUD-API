import { parseArgs } from './parseArgs';

const args = parseArgs();

export const isCluster = (): boolean => args['cluster'];
