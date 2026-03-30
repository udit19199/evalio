"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit3, Plus, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

type Difficulty = "easy" | "medium" | "hard";

type TopicRef = {
  id: string;
  name: string;
  skillId: string | null;
};

type QuestionRow = {
  id: string;
  text: string;
  subtopic: string | null;
  options: string;
  correctAnswer: string;
  explanation: string;
  difficulty: Difficulty;
  topics: TopicRef[];
};

type SkillMeta = {
  id: string;
  name: string;
  topics: { id: string; name: string }[];
};

type DrawerState = {
  id: string | null;
  text: string;
  subtopic: string;
  explanation: string;
  difficulty: Difficulty;
  optionsText: string;
  correctAnswer: string;
  selectedSkillId: string;
  selectedTopicIds: string[];
};

const EMPTY_FORM: DrawerState = {
  id: null,
  text: "",
  subtopic: "",
  explanation: "",
  difficulty: "easy",
  optionsText: "",
  correctAnswer: "",
  selectedSkillId: "",
  selectedTopicIds: [],
};

export default function QuestionsAdminPage() {
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [skills, setSkills] = useState<SkillMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<DrawerState>(EMPTY_FORM);

  const activeSkill = useMemo(
    () => skills.find((s) => s.id === form.selectedSkillId),
    [skills, form.selectedSkillId],
  );

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [questionsRes, metadataRes] = await Promise.all([
        fetch("/api/questions?limit=200", { cache: "no-store" }),
        fetch("/api/quiz/metadata", { cache: "no-store" }),
      ]);

      if (!questionsRes.ok || !metadataRes.ok) {
        throw new Error("Failed to load questions data.");
      }

      const questionsPayload = await questionsRes.json();
      const metadataPayload = await metadataRes.json();

      setQuestions(questionsPayload.questions ?? []);
      setSkills(metadataPayload ?? []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load data.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const openCreateDrawer = () => {
    setError(null);
    setForm({
      ...EMPTY_FORM,
      selectedSkillId: skills[0]?.id ?? "",
      selectedTopicIds: skills[0]?.topics[0] ? [skills[0].topics[0].id] : [],
    });
    setDrawerOpen(true);
  };

  const openEditDrawer = (question: QuestionRow) => {
    const firstTopic = question.topics[0];
    const skillId =
      skills.find((skill) => skill.topics.some((topic) => topic.id === firstTopic?.id))?.id ??
      skills[0]?.id ??
      "";

    setError(null);
    setForm({
      id: question.id,
      text: question.text,
      subtopic: question.subtopic ?? "",
      explanation: question.explanation,
      difficulty: question.difficulty,
      optionsText: question.options.split("|||").join("\n"),
      correctAnswer: question.correctAnswer,
      selectedSkillId: skillId,
      selectedTopicIds: question.topics.map((topic) => topic.id),
    });
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Delete this question permanently?");
    if (!ok) return;

    setError(null);
    const res = await fetch(`/api/questions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Failed to delete question.");
      return;
    }

    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSave = async () => {
    setError(null);
    const options = form.optionsText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!form.text.trim() || !form.explanation.trim()) {
      setError("Question text and explanation are required.");
      return;
    }

    if (form.selectedTopicIds.length === 0) {
      setError("Select at least one topic.");
      return;
    }

    if (options.length < 2) {
      setError("Provide at least two options (one per line).");
      return;
    }

    if (!options.includes(form.correctAnswer.trim())) {
      setError("Correct answer must exactly match one option line.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        text: form.text.trim(),
        subtopic: form.subtopic.trim() || undefined,
        explanation: form.explanation.trim(),
        difficulty: form.difficulty,
        options,
        correctAnswer: form.correctAnswer.trim(),
        topicIds: form.selectedTopicIds,
      };

      const res = await fetch(form.id ? `/api/questions/${form.id}` : "/api/questions", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const responsePayload = await res.json().catch(() => ({}));
        throw new Error(responsePayload.error ?? "Failed to save question.");
      }

      const responsePayload = await res.json();
      const savedQuestion = responsePayload.question as QuestionRow;

      setQuestions((prev) => {
        if (form.id) {
          return prev.map((q) => (q.id === savedQuestion.id ? savedQuestion : q));
        }
        return [savedQuestion, ...prev];
      });

      setDrawerOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save question.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-6 md:px-8 md:py-10">
      <header className="mb-8 flex flex-col gap-4 border-b-4 border-black pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="inline-block border-b-4 border-[#ffde59] text-4xl font-black italic tracking-tighter md:text-5xl">
            Questions Admin.
          </h1>
          <p className="mt-2 text-xs font-black uppercase tracking-widest opacity-50">
            Manage Question Bank Visual CRUD
          </p>
        </div>
        <button
          onClick={openCreateDrawer}
          className="flex items-center justify-center gap-2 border-4 border-black bg-[#ffde59] px-5 py-3 text-sm font-black uppercase tracking-widest shadow-[4px_4px_0px_#000] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
        >
          <Plus className="size-4" /> Add Question
        </button>
      </header>

      {error && (
        <div aria-live="polite" className="mb-6 border-4 border-black bg-[#ff4d4d] p-3 text-sm font-black text-white">
          {error}
        </div>
      )}

      <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_#000]">
        {loading ? (
          <p className="py-10 text-center text-sm font-black uppercase tracking-widest">Loading Questions…</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-black bg-[#f4f4f4]">
                <TableHead className="font-black uppercase">Question</TableHead>
                <TableHead className="font-black uppercase">Topic</TableHead>
                <TableHead className="font-black uppercase">Tag</TableHead>
                <TableHead className="font-black uppercase">Difficulty</TableHead>
                <TableHead className="text-right font-black uppercase">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id} className="border-black">
                  <TableCell className="max-w-[480px] whitespace-normal text-sm font-bold leading-relaxed">
                    {question.text.split("\n")[0]}
                  </TableCell>
                  <TableCell className="text-xs font-black uppercase">
                    {question.topics.map((topic) => topic.name).join(", ") || "-"}
                  </TableCell>
                  <TableCell className="text-xs font-black uppercase">{question.subtopic ?? "-"}</TableCell>
                  <TableCell className="text-xs font-black uppercase">{question.difficulty}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditDrawer(question)}
                        className="border-2 border-black bg-[#4d79ff] px-3 py-2 text-xs font-black uppercase text-white"
                        aria-label={`Edit question ${question.id}`}
                      >
                        <Edit3 className="size-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="border-2 border-black bg-[#ff4d4d] px-3 py-2 text-xs font-black uppercase text-white"
                        aria-label={`Delete question ${question.id}`}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="right" className="w-full max-w-3xl overflow-y-auto border-l-4 border-black bg-white p-0">
          <SheetHeader className="border-b-4 border-black bg-[#f4f4f4]">
            <SheetTitle className="text-2xl font-black italic">
              {form.id ? "Edit Question" : "Create Question"}
            </SheetTitle>
            <SheetDescription className="font-bold text-xs uppercase tracking-widest text-black/60">
              Update content, tags, difficulty, and topic mapping
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-5 p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="question-skill" className="text-[10px] font-black uppercase tracking-widest">
                  Subject
                </label>
                <select
                  id="question-skill"
                  value={form.selectedSkillId}
                  onChange={(event) => {
                    const skillId = event.target.value;
                    const skill = skills.find((entry) => entry.id === skillId);
                    setForm((prev) => ({
                      ...prev,
                      selectedSkillId: skillId,
                      selectedTopicIds: skill?.topics[0] ? [skill.topics[0].id] : [],
                    }));
                  }}
                  className="w-full border-4 border-black p-3 font-black outline-none"
                >
                  {skills.map((skill) => (
                    <option key={skill.id} value={skill.id}>
                      {skill.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="question-difficulty" className="text-[10px] font-black uppercase tracking-widest">
                  Difficulty
                </label>
                <select
                  id="question-difficulty"
                  value={form.difficulty}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, difficulty: event.target.value as Difficulty }))
                  }
                  className="w-full border-4 border-black p-3 font-black outline-none"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest">Topics</p>
              <div className="max-h-40 space-y-2 overflow-y-auto border-4 border-black p-3">
                {activeSkill?.topics.map((topic) => {
                  const checked = form.selectedTopicIds.includes(topic.id);
                  return (
                    <label key={topic.id} className="flex items-center gap-3 text-sm font-bold">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(event) => {
                          setForm((prev) => {
                            if (event.target.checked) {
                              return {
                                ...prev,
                                selectedTopicIds: [...prev.selectedTopicIds, topic.id],
                              };
                            }
                            return {
                              ...prev,
                              selectedTopicIds: prev.selectedTopicIds.filter((id) => id !== topic.id),
                            };
                          });
                        }}
                        className="size-4"
                      />
                      {topic.name}
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="question-subtopic" className="text-[10px] font-black uppercase tracking-widest">
                Tag / Subtopic
              </label>
              <input
                id="question-subtopic"
                value={form.subtopic}
                onChange={(event) => setForm((prev) => ({ ...prev, subtopic: event.target.value }))}
                className="w-full border-4 border-black p-3 font-bold outline-none"
                placeholder="e.g. Loop Output"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="question-text" className="text-[10px] font-black uppercase tracking-widest">
                Question Text
              </label>
              <textarea
                id="question-text"
                value={form.text}
                onChange={(event) => setForm((prev) => ({ ...prev, text: event.target.value }))}
                rows={8}
                className="w-full border-4 border-black p-3 font-mono text-sm outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="question-options" className="text-[10px] font-black uppercase tracking-widest">
                Options (One Per Line)
              </label>
              <textarea
                id="question-options"
                value={form.optionsText}
                onChange={(event) => setForm((prev) => ({ ...prev, optionsText: event.target.value }))}
                rows={5}
                className="w-full border-4 border-black p-3 font-bold outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="question-answer" className="text-[10px] font-black uppercase tracking-widest">
                Correct Answer (Exact Match)
              </label>
              <input
                id="question-answer"
                value={form.correctAnswer}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, correctAnswer: event.target.value }))
                }
                className="w-full border-4 border-black p-3 font-bold outline-none"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="question-explanation" className="text-[10px] font-black uppercase tracking-widest">
                Explanation
              </label>
              <textarea
                id="question-explanation"
                value={form.explanation}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, explanation: event.target.value }))
                }
                rows={4}
                className="w-full border-4 border-black p-3 font-bold outline-none"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={submitting}
                className="flex-1 border-4 border-black bg-[#4d79ff] px-4 py-3 text-sm font-black uppercase text-white disabled:opacity-50"
              >
                {submitting ? "Saving…" : form.id ? "Update Question" : "Create Question"}
              </button>
              <button
                onClick={() => setDrawerOpen(false)}
                className="border-4 border-black bg-white px-4 py-3 text-sm font-black uppercase"
              >
                Cancel
              </button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
