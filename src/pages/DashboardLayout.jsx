import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex flex-1 flex-col h-full min-h-0 w-full grow p-0 m-0">
    <div className="flex-1 flex flex-col justify-center items-center h-full min-h-0 w-full grow p-0 m-0">
      <div className="w-full h-full bg-light-bg dark:bg-dark-card rounded-none shadow-none p-0 m-0 flex-1 flex flex-col grow">
        <Outlet />
      </div>
    </div>
  </div>
);

export default DashboardLayout;
