export const createError = (name: string, message: string) => {
  return Object.assign(new Error(message), { name });
};
