## 不同分支
#### 最常见的问题
从master上开一个dev分支，在dev上提交了一个commit，叫它c1，
你的同事在master提交了一个c0，并且push到了远程分支上，你现在，
需要将master分支上的内容，push到你本地的dev上，怎么办？
#### 方法
- 法一merge:

        先去目标分支：git checkout dev
        再将小分支合并到目标分支：git merge master
        结果：如果没有冲突，git会自动生成一个merge commit信息
- 法二rebase:

        先去目标分支dev：git checkout dev
        以哪个为基master，git rebase 基: git rebase master

        结果：
        - dev分支上的提交c1，会接在master上的c0上，Head会指向dev分支的c1。即c0 -> c1
        - master分支呢，记录还是老记录，因为你根本没它合并/rebase了任何东西。

## 同一分支
#### rebase 命令还能帮你修改 commit 记录
        如果dev上有这几个记录：c0 -> c1 -> c2 ->c3
        先去目标分支：git checkout dev
        再修改commit记录：git rebase -i HEAD~4
        执行该命令 shell 会进入交互模式（-i）
