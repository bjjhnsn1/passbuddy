import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/minnesota");

export default function Page() {
  return <ExamPage examKey="motorcycle/minnesota" />;
}
