import Analyze from "@/components/custom/analyze_comps/Analyze";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Analyze resume",
};

export default function page() {
  return <Analyze />
}
