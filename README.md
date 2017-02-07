# 关于Vue2.0 + VueRoute + Vuex的学习
此项目主要模仿的是慕课网上的vue课程，关于那个课程推荐大家可以学习一下讲的不错
优点:
  1. 讲的很细致
  2. 关于样式以及vue的部分知识点基本涵盖完了
缺点:
  1. 缺少vuex的讲解
  2. 缺少vue2.0的迁移
  3. 对于类似购物车部分都建议使用vuex来实现
## 我这个项目主要把他的那个项目用vue2实现了一遍以及把数据部分用vuex来存储
主要目的是
1. 学习总结vue2+vuex+vueRouter的实际应用
2. 对于从vue1迁移到vue2中个人感觉主要是生命周期的变化
3. 关于vuex从vue1到vue2的个人感觉变化很大,需要大量的修改以前项目的代码
3. 另外我个人不喜欢stylus所以所有的样式均通过sass来实现

## 2017-01-25 关于加入购物车小球的动画
具体查看cart组件的ball的动画
  1. 用trainsition-group来做列表动画
  2. 对于v-on:enter,v-on:beforeEnter,v-on:afterEnter的了解


