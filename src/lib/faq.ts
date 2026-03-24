import { ExamConfig } from "@/types";
import statesData from "@/data/states.json";

interface FAQ {
  question: string;
  answer: string;
}

interface StateData {
  slug: string;
  name: string;
  abbr: string;
  dmvAgency: string;
  dmvExamQuestions: number;
  dmvPassingScore: string;
  motoExamQuestions: number;
  motoPassingScore: string;
}

const statesBySlug: Record<string, StateData> = {};
for (const s of statesData) {
  statesBySlug[s.slug] = s;
}

function getDmvStateFaqs(config: ExamConfig, state: StateData): FAQ[] {
  return [
    {
      question: `How many questions are on the ${state.name} DMV written test?`,
      answer: `The ${state.name} DMV written test has ${state.dmvExamQuestions} questions. You need ${state.dmvPassingScore} to pass. The test is administered by the ${state.dmvAgency}.`,
    },
    {
      question: `What topics are covered on the ${state.name} permit test?`,
      answer: `The ${state.name} permit test covers road signs, traffic laws, right-of-way rules, safe driving practices, and ${state.name}-specific regulations. All questions are based on the official ${state.abbr} driver handbook.`,
    },
    {
      question: `How can I prepare for the ${state.name} DMV test?`,
      answer: `Start by reading the official ${state.name} driver handbook, then use practice tests like this one to test your knowledge. Our practice test gives you 10 questions with instant feedback and explanations so you can learn from any mistakes before taking the real exam.`,
    },
    {
      question: `Can I retake the ${state.name} DMV test if I fail?`,
      answer: `Yes, most ${state.name} DMV offices allow you to retake the written test, though there may be a waiting period and additional fees. The best strategy is to practice thoroughly before your first attempt.`,
    },
    {
      question: `Is this ${state.name} practice test free?`,
      answer: `Yes, this practice test is completely free. You get 10 questions with instant feedback and detailed explanations for each answer. For more extensive practice, our app has ${config.totalQuestionCount} questions.`,
    },
  ];
}

function getMotoStateFaqs(config: ExamConfig, state: StateData): FAQ[] {
  return [
    {
      question: `How many questions are on the ${state.name} motorcycle permit test?`,
      answer: `The ${state.name} motorcycle permit written test has ${state.motoExamQuestions} questions. You need ${state.motoPassingScore} to pass. The test is administered by the ${state.dmvAgency}.`,
    },
    {
      question: `What does the ${state.name} motorcycle permit test cover?`,
      answer: `The ${state.name} motorcycle permit test covers motorcycle safety, road rules, proper riding techniques, hazard awareness, and ${state.name}-specific motorcycle laws. Questions are based on the official ${state.abbr} motorcycle handbook.`,
    },
    {
      question: `Do I need a motorcycle permit before getting a ${state.name} motorcycle license?`,
      answer: `In most cases, yes. ${state.name} typically requires you to first obtain a motorcycle learner's permit by passing the written test, then complete a riding skills test or approved safety course to get your full motorcycle license.`,
    },
    {
      question: `How can I study for the ${state.name} motorcycle test?`,
      answer: `Review the official ${state.name} motorcycle handbook and take practice tests like this one. Our free practice test gives you 10 questions with instant feedback. For more in-depth study, our app offers ${config.totalQuestionCount} practice questions.`,
    },
    {
      question: `Is this ${state.name} motorcycle practice test free?`,
      answer: `Yes, completely free. You get 10 randomly selected questions with instant answer feedback and detailed explanations. Take it as many times as you want to prepare for your ${state.name} motorcycle permit test.`,
    },
  ];
}

