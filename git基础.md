## git 管理
> 分布式的代码管理工具

- 初始化仓库  `git init`
- 创建忽略文件.gitignore
- **git的工作流程**
  - 每个git仓库划分三个区域
    - 工作区
      - 工作区添加到暂存区
        1. 查看当前文件的状态`git status`  
        2. 提交工作区文件到暂存区 `git add .  git add -A`
        3. 放弃文件的修改 `git checkout xxx` 
    - 暂存区
      - 暂存区的代码提交到历史区 `git commit -m 'xxxx'` 
      - 查看历史版本 `git log`
    - 历史区
    - 工作区和暂存区代码的比较  `git diff`
    - 工作区和历史区代码的比较  `git diff master` 
    - 暂存区和历史区代码的比较  `git diff --cached`

### 本地和远程仓库同步
> 让本地的git仓库和远程的仓库相关联

- 查看所有的远程关联信息 `git remote -v`
- 建立和远程仓库关联  `git remote add xxx [远程仓库地址]`
- 移除远程关联 `git remote remove xxx`
- 拉去远程代码 `git pull`
- 推送远程仓库 `git push` 第一次推送远程使用`git push origin master` 创建和推送master分支
- 远程克隆代码 `git clone xxxx [name]`
- 项目协作开发过程中，创建的远程仓库，团队的其他成员在向远程仓库推送的时候，使用自己的账号没有推送权限,
   我们需要在当前这个远程仓库中*创建工作群组*,让更多人具有工作权限