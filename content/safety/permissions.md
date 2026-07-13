---
title: 权限、安全与网络
description: 理解 Codex 的沙箱、审批和网络访问边界。
---

# 自主执行，需要清晰护栏

官方把沙箱和审批定义为两个协同控制：沙箱是技术边界，决定能碰哪些文件、能否联网；审批策略决定何时必须停下来请人确认。

## 默认策略

本地 Codex 默认在操作系统强制的沙箱中运行，通常把写入范围限制在当前工作区，并默认关闭网络。任务留在边界内可以连续执行；越过边界时进入审批流程。

## 审批时看三件事

1. **动作**：读取、写入、删除、执行还是联网？
2. **范围**：只在当前项目，还是会碰主目录、凭据或其他仓库？
3. **必要性**：有没有更小权限的替代路径？

如果不确定，要求 Codex先列清单、展示命令、生成备份或把输出写入工作区。

## 网络访问的额外风险

官方列出的风险包括提示注入、代码或秘密外泄、恶意/脆弱依赖、许可证受限内容。云端任务默认在 agent 阶段禁网；确实需要时，按最小域名和 HTTP 方法开放，并审查工作日志。

## 一套稳健的权限阶梯

| 阶段 | 权限 |
| --- | --- |
| 理解问题 | 只读、无网络 |
| 本地实现 | 工作区写入、无网络 |
| 安装依赖 | 临时开放指定包源 |
| 外部系统 | 只开放指定连接器和动作 |
| 发布 | 人工确认 commit、push、部署 |

## 官方依据

- [Sandbox](https://learn.chatgpt.com/docs/sandboxing)
- [Agent approvals & security](https://learn.chatgpt.com/docs/agent-approvals-security)
- [Agent internet access](https://learn.chatgpt.com/docs/cloud/internet-access)
- [Running Codex safely at OpenAI](https://openai.com/index/running-codex-safely/)
