import Link from "next/link";
import statesData from "@/data/states.json";

interface StateGridProps {
  prefix: "dmv" | "motorcycle";
  labelSuffix: string;
}

export default function StateGrid({ prefix, labelSuffix }: StateGridProps) {
  return (
    <div className="mt-12" id="all-states">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        All 50 States
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {statesData.map((state) => (
          <Link
            key={state.slug}
            href={`/${prefix}/${state.slug}`}
            className="px-4 py-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm font-medium text-gray-700 hover:text-blue-700"
          >
            {state.name} {labelSuffix}
          </Link>
        ))}
      </div>
    </div>
  );
}
