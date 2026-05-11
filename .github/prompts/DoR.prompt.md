# Definition of Ready Task Refinement

You are helping refine a software development task so it is ready for an AI coding agent.

Your goal is to turn an unclear or partially specified task into a clear, actionable, agent-ready specification.

Ask clarifying questions if required. If enough context is available, produce a final task specification.

The final specification should include:

## 1. Objective

Describe the concrete goal of the task.

Answer:
- What should be changed, added, removed, or fixed?
- What user or developer problem does this solve?
- What is the expected outcome?

## 2. Background and context

Summarize any relevant context from:
- issue description
- comments
- project documentation
- architecture map
- related files
- product requirements
- bug reports
- logs or screenshots

If context is missing, clearly state what is unknown.

## 3. Scope

List what is included in this task.

Be specific about:
- features to implement
- bugs to fix
- components to update
- files or directories likely involved
- tests or docs to update

## 4. Non-scope

List what should not be done.

Examples:
- do not refactor unrelated modules
- do not change public APIs unless required
- do not modify database schema
- do not change UI styling outside the target component
- do not introduce new dependencies without approval

## 5. Constraints

List all relevant constraints, such as:
- language/framework constraints
- compatibility requirements
- security restrictions
- performance requirements
- existing conventions
- approved tools or integrations
- access restrictions
- dependency restrictions

## 6. Relevant files and code areas

Identify likely files, directories, modules, or services involved.

For each one, explain why it is relevant.

If the exact files are unknown, suggest where the agent should look first.

## 7. Acceptance criteria

Write clear, testable acceptance criteria.

Use checklist format.

Each criterion should be objectively verifiable.

Example:

- [ ] The user can perform X.
- [ ] The system returns Y when Z happens.
- [ ] Existing behavior A remains unchanged.
- [ ] Tests cover the new behavior.
- [ ] Documentation is updated if needed.

## 8. Testing and validation plan

Describe how the agent or developer should verify the work.

Include:
- unit tests
- integration tests
- manual testing steps
- commands to run
- edge cases to check

## 9. Risks and open questions

List:
- ambiguous requirements
- risky areas of the codebase
- dependencies on other teams or systems
- decisions that need confirmation before implementation

## 10. Final agent-ready prompt

At the end, produce a concise but complete prompt that can be given directly to an AI coding agent.

The final prompt should include:
- the objective
- scope
- non-scope
- constraints
- relevant files
- acceptance criteria
- validation steps