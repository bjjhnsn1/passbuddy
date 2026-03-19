#!/usr/bin/env python3
"""Extract state-specific DMV and motorcycle questions for all 50 states."""
import json
import os
import random
import re

BASE = "/Users/brianjohnson/dev"
OUT = "/Users/brianjohnson/dev/passbuddy/public/data"

IMAGE_PATTERNS = re.compile(
    r'this sign|this image|shown above|this picture|this symbol|'
    r'the sign shown|following sign|this figure|the image|'
    r'what does this sign|the picture|the figure|this logo|'
    r'sign above|image above|the diagram',
    re.IGNORECASE
)

def has_image_reference(q):
    text = q.get("question", "")
    if IMAGE_PATTERNS.search(text):
        return True
    if q.get("image_src") and q["image_src"] != "null":
        return True
    return False

def filter_no_images(questions):
    return [q for q in questions if not has_image_reference(q)]

def transform_question(q):
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
    random.seed(42)
    if len(questions) <= n:
        return questions
    return random.sample(questions, n)

def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f:
        json.dump(data, f, indent=2)

# Load states config
with open("/Users/brianjohnson/dev/passbuddy/src/data/states.json") as f:
    states = json.load(f)

# Load DMV questions
dmv_path = f"{BASE}/DMVTest/DMVTest/Models/QuestionBank/Static/questions_en.json"
dmv_raw = json.load(open(dmv_path))
dmv_all = filter_no_images(dmv_raw)

# Load Motorcycle questions
moto_path = f"{BASE}/CycleTest/CycleTest/Models/QuestionBank/Static/questions.json"
moto_raw = json.load(open(moto_path))
moto_all = filter_no_images(moto_raw)

print(f"DMV pool: {len(dmv_all)} questions (filtered from {len(dmv_raw)})")
print(f"Motorcycle pool: {len(moto_all)} questions (filtered from {len(moto_raw)})")

# For each state, create DMV and motorcycle question files
# Use different random seeds per state so each state gets different questions
for i, state in enumerate(states):
    slug = state["slug"]

    # DMV: filter by state if available, otherwise use full pool
    state_name = state["name"].lower()
    dmv_state_qs = [q for q in dmv_all if any(
        s.lower().replace("-", " ").replace("_", " ") == state_name.replace("-", " ")
        for s in q.get("state", [])
    )]
    if len(dmv_state_qs) < 20:
        dmv_state_qs = dmv_all

    random.seed(42 + i)
    dmv_picked = random.sample(dmv_state_qs, min(100, len(dmv_state_qs)))
    dmv_transformed = [transform_question(q) for q in dmv_picked]
    save_json(f"{OUT}/dmv/{slug}.json", dmv_transformed)

    # Motorcycle: all questions are shared, use different seed per state
    random.seed(1000 + i)
    moto_picked = random.sample(moto_all, min(100, len(moto_all)))
    moto_transformed = [transform_question(q) for q in moto_picked]
    save_json(f"{OUT}/motorcycle/{slug}.json", moto_transformed)

print(f"Generated DMV + Motorcycle files for {len(states)} states")
