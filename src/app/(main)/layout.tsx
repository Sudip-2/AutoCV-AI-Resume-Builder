import Navbar from "./Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default layout;
