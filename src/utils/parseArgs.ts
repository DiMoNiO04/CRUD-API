export const parseArgs = (): object => {
  return Object.fromEntries(
    process.argv.slice(2).map((arg) => {
      const [key, value] = arg.split('=');
      return [key, value];
    })
  );
};
