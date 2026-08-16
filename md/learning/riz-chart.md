# Rizline 官方谱面格式 {#riz-chart}

Rizline 官方谱面均采用 JSON 格式存储。

::: warning
本文档对谱面的描述基于 `v2.7.0` 版本。  
本文档中所有描述均为非官方定义。
:::

## 定义 {#def}
在开始之前，让我们定义：
- $W =$ 画面宽度 $\text{px}$ .
- $H =$ 画面高度 $\text{px}$ .
- $T = \frac{60}{\text{BPM}} \text{s}$ ，时间单位 .
- $Y =$ 线圈的垂直位置 .
- $speed =$ 谱面流速 .
- $S = (\frac{215}{32} + speed ) \times \frac{10}{129}$ .

## 根 {#root}
- **fileVersion** `int` : 该谱面格式的版本号，作用不明。  
    目前仅 Tempest 的 IN 谱面中，该字段的值为 $1$ ，其余谱面中该字段的值均为 $0$ .  
- **songsName** `str` : 歌曲名称。  
    该字段的值在部分谱面中为正确的曲名，但在绝大多数谱面中，该字段不存在或值为空。
- **themes** [`list[ThemeColor]`](#theme-color) : 谱面主题颜色列表。  
    列表中第一项为常态主题，第二项起为 Riztime 主题。
- **challengeTimes** [`list[ChallengeTime]`](#challenge-time) : 谱面 Riztime 列表。
- **bPM** `float` : 谱面基本 BPM 。
- **bpmShifts** [`list[BpmShift]`](#bpm-shift) : 谱面 BPM 变化。  
    该字段的值为空列表时， BPM 恒定为谱面基本 BPM 。
- **offset** `float` : 偏移，作用不明。  
    部分谱面中，该字段不存在，其余谱面中该字段的值均为 $0.0$ .
- **lines** [`list[Line]`](#line) : 谱面线列表。
- **canvasMoves** [`list[Canvas]`](#canvas) : 谱面画布列表。
- **cameraMove** [`list[Camera]`](#camera) : 谱面摄像机事件组。

## 主题颜色 {#theme-color}
- **colorsList** [`list[Color, 3]`](#color) : 该主题的颜色列表。  
    该字段的值拥有 $3$ 个元素，分别为：
    - 背景颜色。
    - Note 颜色。
    - 打击特效 / UI 颜色。

## 颜色 {#color}
- **r** `int` : 该颜色的红色通道值，范围为 $0$ - $255$ .
- **g** `int` : 该颜色的绿色通道值，范围为 $0$ - $255$ .
- **b** `int` : 该颜色的蓝色通道值，范围为 $0$ - $255$ .
- **a** `int` : 该颜色的不透明度通道值，范围为 $0$ - $255$ .

## Riztime {#challenge-time}
- **checkPoint** `float` : 作用不明。  
    部分谱面中，该字段的值与 `start` 的值相近或相等，其余谱面中该字段的值均为 $0$ .
- **start** `float` : 起始时间，单位为 $T$ .
- **end** `float` : 结束时间，单位为 $T$ .
- **transTime** `float` : 过渡时间，单位为秒。  
    Riztime 的起始动画时长为该字段值的二十分之一，结束动画的时长固定。该字段同时也控制 Riztime 结束后动画延迟出现的时间。 (需要验证)

::: tip Riztime 主题
一个 Riztime 的主题索引为这个 Riztime 在 `challengeTimes` 中的索引 $+ 1$ .
:::

## BPM 变化 {#bpm-shift}
- **time** `float` : 变化时间。  
    第一个 BPM 变化的变化时间可能不为 $0$ ，在这之前 BPM 判定为谱面基本 BPM . (需要验证)
- **value** `float` : 变化倍率。  
    该倍率为基本 BPM 的倍率，在变化时间后 BPM 判定为 $\text{基本 BPM} \times \text{value}$ .
- **easeType** [`EaseType`](#ease-type) : 作用不明。  
    该字段的值在目前所有谱面中恒定为 $0$ .
- **floorPosition** `float` : BPM 变化时音乐播放的进度，单位为秒。

## 画布 {#canvas}
- **index** `int` : 该画布的索引。
- **xPositionKeyPoints** [`XPosKeyPoint`](#x-pos-key-point) : 画布水平位置关键点。
- **speedKeyPoints** [`SpeedKeyPoint`](#speed-key-point) : 画布流速关键点。

## 线 {#line}
- **linePoints** [`list[LinePoint]`](#line-point) : 线的节点列表。
- **notes** [`list[Note]`](#note) : 线的 Note 列表。
- **judgeRingColor** [`list[ColorKeyPoint]`](#color-key-point) : 线圈颜色变化关键点列表。
- **lineColor** [`list[ColorKeyPoint]`](#color-key-point) : 线整体颜色变化关键点列表。

## 节点 {#line-point}
- **time** `float` : 节点流动到 $Y$ 时的时间，单位为 $T$ .
- **xPosition** `float` : 节点的水平位置，单位为 $W$ .
- **color** [`Color`](#color) : 节点的基本颜色。
- **easeType** [`EaseType`](#ease-type) : 该节点至下一个节点区间，线的水平位置的缓动类型。
- **canvasIndex** `int` : 该节点所在[画布](#canvas)的索引。
- **floorPosition** `float` : 谱面开始播放时，节点相对于 $Y$ 的垂直位置，单位为 $S$ .

:::tip 节点的实际颜色
我们定义 $c_1$ 为节点的基本颜色， $c_2$ 为当前时刻[线](#line)的 `lineColor` 的计算值 .  
节点的实际颜色为： $(c_1.rgb + c_2.rgb \times c_2.a, c_1.a)$ .  
若[线](#line)的 `lineColor` 字段的值为一个空列表， $c_2.a$ 判定为 $0$ .
:::

## Note {#note}
- **type** [`NoteType`](#note-type) : Note 的类型。
- **time** `float` : Note 判定的时间，单位为 $T$ .
- **floorPosition** `float` : 谱面开始播放时， Note 相对于 $Y$ 的垂直位置，单位为 $S$ .
- **otherInformations** `list[float, 3] | list[Never]` : Hold 信息。  
    一般情况下，对于类型为 `NoteType.HOLD` 的 Note ，该字段的值有 $3$ 个元素，分别为：
    - Note 长按结束时间。
    - Hold 尾所在[画布](#canvas)的索引，需要取整。
    - Hold 尾的 `floorPosition` 。

    对于其他类型的 Note ，该字段的值为一个空列表。  

    可能会有以下特殊情况：
    - 部分类型非 Hold 的 Note ，该字段的值为一个非空列表。
    - 该字段不存在。

## Note 类型 {#note-type}
- TAP = 0
- DRAG = 1
- HOLD = 2

## 摄像机 {#camera}
- **scaleKeyPoints** [`scale-key-point`](#scale-key-point) : 摄像机缩放关键点。
- **xPositionKeyPoints** [`x-pos-key-point`](#x-pos-key-point) : 摄像机水平位置关键点。

## 关键点 {#key-point}
### 颜色关键点 {#color-key-point}
- **startColor** [`Color`](#color) : 关键点起始时的颜色。
- **endColor** [`Color`](#color) : 下一个关键点起始时的颜色，对于最后一个关键点，该字段无作用。
- **time** `float` : 关键点起始时间，单位为 $T$ .

### 水平位置关键点 {#x-pos-key-point}
- **time** `float` : 关键点起始时间，单位为 $T$ .
- **value** `float` : 关键点起始时的水平位置，单位为 $W$ .
- **easeType** [`EaseType`](#ease-type) : 该关键点至下一个关键点区间的过渡缓动类型，对于最后一个关键点，该字段无作用。
- **floorPosition** `float` : 该字段无作用。

### 缩放关键点 {#scale-key-point}
- **time** `float` : 关键点起始时间，单位为 $T$ .
- **value** `float` : 关键点起始时的缩放倍率。
- **easeType** [`EaseType`](#ease-type) : 该关键点至下一个关键点区间的过渡缓动类型，对于最后一个关键点，该字段无作用。
- **floorPosition** `float` : 该字段无作用。

### 流速关键点 {#speed-key-point}
- **time** `float` : 关键点起始时间，单位为 $T$ .
- **value** `float` : 该关键点至下一个关键点区间的流速，单位为 $W$ ，对于最后一个关键点，关键点起始后流速恒定为该字段的值 .
- **easeType** [`EaseType`](#ease-type) : 该字段无作用。
- **floorPosition** `float` : 关键点起始时流速的累加值。

::: tip 关键点组的特殊情况
一组关键点中可能出现以下特殊情况：
- 关键点组未按起始时间升序排列，需进行排序处理。
- 第一个关键点的起始时间大于 $0$ ，在此之前的值为第一个关键点进度为 $0$ 时的计算值 .
:::

## 缓动类型 {#ease-type}
目前共有 $19$ 种缓动类型 .

- LINEAR = 0
- IN_QUAD = 1
- OUT_QUAD = 2
- IO_QUAD = 3
- IN_CUBIC = 4
- OUT_CUBIC = 5
- IO_CUBIC = 6
- IN_QUART = 7
- OUT_QUART = 8
- IO_QUART = 9
- IN_QUINT = 10
- OUT_QUINT = 11
- IO_QUINT = 12
- ZERO = 13
- ONE = 14
- IN_CIRC = 15
- OUT_CIRC = 16
- OUT_SINE = 17
- IN_SINE = 18

::: details 缓动表达式
```python
from typing import Callable

# [!code focus:21]
easings: tuple[Callable[[float], float], ...] = (
    lambda t: t, # linear - 0
    lambda t: t ** 2, # in quad - 1
    lambda t: 1 - (1 - t) * (1 - t), # out quad - 2
    lambda t: 2 * (t ** 2) if t < 0.5 else 1 - (-2 * t + 2) ** 2 / 2, # io quad - 3
    lambda t: t ** 3, # in cubic - 4
    lambda t: 1 - (1 - t) ** 3, # out cubic - 5
    lambda t: 4 * (t ** 3) if t < 0.5 else 1 - (-2 * t + 2) ** 3 / 2, # io cubic - 6
    lambda t: t ** 4, # in quart - 7
    lambda t: 1 - (1 - t) ** 4, # out quart - 8
    lambda t: 8 * (t ** 4) if t < 0.5 else 1 - (-2 * t + 2) ** 4 / 2, # io quart - 9
    lambda t: t ** 5, # in quint - 10
    lambda t: 1 - (1 - t) ** 5, # out quint - 11
    lambda t: 16 * (t ** 5) if t < 0.5 else 1 - (-2 * t + 2) ** 5 / 2, # io quint - 12
    lambda t: 0, # zero - 13
    lambda t: 1, # one - 14
    lambda t: 1 - (1 - t ** 2) ** 0.5, # in circ - 15
    lambda t: (1 - (t - 1) ** 2) ** 0.5, # out circ - 16
    lambda t: math.sin((t * math.pi) / 2), # out sine - 17
    lambda t: 1 - math.cos((t * math.pi) / 2), # in sine - 18
)
```
:::