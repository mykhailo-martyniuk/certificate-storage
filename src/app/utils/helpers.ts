export const asyncMap = async <T, R>(array: T[], asyncCallback: (item: T) => Promise<R>): Promise<R[]> => {
  const results: R[] = [];
  for (const item of array) {
    const result = await asyncCallback(item);
    results.push(result);
  }
  return results;
};
