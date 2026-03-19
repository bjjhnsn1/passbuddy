import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/louisiana");

export default function Page() {
  return <ExamPage examKey="motorcycle/louisiana" />;
}
