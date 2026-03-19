import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PassBuddy - Free Practice Exams | CDL, DMV, Motorcycle, ServSafe",
  description:
    "Free practice exams with instant answer feedback. Prepare for your CDL, DMV, motorcycle permit, or ServSafe certification exam. 10 questions per test with detailed explanations.",
};

const categories = [
  {
    title: "CDL Practice Test",
    description:
      "Commercial Driver's License exam prep with endorsement-specific tests.",
    href: "/cdl",
    topics: [
      { label: "General Knowledge", href: "/cdl/general-knowledge" },
      { label: "HazMat", href: "/cdl/hazmat" },
      { label: "Air Brakes", href: "/cdl/air-brakes" },
      { label: "Combination Vehicles", href: "/cdl/combination-vehicles" },
      { label: "Pre-Trip Inspection", href: "/cdl/pre-trip-inspection" },
      { label: "School Bus", href: "/cdl/school-bus" },
      { label: "Tanker", href: "/cdl/tanker" },
    ],
  },
  {
    title: "DMV Practice Test",
    description:
      "State-specific DMV written test prep for your driver's license.",
    href: "/dmv",
    topics: [
      { label: "California", href: "/dmv/california" },
      { label: "Texas", href: "/dmv/texas" },
      { label: "Florida", href: "/dmv/florida" },
      { label: "New York", href: "/dmv/new-york" },
    ],
  },
  {
    title: "Motorcycle Permit Test",
    description:
      "Motorcycle permit exam prep covering road safety and riding techniques.",
    href: "/motorcycle",
    topics: [],
  },
  {
    title: "ServSafe Practice Test",
    description: "Food handler and food manager certification exam prep.",
    href: "/servsafe",
    topics: [
      { label: "Food Handler", href: "/servsafe/food-handler" },
      { label: "Food Manager", href: "/servsafe/food-manager" },
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">PassBuddy</h1>
          <p className="text-lg text-gray-600">
            Free practice exams with instant feedback
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((cat) => (
            <div
              key={cat.href}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <Link href={cat.href}>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600">
                  {cat.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4">{cat.description}</p>
              {cat.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {cat.topics.map((topic) => (
                    <Link
                      key={topic.href}
                      href={topic.href}
                      className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      {topic.label}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href={cat.href}
                className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Start Practice Test &rarr;
              </Link>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-gray-200 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} PassBuddy. All rights reserved.</p>
      </footer>
    </div>
  );
}
