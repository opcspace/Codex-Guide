# Codex 实践指南

> **项目状态：OPCspace 旗舰项目 / 活跃维护** · 当前版本 `1.0.0` · [路线图](ROADMAP.md) · [更新记录](CHANGELOG.md) · [谁在使用](ADOPTERS.md)

[![Deploy knowledge base](https://github.com/opcspace/Codex-Guide/actions/workflows/pages.yml/badge.svg)](https://github.com/opcspace/Codex-Guide/actions/workflows/pages.yml)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-在线阅读-9fe870?logo=github)](https://opcspace.github.io/Codex-Guide/)
[![Content](https://img.shields.io/badge/内容-17%20篇中文实践-202a24)](https://opcspace.github.io/Codex-Guide/)

一套面向真实工程交付的 Codex 中文实践知识库。内容基于 OpenAI 官方文档、OpenAI Academy 与 `openai/codex` 官方仓库，重点不是罗列功能，而是把“理解任务—修改代码—验证结果—安全交付”做成可复用流程。

**在线阅读：[opcspace.github.io/Codex-Guide](https://opcspace.github.io/Codex-Guide/)**

## 你能从这里获得什么

- 从 CLI、IDE、Cloud 等入口中选择合适场景；
- 写出包含目标、范围、约束、验证和交付物的任务单；
- 用 `AGENTS.md` 固化仓库约定；
- 审查差异、分层测试并披露未验证项；
- 使用 Worktree、自动化、Skills 与 MCP 扩展工作流；
- 管理沙箱、审批、网络与外部系统权限；
- 排查登录、配置、文件、Git 与连接问题。

## 内容地图

| 路线 | 适合谁 | 推荐入口 |
| --- | --- | --- |
| 30 分钟上手 | 第一次使用 Codex | [选择入口](https://opcspace.github.io/Codex-Guide/start/choose-surface.html) → [安装配置](https://opcspace.github.io/Codex-Guide/start/install-config.html) → [第一个任务](https://opcspace.github.io/Codex-Guide/start/first-task.html) |
| 稳定开发 | 已经会用，但结果不稳定 | [任务设计](https://opcspace.github.io/Codex-Guide/practices/prompting.html) → [仓库上下文](https://opcspace.github.io/Codex-Guide/practices/repo-context.html) → [审查测试](https://opcspace.github.io/Codex-Guide/practices/review-test.html) |
| 团队与规模化 | 需要并行或自动运行 | [Worktree](https://opcspace.github.io/Codex-Guide/workflows/parallel-work.html) → [配置模式](https://opcspace.github.io/Codex-Guide/workflows/configuration.html) → [自动化](https://opcspace.github.io/Codex-Guide/workflows/automation.html) |
| 快速查阅 | 遇到问题或需要模板 | [提示词库](https://opcspace.github.io/Codex-Guide/reference/prompts.html) · [故障排查](https://opcspace.github.io/Codex-Guide/reference/troubleshooting.html) · [术语](https://opcspace.github.io/Codex-Guide/reference/glossary.html) |

## 站点特性

站点是仓库内的轻量静态生成器构建，不依赖大型文档框架：

- 深色编辑风格与 Codex 终端绿主题；
- 全站全文搜索（`⌘/Ctrl + K`）；
- 页内目录、阅读进度、章节锚点；
- 上一篇/下一篇连续阅读；
- 响应式手机导航；
- 代码块一键复制；
- Canonical 与 Open Graph 基础元信息。

## 本地运行

需要 Node.js 22 或兼容版本。

```bash
npm ci
npm run check
npm run build
npx serve docs
```

- `npm run check`：校验导航、内容文件、内部链接和资料核查日期；
- `npm run build`：将 `content/` 构建为 `docs/`；
- 本地预览后访问终端输出的地址。

## 项目结构

```text
.
├── content/              # Markdown 知识库源文件
├── assets/               # 站点视觉与交互
├── scripts/
│   ├── build.mjs         # 静态站点生成器
│   └── check.mjs         # 内容完整性检查
├── docs/                 # GitHub Pages 构建产物
├── nav.json              # 导航与阅读顺序
├── site.config.json      # 品牌、地址与站点配置
└── .github/workflows/    # Pages 自动部署
```

## 发布流程

推送到 `main` 后，GitHub Actions 会：

1. 安装锁定依赖；
2. 运行内容检查；
3. 重建 `docs/`；
4. 部署 GitHub Pages。

也可在 Actions 中手动运行 `Deploy knowledge base`。部署失败时先看 build job 的第一条具体错误。

## 内容与来源原则

- 产品事实只引用 OpenAI 官方资料；
- 中文重组与实践转译，不镜像原文；
- 对易变化的命令、入口和权限标记核查日期；
- 将官方事实、实践建议和推导清楚分开；
- 不承诺未验证的功能或账户能力。

完整来源见[官方资料索引](https://opcspace.github.io/Codex-Guide/reference/sources.html)。

## 贡献

欢迎修正过期资料、补充官方来源和改进实践案例。请先阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。提交内容时附上官方链接、核查日期和可复现验证方式。

适合第一次参与的任务会标记为 [`good first issue`](https://github.com/opcspace/Codex-Guide/labels/good%20first%20issue)。跨项目问题和社区建议统一进入 [OPCspace Discussions](https://github.com/orgs/opcspace/discussions)。

- **欢迎外部贡献**：文档纠错、官方来源更新、脱敏案例、构建与可访问性改进；
- **维护团队负责**：品牌、内容结构、发布节奏、商业课程与对外合作承诺。

## 声明

本项目由 OPCspace 维护，不是 OpenAI 官方文档，也不代表 OpenAI。产品能力、价格、模型和权限以 OpenAI 官方当前说明及你的账户实际界面为准。

## OPCspace 入口

- 中文官网：[opcspace.com.cn](https://opcspace.com.cn/)
- 国际入口：[opcspace.github.io](https://opcspace.github.io/)
- GitHub 组织：[github.com/opcspace](https://github.com/opcspace)
