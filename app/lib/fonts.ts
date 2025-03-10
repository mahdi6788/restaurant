// use the font.ts file to keep the fonts that will be used throughout your application.
// add a custom Google font
// first import the desired font that is Inter here, then specify what subset you like to load, here is latin.
import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});
