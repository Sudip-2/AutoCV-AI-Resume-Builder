import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="h-svh flex items-center justify-center">
      <SignUp />
    </main>
  );
};

export default page;
