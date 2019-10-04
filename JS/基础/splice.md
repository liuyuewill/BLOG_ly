问题：在循环数组里，如果要删除数组里某个item，此时如果你用splice会出错。因为你删除之后，数据的总length会改变，遍历就会出错。

```js
解决方案一：新建个dataArr，不用删除的思想，而是把符合条件的push到新dataArr里

解决方案二：逆着循环

var arr=[1,2,3];
for(var i=arr.length-1;i>=0;i--){
    console.log(i+'='+arr[i]);
    if(arr[i]==2){
        arr.splice(i,1);
    }
}
```
