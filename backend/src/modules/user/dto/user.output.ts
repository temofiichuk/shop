import { Prisma } from "@prisma/client";

export const imageOutputFields: Prisma.ImageSelect = {
  id: true,
  name: true,
  product_id: true,
  url: true,
};

export const favoriteOutputFields: Prisma.ProductSelect = {
  id: true,
  name: true,
  price: true,
  images: {
    select: { ...imageOutputFields },
  },
  slug: true,
};

export const userOutputFields: Prisma.UserSelect = {
  password: false,
  id: true,
  email: true,
  name: true,
  phone: true,
  avatar: true,
  favorites: {
    select: { ...favoriteOutputFields },
  },
};
