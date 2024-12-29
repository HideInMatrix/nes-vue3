# 事件

### @fps

```ts
@fps -> function(fps: number)
```

获取游戏 FPS，每秒触发一次。

```vue
<script setup>
function getFPS(fps) {
  console.log(fps.toFixed(2));
}
</script>

<template>
  <nes-vue
    url="https://hideinmatrix.github.io/nes-vue/Super Mario Bros (JU).nes"
    @fps="getFPS" />
</template>
```

### @success

```ts
@success -> function()
```

ROM 加载成功时触发。

### @saved

```ts
@saved ->  function({id, message, target})
```

存档后触发。

### @loaded

```ts
@loaded -> function({id, message, target})
```

读档后触发。

### @removed

```ts
@removed -> function(id)
```

删除存档后触发。

### @error

```ts
@error -> funciont({code, message})
```

发生错误时触发，其中 code 是一个`number`：

- 0：表示 ROM 读取错误
- 1：表示存档错误
- 2：表示读档错误
- 3：表示播放录像错误
