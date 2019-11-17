### vue中bus.$on事件被多次绑定

只要页面没有强制刷新，存在组件切换，bus.$on方法会被多次绑定，造成触发一次但多个响应的情况

### 解决办法
- 法一：在每次调用方法前先解绑事件( bus.$off )，然后在重新绑定( bus.$on )
- 法二：注册的总线事件（Bus）要在组件销毁时(beforeDestroy/destroyed)卸载

      beforeDestroy () {
          bus.$off("backUpLevel");
      }