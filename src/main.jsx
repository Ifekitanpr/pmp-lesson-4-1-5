import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Menu,
  Sparkles,
  Target,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import heroArt from "./assets/illustrations/hero-conductor-disconnected.svg?raw";
import heroModal from "./assets/illustrations/modal-conductor-integration.svg?raw";
import meaningArt from "./assets/illustrations/plans-to-one-system.svg?raw";
import meaningModal from "./assets/illustrations/modal-consistency-review.svg?raw";
import verticalArt from "./assets/illustrations/vertical-integration-card.svg?raw";
import horizontalArt from "./assets/illustrations/horizontal-integration-card.svg?raw";
import quizOneArt from "./assets/illustrations/modal-vertical-quiz.svg?raw";
import livingArt from "./assets/illustrations/living-plan.svg?raw";
import livingModal from "./assets/illustrations/modal-progressive-elaboration.svg?raw";
import quizTwoArt from "./assets/illustrations/modal-living-plan-quiz.svg?raw";
import closingArt from "./assets/illustrations/conductor-connected.svg?raw";
import closingModal from "./assets/illustrations/modal-integrator-summary.svg?raw";
import "./styles.css";
import { useLessonAudio } from "../../shared/useLessonAudio";
import { IllustrationPlayer } from "./components/IllustrationPlayer";

const screens = [
  "The orchestra",
  "What it means",
  "Two directions",
  "The living plan",
  "Exam lens",
];
const reveals = {
  hook: {
    title: "One coherent performance",
    image: heroModal,
    text: "An integrated project management plan works exactly the same way. At this point in the planning process, the project manager has assessed the project's complexity and magnitude, chosen a development approach, identified critical information requirements, and designed an execution strategy. Each of those is a planning decision. This enabler is where those decisions, alongside every subsidiary plan and baseline the project produces, come together into one unified whole. But here's the crucial distinction: creating the integrated plan is not a single event at the end of planning. It's an iterative process — one that builds progressively as each domain completes its planning work and hands its output to the integrator.",
  },
  meaning: {
    title: "Integration is what binds it",
    image: meaningModal,
    text: "This enabler asks the project manager to create the integrated project management plan — the unified collection of subsidiary plans, baselines, and how-to components that together describe how the project will be executed, monitored, controlled, and closed. PMBOK® 8 describes this as the Integrate and Align Project Plans process — and the key word is integrate. The PM is not writing a single document. They're consolidating the outputs of every other planning process — the scope management plan, the schedule baseline, the cost baseline, the risk management plan, the stakeholder engagement plan, and every other subsidiary plan — into one coherent whole, and verifying those outputs are mutually consistent. The plan is a collection. Integration is what binds it.",
  },
  living: {
    title: "The plan evolves with the project",
    image: livingModal,
    text: "One of the most exam-relevant points about the integrated project management plan is that creating it is not a task the project manager completes and moves on from. As new information becomes available, the plan is updated. As subsidiary plans are refined, the integration is re-verified. As baselines are approved, they become the reference points against which all future performance is measured. And as the project learns — through execution, monitoring, and stakeholder feedback — the plan evolves to reflect the project's best current understanding of how the work will be completed. Progressive elaboration is built into the nature of integration itself: the plan is most detailed about the work currently being planned, and progressively less detailed about work further ahead, because the information needed to plan that work precisely hasn't been generated yet by the work that precedes it.",
  },
  closing: {
    title: "The project manager is the integrator",
    image: closingModal,
    text: "Creating the integrated project management plan is the act of binding every subsidiary plan, every baseline, and every planning decision into one coherent, mutually consistent whole. Integration happens in two directions — vertically, connecting each component to the project's overall objectives and governance; and horizontally, ensuring the plans across domains are making compatible assumptions about the same work. It's iterative — built progressively as each domain completes its planning — and it's ongoing, updated throughout the project lifecycle as the plan evolves to reflect what the project learns. And it's owned by the project manager — not as the author of every component, but as the integrator responsible for the coherence of the whole.",
  },
};
const quizOne = {
  image: quizOneArt,
  question:
    "Scenario: A newly drafted risk management plan sets its own escalation triggers, separate from the escalation paths and thresholds the project established at initiation. What integration problem does this represent?",
  answers: [
    "A horizontal integration failure — the risk plan and schedule plan disagree on timing",
    "No integration problem — each subsidiary plan can define its own escalation rules",
    "A vertical integration failure — the risk plan does not trace to project governance",
    "A progressive elaboration issue rather than an integration issue",
  ],
  correct: 2,
  correctFeedback:
    "Right — this is specifically a break in the upward connection to governance, which is what vertical integration is meant to catch. The plan is isolated from the framework it should be tracing back to.",
  incorrectFeedback:
    "Reconsider — the disconnect described is between a subsidiary plan and the project's overall governance framework, not between two subsidiary plans.",
};
const quizTwo = {
  image: quizTwoArt,
  question:
    'Scenario: A project manager finishes drafting all subsidiary plans in month one and considers the integrated project management plan "done" for the rest of the project. What\'s wrong with this view?',
  answers: [
    "Nothing — once all subsidiary plans exist, integration is complete",
    "Integration continues as information and learning refine the plan",
    "The plans should have been integrated before month one, not during it",
    "Only the risk plan needs ongoing updates; the rest can stay fixed",
  ],
  correct: 1,
  correctFeedback:
    "Exactly — treating integration as a one-time event misses the point entirely. It's re-verified continuously as the project learns, refines subsidiary plans, and approves baselines.",
  incorrectFeedback:
    "Think about what happens after month one — does new information stop arriving, or does the plan need to keep pace with it?",
};

