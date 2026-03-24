import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

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
      "State-specific DMV written test prep for your driver's license. Available for all 50 states.",
    href: "/dmv",
    topics: [
      { label: "California", href: "/dmv/california" },
      { label: "Texas", href: "/dmv/texas" },
      { label: "Florida", href: "/dmv/florida" },
      { label: "New York", href: "/dmv/new-york" },
      { label: "All 50 States", href: "/dmv" },
    ],
  },
  {
    title: "Motorcycle Permit Test",
    description:
      "State-specific motorcycle permit exam prep. Covers road safety and riding techniques for all 50 states.",
    href: "/motorcycle",
    topics: [
      { label: "California", href: "/motorcycle/california" },
      { label: "Texas", href: "/motorcycle/texas" },
      { label: "Florida", href: "/motorcycle/florida" },
      { label: "New York", href: "/motorcycle/new-york" },
      { label: "All 50 States", href: "/motorcycle" },
    ],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PassBuddy",
  url: "https://passbuddy.app",
  description:
    "Free practice exams with instant answer feedback. Prepare for your CDL, DMV, motorcycle permit, or ServSafe certification exam.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PassBuddy",
  url: "https://passbuddy.app",
  sameAs: [
    "https://apps.apple.com/app/cdl-test-prep-study-buddy/id6444111149",
    "https://apps.apple.com/app/dmv-study-buddy/id6504884269",
    "https://apps.apple.com/app/motorcycle-permit-study-buddy/id6450431915",
    "https://apps.apple.com/app/servsafe-practice-test-prep/id6467704764",
    "https://play.google.com/store/apps/details?id=com.exampreppy.cdl",
  ],
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
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

      <footer className="border-t border-gray-200 mt-16 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link href="/cdl" className="text-gray-500 hover:text-blue-600">CDL Practice Test</Link>
            <Link href="/dmv" className="text-gray-500 hover:text-blue-600">DMV Practice Test</Link>
            <Link href="/motorcycle" className="text-gray-500 hover:text-blue-600">Motorcycle Practice Test</Link>
            <Link href="/servsafe" className="text-gray-500 hover:text-blue-600">ServSafe Practice Test</Link>
          </div>
          <p className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PassBuddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
