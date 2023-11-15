import * as process from "process";

export const pagination = (page: number) => {
  console.log(process.env.PER_PAGE);
  const take = +process.env.PER_PAGE || 12;
  const skip = (page - 1) * take;

  return { skip, take };
};
