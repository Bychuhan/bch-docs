# Phigros 官方谱面格式

Phigros 官方谱面使用 Json 格式存储。  
所有 Phigros 本体谱面均使用此格式。

::: warning
本文档对谱面的描述基于 `v3.18.4` 版本。  
本文档中所有描述均为非官方定义。
:::

## 定义
在开始之前，让我们定义：
- $W =$ 画面宽度 $\text{px}$
- $H =$ 画面高度 $\text{px}$
- $P = 0.0625 \cdot W$
- $V = 0.6 \cdot H$
- $T = \frac{1.875}{\text{bpm}} \text{s}$  
    此处 $\text{bpm}$ 为对应判定线的 bpm 值。

## 根
- **formatVersion** `int` : 该谱面格式的版本号。  
    目前所有谱面中， `formatVersion` 的值仅可能为 $1$ 或 $3$ 。  
    若无特殊说明，本文档所描述的行为均为 `formatVersion` 为 $3$ 时的行为。
- **offset** `float` : 谱面的偏移。  
    目前所有谱面中， `offset` 的值均为非负数。  
    当 `offset` 为 $0.0$ 时，谱面与音乐同时开始播放。  
    当 `offset` 为正数时，谱面在音乐开始播放后 `offset` 秒开始播放。
- **judgeLineList** `array` : 判定线数组。  
    目前所有谱面中， `judgeLineList` 的长度至少为 $1$ 。  
    大多数谱面中， `judgeLineList` 的长度为 $24$ 。  
    在 DistortedFate.Sakuzyo.0 的 AT 谱面中， `judgeLineList` 的长度为 $46$ ，在所有谱面中最大。  
    关于此项的详细说明，请参阅[**判定线数组**](#判定线数组)。

## 判定线数组
对于判定线数组中的单个元素：

- **bpm** `float` : 该判定线的 `bpm` 值。  
    `bpm` 为 `beatPerMinute` 的缩写，表示每分钟的节拍数。  
    在 Phigros 官方谱面中，不存在全局 `bpm` 数组。每条判定线均使用单独的 `bpm` 值。

- **notesAbove** `array` : 从该判定线**上方**下落的音符数组。  
  **notesBelow** `array` : 从该判定线**下方**下落的音符数组。  
    当没有任何从判定线上方、下方下落的音符时，对应数组为空数组。  
    详见[**音符数组**](#音符数组)。

- **speedEvents** `array` : 该判定线的**速度**事件数组。  
  **judgeLineMoveEvents** `array` : 该判定线的**移动**事件数组。  
  **judgeLineRotateEvents** `array` : 该判定线的**旋转**事件数组。  
  **judgeLineDisappearEvents** `array` : 该判定线的**不透明度**事件数组。  
    此类事件在社区中常被表述为**透明度**，实际应为**不透明度**。  
    上述四项均为包含一个或多个事件的数组。  
    关于上述四项的详细说明，请参阅[**事件数组**](#事件数组)。

## 音符数组
对于音符数组中的单个元素：

- **type** `int` : 该音符的类型。  
    在 Phigros 官方谱面中，音符有四种类型：  
    $1$ : tap  
    $2$ : drag  
    $3$ : hold  
    $4$ : flick
- **time** `int` : 该音符判定的时间，单位为 $T$ 。  
    由于该项的值类型为 `int` ，非整数倍 $T$ 的时间值（如三连音、六连音等）会被近似为最接近的整数 $T$ 值。
- **positionX** `float` : 该音符相对于所在判定线的 X 位置，单位为 $P$ 。  
    在不手动修改谱面文件的情况下，此项的值必定为 $\frac{1}{10}$ 、 $\frac{1}{12}$ 、 $\frac{1}{14}$ 、 $\frac{1}{16}$ 、 $\frac{1}{18}$ 、 $\frac{1}{20}$ 、 $\frac{1}{24}$ 、 $\frac{1}{26}$ 的倍数。  
    最多精确到小数点后六位。
- **holdTime** `float` : 该 hold 的长按时间。  
    类型不为 hold 的音符仍拥有此项，且固定为 $0.0$ 。  
    此项的值类型虽然为 `float` ，但其取值仅为整数。非整数倍 $T$ 的时间值仍会被近似为最接近的整数 $T$ 值。
- **speed** `float` : 该音符相对于所在判定线的 Y 位置的倍率。
- **floorPosition** `float` : 该音符初始时刻相对于所在判定线的 Y 位置。  
    最多精确到小数点后五位，且有极小误差。  
    此项的命名与实际含义可能存在出入。

## 事件数组
TODO  
写累了。
