# 属性

除`url`外，其他属性都是可选属性。

```vue
<template>
  <nes-vue
    url="https://hideinmatrix.github.io/nes-vue/Super Mario Bros (JU).nes" />
</template>
```

## 全部属性

### url

- Type `string`

NES 游戏的 ROM 地址，**必须！**

如果要切换游戏，只需用响应式数据绑定 url，然后修改 url 的值即可：

```vue
<script setup>
import { ref } from "vue";
import { NesVue } from "@davidmorgan/nes-vue";
const url = ref(
  "https://hideinmatrix.github.io/nes-vue/Super Mario Bros (JU).nes"
);

function toggle() {
  url.value = "https://hideinmatrix.github.io/nes-vue/Super Mario Bros 3.nes";
}
</script>

<template>
  <nes-vue :url="url" />
  <button @click="toggle">Switch</button>
</template>
```

### width

- Type `string | number`
- 默认值 `256`

游戏画面宽度，可以有单位，默认是 px。

### height

- Type `string | number`
- 默认值 `240`

游戏画面高度，可以有单位，默认是 px。

::: tip
注意保持 width 和 height 的比例为 256×240。
:::

```vue
<template>
  <nes-vue
    url="https://hideinmatrix.github.io/nes-vue/Super Mario Bros (JU).nes"
    width="512"
    height="480" />
</template>
```

### label

- Type `string`
- 默认值 `"Game Start"`

游戏运行前画面上的显示文字，点击文字开始游戏。

### gain

- Type `number`
- 默认值 `100`

游戏音量，介于[0, 100]之间。

### no-clip

- Type `boolean`
- 默认值 `false`

是否剪切画面边缘，false=游戏画面的边缘将剪切 8 像素，true=不剪切。

设置此属性可以解决部分游戏画面边缘显示不全的问题，且画面紧凑没有黑边，但也会造成很多游戏画面边缘材质闪烁，请酌情使用。

### auto-start

- Type `boolean`
- 默认值 `false`

组件挂载后自动开始游戏。

:::warning
nes-vue 使用 AudioContext API 实现音频播放，由于浏览器的安全策略，游戏只会在用户发生交互（例如鼠标点击）后才会运行，所以请谨慎使用这个属性。
如果要使用这个属性，请将 nes-vue 置于用户点击后才会加载的组件中。
:::

### turbo

- Type `number`
- 默认值 `16`

连发键每秒频率 介于[5, 25]之间。

### storage

- Type `boolean`
- 默认值 `false`

设置此属性，游戏存档会使用 localStorage 保存，默认是 indexedDB， 详情见[方法 - save](/zh/guide/methods#save)。

### db-name

- Type `string`
- 默认值 `"nes-vue"`

indexedDB 数据库名称

### p1

- Type `object`
- 默认值 见[控制器](/zh/guide/controller)

玩家 1 控制器

### p2

- Type `object`
- 默认值 见[控制器](/zh/guide/controller)

玩家 2 控制器

### debugger

- Type boolean
- 默认值 false

错误信息输出到控制台。
