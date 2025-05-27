import { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const page = () => {
  return <ResumeEditor />;
};

export default page;
