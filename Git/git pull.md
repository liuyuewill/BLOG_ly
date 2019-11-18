```JS
git pull使用给定的参数运行 git fetch，并调用 git merge 将检索到的分支头合并到当前分支中
```

### 标准用法： git pull <远程主机名> <远程分支名>:<本地分支名>

- 比如，要取回`origin`主机的`next`分支，与本地的`master`分支合并

  ```JS
  git pull origin next:master
  ```

- 如果远程分支 develop 要与当前分支合并，则冒号后面的部分可以省略

  ```JS
  git pull origin develop
  ```

- git pull

  本地的当前分支自动与对应的`origin`主机”追踪分支”(remote-tracking branch)进行合并





[参考](https://www.yiibai.com/git/git_pull.html)

