// GCC Fit Assessor — Question data + scoring logic
// NOTE: These are placeholder/dummy questions for pipeline testing.
// Replace with the real 60-Day Challenge Fit Assessor questions when available —
// the shape below (id, text, options with score weights) is what app.js expects,
// so swapping content later requires no logic changes.

const QUESTIONS = [
  {
    id: "q1",
    text: "How many employees does your company currently have?",
    options: [
      { label: "1–10", weight: 1 },
      { label: "11–50", weight: 2 },
      { label: "51–200", weight: 3 },
      { label: "200+", weight: 4 }
    ]
  },
  {
    id: "q2",
    text: "Are you currently outsourcing any work offshore?",
    options: [
      { label: "No, never", weight: 1 },
      { label: "Tried it, stopped", weight: 2 },
      { label: "Yes, informally (freelancers)", weight: 3 },
      { label: "Yes, with an agency/vendor", weight: 4 }
    ]
  },
  {
    id: "q3",
    text: "What's your biggest operational bottleneck right now?",
    options: [
      { label: "Not enough hands for repetitive work", weight: 4 },
      { label: "Need specialized skills we can't find locally", weight: 3 },
      { label: "Cost of local hiring is too high", weight: 4 },
      { label: "We don't have a bottleneck", weight: 1 }
    ]
  },
  {
    id: "q4",
    text: "How comfortable is your leadership with managing a remote team?",
    options: [
      { label: "Very comfortable, we already do it", weight: 4 },
      { label: "Somewhat comfortable", weight: 3 },
      { label: "Not very comfortable", weight: 2 },
      { label: "Not comfortable at all", weight: 1 }
    ]
  },
  {
    id: "q5",
    text: "What's your timeline for making a decision on this?",
    options: [
      { label: "Immediately (this quarter)", weight: 4 },
      { label: "Next 6 months", weight: 3 },
      { label: "Next year", weight: 2 },
      { label: "Just exploring, no timeline", weight: 1 }
    ]
  }
];

// Computes score (0-100), category, top 3 reasons, and a recommended next step
// from an answers object like { q1: 2, q2: 3, ... } (values = option index chosen)
function calculateScore(answers) {
  let totalWeight = 0;
  let maxPossible = 0;
  const reasonPool = [];

  QUESTIONS.forEach((q) => {
    const chosenIndex = answers[q.id];
    const maxWeightForQ = Math.max(...q.options.map((o) => o.weight));
    maxPossible += maxWeightForQ;

    if (chosenIndex !== undefined && q.options[chosenIndex]) {
      const chosen = q.options[chosenIndex];
      totalWeight += chosen.weight;
      reasonPool.push({
        question: q.text,
        answer: chosen.label,
        weight: chosen.weight
      });
    }
  });

  const score = Math.round((totalWeight / maxPossible) * 100);

  let category, nextStep;
  if (score >= 75) {
    category = "Strong Fit";
    nextStep = "Book a 30-minute scoping call to map your first GCC role.";
  } else if (score >= 50) {
    category = "Moderate Fit";
    nextStep = "Download our GCC readiness checklist and revisit in a quarter.";
  } else {
    category = "Not Yet";
    nextStep = "Start with a lightweight pilot project before committing further.";
  }

  const topReasons = reasonPool
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 3)
    .map((r) => `${r.question} → ${r.answer}`);

  return { score, category, topReasons, nextStep };
}
