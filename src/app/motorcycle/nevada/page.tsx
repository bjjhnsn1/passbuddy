import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/nevada");

export default function Page() {
  return <ExamPage examKey="motorcycle/nevada" />;
}
