import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/ohio");

export default function Page() {
  return <ExamPage examKey="motorcycle/ohio" />;
}