function FocusModal({ data, onClose, onDone }) {
  useEffect(() => {
    const f = (e) => e.key === "Escape" && onClose();
    addEventListener("keydown", f);
    return () => removeEventListener("keydown", f);
  }, [onClose]);
  return createPortal(
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.section
        className="focus-modal"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-x" onClick={onClose}>
          <X />
        </button>
        <IllustrationPlayer className="modal-illustration" svg={data.image} />
        <h3>{data.title}</h3>
        <div className="modal-copy">
          <p>{data.text}</p>
          {data.bullets && (
            <>
              <h4>Exam-relevant enablers to remember:</h4>
              <ul>
                {data.bullets.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <button
          className="modal-action"
          onClick={() => {
            onDone();
            onClose();
          }}
        >
          Mark as read <Check />
        </button>
      </motion.section>
    </motion.div>,
    document.body,
  );
}
function KnowledgeCheck({ data, onFinish }) {
  const [pick, setPick] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <motion.section
        className="knowledge-modal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="quiz-label">
          <Target /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{data.question}</h3>
        <div className="answers">
          {data.answers.map((a, i) => (
            <button
              key={a}
              className={
                pick === i ? (i === data.correct ? "correct" : "wrong") : ""
              }
              onClick={() => setPick(i)}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {a}
            </button>
          ))}
        </div>
        {pick !== null && (
          <p className={`feedback ${pick === data.correct ? "good" : "bad"}`}>
            {pick === data.correct
              ? data.correctFeedback
              : data.incorrectFeedback}
          </p>
        )}
        {pick !== null && (
          <button className="finish-check" onClick={onFinish}>
            Finish check <ArrowRight />
          </button>
        )}
      </motion.section>
    </div>,
    document.body,
  );
}

function App() {
  const [page, setPage] = useState(0),
    [sound, setSound] = useState(true),
    [menu, setMenu] = useState(false),
    [reveal, setReveal] = useState(null),
    [read, setRead] = useState([false, false, false, false, false]),
    [flipped, setFlipped] = useState([]),
    [quiz, setQuiz] = useState(null),
    [q1, setQ1] = useState(false),
    [q2, setQ2] = useState(false);
  useLessonAudio(sound);
  const can = [
    read[0],
    read[1],
    flipped.length === 2 && q1,
    read[3] && q2,
    read[4],
  ][page];
  const mark = (i) => setRead((r) => r.map((x, n) => (n === i ? true : x)));
  const open = (key) =>
    setReveal({
      ...reveals[key],
      key,
      bullets:
        key === "closing"
          ? [
              "The plan is a collection of subsidiary plans and baselines; integration is what binds them into one whole",
              "Vertical integration = traces up to objectives/governance/business case; horizontal integration = subsidiary plans agree with each other",
              "Integration is iterative during planning and ongoing throughout the project lifecycle — never a one-time task",
              "The PM is the integrator, not necessarily the author of every subsidiary plan",
            ]
          : null,
    });
  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="course-select">
          <Award />
          <span>PMP Project Management Professional</span>
          <ChevronDown />
        </button>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                key={i}
                className={`progress-dot ${i < 9 ? "done" : "active"}`}
              >
                {i < 9 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 /> : <VolumeX />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <div className="outline">
            <button className="menu-button" onClick={() => setMenu(!menu)}>
              <Menu />
            </button>
            {menu && (
              <div className="outline-panel">
                <div className="outline-summary">
                  <div>
                    <b>Lesson progress</b>
                    <span>{page + 1} / 5</span>
                  </div>
                  <span className="summary-track">
                    <span style={{ width: `${(page + 1) * 20}%` }} />
                  </span>
                </div>
                <div className="lesson-list">
                  {screens.map((s, i) => (
                    <button
                      key={s}
                      className={`lesson ${i === page ? "current" : ""}`}
                      disabled={i > page}
                      onClick={() => {
                        setPage(i);
                        setMenu(false);
                      }}
                    >
                      <span>{i < page ? <Check size={13} /> : i + 1}</span>
                      <span>{s}</span>
                      <small>
                        {i < page ? "Read" : i === page ? "Current" : "Locked"}
                      </small>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <article className="lesson-card">
            <nav className="section-tabs">
              <p>Section {page + 1} of 5</p>
              <div>
                {screens.map((s, i) => (
                  <button
                    key={s}
                    disabled={i > page}
                    className={
                      i === page ? "active" : i < page ? "done" : "locked"
                    }
                    onClick={() => setPage(i)}
                  >
                    {i < page && <Check />}
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </nav>
            <AnimatePresence mode="wait">
              <motion.section
                key={page}
                className="lesson-content"
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -22 }}
              >
                {page === 0 && (
                  <div className="hero-layout">
                    <div>
                      <p className="eyebrow">LESSON 4.1.5</p>
                      <h1>Create an Integrated Project Management Plan</h1>
                      <p className="lead">
                        A conductor doesn't play a single instrument in the
                        orchestra. Give every musician a technically perfect
                        score and let them rehearse alone, and you'll get
                        technically perfect noise — not music. What turns
                        correct individual parts into one coherent performance
                        is somebody standing at the front making sure they're
                        all playing the same piece, in the same tempo, at the
                        same moment.
                      </p>
                      <button
                        className="primary-cta"
                        disabled={read[0]}
                        onClick={() => open("hook")}
                      >
                        {read[0]
                          ? "Integration revealed"
                          : "Reveal the integrated plan"}
                        <ArrowRight />
                      </button>
                    </div>
                    <motion.div
                      className="lesson-art"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    >
                      <IllustrationPlayer svg={heroArt} style={{ height: "100%" }} />
                    </motion.div>
                  </div>
                )}
                {page === 1 && (
                  <div className="hero-layout compact-hero">
                    <div>
                      <p className="eyebrow">WHAT THIS ENABLER MEANS</p>
                      <h2>
                        This enabler isn't asking the project manager to write a
                        new document.
                      </h2>
                      <p className="lead">
                        It's asking for something closer to what the conductor
                        does — making sure everything already written works
                        together.
                      </p>
                      <button
                        className="primary-cta"
                        disabled={read[1]}
                        onClick={() => open("meaning")}
                      >
                        {read[1]
                          ? "Meaning revealed"
                          : "Reveal what this enabler means"}
                        <ArrowRight />
                      </button>
                    </div>
                    <motion.div
                      className="lesson-art"
                      animate={{ scale: [1, 1.012, 1] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <IllustrationPlayer svg={meaningArt} style={{ height: "100%" }} />
                    </motion.div>
                  </div>
                )}
                {page === 2 && (
                  <div className="wide-page integration-page">
                    <p className="eyebrow">TWO DIRECTIONS OF INTEGRATION</p>
                    <h2>
                      Integration doesn't happen in just one direction. It has
                      to work two ways at once — and missing either one leaves
                      the plan only partially integrated, no matter how complete
                      it looks.
                    </h2>
                    <p className="lead">
                      Flip both cards to see the difference.
                    </p>
                    <div className="flip-grid">
                      {[
                        {
                          title: "Vertical Integration",
                          image: verticalArt,
                          text: "Connects each subsidiary plan upward to the project's overall objectives, governance framework, and business case. Every subsidiary plan must trace back to the project's authorized scope, approved budget, and strategic purpose. A risk management plan that doesn't align with the governance escalation paths set at initiation isn't integrated — it's isolated.",
                        },
                        {
                          title: "Horizontal Integration",
                          image: horizontalArt,
                          text: "Connects the subsidiary plans to each other, ensuring they're making compatible assumptions about the same work. The scope plan and schedule plan must agree on what's being delivered and in what sequence. The schedule plan and cost plan must agree on how long work takes and what it costs. The resource plan and risk plan must agree on available capacity and exposure if key resources are unavailable.",
                        },
                      ].map((c, i) => (
                        <div className="illustrated-flip" key={c.title}>
                          <IllustrationPlayer className="flip-card-art" svg={c.image} />
                          <button
                            className={`flip ${flipped.includes(i) ? "flipped" : ""}`}
                            onClick={() =>
                              setFlipped((f) => (f.includes(i) ? f : [...f, i]))
                            }
                          >
                            <span className="flip-inner">
                              <span className="flip-front">
                                <small>CLICK TO FLIP</small>
                                <h3>{c.title}</h3>
                                <span>
                                  {i === 0
                                    ? "Trace each plan upward"
                                    : "Align plans across domains"}
                                </span>
                              </span>
                              <span className="flip-back">
                                <small>
                                  {i === 0 ? "TRACE UPWARD" : "ALIGN ACROSS"}
                                </small>
                                <h3>{c.title}</h3>
                                <span>{c.text}</span>
                              </span>
                            </span>
                          </button>
                        </div>
                      ))}
                    </div>
                    {flipped.length === 2 && (
                      <motion.div
                        className="principle"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Sparkles />
                        <p>
                          Horizontal integration is what prevents the plan from
                          containing incompatible promises that will collide in
                          execution. And the process itself is iterative — as
                          each subsidiary plan is produced in the lessons that
                          follow, it's folded into the whole and its alignment
                          re-verified. The integrated plan isn't complete when
                          the first subsidiary plan is written; it grows
                          progressively more complete as each domain adds its
                          component, validated at each step, not just at the
                          end.
                        </p>
                      </motion.div>
                    )}
                    {flipped.length === 2 && !q1 && (
                      <button
                        className="knowledge-cta"
                        onClick={() => setQuiz(quizOne)}
                      >
                        <Target /> Start knowledge check <ArrowRight />
                      </button>
                    )}
                  </div>
                )}
                {page === 3 && (
                  <div className="hero-layout compact-hero living-page">
                    <div>
                      <p className="eyebrow">THE LIVING PLAN</p>
                      <h2>
                        Here's the point worth sitting with, because it's easy
                        to treat integration as a box to check once planning
                        wraps up.
                      </h2>
                      <p className="lead">
                        It isn't. It's ongoing, for the entire life of the
                        project.
                      </p>
                      {!read[3] && (
                        <button
                          className="primary-cta"
                          onClick={() => open("living")}
                        >
                          Reveal the living plan <ArrowRight />
                        </button>
                      )}
                      {read[3] && !q2 && (
                        <button
                          className="knowledge-cta"
                          onClick={() => setQuiz(quizTwo)}
                        >
                          <Target /> Start knowledge check <ArrowRight />
                        </button>
                      )}
                    </div>
                    <motion.div
                      className="lesson-art"
                      animate={{ opacity: [0.94, 1, 0.94] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <IllustrationPlayer svg={livingArt} style={{ height: "100%" }} />
                    </motion.div>
                  </div>
                )}
                {page === 4 && (
                  <div className="exam-layout">
                    <div className="exam-visual">
                      <IllustrationPlayer className="exam-visual-art" svg={closingArt} />
                    </div>
                    <div>
                      <p className="eyebrow">SYNTHESIS (EXAM LENS)</p>
                      <h2>
                        Back to the conductor for a moment — because the closing
                        idea of this enabler is exactly what a conductor's job
                        actually is, and exactly what it isn't.
                      </h2>
                      <button
                        className="primary-cta"
                        disabled={read[4]}
                        onClick={() => open("closing")}
                      >
                        {read[4]
                          ? "Synthesis reviewed"
                          : "Reveal the synthesis"}
                        <Sparkles />
                      </button>
                    </div>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>
            {can && (
              <div className="completion">
                <Check /> Interaction complete — continue when ready.
              </div>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
              >
                <ArrowLeft /> Previous
              </button>
              <button
                className={`primary-button ${can ? "unlocked" : ""}`}
                disabled={!can}
                onClick={() => page < 4 && setPage(page + 1)}
              >
                {page === 4 ? "Continue to next lesson" : "Continue"}
                <ArrowRight />
              </button>
            </footer>
          </article>
        </section>
      </main>
      <AnimatePresence>
        {reveal && (
          <FocusModal
            data={reveal}
            onClose={() => setReveal(null)}
            onDone={() =>
              mark(
                reveal.key === "hook"
                  ? 0
                  : reveal.key === "meaning"
                    ? 1
                    : reveal.key === "living"
                      ? 3
                      : 4,
              )
            }
          />
        )}
      </AnimatePresence>
      {quiz && (
        <KnowledgeCheck
          data={quiz}
          onFinish={() => {
            quiz === quizOne ? setQ1(true) : setQ2(true);
            setQuiz(null);
          }}
        />
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
