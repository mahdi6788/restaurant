import NavLinks from "./admin/NavLinks";

export default function Sidebar() {
  return (
    <div className="flex flex-col mt-28 sm:mt-10 sm:fixed sm:left-0 sm:top-28 w-64 h-auto px-3 py-4 sm:px-2">
      <div className="flex grow flex-row justify-between space-x-2 sm:flex-col sm:space-x-0 sm:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
