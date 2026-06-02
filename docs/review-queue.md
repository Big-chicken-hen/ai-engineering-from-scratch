# Phase 00 Knowledge Queue

Last updated: 2026-06-02
Current position: `00-04 APIs & Keys`

This file follows the course directory. Use each lesson number as the title, then keep the important concepts, command-line skills, and beginner notes together.

## 00-01 Dev Environment

### Knowledge Points

- An AI engineering environment has layers: system foundation, package managers, language runtimes, then AI/ML libraries.
- WSL2 and PowerShell are different working contexts. A command or path that works in one may not work in the other.
- Python virtual environments keep project dependencies isolated, like keeping one Houdini scene setup from polluting another.
- `uv` is used for Python setup because it can install Python versions, create virtual environments, and install packages quickly.
- Node.js, Rust, and Julia are extra toolchains for later parts of the course. Python is the main starting point.
- GPU setup is part of the environment, but GPU is not required for every early lesson.

### Command Line To Master

```bash
# Windows / WSL2
wsl --install -d Ubuntu-24.04

# Ubuntu / WSL basics
sudo apt update
sudo apt install -y build-essential git curl wget

# Python with uv
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.12
uv venv
source .venv/bin/activate
uv pip install numpy matplotlib jupyter

# Quick Python check
python --version
python -c "import numpy as np; print(np.__version__)"

# Optional toolchains
node --version
rustc --version
cargo --version
julia -e 'println(VERSION)'

# Course verification script
python phases/00-setup-and-tooling/01-dev-environment/code/verify.py
```

### Beginner Notes

- If Python packages fail to import, first ask: am I in the correct environment, and is `.venv` activated?
- Houdini analogy: the system layer is like the base geometry input; package managers and runtimes are like SOP nodes stacked above it. If the lower node is wrong, every later node cooks badly.

## 00-02 Git & Collaboration

### Knowledge Points

- Git tracks project history. GitHub stores a remote copy online.
- The daily flow is: working directory -> staging area -> local repo -> remote repo.
- `git add` stages changes, `git commit` saves a snapshot, and `git push` sends it to GitHub.
- A branch is a separate line of work, useful for trying things without touching `main`.
- `.gitignore` prevents unwanted files such as `.env`, checkpoints, cache files, and large model files from being committed.
- Commits are like clean checkpoints of a Houdini node graph: you can understand what changed and go back if needed.

### Command Line To Master

```bash
# Identity
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# Basic status and saving
git status
git add docs/review-queue.md
git commit -m "Update learning notes"
git push origin main

# Clone and enter a repo
git clone https://github.com/Big-chicken-hen/ai-engineering-from-scratch.git
cd ai-engineering-from-scratch

# Branch workflow
git checkout -b my-progress
git checkout main
git merge my-progress

# History
git log --oneline

# Remote check
git remote -v
```

### Beginner Notes

- `git status` is the first command to run when you feel lost.
- In this course, you do not need advanced Git yet. Focus on `status`, `add`, `commit`, `push`, `clone`, `checkout -b`, and `log --oneline`.

## 00-03 GPU Setup & Cloud

### Knowledge Points

- A GPU speeds up tensor and matrix operations, especially for deep learning.
- CUDA is NVIDIA's platform that lets PyTorch use the GPU.
- `torch.cuda.is_available()` tells you whether the current Python environment can see a usable CUDA GPU.
- VRAM is GPU memory. It limits how large a model or batch can be.
- fp16 uses about 2 bytes per parameter, which gives a rough estimate of model memory needs.
- If local GPU setup fails, Google Colab or cloud GPU can be used later.

### Command Line To Master

```bash
# Local NVIDIA GPU check
nvidia-smi

# Install PyTorch CUDA build in an active uv environment
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124

# Quick CUDA check
python -c "import torch; print(torch.cuda.is_available()); print(torch.version.cuda)"

# Print GPU name when CUDA is available
python -c "import torch; print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU only')"

# Cloud GPU example
ssh user@your-gpu-instance
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

### Beginner Notes

- If CUDA returns `False`, classify the issue before guessing: version, dependency, path/environment, permission, network, or code logic.
- SOP analogy: CPU and GPU are like two different compute backends. The same node network can run slowly on one backend and much faster on another if the data is moved correctly.

## 00-04 APIs & Keys

### Knowledge Points

- An API call usually has four parts: endpoint URL, API key, request body, and response body.
- API keys are private credentials. Do not write real keys directly into code or commit them to GitHub.
- `.env` files and environment variables keep secrets outside source code.
- SDK calls and raw HTTP calls follow the same request/response idea. SDKs just hide some details.
- Common API errors include authentication failures, rate limits, malformed request bodies, network issues, and missing environment variables.
- VEX analogy: an API key is like a private parameter driving a node. The node can read it at cook time, but the value should not be published inside the shared asset.

### Command Line To Master

```bash
# WSL / Linux: set keys for current terminal session
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."

# PowerShell: set keys for current terminal session
$env:OPENAI_API_KEY="sk-..."
$env:ANTHROPIC_API_KEY="sk-ant-..."

# Check that a variable exists without printing the secret value
python -c "import os; print('OPENAI_API_KEY set:', bool(os.getenv('OPENAI_API_KEY')))"
python -c "import os; print('ANTHROPIC_API_KEY set:', bool(os.getenv('ANTHROPIC_API_KEY')))"

# Create a .env file manually, then make sure .env is ignored by Git
# .env content example:
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...

git status
```

### Beginner Notes

- Never paste a real API key into a public file, GitHub issue, chat screenshot, or committed code.
- If an API call fails, start by checking: is the key set, is the request body valid, is the model/provider correct, and are you hitting a rate limit?
- Current course position is here: once `.env` and the first API call are comfortable, the next step is `00-05 Jupyter Notebooks`.
