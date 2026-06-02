# Review Queue

Last updated: 2026-06-02

## Current Progress

- WSL2 setup completed
- Git/GitHub basics completed
- GPU/PyTorch CUDA check completed
- API key and `.env` basics started
- Codex/GitHub workflow setup in progress

## Review Points

1. WSL2 environment basics
   - Review what WSL2 is, why it gives you a Linux-like development space on Windows, and how to tell whether you are inside WSL or PowerShell.
   - Houdini analogy: WSL2 is like a separate SOP network context. It can access some shared inputs from Windows, but paths and tools may behave differently inside that context.

2. Git and GitHub workflow basics
   - Review the meaning of repository, commit, branch, remote, push, pull, and status.
   - Houdini analogy: a commit is like saving a clean checkpoint of your node graph. A branch is like trying a new version of the setup without destroying the main one.

3. GPU and PyTorch CUDA check
   - Review why `torch.cuda.is_available()` matters and what it proves: PyTorch can see a usable CUDA GPU from the current Python environment.
   - If the check fails, classify the problem first: driver/version, dependency, path, or environment mismatch.

4. API key and `.env` basics
   - Review why API keys should live in `.env` files or environment variables instead of being written directly into code.
   - VEX analogy: an API key is like a private parameter value driving a node. The node can use it, but you should not publish the secret value inside the shared network.

5. Codex and GitHub collaboration loop
   - Review the basic loop: inspect files, make a small change, check the result, commit, push, and create or update a PR.
   - SOP analogy: Codex is helping operate the node graph, but each step should still be visible and understandable, like checking the geometry after every important node.

## Small Practice Questions

1. In Git, what is the difference between `git status`, `git add`, and `git commit`?

2. Why should `.env` usually be excluded from GitHub, and what could go wrong if an API key is committed?

3. If `torch.cuda.is_available()` returns `False`, which error categories would you check first: network, path, permission, dependency, version, or code logic? Explain your first two guesses.
