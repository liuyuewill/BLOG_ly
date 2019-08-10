### 问题
想将 master 的 Fix 改动应用到 dev 分支
### 方法
- 法一merge:

        先去目标分支：git checkout dev
        再将小分支合并到目标分支：git merge master
- 法二rebase:

        先去目标分支：git checkout dev
        以哪个为基，git rebase 基: git rebase master