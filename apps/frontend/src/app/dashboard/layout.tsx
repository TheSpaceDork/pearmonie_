import UserFetcher from "../../components/UserFetcher";
import "../globals.css";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashboardNav from "../../components/DashboardNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {" "}
      <div>
        <section className="default-bg !pt-0 ">
          <div className="flex flex-col md:flex-row relative h-screen ">
            <UserFetcher />
            <DashboardSidebar />
            <div className="block md:hidden">
              <DashboardNav />
            </div>
            <div className="flex-1 overflow-y-scroll">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}
