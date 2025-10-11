没写完，我猜你是搜索搜进来的

# Re:PhiEdit谱面格式
Re:PhiEdit(以下简称RPE)谱面以JSON格式存储。

## 定义
- `W` : 屏幕宽度。
- `H` : 屏幕高度。
- `beat` : 一个长度为3的列表，其值为 beat[0] + beat[1] / beat[2] ，本文档中，若无特殊说明，时间单位均为 `beat` 。

## 根 `root`
- BPMList `array` : BPM列表。
- META `array` : 谱面信息。
- chartTime `float` : 制谱时长，单位为秒。
- judgeLineList `array` : 判定线列表。
- judgeLineGroup `array` : 判定线分组。
- multiLineString `str` : 多线编辑选中的线。
- multiScale `float` : 多线编辑X缩放。
- xybind `bool` : 是否启用XY移动事件绑定。

## BPM列表 `BPMList`
- bpm `float` : 目标BPM。
- startTime `array` : 变化时间。

## 谱面信息 `META`
- RPEVersion `int` : RPE版本，截至文档编辑日期，此值最新为 `170` ，表示 `1.7.0` 。
- background `str` : 曲绘文件。
- charter `str` : 谱师。
- composer `str` : 曲师。
- duration `float` : 音乐时长。
- id `str` : 谱面ID，RPE内唯一标识。
- illustration `str` : 曲绘画师。 ~~（饮水机你不会illustrator吗。）~~
- level `str` : 难度。
- name `str` : 曲名。
- offset `int` : 谱面偏移，单位为毫秒。`offset` 不为 `0` 时，谱面延迟 `offset` 秒后开始。
- song `str` : 音乐文件。

## 判定线列表 `judgeLineList`
- Group `int` : 判定线所在分组，组名称为 `judgeLineGroup` 列表中下标为 `Group` 的元素。
- Name `str` : 判定线名称。
- Texture `str` : 判定线纹理， `line.png` 表示无纹理，即使谱面目录下存在 `line.png` 。
- alphaControl `array` : 音符不透明度控制。
- anchor `array` : 判定线原点。
- bpmfactor `float` : 判定线BPM倍率，注意实际BPM为原BPM除以 `bpmfactor` 而不是乘。~~（疑似饮水机为了强行兼容官谱而添加的东西。）~~
- eventLayers `array` : 判定线事件层。
- extended `array` : 扩展事件。
- father `int` : 判定线的父线， `-1` 表示无父线。
- isCover `int` : 是否启用遮罩， `1` 为启用，否则不启用。
- isGif `bool` : 纹理是否为Gif。
- notes `array` : 判定线的音符。
- numOfNotes `int` : 未知。疑似判定线上所有 `Tap` `Drag` 与 `Flick` 的数量。
- posControl `array` : 音符位置控制。
- rotateWithFather `bool` : 是否跟随父线旋转。
- sizeControl `array` : 音符大小控制。
- skewControl `array` : 音符倾斜控制。
- yControl `array` : 音符相对于判定线的Y坐标控制。
- zOrder `array` : Z轴位置。

## 2DO `int`
后面我不想写了。