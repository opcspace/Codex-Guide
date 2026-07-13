---
title: 选择使用入口
description: 根据任务形态选择 Codex App、CLI、IDE 或 Cloud。
---

# 先选对工作台

Codex 不只有一个入口。官方将 App、CLI、IDE 扩展和 Cloud 设计成不同的工作表面；选择标准不是“哪个更强”，而是上下文在哪里、任务要运行多久、你需要怎样审查。

## 四种入口怎么选

| 入口 | 最适合 | 关键优势 | 典型任务 |
| --- | --- | --- | --- |
| ChatGPT / Codex App | 本地文件、多产物、长任务 | 项目、线程、终端、预览和审查在同一界面 | 做站点、整理资料、生成文档 |
| Codex CLI | 终端原生工程流 | 直接检查代码、编辑、运行命令，可脚本化 | 修 Bug、重构、仓库问答 |
| IDE 扩展 | 正在编辑的代码 | 自动带入打开文件和选区，就地审查修改 | 局部实现、解释代码、补测试 |
| Codex Cloud | 并行、隔离、远程运行 | 独立云环境，可从 Web、GitHub、Slack 等发起 | 多 Issue 并行、后台代码任务 |

## 一个实用决策法

1. **上下文主要在本地文件和多个工具里**：用 App。
2. **你已经在终端里工作**：用 CLI，减少切换。
3. **任务围绕当前选区或几个代码文件**：用 IDE 扩展。
4. **任务可独立运行、希望并行或离开电脑继续**：用 Cloud。

## 不要把入口当成孤岛

成熟工作流会在入口之间交接：在 App 中做调研和规划，在 Worktree 中隔离实现；在 IDE 中微调；在 GitHub 上触发最终审查。官方 App 也支持在 Local 与 Worktree 之间 handoff，不必把一个任务从头重做。

> 入口选择的本质，是选择“任务运行环境 + 上下文来源 + 审查界面”。

## 官方依据

- [Codex CLI](https://learn.chatgpt.com/docs/codex/cli)
- [Codex IDE extension](https://learn.chatgpt.com/docs/codex/ide)
- [Codex cloud](https://learn.chatgpt.com/docs/cloud)
- [ChatGPT desktop app](https://learn.chatgpt.com/docs/app)
