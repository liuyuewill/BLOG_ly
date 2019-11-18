```JS
 branch 的创建、切换、删除
    master是默认的分支
    1. 创建：你现在在哪个分支上，然后可以从这个分支上切出一个新分支，只需要 git branch feature1
    2. 切换：git checkout feature1(然后 HEAD 就会指向新建的 branch 了)
    
		合并一步操作：创建+切换，git checkout -b feature1
    
    创建远程分支(本地分支push到远程)：git push origin feature1
    
    4. 删除：
    本地仓库的分支：git branch -d feature1（特注：HEAD指向的branch不能删，只能先切换到别的分支，再删不是本分支的其他分支
    远端的分支：git push origin -d feature1
```

### 手动建立追踪关系

```JS
git branch --set-upstream master origin/next // 指定master分支追踪origin/next分支
```

