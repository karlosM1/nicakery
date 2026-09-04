import type { Pastry } from "@/types/pastry";
import classicChocolateChip from "@/assets/cookies/chocolate-chip.png";
import doubleChocolate from "@/assets/cookies/double-chocolate-cookie.webp";
import redVelvetCreamCheese from "@/assets/cookies/Red-Velvet-Cream-Cheese.webp";
import matchaWhiteChocolate from "@/assets/cookies/Matcha-White-Chocolate.webp";
import saltedCaramel from "@/assets/cookies/salted-caramel.webp";
import peanutButterChocolate from "@/assets/cookies/peanut-butter-chocolate.webp";
import biscoffCookie from "@/assets/cookies/biscoff-cookie.png";
import smores from "@/assets/cookies/Smore.png";
import bananaBread from "@/assets/cookies/banana-bread.png";
import cookieScoop from "@/assets/cookies/Cookie-Scoop.png";

export const pastries: Pastry[] = [
  {
    id: 1,
    name: "Classic Chocolate Chip",
    image: classicChocolateChip,
    category: "Cookie Flavors",
    description: "Golden edges, soft center, and melty chocolate chips.",
  },
  {
    id: 2,
    name: "Double Chocolate",
    image: doubleChocolate,
    category: "Cookie Flavors",
    description: "Rich cocoa dough loaded with dark chocolate chunks.",
  },
  {
    id: 3,
    name: "Red Velvet Cream Cheese",
    image: redVelvetCreamCheese,
    category: "Cookie Flavors",
    description: "Velvety cookie swirled with sweet cream cheese.",
  },
  {
    id: 4,
    name: "Matcha White Chocolate",
    image: matchaWhiteChocolate,
    category: "Cookie Flavors",
    description: "Earthy matcha balanced with creamy white chocolate.",
  },
  {
    id: 5,
    name: "Salted Caramel",
    image: saltedCaramel,
    category: "Cookie Flavors",
    description: "Buttery caramel with a hint of sea salt in every bite.",
  },
  {
    id: 6,
    name: "Peanut Butter Chocolate",
    image: peanutButterChocolate,
    category: "Cookie Flavors",
    description: "Creamy peanut butter folded with chocolate chips.",
  },
  {
    id: 7,
    name: "Nutella Stuffed",
    image: doubleChocolate,
    category: "Cookie Flavors",
    description: "A warm cookie with a molten hazelnut chocolate center.",
  },
  {
    id: 8,
    name: "Biscoff",
    image: biscoffCookie,
    category: "Cookie Flavors",
    description: "Caramelized spice cookie crumble in every scoop.",
  },
  {
    id: 9,
    name: "S'mores",
    image: smores,
    category: "Cookie Flavors",
    description: "Toasted marshmallow, chocolate, and graham cracker vibes.",
  },
  {
    id: 10,
    name: "Banana Bread",
    image: bananaBread,
    category: "Banana Bread",
    description: "Tender loaf with ripe bananas and a lightly crisp crust.",
  },
  {
    id: 11,
    name: "Scoopable Cookie in a Tin Container",
    image: cookieScoop,
    category: "Special",
    description: "Fresh scoopable cookies packed in a reusable tin to go.",
  },
];
