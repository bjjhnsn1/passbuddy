#!/usr/bin/env python3
"""Generate state config entries and page files for DMV and Motorcycle."""
import json
import os

with open("src/data/states.json") as f:
    states = json.load(f)

# Popular states for nav bar (top 10 by population)
NAV_STATES = [
    "california", "texas", "florida", "new-york", "pennsylvania",
    "illinois", "ohio", "georgia", "north-carolina", "michigan"
]

# --- Generate config entries ---
dmv_entries = []
moto_entries = []

for state in states:
    slug = state["slug"]
    name = state["name"]
    abbr = state["abbr"]
    agency = state["dmvAgency"]
    dmv_qs = state["dmvExamQuestions"]
    dmv_pass = state["dmvPassingScore"]
    moto_qs = state["motoExamQuestions"]
    moto_pass = state["motoPassingScore"]
    neighbors = state["neighbors"]

    # Related topics: cross-exam for same state + hub link
    dmv_related = [
        f'{{ href: "/motorcycle/{slug}", label: "{name} Motorcycle Test" }}',
        f'{{ href: "/dmv", label: "All States" }}',
    ]

    moto_related = [
        f'{{ href: "/dmv/{slug}", label: "{name} DMV Test" }}',
        f'{{ href: "/motorcycle", label: "All States" }}',
    ]

    dmv_desc = f"Prepare for the {name} written driving test administered by the {agency}. The real exam has {dmv_qs} questions and you need {dmv_pass} to pass."
    moto_desc = f"Prepare for the {name} motorcycle permit written test from the {agency}. The real exam has {moto_qs} questions and you need {moto_pass} to pass."

    dmv_entries.append(f'''  "dmv/{slug}": {{
    slug: "dmv/{slug}",
    title: "{name} DMV Practice Test",
    description: "{dmv_desc}",
    metaTitle: "{name} DMV Practice Test 2026 | Free {abbr} Permit Test Questions",
    metaDescription: "Free {name} DMV practice test with 10 questions. Based on the {abbr} driver handbook from the {agency}. Pass your {name} permit test.",
    dataPath: "/data/dmv/{slug}.json",
    category: "dmv",
    relatedTopics: [
      {", ".join(dmv_related)},
    ],
    appStoreUrl: utm(DMV_APP_STORE, "dmv-{slug}"),
    totalQuestionCount: "2,700+",
  }},''')

    moto_entries.append(f'''  "motorcycle/{slug}": {{
    slug: "motorcycle/{slug}",
    title: "{name} Motorcycle Permit Practice Test",
    description: "{moto_desc}",
    metaTitle: "{name} Motorcycle Permit Practice Test 2026 | Free {abbr} Questions",
    metaDescription: "Free {name} motorcycle permit practice test with 10 questions. Covers road safety and riding skills. Pass your {name} motorcycle test.",
    dataPath: "/data/motorcycle/{slug}.json",
    category: "motorcycle",
    relatedTopics: [
      {", ".join(moto_related)},
    ],
    appStoreUrl: utm(MOTO_APP_STORE, "motorcycle-{slug}"),
    totalQuestionCount: "900+",
  }},''')

# Write config snippet
with open("scripts/generated-state-config.ts", "w") as f:
    f.write("// --- DMV State Pages ---\n")
    f.write("\n".join(dmv_entries))
    f.write("\n\n// --- Motorcycle State Pages ---\n")
    f.write("\n".join(moto_entries))

# --- Generate page files ---
for state in states:
    slug = state["slug"]
    for category in ["dmv", "motorcycle"]:
        key = f"{category}/{slug}"
        page_dir = f"src/app/{category}/{slug}"
        os.makedirs(page_dir, exist_ok=True)
        with open(f"{page_dir}/page.tsx", "w") as f:
            f.write(f'''import ExamPage, {{ getExamMetadata }} from "@/components/ExamPage";

export const metadata = getExamMetadata("{key}");

export default function Page() {{
  return <ExamPage examKey="{key}" />;
}}
''')

print(f"Generated {len(states)*2} page files")
print(f"Config snippet written to scripts/generated-state-config.ts")

# --- Generate categoryNav updates ---
dmv_nav_topics = []
for slug in NAV_STATES:
    s = next(st for st in states if st["slug"] == slug)
    dmv_nav_topics.append(f'      {{ label: "{s["name"]}", href: "/dmv/{slug}" }}')

moto_nav_topics = []
for slug in NAV_STATES:
    s = next(st for st in states if st["slug"] == slug)
    moto_nav_topics.append(f'      {{ label: "{s["name"]}", href: "/motorcycle/{slug}" }}')

print("\n--- DMV Nav Topics (top 10) ---")
print(",\n".join(dmv_nav_topics))
print("\n--- Motorcycle Nav Topics (top 10) ---")
print(",\n".join(moto_nav_topics))

# Also generate full state list for hub pages
with open("scripts/all-states-list.json", "w") as f:
    json.dump([{"slug": s["slug"], "name": s["name"], "abbr": s["abbr"]} for s in states], f, indent=2)
print("\nAll states list written to scripts/all-states-list.json")