const cdlTopicFaqs: Record<string, FAQ[]> = {
  cdl: [
    {
      question: "What is the CDL exam?",
      answer:
        "The Commercial Driver's License (CDL) exam is a written and skills test required to operate commercial motor vehicles. The written portion covers general knowledge plus endorsement-specific topics like HazMat, air brakes, and tanker vehicles.",
    },
    {
      question: "How many questions are on the CDL general knowledge test?",
      answer:
        "The CDL general knowledge test typically has 50 questions, and you need to score 80% or higher to pass. The exact number may vary slightly by state.",
    },
    {
      question: "What CDL endorsements are available?",
      answer:
        "CDL endorsements include HazMat (H), Tanker (N), Doubles/Triples (T), Passenger (P), School Bus (S), and combination endorsements. Each requires passing a separate written test.",
    },
    {
      question: "How can I prepare for the CDL test?",
      answer:
        "Study the CDL manual for your state, then use practice tests to identify weak areas. This free practice test gives you 10 questions with instant feedback. Our app has 1,200+ questions across all endorsements.",
    },
    {
      question: "Is this CDL practice test free?",
      answer:
        "Yes, this practice test is completely free. You get 10 randomly selected questions with instant feedback and explanations. Take it as many times as you need to feel confident.",
    },
  ],
  "cdl/general-knowledge": [
    {
      question: "What topics are on the CDL General Knowledge test?",
      answer:
        "The CDL General Knowledge test covers vehicle inspection, basic vehicle control, safe driving practices, transporting cargo, and general commercial driving regulations. It's required for all CDL classes.",
    },
    {
      question: "How many questions are on the CDL General Knowledge test?",
      answer:
        "The CDL General Knowledge test typically has 50 multiple-choice questions. You need to answer at least 80% correctly (40 out of 50) to pass.",
    },
    {
      question: "Is the General Knowledge test required for all CDL drivers?",
      answer:
        "Yes, the General Knowledge test is mandatory for all CDL applicants regardless of which class (A, B, or C) or endorsements you're pursuing. It's the foundation of the CDL written exam.",
    },
    {
      question: "What is the best way to study for CDL General Knowledge?",
      answer:
        "Read the General Knowledge section of your state's CDL manual, then practice with sample tests. Focus on areas like vehicle inspection procedures, safe driving rules, and cargo handling. This free test gives you instant feedback on each answer.",
    },
  ],
  "cdl/hazmat": [
    {
      question: "What does the CDL HazMat endorsement test cover?",
      answer:
        "The HazMat endorsement test covers hazardous materials classification, labeling and placarding, loading and unloading procedures, emergency response, and required shipping documentation.",
    },
    {
      question: "How do I get a HazMat endorsement on my CDL?",
      answer:
        "To get a HazMat endorsement, you must pass the written HazMat knowledge test, undergo a TSA background check and fingerprinting, and pay the applicable fees. The endorsement must be renewed periodically.",
    },
    {
      question: "How many questions are on the CDL HazMat test?",
      answer:
        "The CDL HazMat written test typically has 30 questions, and you need to score 80% or higher to pass. Questions focus on safe handling, labeling, and emergency procedures for hazardous materials.",
    },
    {
      question: "Why is a background check required for HazMat?",
      answer:
        "The TSA requires a security threat assessment for all HazMat endorsement holders. This federal requirement ensures that individuals transporting hazardous materials do not pose a security risk.",
    },
  ],
  "cdl/air-brakes": [
    {
      question: "What does the CDL Air Brakes test cover?",
      answer:
        "The Air Brakes test covers air brake system components, dual air brake systems, inspection procedures, how to use air brakes safely, and emergency braking procedures.",
    },
    {
      question: "Do I need the Air Brakes endorsement?",
      answer:
        "If you plan to drive any commercial vehicle equipped with air brakes, you must pass the Air Brakes knowledge test. If you don't pass, your CDL will carry an air brake restriction, limiting the vehicles you can operate.",
    },
    {
      question: "What is the air brake cut-out pressure?",
      answer:
        "The air compressor governor should cut out (stop pumping) at around 125 psi. The cut-in pressure, where the compressor starts building air again, is typically around 100 psi. These are key numbers to know for the exam.",
    },
    {
      question: "How many questions are on the CDL Air Brakes test?",
      answer:
        "The CDL Air Brakes knowledge test typically has 25 questions, and you need to score 80% or higher to pass. Questions focus on system components, inspection, and safe braking procedures.",
    },
  ],
  "cdl/combination-vehicles": [
    {
      question: "What does the CDL Combination Vehicles test cover?",
      answer:
        "The Combination Vehicles test covers coupling and uncoupling procedures, rollover prevention, skid control, turning with trailers, and inspecting combination vehicles.",
    },
    {
      question: "Do I need the Combination Vehicles endorsement for a Class A CDL?",
      answer:
        "Yes, the Combination Vehicles knowledge test is required for anyone seeking a Class A CDL, which allows you to drive tractor-trailers and other combination vehicles.",
    },
    {
      question: "What is the proper coupling procedure?",
      answer:
        "Proper coupling involves inspecting the fifth wheel, backing under the trailer, connecting air lines and electrical cord, raising the landing gear, and performing a tug test. The exact steps are critical knowledge for the exam.",
    },
    {
      question: "How many questions are on the Combination Vehicles test?",
      answer:
        "The Combination Vehicles test typically has 20 questions with a passing score of 80%. Questions cover coupling/uncoupling, safe driving with trailers, and inspection procedures.",
    },
  ],
  "cdl/pre-trip-inspection": [
    {
      question: "What does the CDL Pre-Trip Inspection test cover?",
      answer:
        "The Pre-Trip Inspection test covers the complete vehicle inspection process including engine compartment, cab interior, external walk-around, brake check, and coupling system inspection for combination vehicles.",
    },
    {
      question: "How long does the CDL pre-trip inspection take?",
      answer:
        "During the CDL skills test, you typically have about 30-40 minutes to complete the pre-trip inspection. You'll need to identify and explain the inspection points to the examiner in a logical sequence.",
    },
    {
      question: "What are the main areas of a CDL pre-trip inspection?",
      answer:
        "The main areas include: engine compartment (fluid levels, belts, hoses), cab/interior (gauges, controls, mirrors), exterior walk-around (tires, lights, body), brakes (adjustment, air leaks), and coupling system for combination vehicles.",
    },
    {
      question: "Can I fail the CDL test for the pre-trip inspection alone?",
      answer:
        "Yes, the pre-trip inspection is a scored portion of the CDL skills test. You must demonstrate competency in identifying critical safety items. Missing too many items can result in failing this section and the overall test.",
    },
  ],
  "cdl/school-bus": [
    {
      question: "What does the CDL School Bus endorsement test cover?",
      answer:
        "The School Bus endorsement test covers student loading and unloading procedures, school bus-specific equipment, emergency exits, railroad crossing procedures, and student management.",
    },
    {
      question: "Do I need a special endorsement to drive a school bus?",
      answer:
        "Yes, you need the School Bus (S) endorsement on your CDL. This requires passing a written knowledge test and a skills test in a school bus. You'll also need to pass a background check in most states.",
    },
    {
      question: "What CDL class do I need for a school bus?",
      answer:
        "Most full-size school buses require a Class B CDL with a Passenger (P) and School Bus (S) endorsement. Smaller buses may only require a Class C CDL with the same endorsements.",
    },
    {
      question: "How many questions are on the School Bus endorsement test?",
      answer:
        "The School Bus endorsement written test typically has 20 questions with a passing score of 80%. Questions focus on student safety, loading zones, and bus-specific procedures.",
    },
  ],
  "cdl/tanker": [
    {
      question: "What does the CDL Tanker endorsement test cover?",
      answer:
        "The Tanker endorsement test covers liquid surge and its effects, tank vehicle inspection, safe driving with tankers, loading and unloading procedures, and emergency procedures specific to tank vehicles.",
    },
    {
      question: "What is liquid surge and why is it important?",
      answer:
        "Liquid surge is the movement of liquid inside a partially filled tank. When you brake or turn, the liquid shifts and can push the vehicle in the direction of the surge. Understanding surge is critical for safe tanker operation and a key exam topic.",
    },
    {
      question: "Do I need a Tanker endorsement for all liquid loads?",
      answer:
        "You need the Tanker (N) endorsement when transporting liquid or gaseous materials in a permanently mounted tank or portable tank rated at 119 gallons or more. This applies to both hazardous and non-hazardous liquids.",
    },
    {
      question: "How many questions are on the Tanker endorsement test?",
      answer:
        "The Tanker endorsement test typically has 20 questions, and you need a score of 80% or higher to pass. Questions cover liquid surge, inspection, and safe tanker driving techniques.",
    },
  ],
};

