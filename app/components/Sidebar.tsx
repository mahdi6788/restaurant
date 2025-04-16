import NavLinks from "./admin/NavLinks";

export default function Sidebar() {
  return (
    <div className="flex flex-col fixed left-0 top-28 w-64 h-auto px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
