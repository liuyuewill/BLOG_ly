## 不同分支
问题：从master上开一个dev分支，在dev上提交了一个commit，叫它c1，
你的同事在master提交了一个c0，并且push到了远程分支上，你现在，
需要将master分支上的内容，push到你本地的dev上，怎么办？

- 法一merge:

        先去目标分支：git checkout dev
        再将小分支合并到目标分支：git merge master
        结果：如果没有冲突，git会自动生成一个merge commit信息
- 法二rebase【常用】:

        先去目标分支dev：git checkout dev
        以哪个为基master，git rebase 基: git rebase master

        结果：
        - dev分支上的提交c1，会接在master上的c0上，Head会指向dev分支的c1。即c0 -> c1
        - master分支呢，记录还是老记录，因为你根本没它合并/rebase了任何东西。

## 相同分支
 - 修改 commit 记录

        问题：如果dev上有这几个记录：c0 -> c1 -> c2 ->c3，你想把这四个commits合并成同一个提交，怎么办？
        先去目标分支：git checkout dev
        再修改commit记录：git rebase -i HEAD~4
        执行该命令 shell 会进入交互模式（-i）
        然后第一行开头为 p,其他行开头为s,然后保存退出
- git pull 和 git pull --rebase【常用】

        1、git pull = git fetch + git merge
        2、git pull --rebase = git fetch + git rebase

        3、使用git pull --rebase注意：
        - 必须保持本地目录干净：
                - 如果本次修改已经完成，则可以先提交（commit）一下
                - 如果本次修改尚未完成，则可以先贮藏：git stash
        - 如果有冲突，手动解决冲突：
                $ git add one.md
                $ git rebase --continue
                或放弃解决冲突
                git rebase --abort 放弃本次 rebase 操作

        建议
        $ git stash
        $ git pull --rebase
        $ git push
        $ git stash pop

## 使用 rebase 和 merge 的基本原则【常用】


- 下游分支更新上游分支内容的时候使用 rebase
- 上游分支合并下游分支内容的时候使用 merge
- 更新当前分支的内容时一定要使用 --rebase 参数

例如现有上游分支 master，基于 master 分支拉出来一个开发分支 dev，在 dev 上开发了一段时间后要把 master 分支提交的新内容更新到 dev 分支，此时切换到 dev 分支，使用 git rebase master

等 dev 分支开发完成了之后，要合并到上游分支 master 上的时候，切换到 master 分支，使用 git merge dev
