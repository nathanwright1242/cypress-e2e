# Clean-Room Specification Template

## Instructions for the spec writer (read first)

You are producing a **clean-room specification** of this project. A different model will rebuild the project from this document alone, with no access to the existing code. Your job is to capture **what the system does and why** — never **how it is currently built**.

**Hard rules — the spec must NOT contain:**

- Architecture or design decisions (layers, patterns, module boundaries)
- Library, framework, or package names (unless listed as a mandatory constraint by the owner)
- File names, directory structure, function/class/variable names
- Algorithms or data structures chosen by the implementation
- Database schemas, table/column names, or storage technology
- Code snippets, pseudocode, or config fragments
- Terminology invented during implementation (rename to plain domain language)

**Litmus test for every sentence:** *Would a domain expert who has never seen this codebase know or need this fact?* If no — cut it or rephrase it at the behavioral level.

Describe behavior from the outside: inputs, outputs, rules, and observable results.

-----

## 1. Project Overview

- **Purpose (1 paragraph):** What problem does this solve, for whom?
- **Target users:** Who uses it and in what context?
- **Core value:** What must be true for a rebuild to count as “the same product”?

## 2. Domain Glossary

Define every domain concept a newcomer needs, in plain language. (Real-world terms only — no implementation vocabulary.)

|Term|Definition|Notes / relationships|
|----|----------|---------------------|
|    |          |                     |

## 3. Mandatory Constraints (owner-approved only)

Only include constraints the project owner has explicitly allowed. Typical fair-game items:

- **Platform / runtime:** (e.g., iOS app, web app, CLI)
- **Language:** (only if required for a fair comparison)
- **Required external services / APIs:** (name + what they’re used for, not how they’re called)
- **Data formats the system must consume or produce:** (with examples)
- **Regulatory / compliance requirements:**

## 4. User Workflows

For each major workflow, describe the journey from the user’s perspective:

- **Workflow name:**
- **Trigger:** What starts it?
- **Steps:** What the user does and what they observe at each step
- **Outcome:** End state from the user’s point of view

(Repeat for each workflow. Cover the unhappy paths too.)

## 5. Functional Requirements & Business Rules

Numbered, testable statements of behavior. Each rule should be phrased as observable behavior, e.g.:

- **FR-1:** When a user submits X, the system must Y within Z.
- **BR-1:** A [domain object] may never be in states A and B simultaneously.

Include all rules around validation, permissions, limits, ordering, timing, and calculations (give the formula/logic in domain terms, not code).

## 6. Acceptance Criteria & Golden Examples

Concrete input → expected output pairs. These are the rebuild’s test suite.

### Example N

- **Scenario:**
- **Given (state/setup):**
- **Input:**
- **Expected output / observable result:**

(Provide enough examples to pin down ambiguous rules, boundary values, and calculations.)

## 7. Edge Cases & Error Behavior

- What happens with empty, malformed, oversized, or duplicate input?
- What does the user see on each failure? (messages in domain terms, recovery behavior)
- Concurrency/timing situations a user could notice

## 8. Non-Functional Requirements

- **Performance:** user-observable targets (e.g., “results appear in under 2s for typical input”)
- **Scale:** expected data volumes, user counts
- **Security & privacy:** what must be protected, who can see what
- **Accessibility / localization:** if applicable
- **Offline / reliability expectations:** if applicable

## 9. Out of Scope / Non-Goals

What the system deliberately does NOT do (prevents the rebuild from over-building).

## 10. Open Ambiguities

Anything the existing behavior leaves genuinely undefined. State it as a question and let the rebuilding model decide — do not answer it with the current implementation’s choice.

-----

## Final Step: Leak Audit (mandatory)

Before finishing, re-read the entire spec and confirm each item:

- [ ] No library, framework, or tool names outside Section 3
- [ ] No file, module, function, class, or variable names
- [ ] No architecture, patterns, or data-structure choices
- [ ] No schemas or storage details
- [ ] No code or pseudocode
- [ ] All invented/implementation terminology replaced with plain domain language
- [ ] Every requirement is phrased as externally observable behavior
- [ ] Golden examples cover all calculations and boundary conditions

List anything you removed during this audit and why.
