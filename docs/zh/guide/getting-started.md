# 开始使用

## 安装

```shell
npm i @davidmorgan/nes-vue
```

## 引入组件

```vue
<script setup>
import { NesVue } from "@davidmorgan/nes-vue";
</script>
<template>
  <nes-vue
    url="https://hideinmatrix.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480"
    label="开始游戏" />
</template>
```
