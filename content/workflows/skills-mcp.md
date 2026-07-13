---
title: Skills 与 MCP
description: 用 Skill 固化流程，用 MCP 连接外部工具和上下文。
---

# 一个沉淀方法，一个连接世界

Skill 和 MCP 解决不同问题：Skill 把任务方法包装成可复用能力；MCP 把外部工具与数据接入 Codex。常见组合是“Skill 规定怎么做，MCP 提供做事所需的工具”。

## 什么时候做 Skill

当一个流程满足以下条件，就值得沉淀：

- 经常重复；
- 步骤和验收相对稳定；
- 需要特定模板、脚本或参考资料；
- 新人容易漏步骤。

官方定义中，Skill 可包含说明、资源和可选脚本。好的 Skill 入口文件保持精炼，把大段参考资料按需加载，并提供清楚触发条件。

## 什么时候接 MCP

需要访问第三方文档、浏览器、Figma、Issue 系统或内部工具时使用 MCP。Codex 支持本地 STDIO 和远程 Streamable HTTP 服务器；远程服务可使用 Bearer Token 或 OAuth 等认证。

## 组合示例

“发布前检查” Skill 可以规定：读变更 → 跑测试 → 检查文档 → 生成发布摘要。它通过 MCP 读取设计稿和 Issue，通过本地命令执行测试，最后输出统一模板。

## 安全检查

- 只安装可信 Skill，先读说明和脚本；
- MCP 凭据放在安全存储，不写进仓库；
- 给服务器最小权限；
- 外部内容可能含提示注入，重要动作保留人工确认；
- 定期移除不用的连接和权限。

## 官方依据

- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Model Context Protocol](https://learn.chatgpt.com/docs/extend/mcp)
