import type { MenuCategory } from "@/types/pastry";
import classicChocolateChip from "@/assets/cookies/chocolate-chip.png";
import bananaBread from "@/assets/cookies/banana-bread.png";
import cookieScoop from "@/assets/cookies/Cookie-Scoop.png";

export const menuCategories: MenuCategory[] = [
  {
    id: 1,
    name: "Cookie Flavors",
    description:
      "Hand-scooped cookies baked fresh daily in nine signature flavors.",
    image: classicChocolateChip,
  },
  {
    id: 2,
    name: "Banana Bread",
    description:
      "Moist, warmly spiced loaves made with ripe bananas and real butter.",
    image: bananaBread,
  },
  {
    id: 3,
    name: "Special",
    description:
      "Limited creations and gift-ready treats made for sharing.",
    image: cookieScoop,
  },
];
