#!/usr/bin/env python3
"""Extract and transform questions from source projects into passbuddy data files."""
import json
import os
import random

BASE = "/Users/brianjohnson/dev"
OUT = "/Users/brianjohnson/dev/Hypothetical-Capital/apps/passbuddy/public/data"

def transform_question(q):
    """Normalize question to common format."""
    answers = []
    correct_idx = 0
    for i, a in enumerate(q.get("answers", [])):
        answers.append({
            "text": a.get("answerText", ""),
            "explanation": a.get("answerDescription", "") or "",
            "isCorrect": a.get("is_correct", False),
        })
        if a.get("is_correct"):
            correct_idx = i
    return {
        "id": q.get("id", ""),
        "question": q.get("question", ""),
        "answers": answers,
        "correctIndex": correct_idx,
        "explanation": answers[correct_idx]["explanation"] if answers else "",
    }

def pick_questions(questions, n=100):
    """Pick n random questions, seeded for reproducibility."""
    random.seed(42)
    if len(questions) <= n:
        return questions
    return random.sample(questions, n)

def load_json(path):
    with open(path) as f:
        return json.load(f)

def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)
    print(f"  Wrote {path} ({len(data)} questions)")

# --- CDL (TestTests) ---
cdl_path = f"{BASE}/TestTests/ExamPreppy/Models/QuestionBank/Static/questions_en.json"
cdl_all = load_json(cdl_path)
cdl_category_map = {
    "General Knowledge": "general-knowledge",
    "HazMat": "hazmat",
    "Air Brakes": "air-brakes",
    "Combination Vehicles": "combination-vehicles",
    "Pre-trip": "pre-trip-inspection",
    "School Bus": "school-bus",
    "Tanker Vehicles": "tanker",
}
print("CDL:")
cdl_by_cat = {}
for q in cdl_all:
    cat = q.get("category", "")
    if cat not in cdl_by_cat:
        cdl_by_cat[cat] = []
    cdl_by_cat[cat].append(q)

for src_cat, slug in cdl_category_map.items():
    questions = cdl_by_cat.get(src_cat, [])
    transformed = [transform_question(q) for q in pick_questions(questions)]
    save_json(f"{OUT}/cdl/{slug}.json", transformed)

# CDL home - mix from all categories
save_json(f"{OUT}/cdl/index.json", [transform_question(q) for q in pick_questions(cdl_all)])

# --- DMV (DMVTest) ---
dmv_path = f"{BASE}/DMVTest/DMVTest/Models/QuestionBank/Static/questions_en.json"
dmv_all = load_json(dmv_path)
states_map = {
    "california": "california",
    "texas": "texas",
    "florida": "florida",
    "new-york": "new-york",
}
print("DMV:")
# Filter questions by state
for slug, state_name in states_map.items():
    state_key = state_name.replace("-", " ")  # "new york" etc
    state_qs = [q for q in dmv_all if any(s.lower().replace("-"," ") == state_key or s.lower().replace("_"," ") == state_key for s in q.get("state", []))]
    if not state_qs:
        # fallback: all questions (they apply to all states)
        state_qs = dmv_all
    transformed = [transform_question(q) for q in pick_questions(state_qs)]
    save_json(f"{OUT}/dmv/{slug}.json", transformed)

# DMV home - general mix
save_json(f"{OUT}/dmv/index.json", [transform_question(q) for q in pick_questions(dmv_all)])

# --- Motorcycle (CycleTest) ---
moto_path = f"{BASE}/CycleTest/CycleTest/Models/QuestionBank/Static/questions.json"
moto_all = load_json(moto_path)
print("Motorcycle:")
save_json(f"{OUT}/motorcycle/index.json", [transform_question(q) for q in pick_questions(moto_all)])

# --- ServSafe ---
ss_path = f"{BASE}/ServSafe/ServSafeApp/Models/QuestionBank/Static/questions_en.json"
ss_all = load_json(ss_path)
print("ServSafe:")
ss_handler = [q for q in ss_all if "ServSafe Food Handler" in q.get("state", [])]
ss_manager = [q for q in ss_all if "ServSafe Manager" in q.get("state", [])]

save_json(f"{OUT}/servsafe/food-handler.json", [transform_question(q) for q in pick_questions(ss_handler)])
save_json(f"{OUT}/servsafe/food-manager.json", [transform_question(q) for q in pick_questions(ss_manager)])
save_json(f"{OUT}/servsafe/index.json", [transform_question(q) for q in pick_questions(ss_all)])

print("\nDone!")
