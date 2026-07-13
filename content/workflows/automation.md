---
title: 自动化与 CI
description: 从验证过的人工流程升级到 Codex 定时任务、codex exec 与 GitHub Action。
---

# 先跑通，再自动跑

官方对自动化的建议很实用：先通过对话把行为和输出调准，确认流程可重复、容易审查，再把它设为自动化。自动化不该放大一个尚未弄清的提示词。

## 三个层级

### 1. App 定时任务

适合周报、变更摘要、资料检查、每日简报。提示词应固定输入范围、输出位置、异常处理和完成条件。本地自动化依赖电脑处于唤醒状态且 App 运行。

### 2. `codex exec`

非交互模式适合脚本、CI 和计划任务：

```bash
codex exec "Review the current diff for correctness and output markdown"
```

要求机器可解析时可使用结构化输出，并明确失败退出策略。不要默认给 CI 过大的写权限。

### 3. GitHub Action

官方 `openai/codex-action@v1` 可从 GitHub 事件触发 Codex，用于审查、应用补丁或在 CI 中运行任务。Action 会安装 CLI，并按配置权限执行 `codex exec`。

## 自动化任务合同

每个自动化应写清：

- **触发器**：何时运行，避免重复触发；
- **输入**：只读取哪些目录、PR 或数据源；
- **动作**：是否允许写文件、发评论或开 PR；
- **验证**：失败如何识别；
- **输出**：固定路径或结构；
- **升级**：遇到不确定性时停止并报告什么。

## 安全底线

最小权限、固定依赖、限制网络域名、保护秘密、保留日志。先让自动化只读运行一段时间，再逐步开放写操作。

## 官方依据

- [Automations](https://openai.com/academy/codex-automations/)
- [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode)
- [Codex GitHub Action](https://learn.chatgpt.com/docs/github-action)
- [Advanced workflows and automation](https://academy.openai.com/public/clubs/builders-etkn1/resources/codex-103-advanced-workflows-and-automation-2026-03-18)
