import Sidebar from "../components/Sidebar";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen md:flex-row md:overflow-hidden">
      {/* static part of the layout */}
      <div className="flex-none w-full md:w-64">
        <Sidebar />
      </div>
      {/* dynamic part of the layout
            chidren are all the pages inside all folders into users directory */}
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
