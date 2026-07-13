---
title: 并行任务与 Worktree
description: 使用 Codex Worktree 隔离并行任务并安全交接。
---

# 并行的前提是隔离

同一个工作目录里同时修改多个功能，很容易互相覆盖。官方 App 使用 Git Worktree 为同一仓库建立独立工作目录，让多个任务并行而不争用同一组文件。

## 适合 Worktree 的任务

- 两个互不依赖的 Issue；
- 一个功能实现和一个文档更新；
- 需要长时间运行的测试或迁移；
- 定时任务，避免碰到你正在写的代码。

## 标准流程

1. 确保主工作区状态清楚，未提交改动有明确归属。
2. 为每个任务建立独立 Worktree/分支。
3. 每个任务只处理一个目标，分别测试和提交。
4. 使用 Handoff 在 Local 与 Worktree 间切换，需要人工细修时再回本地。
5. 合并前检查分支之间是否触碰同一热点文件。

## 并行不是越多越好

把任务按依赖关系分组。若 B 必须建立在 A 的 schema 或 API 上，先完成 A；如果多个任务都要改同一个核心文件，串行更便宜。并行最适合边界清楚、可独立验证的工作单元。

## 云端并行

Codex Cloud 在隔离云环境运行任务，可从 Web、GitHub、Linear 或 Slack 发起。它适合离开电脑继续执行，但仍要为环境配置依赖、秘密和网络白名单，并在合并前审查差异。

## 官方依据

- [Worktrees](https://learn.chatgpt.com/docs/environments/git-worktrees)
- [Local environments](https://learn.chatgpt.com/docs/environments/local-environment)
- [Codex cloud](https://learn.chatgpt.com/docs/cloud)
