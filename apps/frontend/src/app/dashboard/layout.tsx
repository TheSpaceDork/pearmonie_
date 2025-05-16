// import DashboardNav from "@/components/DashboardNav";
import DashboardSidebar from "@/components/DashboardSidebar";
import "../globals.css";
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
          <div className="flex relative h-screen overflow-y-hidden">
            <DashboardSidebar />
            <div className="flex-1">{children}</div>
          </div>
        </section>
      </div>
    </>
  );
}
