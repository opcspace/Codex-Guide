---
title: Codex 实践指南
description: 从第一次委派到可靠自动化的 Codex 中文实践知识库。
---

<span class="hero-kicker">OPCSPACE KNOWLEDGE BASE · 01</span>

# 把 Codex 用成真正的工作系统

这不是功能清单，而是一条从“会提问”到“能稳定交付”的实践路线。内容只取自 OpenAI 官方文档、Academy、官方 GitHub，并转译成可直接执行的中文方法。

<div class="home-grid">
  <a href="start/first-task.html"><small>01 / START</small><strong>先完成一个闭环</strong><span>选目录、给上下文、验收结果、留下下一步。</span></a>
  <a href="practices/prompting.html"><small>02 / DELEGATE</small><strong>把需求写成任务单</strong><span>目标、范围、约束、验证、交付物五件套。</span></a>
  <a href="practices/repo-context.html"><small>03 / CONTEXT</small><strong>让规则进入仓库</strong><span>用 AGENTS.md 让每次任务从一致的工程上下文开始。</span></a>
  <a href="workflows/automation.html"><small>04 / SCALE</small><strong>把成功流程自动化</strong><span>从人工验证到 codex exec、GitHub Action 和定时任务。</span></a>
</div>

## 推荐学习路线

| 阶段 | 你要掌握的动作 | 完成标志 |
| --- | --- | --- |
| 第一次使用 | 选择合适入口，完成一个小任务 | 你能说清 Codex 改了什么、如何验证 |
| 稳定协作 | 写好任务单，使用差异审查和测试 | 结果可复现，不依赖“碰运气” |
| 团队复用 | 把约定写入 `AGENTS.md` | 新任务自动继承仓库规则 |
| 扩展能力 | 引入 Skill、MCP 和连接器 | 重复工作变成固定工作流 |
| 自动运行 | 使用 Worktree、`codex exec`、Actions | 多任务互不干扰，结果可审计 |

<div class="callout"><strong>使用原则：</strong>让 Codex 先理解、再计划、后修改；让每个任务都带验证标准；把高风险动作留给人确认。</div>

## 这套知识库如何维护

每篇内容都标出官方依据，资料索引记录了核查日期。官方界面和功能会变化，因此操作入口以官方文档为准；本库重点沉淀不易过时的方法：任务边界、上下文工程、验证闭环和安全控制。

继续阅读：[选择使用入口](start/choose-surface.html) · [官方资料索引](reference/sources.html)
