import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/idaho");

export default function Page() {
  return <ExamPage examKey="motorcycle/idaho" />;
}
