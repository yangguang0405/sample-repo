# Domain Docs

本仓库采用单一领域布局：

- 根目录 GLOSSARY.md：领域术语。
- docs/adr/：架构决策记录。

## 阅读规则

探索代码前，阅读已有的 GLOSSARY.md，以及与当前工作相关的 ADR。
文档不存在时直接继续；由 domain-modeling 在实际明确术语或
决策时按需创建。

## 术语与决策

Issue 标题、重构建议、假设和测试名称使用 GLOSSARY.md 定义的术语。
遇到缺失术语时，先检查是否已有对应概念；确有缺口则记录给
domain-modeling。

建议与现有 ADR 冲突时，明确指出对应 ADR，并说明重新讨论的理由。
