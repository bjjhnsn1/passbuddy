import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/utah");

export default function Page() {
  return <ExamPage examKey="motorcycle/utah" />;
}
