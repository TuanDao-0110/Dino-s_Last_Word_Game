export const setUpheader = (token: string) => {
  return { Authorization: `Bearer ${token}` };
};
