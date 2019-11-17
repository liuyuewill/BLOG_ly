str.replace(regexp|substr, newSubStr|function)

- 如果正则里没有写g，或者用的是substr, 则仅**第一个匹配项**会被替换。

- 当第二个参数是一个函数时，每次匹配成功，都会调用一次此函数。

  ```JS
    fuction(match, p1, p2) { 
        match：匹配到的子串
        p1/p2：第一个参数是一个RegExp 对象，则代表第n个括号匹配的字符串。例如，如果是用 /(\a+)(\b+)/ 这个来						 匹配，p1 就是匹配的 \a+，p2 就是匹配的 \b+。
    }
    ```

