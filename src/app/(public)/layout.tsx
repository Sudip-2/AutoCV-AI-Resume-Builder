import MainNav from "@/components/custom/MainNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNav />
      {children}
    </>
  );
};

export default layout;
