---
title: 用 AGENTS.md 固化上下文
description: 把仓库约定、测试命令和边界写入 AGENTS.md。
---

# 别在每次任务里重复团队常识

`AGENTS.md` 是 Codex 在工作前读取的项目说明。OpenAI 团队把它作为稳定使用 Codex 的关键习惯：把仓库结构、构建方式、测试要求和禁区放进版本控制，让每次任务从同一组事实开始。

## 一个够用的模板

```md
# Repository guide

## Architecture
- apps/web: customer-facing Next.js app
- packages/core: shared domain logic

## Commands
- Install: pnpm install
- Test changed package: pnpm --filter <name> test
- Typecheck: pnpm typecheck

## Working rules
- Preserve existing public APIs unless the task explicitly changes them.
- Add regression tests for bug fixes.
- Never edit generated files under dist/.
- Do not commit secrets or .env files.

## Delivery
- Summarize changed files and verification commands.
- Report pre-existing failures separately.
```

## 作用域和优先级

官方说明：Codex 会从全局 `~/.codex` 开始，再从项目根目录一路读取到当前工作目录；更深目录的说明可以覆盖更通用的规则。同一目录可用 `AGENTS.override.md` 做优先覆盖。

这适合大型仓库：根目录写全局工程规范，`apps/mobile/AGENTS.md` 写移动端专属命令，`packages/payments/AGENTS.md` 写支付安全要求。

## 写什么，不写什么

**应该写**：长期有效、每次都需要、可执行和可验证的规则。

**不要写**：一次性任务详情、很长的背景故事、已经能从代码直接看出的内容、会频繁过期的人员信息。

## 自测

在 CLI 中可询问 Codex当前加载了哪些指令；也可以故意给一个违反仓库规则的小任务，确认它会指出冲突而不是直接执行。

## 官方依据

- [Custom instructions with AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [How OpenAI uses Codex](https://openai.com/business/guides-and-resources/how-openai-uses-codex/)
- [openai/codex AGENTS.md](https://github.com/openai/codex/blob/main/AGENTS.md)