const servsafeFaqs: Record<string, FAQ[]> = {
  servsafe: [
    {
      question: "What is a ServSafe certification?",
      answer:
        "ServSafe is a food safety certification program administered by the National Restaurant Association. It certifies that food service workers understand proper food handling, preparation, and storage techniques to prevent foodborne illness.",
    },
    {
      question: "What is the difference between Food Handler and Food Manager certifications?",
      answer:
        "The Food Handler certification is a basic course for all food service employees covering essential food safety. The Food Manager certification is more comprehensive, designed for supervisors and managers, and is often required by health departments.",
    },
    {
      question: "How long is ServSafe certification valid?",
      answer:
        "ServSafe Food Manager certification is valid for 5 years in most states. Food Handler certifications may need renewal every 2-3 years depending on your state and local regulations.",
    },
    {
      question: "Is this ServSafe practice test free?",
      answer:
        "Yes, this practice test is completely free. You get 10 questions with instant feedback and explanations. For more practice, our app has additional questions to help you prepare.",
    },
  ],
  "servsafe/food-handler": [
    {
      question: "What does the ServSafe Food Handler exam cover?",
      answer:
        "The Food Handler exam covers basic food safety principles including personal hygiene, cross-contamination prevention, time and temperature control, cleaning and sanitizing, and safe food storage practices.",
    },
    {
      question: "How many questions are on the ServSafe Food Handler exam?",
      answer:
        "The official ServSafe Food Handler exam has 40 questions. You need to score 75% or higher to pass. Questions are multiple-choice and cover essential food safety practices for food service workers.",
    },
    {
      question: "Who needs a Food Handler certification?",
      answer:
        "Most states and localities require all food service employees who handle, prepare, or serve food to have a Food Handler certification. This includes restaurant workers, cafeteria staff, food truck operators, and catering employees.",
    },
    {
      question: "What is the temperature danger zone?",
      answer:
        "The temperature danger zone is 41°F to 135°F (5°C to 57°C). Bacteria grow rapidly in this range. Food should not remain in the danger zone for more than 4 hours total. This is one of the most important concepts on the exam.",
    },
  ],
  "servsafe/food-manager": [
    {
      question: "What does the ServSafe Food Manager exam cover?",
      answer:
        "The Food Manager exam covers comprehensive food safety management including HACCP principles, foodborne illness prevention, facility sanitation, pest management, employee food safety training, and regulatory compliance.",
    },
    {
      question: "How many questions are on the ServSafe Food Manager exam?",
      answer:
        "The official ServSafe Food Manager exam has 90 questions (80 scored, 10 pilot), and you have 2 hours to complete it. You need a score of 75% or higher on the scored questions to pass.",
    },
    {
      question: "Is the Food Manager certification required by law?",
      answer:
        "Many states and local health departments require at least one certified food manager on staff at all times during food service operations. Requirements vary by jurisdiction, so check your local regulations.",
    },
    {
      question: "What are HACCP principles?",
      answer:
        "HACCP (Hazard Analysis Critical Control Points) is a systematic approach to food safety with 7 principles: conduct hazard analysis, determine critical control points, establish critical limits, establish monitoring procedures, establish corrective actions, establish verification procedures, and establish record-keeping. This is a major topic on the Food Manager exam.",
    },
  ],
};

export function getFaqs(examKey: string, config: ExamConfig): FAQ[] {
  // DMV state pages
  if (config.category === "dmv" && examKey.startsWith("dmv/")) {
    const stateSlug = examKey.replace("dmv/", "");
    const state = statesBySlug[stateSlug];
    if (state) return getDmvStateFaqs(config, state);
  }

  // Motorcycle state pages
  if (config.category === "motorcycle" && examKey.startsWith("motorcycle/")) {
    const stateSlug = examKey.replace("motorcycle/", "");
    const state = statesBySlug[stateSlug];
    if (state) return getMotoStateFaqs(config, state);
  }

  // CDL pages
  if (cdlTopicFaqs[examKey]) return cdlTopicFaqs[examKey];

  // ServSafe pages
  if (servsafeFaqs[examKey]) return servsafeFaqs[examKey];

  return [];
}
