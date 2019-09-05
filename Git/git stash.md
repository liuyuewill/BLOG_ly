### git stash
保存当前工作进度，会把【暂存区】和【工作区】的改动保存起来。然后，git s，会发现当前是一个干净的工作区。

### git stash save 'message...'

添加注释

### git stash list
显示保存进度的列表
### git stash pop [–index] [stash_id]
- git stash pop 把【最新那一条的，只有一条】工作区和暂存区的改动【全都恢复到工作区】，并，删除当前进度
- git stash pop --index 恢复最新的进度到工作区和暂存区
- git stash pop stash@{1} 恢复指定的进度到工作区

git stash pop --index貌似比不带 --index更合理

---
- git stash apply [–index] [stash_id]
除了不删除恢复的进度之外，其余和git stash pop 命令一样。
- git stash drop [stash_id]
删除一个存储的进度。如果不指定stash_id，则默认删除最新的存储进度。
- git stash clear
删除所有存储的进度。