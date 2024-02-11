export const parseArgs = (): object => {
  return Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.split('=');

      if (key.startsWith('--')) {
        return [key.slice(2), value];
      }

      return [key, value];
    })
  );
};
