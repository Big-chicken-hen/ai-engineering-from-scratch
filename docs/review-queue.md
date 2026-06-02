# Phase 00 知识点队列

最后更新：2026-06-02
当前位置：`00-04 APIs & Keys`

这份文件以后按照课程目录走。标题使用课程编号，例如 `00-01`、`00-02`。每一课记录三类内容：知识点、需要掌握的命令行、初学者提示。

## 00-01 Dev Environment

### 知识点

- AI 工程环境可以分成几层：系统基础、包管理器、语言运行时、AI/ML 库。
- WSL2 和 PowerShell 是两个不同的工作环境。同一个命令或路径，在一个环境里能用，不代表另一个环境里也能用。
- Python 虚拟环境用来隔离项目依赖，避免不同项目互相污染。
- `uv` 用来管理 Python 版本、虚拟环境和 Python 包安装，速度比传统 `pip` 工作流更快。
- Node.js、Rust、Julia 是后面课程会用到的工具链；当前阶段 Python 是主线。
- GPU 属于环境准备的一部分，但早期课程不是每一节都需要 GPU。

### 需要掌握的命令行

```bash
# Windows / WSL2
wsl --install -d Ubuntu-24.04

# Ubuntu / WSL 基础工具
sudo apt update
sudo apt install -y build-essential git curl wget

# Python 与 uv
curl -LsSf https://astral.sh/uv/install.sh | sh
uv python install 3.12
uv venv
source .venv/bin/activate
uv pip install numpy matplotlib jupyter

# Python 快速检查
python --version
python -c "import numpy as np; print(np.__version__)"

# 可选工具链检查
node --version
rustc --version
cargo --version
julia -e 'println(VERSION)'

# 课程环境验证脚本
python phases/00-setup-and-tooling/01-dev-environment/code/verify.py
```

### 初学者提示

- 如果 Python 包导入失败，先检查两个问题：是不是进了正确目录，`.venv` 有没有激活。
- Houdini 类比：系统基础像最底层的输入几何，包管理器和运行时像上游 SOP 节点。底层节点出错，后面的节点都会 cook 得不对。

## 00-02 Git & Collaboration

### 知识点

- Git 负责记录项目历史，GitHub 负责保存远端副本。
- 日常流程是：工作区 -> 暂存区 -> 本地仓库 -> 远端仓库。
- `git add` 是把改动放进暂存区，`git commit` 是保存一个快照，`git push` 是推送到 GitHub。
- branch 是一条独立工作线，适合试东西，不直接影响 `main`。
- `.gitignore` 用来避免把不该提交的东西放进 GitHub，比如 `.env`、缓存、模型 checkpoint、大文件。
- commit 像 Houdini 里保存一个稳定节点图版本：出了问题时，至少知道上一个干净状态在哪里。

### 需要掌握的命令行

```bash
# 设置 Git 身份
git config --global user.name "Your Name"
git config --global user.email "you@example.com"

# 查看状态与保存改动
git status
git add docs/review-queue.md
git commit -m "Update learning notes"
git push origin main

# 克隆仓库并进入目录
git clone https://github.com/Big-chicken-hen/ai-engineering-from-scratch.git
cd ai-engineering-from-scratch

# 分支工作流
git checkout -b my-progress
git checkout main
git merge my-progress

# 查看历史
git log --oneline

# 查看远端地址
git remote -v
```

### 初学者提示

- 感觉 Git 状态乱了时，第一条命令永远先用 `git status`。
- 当前课程阶段不需要掌握 rebase、cherry-pick、submodule。先把 `status`、`add`、`commit`、`push`、`clone`、`checkout -b`、`log --oneline` 用熟。

## 00-03 GPU Setup & Cloud

### 知识点

- GPU 可以加速 tensor 和矩阵运算，深度学习训练会明显受益。
- CUDA 是 NVIDIA 让程序使用 GPU 的计算平台。
- `torch.cuda.is_available()` 用来判断当前 Python 环境里的 PyTorch 能不能看到可用 CUDA GPU。
- VRAM 是 GPU 显存，它限制模型大小和 batch size。
- fp16 大约每个参数占 2 bytes，可以用来粗略估算模型显存需求。
- 本地 GPU 不可用时，后面可以用 Google Colab 或云 GPU。

### 需要掌握的命令行

```bash
# 检查本地 NVIDIA GPU
nvidia-smi

# 在已激活的 uv 环境里安装 CUDA 版 PyTorch
uv pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124

# 快速检查 CUDA
python -c "import torch; print(torch.cuda.is_available()); print(torch.version.cuda)"

# CUDA 可用时打印 GPU 名称
python -c "import torch; print(torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'CPU only')"

# 云 GPU 示例
ssh user@your-gpu-instance
python -c "import torch; print(torch.cuda.get_device_name(0))"
```

### 初学者提示

- 如果 CUDA 返回 `False`，先分类错误：version、dependency、path/environment、permission、network、code logic。
- SOP 类比：CPU 和 GPU 像两种不同的计算后端。同一个节点网络，数据放对地方时可以很快；数据没放对，就会退回慢路径。

## 00-04 APIs & Keys

### 知识点

- API 调用通常有四部分：endpoint URL、API key、request body、response body。
- API key 是私密凭证，不能直接写进代码，也不能提交到 GitHub。
- `.env` 文件和环境变量用于把秘密信息放在源码外面。
- SDK 调用和 raw HTTP 调用本质一样，都是发请求、收 JSON 响应；SDK 只是帮你隐藏了一些细节。
- 常见 API 错误包括：认证失败、rate limit、请求体格式错误、网络问题、环境变量没设置。
- VEX 类比：API key 像一个私密参数。节点 cook 时可以读取它，但不能把真实值发布进共享 HDA 或公开工程里。

### 需要掌握的命令行

```bash
# WSL / Linux：只在当前终端会话里设置 key
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."

# PowerShell：只在当前终端会话里设置 key
$env:OPENAI_API_KEY="sk-..."
$env:ANTHROPIC_API_KEY="sk-ant-..."

# 检查环境变量是否存在，不打印真实 key
python -c "import os; print('OPENAI_API_KEY set:', bool(os.getenv('OPENAI_API_KEY')))"
python -c "import os; print('ANTHROPIC_API_KEY set:', bool(os.getenv('ANTHROPIC_API_KEY')))"

# 手动创建 .env 文件后，确认 Git 没有准备提交它
# .env 示例内容：
# OPENAI_API_KEY=sk-...
# ANTHROPIC_API_KEY=sk-ant-...

git status
```

### 初学者提示

- 不要把真实 API key 粘贴到公开文件、GitHub issue、截图、聊天记录或 commit 里。
- API 调用失败时，先检查：key 是否设置、请求体是否正确、provider/model 是否写对、是否触发 rate limit。
- 当前课程位置在这里：等 `.env` 和第一次 API 调用稳定后，下一课是 `00-05 Jupyter Notebooks`。
