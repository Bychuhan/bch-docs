# Phigros 官谱谱面格式
Phigros 官谱以 JSON 格式存储。

## 定义 {#define}
- `W` : 屏幕宽度。
- `H` : 屏幕高度。
- `tick` : 时间单位，`1 tick` = `1.875` / `bpm` 。

## 根 `root` {#root}
- **formatVersion** `int` : 谱面格式版本，目前仅出现 `1` 和 `3` 。
- **offset** `float` : 谱面偏移，单位为秒。`offset` 不为 `0` 时，谱面延迟 `offset` 秒后开始。目前仅出现 `0` 与 正数。
- **judgeLineList** `array` : 判定线列表。

## 判定线列表 `judgeLineList` {#judgeLineList}
每一个JSON对象 :
- **bpm** `float` : 此判定线的 `BPM` 。
- **notesAbove** `array` : 判定线上方的音符列表。
- **notesBelow** `array` : 判定线下方的音符列表。
- **speedEvents** `array` : 判定线速度事件。
- **judgeLineMoveEvents** `array` : 判定线移动事件。
- **judgeLineRotateEvents** `array` : 判定线旋转事件。
- **judgeLineDisappearEvents** `array` : 判定线不透明度事件。

## 事件 `events` {#events}
每一个JSON对象 :
- **start** `float` : 事件开始值。
- **end** `float` : 事件结束值。
- **startTime** `int` : 事件开始时间，单位 `tick` 。
- **endTime** `int` : 事件结束时间，单位 `tick` 。

#### 对于移动事件，还存在以下键 : {#events:moveEvents}
- **start2** `float` : `Y` 坐标事件开始值，单位为 `H` 。
- **end2** `float` : `Y` 坐标事件结束值，单位为 `H` 。

###### {#events:moveEvents:tip}
::: tip
坐标的原点 `(0, 0)` 为左下角。
:::

#### `start` 与 `end` {#events:startAndEnd}
- 对于移动事件，此值会影响判定线的 `X` 坐标，单位为 `W` 。<Badge type="tip" text="formatVersion 3" />
###### TODO
没写完喵
- 对于移动事件，此值会影响判定线的 `棍母` 坐标，棍母。<Badge type="tip" text="formatVersion 1" />
###### TODOEND
- 对于旋转事件，此值的单位为角度，正数为逆时针旋转。
- 对于不透明度事件，此值的范围在 `0-1` 之间， `1` 表示不透明， `0` 表示完全透明。
- 对于速度事件，此值会影响此判定线音符的流速，单位为每秒 `0.6 * H` 。

###### {#events:startAndEnd:tip}
::: tip
部分不透明度事件的值可能会超出范围。  
速度事件值为瞬间变化，其他事件值均为匀速变化。
:::

## 音符 `notes` {#notes}
每一个JSON对象 :
- **type** `int` : 音符类型。 `1` 为 Tap， `2` 为 Drag， `3` 为 Hold， `4` 为 Flick。
- **time** `int` : 音符打击时间，单位 `tick` 。
- **positionX** `float` : 音符相对于判定线的 `X` 坐标，单位约为 `0.05625 * W` 。
- **holdTime** `int` : 长条持续时间，单位 `tick` 。
- **speed** `float` : 音符相对于判定线的 `Y` 坐标的速率。
- **floorPosition** `float` : 音符在 `0` 时刻相对于判定线的 `Y` 坐标。

###### {#notes:tip}
::: tip
谱面中的 `floorPosition` 误差较大，建议自行计算。  
音符相对于判定线的 `Y` 坐标小于 `0` 时，音符会被隐藏。为防止误差，建议减小判断坐标 (如 `-0.001` )，或对音符相对于判定线的 `Y` 坐标进行向上取整后判断。  
音符在当前时刻相对于判定线的 `Y` 坐标为 `0` 时刻相对于判定线的 `Y` 坐标减去判定线的 `currentFloorPosition` 。
:::
