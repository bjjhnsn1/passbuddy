import ExamPage, { getExamMetadata } from "@/components/ExamPage";

export const metadata = getExamMetadata("motorcycle/new-mexico");

export default function Page() {
  return <ExamPage examKey="motorcycle/new-mexico" />;
}
