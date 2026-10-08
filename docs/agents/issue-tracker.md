# Issue tracker: GitHub

仓库：yangguang0405/sample-repo。
任务和规格存放在 GitHub Issues，使用 gh CLI 操作。

## 常用操作

- 创建：gh issue create --title "标题" --body-file <文件>
- 查看：gh issue view <编号> --json number,title,body,labels,comments
- 列表：gh issue list --state open --json number,title,labels
- 评论：gh issue comment <编号> --body-file <文件>
- 添加标签：gh issue edit <编号> --add-label "<标签>"
- 移除标签：gh issue edit <编号> --remove-label "<标签>"
- 关闭：gh issue close <编号>

从仓库目录执行命令；在其他目录执行时显式指定
--repo yangguang0405/sample-repo。
多行正文写入临时文件，通过 --body-file 提交。

“发布到任务跟踪系统”表示创建 GitHub Issue。
“获取相关任务”表示读取对应 Issue 及其评论。

## Pull requests as a triage surface

PRs as a request surface: no.

GitHub 的 Issue 和 PR 共用编号空间；遇到含义不明的编号，先确认其类型。

## Wayfinding operations

- Map：使用带 wayfinder:map 标签的 Issue，记录 Notes、
  Decisions-so-far 和 Fog。
- 子任务：优先使用 GitHub sub-issues 关联到 Map；不支持时，
  在 Map 中维护任务清单，并在子任务正文中写 Part of #<编号>。
- 类型标签：wayfinder:research、wayfinder:prototype、
  wayfinder:grilling、wayfinder:task，使用前创建缺失标签。
- 阻塞关系：优先使用 GitHub 原生 Issue dependencies；
  不支持时，在正文中写 Blocked by: #<编号>。
- 可领取任务：按 Map 顺序选择尚未关闭、没有未完成依赖、
  且未分配负责人的子任务。
- 领取：开始工作前将任务分配给当前用户。
- 完成：评论记录结论、关闭子任务，并在 Map 的
  Decisions-so-far 中追加结论摘要和链接。
