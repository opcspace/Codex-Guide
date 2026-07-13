# Codex 实践指南

OPCspace 维护的 Codex 中文实践知识库。内容基于 OpenAI 官方文档、Academy 与官方开源仓库，聚焦可执行任务、工程上下文、审查验证、安全和自动化。

## 本地预览

```bash
npm install
npm run check
npm run build
npx serve site
```

## 发布

推送到 `main` 后，GitHub Actions 会构建并发布 GitHub Pages。仓库 Settings → Pages → Source 需要选择 **GitHub Actions**。

预期地址：<https://opcspace.github.io/codex-guide/>

## 内容原则

- 只引用 OpenAI 官方资料；
- 中文整理，不镜像原文；
- 每篇实践指向官方依据；
- 资料索引记录最后核查日期。

本项目不是 OpenAI 官方文档。
