import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("servsafe/food-manager");

export default function Page() {
  return <ExamPage examKey="servsafe/food-manager" />;
}
