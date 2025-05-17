// import DashboardNav from "@/components/DashboardNav";
import DashboardSidebar from "@/components/DashboardSidebar";
import "../globals.css";
import UserFetcher from "@/components/UserFetcher";
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
          {/* <DashboardNav />{" "} */}
          <div className="flex relative h-screen ">
            <UserFetcher />
            <DashboardSidebar />
            <div className="flex-1 overflow-y-scroll">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}
