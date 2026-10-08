# GitHub 研发流程

依据根目录 `AI Native Dev Process.md`，本目录提供四类 Issue Forms、PR Contract、
CI、Codex QA、独立 Review 和质量台账。适配当前根目录 Next.js 项目，领域文档继续
使用 `GLOSSARY.md` 和 `docs/adr/`，无需建立空的 web/backend/mobile 目录。

## 启用

1. 在仓库 Actions secrets 中设置 `OPENAI_API_KEY`。Codex 使用官方
   [GitHub Action](https://developers.openai.com/codex/github-action/)，模型采用 CLI 默认值。
   调用会消耗 API 额度。仅同仓库、由具备写权限的用户触发的 PR 执行 AI 检查；fork
   PR 先由监督者检查并迁移至仓库分支。缺少密钥或不受支持的来源会失败，不会伪装通过。
2. 确保 `needs-triage` 标签存在；分类继续使用 `docs/agents/triage-labels.md` 的五个标签。
   Type 是表单字段，不另建分类标签。Owner 必须填写真实监督者；表单不硬编码个人 assignee。
3. 在 `package.json` 补齐 `test:unit`、`test:integration`、`test:e2e` 及对应测试环境。
   当前仓库尚无这些命令，因此 CI 会在测试阶段失败。这是待接入的门禁，不使用
   `--if-present` 将缺失测试视为成功。E2E 的浏览器安装、服务启动、数据准备应由测试脚本负责。
4. 将工作流合入默认分支后，Quality Ledger 才能响应 `workflow_run`。
   在 Actions 设置中允许 GitHub Actions 创建 PR。发布作业需要写入 Issue、PR 和台账分支。
5. 配置默认分支 Ruleset：必需检查选择 `Merge gate`；要求人工审批、解决全部讨论，
   新提交使旧审批失效，并要求分支保持最新。YAML 本身不能启用这些仓库设置。
   当前流程没有 `merge_group` 适配，请先使用普通 PR 合并；启用 Merge Queue 前补齐该事件。

## 执行与证据

`ci.yml` 是入口：Build → Lint → Type Check → Unit → Integration → E2E →
`codex-qa.yml` → `codex-review.yml` → Merge gate。后两个是可复用工作流，由 CI 调用，
不重复触发。推送 main 和手动运行执行基础检查；PR 执行完整门禁。修改 PR 描述会重新运行，
修改关联 Issue 或其评论后须手动重新运行 PR 的 CI，以消费最新规格。

正常 PR 用 `Closes #123` 关联一个主 Issue，其余依赖使用 `Refs #456`。
Issue 必须包含统一 Contract 字段、`AI Ready=Yes` 和 `AC-1` 等验收编号。
执行前读取 Issue 全部评论及 PR 讨论。监督者仍须判断需求是否清晰、依赖是否解除；
表单和字段校验无法代替业务验收。Incident 可由 Bug 表单记录，并按紧急流程人工补充。

QA 在临时工作区执行/补充测试，输出结构化 JSON；测试补丁和原始日志保存在 artifact，
不会自动修改产品分支。修复 Agent 需把永久回归测试提交到修复 PR。
Review 在独立作业中只读审查，包含安全审查。缺失证据、失败报告、跳过的必需作业均阻断门禁。
JSON Schema 与发布端校验共同检查结构、关联 commit、验收覆盖和结果一致性。

`quality-ledger.yml` 在 CI 完成后运行，发布 `[AI-EVIDENCE]` PR 评论；对可复现的 QA
缺陷创建带 `needs-triage`、`AI Ready=No` 的 Bug Issue，同一来源 PR 和标题去重。
环境故障只记 `[AI-BLOCKED]`，不虚构产品 Bug。
报告写入 `docs/quality/reports/PR-<n>.md`，Bug 镜像写入
`docs/quality/bugs/BUG-<n>.md`，通过 `quality-ledger/pr-<n>` 分支和独立 PR 入库。
Bug 镜像是 QA 时的快照；修复 PR 负责更新 status、affected_paths、fix_pr 和验证结果。
Review 的 findings 保留在报告与评论中，由监督者分类后转为修复任务。

台账 PR 由监督者验收合并，不自动合并或绕过保护规则。`GITHUB_TOKEN` 创建的 PR
不会触发普通 PR 工作流；团队须为纯证据 PR 配置明确的人工例外流程，或使用经批准的
GitHub App 重新触发所需检查。该例外不能用于产品代码 PR。
参见 [GitHub 工作流触发规则](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow)。

发布作业只执行默认分支的脚本，artifact 仅按受限 JSON 读取，不执行 PR 脚本或解压任意路径。
过期 commit 的报告不发布。AI 作业无仓库写权限，checkout 不保留 Git 凭据。
原始证据默认保留 30 天；长期摘要须合并台账 PR 才进入主分支。
首次 CI 基础阶段失败时也会生成未完成状态摘要；尚无有效主 Issue 的 PR 则需先修正关联。

## 正式评论协议

- `[AI-PLAN]`：执行计划。
- `[AI-QUESTION]`：缺失信息及需要回答的问题。
- `[AI-EVIDENCE]`：测试、日志和代码证据。
- `[AI-BLOCKED]`：阻塞原因与解除条件。
- `[HUMAN-DECISION]`：人类正式决策及例外批准。
- `[AI-RESULT]`：完成摘要及结果链接。

长期规则保存到 Files，任务状态保存到 Issues，变更和验收保存到 PR。
Slack 只用于 urgent / incident / security 提醒并附 GitHub 链接。
