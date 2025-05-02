// keep the fonts that will be used throughout your application.
// add a custom Google font
import { Inter, Lexend, Amiri } from "next/font/google";

/// English fonts
export const inter = Inter({ subsets: ["latin"] });
export const lexend = Lexend({
  weight: ["400", "700"],
  subsets: ["latin"],
});

/// Farsi and Arabic fonts
export const amiri = Amiri({
  weight: ["400", "700"],
  subsets:["arabic"]
})
