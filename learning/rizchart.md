# Rizline 官谱谱面格式
Rizline 官谱以 JSON 格式存储。

::: warning
文档中对于部分行为的描述为笔者的猜测，作用不明的键均会在后面标注。
:::

## 根 `root` {#root}
- **fileVersion** `int` : 谱面格式版本。<Badge type="danger" text="作用不明" />
- **songsName** `string` : 歌曲名称。<Badge type="danger" text="作用不明" />
- **themes** `array` : 主题列表。
- **challengeTimes** `array` : 挑战时间 ( Riztime ) 列表。
- **bPM** `float` : 基本 BPM 。
- **bpmShifts** `array` : BPM 列表。
- **offset** `float` : 偏移。<Badge type="danger" text="作用不明" />
- **lines** `array` : 线列表。 0
- **canvasMoves** `array` : Canvas 列表。 0
- **cameraMove** `json` : 相机事件列表。 0

###### {#root:tip}
::: tip
`fileVersion` 作用不明。仅在小部分谱面为 1 ( 且此谱面结构与其他谱面相同 ) ，其余均为 0 。  
`songsName` 作用不明。仅在小部分谱面为正确的曲名，其余谱面为空或不存在此键。  
`offset` 作用不明。目前仅出现 0 ，部分谱面不存在此键。
:::

## BPM 列表 `bpmShifts` {#bpmShifts}
每一个 JSON 对象 :
- **time** `float` : 生效时间，单位为 `tick` 。
- **value** `float` : BPM 倍率。
- **easeType** `int` : 变化缓动。<Badge type="danger" text="作用不明" />
- **floorPosition** `float` : 当前事件生效时 nowTime ( 秒 ) 的累计值。

###### {#bpmShifts:tip}
::: tip
事件生效后，当前 BPM 变为 `基本 BPM * value` 。  
`easeType` 作用不明，目前仅出现 0 ，且 BPM 为瞬时变化。  
部分谱面 BPM 列表为空。 BPM 列表为空时，当前 BPM 恒定为基本 BPM。
:::

## 主题列表 `themes` {#themes}
每一个 JSON 对象 :
- **colorsList** `array` : 颜色列表。

###### {#themes:tip}
::: tip
`themes` 列表的第一项为常态主题，其余为 Riztime 主题。
:::

### 颜色列表 `colorList` {#themes:colorsList}
每一个 JSON 对象 :
- **r** `int` : 颜色的 R 分量值，范围为 0 - 255 。
- **g** `int` : 颜色的 G 分量值，范围为 0 - 255 。
- **b** `int` : 颜色的 B 分量值，范围为 0 - 255 。
- **a** `int` : 颜色的 A 分量值，范围为 0 - 255 。

###### {#themes:colorsList:tip}
::: tip
`colorList` 的长度恒定为 3 的列表，其中的 3 个元素分别表示 **背景颜色** **Note颜色** **特效与UI颜色** 。
:::

## Riztime 列表 `challengeTimes` {#challengeTimes}
每一个 JSON 对象 :
- **checkPoint** `float` : 存档时间，单位为 `tick` 。<Badge type="danger" text="作用不明" />
- **start** `float` : 开始时间，单位为 `tick` 。
- **end** `float` : 结束时间，单位为 `tick` 。
- **transTime** `float` : 过渡时间。<Badge type="danger" text="作用不明" />

###### {#challengeTimes:tip}
::: tip
`checkPoint` 作用不明。  
`transTime` 作用不明，疑似 Riztime 结束后动画的延迟时间。  
Riztime 的起始与结束过渡时间恒定为一段很短的时间。  
Riztime 列表与主题列表 ( 常态主题除外 ) 一一对应。
:::



## 缓动列表 `easeTypes` {#easeTypes}
Rizline 官谱谱面中一共有 19 个缓动。

以下是缓动列表 :

|easeType|名称|
|-|-|
|0|Linear|
|1|InQuad|
|2|OutQuad|
|3|InOutQuad|
|4|InCubic|
|5|OutCubic|
|6|InOutCubic|
|7|InQuart|
|8|OutQuart|
|9|InOutQuart|
|10|InQuint|
|11|OutQuint|
|12|InOutQuint|
|13|Zero|
|14|One|
|15|InCirc|
|16|OutCirc|
|17|OutSine|
|18|InSine|

以下是笔者对各个缓动的 Python 实现 :

``` python
import math

easings = ( # [!code focus:21]
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

## 2DO
是的我又懒得写了