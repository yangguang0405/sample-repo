# 业务模块

按实际业务创建子目录，例如 `features/account/`。模块内组织专用组件、校验和业务逻辑；只有跨业务复用的内容才提升到 `components` 或 `lib`。服务端专用模块需导入 `server-only`。
