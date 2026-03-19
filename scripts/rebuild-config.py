#!/usr/bin/env python3
"""Rebuild config.ts with all state entries."""
import json

with open("src/data/states.json") as f:
    states = json.load(f)

with open("scripts/generated-state-config.ts") as f:
    state_config = f.read()

NAV_STATES = [
    "california", "texas", "florida", "new-york", "pennsylvania",
    "illinois", "ohio", "georgia", "north-carolina", "michigan"
]

def nav_topics(prefix):
    lines = []
    for slug in NAV_STATES:
        s = next(st for st in states if st["slug"] == slug)
        lines.append(f'      {{ label: "{s["name"]}", href: "/{prefix}/{slug}" }},')
    return "\n".join(lines)

config = f'''import {{ ExamConfig }} from "./types";

const CDL_APP_STORE = "https://apps.apple.com/app/cdl-test-prep-study-buddy/id6444111149";
const DMV_APP_STORE = "https://apps.apple.com/app/dmv-study-buddy/id6504884269";
const MOTO_APP_STORE = "https://apps.apple.com/app/motorcycle-permit-study-buddy/id6450431915";
const SS_APP_STORE = "https://apps.apple.com/app/servsafe-practice-test-prep/id6467704764";

function utm(url: string, topic: string) {{
  return `${{url}}?utm_source=passbuddy&utm_medium=web&utm_campaign=${{topic}}`;
}}

export const categoryNav: Record<string, {{ label: string; href: string; topics: {{ label: string; href: string }}[] }}> = {{
  cdl: {{
    label: "CDL",
    href: "/cdl",
    topics: [
      {{ label: "General Knowledge", href: "/cdl/general-knowledge" }},
      {{ label: "HazMat", href: "/cdl/hazmat" }},
      {{ label: "Air Brakes", href: "/cdl/air-brakes" }},
      {{ label: "Combination Vehicles", href: "/cdl/combination-vehicles" }},
      {{ label: "Pre-Trip Inspection", href: "/cdl/pre-trip-inspection" }},
      {{ label: "School Bus", href: "/cdl/school-bus" }},
      {{ label: "Tanker", href: "/cdl/tanker" }},
    ],
  }},
  dmv: {{
    label: "DMV",
    href: "/dmv",
    topics: [
{nav_topics("dmv")}
    ],
  }},
  motorcycle: {{
    label: "Motorcycle",
    href: "/motorcycle",
    topics: [
{nav_topics("motorcycle")}
    ],
  }},
  servsafe: {{
    label: "ServSafe",
    href: "/servsafe",
    topics: [
      {{ label: "Food Handler", href: "/servsafe/food-handler" }},
      {{ label: "Food Manager", href: "/servsafe/food-manager" }},
    ],
  }},
}};

export const allCategories = Object.values(categoryNav);

export const exams: Record<string, ExamConfig> = {{
  // --- CDL ---
  "cdl": {{
    slug: "cdl",
    title: "CDL Practice Test",
    description: "Prepare for your Commercial Driver's License exam with free practice questions covering all CDL endorsement categories.",
    metaTitle: "Free CDL Practice Test 2026 | Pass Your CDL Exam",
    metaDescription: "Practice for your CDL exam with 10 free questions. Covers general knowledge, hazmat, air brakes, and more. Instant feedback and explanations.",
    dataPath: "/data/cdl/index.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
      {{ href: "/cdl/hazmat", label: "HazMat" }},
      {{ href: "/cdl/air-brakes", label: "Air Brakes" }},
      {{ href: "/cdl/combination-vehicles", label: "Combination Vehicles" }},
      {{ href: "/cdl/pre-trip-inspection", label: "Pre-Trip Inspection" }},
      {{ href: "/cdl/school-bus", label: "School Bus" }},
      {{ href: "/cdl/tanker", label: "Tanker" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/general-knowledge": {{
    slug: "cdl/general-knowledge",
    title: "CDL General Knowledge Practice Test",
    description: "Test your general knowledge for the CDL exam. Covers vehicle inspection, basic control, safe driving, and more.",
    metaTitle: "CDL General Knowledge Practice Test 2026 | Free Questions",
    metaDescription: "Free CDL General Knowledge practice test with 10 questions. Get instant feedback and detailed explanations to pass your CDL exam.",
    dataPath: "/data/cdl/general-knowledge.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/hazmat", label: "HazMat" }},
      {{ href: "/cdl/air-brakes", label: "Air Brakes" }},
      {{ href: "/cdl/combination-vehicles", label: "Combination Vehicles" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-general-knowledge"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/hazmat": {{
    slug: "cdl/hazmat",
    title: "CDL HazMat Endorsement Practice Test",
    description: "Prepare for your CDL HazMat endorsement with practice questions on hazardous materials handling, labeling, and safety.",
    metaTitle: "CDL HazMat Practice Test 2026 | Free HazMat Endorsement Questions",
    metaDescription: "Free CDL HazMat endorsement practice test. 10 questions on hazardous materials with instant feedback. Pass your HazMat exam on the first try.",
    dataPath: "/data/cdl/hazmat.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/tanker", label: "Tanker" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-hazmat"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/air-brakes": {{
    slug: "cdl/air-brakes",
    title: "CDL Air Brakes Practice Test",
    description: "Practice air brakes questions for your CDL exam. Covers air brake system components, inspection, and emergency procedures.",
    metaTitle: "CDL Air Brakes Practice Test 2026 | Free Questions & Answers",
    metaDescription: "Free CDL Air Brakes practice test with 10 questions. Learn air brake systems, inspection procedures, and emergency braking. Instant feedback.",
    dataPath: "/data/cdl/air-brakes.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
      {{ href: "/cdl/combination-vehicles", label: "Combination Vehicles" }},
      {{ href: "/cdl/pre-trip-inspection", label: "Pre-Trip Inspection" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-air-brakes"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/combination-vehicles": {{
    slug: "cdl/combination-vehicles",
    title: "CDL Combination Vehicles Practice Test",
    description: "Practice questions for the CDL Combination Vehicles endorsement covering coupling, uncoupling, and safe driving procedures.",
    metaTitle: "CDL Combination Vehicles Practice Test 2026 | Free Questions",
    metaDescription: "Free CDL Combination Vehicles practice test. 10 questions on coupling, uncoupling, and safe driving. Pass your combination vehicles endorsement.",
    dataPath: "/data/cdl/combination-vehicles.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/air-brakes", label: "Air Brakes" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-combination-vehicles"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/pre-trip-inspection": {{
    slug: "cdl/pre-trip-inspection",
    title: "CDL Pre-Trip Inspection Practice Test",
    description: "Master the CDL pre-trip inspection with practice questions on vehicle components, safety checks, and inspection procedures.",
    metaTitle: "CDL Pre-Trip Inspection Practice Test 2026 | Free Questions",
    metaDescription: "Free CDL Pre-Trip Inspection practice test. 10 questions covering vehicle inspection procedures and safety checks. Instant answer feedback.",
    dataPath: "/data/cdl/pre-trip-inspection.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/air-brakes", label: "Air Brakes" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-pre-trip"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/school-bus": {{
    slug: "cdl/school-bus",
    title: "CDL School Bus Endorsement Practice Test",
    description: "Prepare for the CDL School Bus endorsement with questions on student safety, loading/unloading, and emergency procedures.",
    metaTitle: "CDL School Bus Practice Test 2026 | Free Endorsement Questions",
    metaDescription: "Free CDL School Bus endorsement practice test. 10 questions on student safety and bus operations. Pass your school bus endorsement exam.",
    dataPath: "/data/cdl/school-bus.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
      {{ href: "/cdl/air-brakes", label: "Air Brakes" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-school-bus"),
    totalQuestionCount: "1,200+",
  }},
  "cdl/tanker": {{
    slug: "cdl/tanker",
    title: "CDL Tanker Endorsement Practice Test",
    description: "Practice for the CDL Tanker endorsement with questions on liquid surge, tank vehicle inspection, and safe driving procedures.",
    metaTitle: "CDL Tanker Practice Test 2026 | Free Endorsement Questions",
    metaDescription: "Free CDL Tanker endorsement practice test. 10 questions on tanker operations, liquid surge, and safety. Pass your tanker endorsement exam.",
    dataPath: "/data/cdl/tanker.json",
    category: "cdl",
    relatedTopics: [
      {{ href: "/cdl", label: "CDL Home" }},
      {{ href: "/cdl/hazmat", label: "HazMat" }},
      {{ href: "/cdl/general-knowledge", label: "General Knowledge" }},
    ],
    appStoreUrl: utm(CDL_APP_STORE, "cdl-tanker"),
    totalQuestionCount: "1,200+",
  }},

  // --- DMV ---
  "dmv": {{
    slug: "dmv",
    title: "DMV Practice Test",
    description: "Free DMV practice test to prepare for your driver's license exam. Covers road rules, traffic signs, and safe driving.",
    metaTitle: "Free DMV Practice Test 2026 | Pass Your Driver's License Exam",
    metaDescription: "Free DMV practice test with 10 questions. Covers road rules, traffic signs, and safe driving. Instant feedback and explanations to help you pass.",
    dataPath: "/data/dmv/index.json",
    category: "dmv",
    relatedTopics: [
      {{ href: "/dmv/california", label: "California DMV" }},
      {{ href: "/dmv/texas", label: "Texas DMV" }},
      {{ href: "/dmv/florida", label: "Florida DMV" }},
      {{ href: "/dmv/new-york", label: "New York DMV" }},
    ],
    appStoreUrl: utm(DMV_APP_STORE, "dmv"),
    totalQuestionCount: "2,700+",
  }},
{state_config.split("// --- Motorcycle State Pages ---")[0].replace("// --- DMV State Pages ---", "")}
  // --- Motorcycle ---
  "motorcycle": {{
    slug: "motorcycle",
    title: "Motorcycle Permit Practice Test",
    description: "Free motorcycle permit practice test covering road safety, motorcycle control, and safe driving techniques.",
    metaTitle: "Free Motorcycle Permit Practice Test 2026 | Pass Your Motorcycle Test",
    metaDescription: "Free motorcycle permit practice test with 10 questions. Covers road safety, motorcycle control, and riding techniques. Instant feedback and explanations.",
    dataPath: "/data/motorcycle/index.json",
    category: "motorcycle",
    relatedTopics: [],
    appStoreUrl: utm(MOTO_APP_STORE, "motorcycle"),
    totalQuestionCount: "900+",
  }},
{state_config.split("// --- Motorcycle State Pages ---")[1]}
  // --- ServSafe ---
  "servsafe": {{
    slug: "servsafe",
    title: "ServSafe Practice Test",
    description: "Free ServSafe practice test for food handler and food manager certification. Covers food safety, contamination, and sanitation.",
    metaTitle: "Free ServSafe Practice Test 2026 | Food Handler & Manager Questions",
    metaDescription: "Free ServSafe practice test with 10 questions. Prepare for food handler and food manager certification exams. Instant feedback and explanations.",
    dataPath: "/data/servsafe/index.json",
    category: "servsafe",
    relatedTopics: [
      {{ href: "/servsafe/food-handler", label: "Food Handler" }},
      {{ href: "/servsafe/food-manager", label: "Food Manager" }},
    ],
    appStoreUrl: utm(SS_APP_STORE, "servsafe"),
    totalQuestionCount: "1,000+",
  }},
  "servsafe/food-handler": {{
    slug: "servsafe/food-handler",
    title: "ServSafe Food Handler Practice Test",
    description: "Prepare for the ServSafe Food Handler certification with practice questions on food safety, hygiene, and contamination prevention.",
    metaTitle: "ServSafe Food Handler Practice Test 2026 | Free Certification Questions",
    metaDescription: "Free ServSafe Food Handler practice test. 10 questions on food safety and hygiene. Pass your food handler certification exam on the first try.",
    dataPath: "/data/servsafe/food-handler.json",
    category: "servsafe",
    relatedTopics: [
      {{ href: "/servsafe", label: "ServSafe Home" }},
      {{ href: "/servsafe/food-manager", label: "Food Manager" }},
    ],
    appStoreUrl: utm(SS_APP_STORE, "servsafe-food-handler"),
    totalQuestionCount: "1,000+",
  }},
  "servsafe/food-manager": {{
    slug: "servsafe/food-manager",
    title: "ServSafe Food Manager Practice Test",
    description: "Prepare for the ServSafe Manager certification with in-depth questions on food safety management, HACCP, and regulations.",
    metaTitle: "ServSafe Food Manager Practice Test 2026 | Free Certification Questions",
    metaDescription: "Free ServSafe Food Manager practice test. 10 questions on food safety management and HACCP. Pass your manager certification exam.",
    dataPath: "/data/servsafe/food-manager.json",
    category: "servsafe",
    relatedTopics: [
      {{ href: "/servsafe", label: "ServSafe Home" }},
      {{ href: "/servsafe/food-handler", label: "Food Handler" }},
    ],
    appStoreUrl: utm(SS_APP_STORE, "servsafe-food-manager"),
    totalQuestionCount: "1,000+",
  }},
}};
'''

with open("src/config.ts", "w") as f:
    f.write(config)

print("config.ts rebuilt successfully")
