import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/connecticut");

export default function Page() {
  return <ExamPage examKey="motorcycle/connecticut" />;
}
