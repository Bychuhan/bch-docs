# blockAreaList

## 作用
方块作用为屏蔽触点，当方块启用时，点击（或按住）方块区域会出现特殊效果，并且此次点击不会触发 Note 判定。（需要验证）

## 坐标
坐标表现为 JSON Object ，其中有 `x` 字段与 `y` 字段。  
其中 `(0, 0)` 为画面左下角， `(1, 1)` 为画面右上角。

## 基本位置，宽高
方块的基本位置与宽高由 `topRightPercentage` 与 `bottomLeftPercentage` 字段控制，均表现为**坐标**。  
前者控制方块**右上角的位置**，后者控制方块**左下角的位置**。  
这里我们定义方块的**基本位置**为**这两个坐标的平均值**，**宽高**为**这两个坐标差的绝对值**。

## 时间
方块有四个时间相关得字段： `appearTime` `enableTime` `disableTime` `disappearTime` 。  
这四个字段分别控制方块的**显现时间**、**启用时间**、**禁用时间**、**消失时间**，单位均为秒。

## 反转
`isSubtract` 是一个布尔值，控制这个方块是否为反转方块。  
反转方块会反转其所在区域有无方块的状态。

## 变换
方块的变换由三个部分组成：**移动**、**旋转**和**缩放**。  
它们分别由 `moveEvents` `rotateEvents` `scaleEvents` 三个字段控制。  
这三个字段均表现为一个列表，其中有若干关键帧。  
每个关键帧均有 `time` 字段，单位为秒。  
变换的优先级为**旋转->缩放->移动**。

### 移动
每个移动关键帧除 `time` 字段外，还有 `endPosition` `easeTypeX` `easeTypeY` 三个字段。  
`endPosition` 表现为**坐标**。  
`easeTypeX` `easeTypeY` 分别控制 X 坐标与 Y 坐标的插值缓动，见下方缓动列表。  

移动控制方块的基本位置偏移。  
在第一个移动关键帧之前，方块位置始终为基本位置（见上文）。  
在第一个关键帧之后，方块基本位置受移动事件计算值的影响。  
我们可以将每个移动事件的位置偏移计算为**移动位置 - 基本位置**。  
方块需先经过旋转与缩放变换，再将最终坐标与移动事件的位置偏移相加。

### 旋转
每个旋转关键帧除 `time` 字段外，还有 `anchor` `easeType` `rotation` 三个字段。 m 
`anchor` 表现为**坐标**。  
`rotation` 控制旋转的角度，正数为逆时针转动。  
`easeType` 控制旋转角度的插值缓动，见下方缓动列表。  

旋转会使方块绕某个点旋转，多个事件所绕的点可能不同，且多个事件的旋转可叠加。  
在第一个旋转关键帧之前，方块不进行任何旋转变换。

### 缩放
每个旋转关键帧除 `time` 字段外，还有 `anchor` `easeTypeX` `easeTypeY` `scale` 三个字段。  
`anchor` 表现为**坐标**。  
`scale` 与 `anchor` 的结构基本相同，但其不为坐标，而是缩放倍率。  
`easeTypeX` `easeTypeY` 分别控制宽与高的插值缓动，见下方缓动列表。  

缩放会使方块按某个点缩放，多个事件的点可能不同，且多个事件的缩放可叠加。  
在第一个缩放关键帧之前，方块不进行任何缩放变换。

## 缓动列表
```python
ease_funcs: list[typing.Callable[[float], float]] = [
    lambda t: t, # 0 - linear
    lambda t: 1 - math.cos(t * math.pi / 2), # 1 - inSine
    lambda t: math.sin(t * math.pi / 2), # 2 - outSine
    lambda t: (1 - math.cos(t * math.pi)) / 2, # 3 - inOutSine
    lambda t: t ** 2, # 4 - inCubic
    lambda t: 1 - (t - 1) ** 2, # 5 - outCubic
    lambda t: (t ** 2 if (t := t * 2) < 1 else -((t - 2) ** 2 - 2)) / 2, # 6 - inOutCubic
    lambda t: t ** 3, # 7 - inQuint
    lambda t: 1 + (t - 1) ** 3, # 8 - outQuint
    lambda t: (t ** 3 if (t := t * 2) < 1 else (t - 2) ** 3 + 2) / 2, # 9 - inOutQuint
    lambda t: t ** 4, # 10 - inCirc
    lambda t: 1 - (t - 1) ** 4, # 11 - outCirc
    lambda t: (t ** 4 if (t := t * 2) < 1 else -((t - 2) ** 4 - 2)) / 2, # 12 - inOutCirc
    lambda _: 0, # 13 - zero
    lambda _: 1 # 14 - one
]
```
