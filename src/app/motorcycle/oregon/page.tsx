import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/oregon");

export default function Page() {
  return <ExamPage examKey="motorcycle/oregon" />;
}
