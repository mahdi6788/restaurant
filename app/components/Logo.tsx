import { GiFoodTruck } from "react-icons/gi";

export default function Logo() {
  return (
    <div
      className= "flex items-center justify-center"
    >
      <p className="text-4xl">Royal Food </p>
      <GiFoodTruck className="w-16 h-16 mb-3" />
    </div>
  );
}
