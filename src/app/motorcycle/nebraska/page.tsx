import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/nebraska");

export default function Page() {
  return <ExamPage examKey="motorcycle/nebraska" />;
}
