---
prev:
  text: '返回'
  link: '/special'
---

# Special: wtfbro


<script>
function dontclick() {
    document.querySelectorAll('.dontclick').forEach(el => el.remove());
}
</script>

<button onclick="document.querySelectorAll('.dontclick').forEach(el => el.remove());document.querySelectorAll('.dontdontclick').forEach(el => {el.style.display = 'block';});" class="dontclick">别点我</button>


<h1 style="background: linear-gradient(90deg,
           red, orange, yellow, green, blue, indigo, violet);
           width: 100%;
           height: 200%;
           font-size: 72px;
           line-height: 1.5;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           user-select: none;
           pointer-events: none;
           display: none;" class="dontdontclick">
  我都让你别点了
</h1>

<h1 style="background: violet;
           font-size: 140px;
           line-height: 1;
           transform: rotate(30deg);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           position: relative;
           left: 20%;
           user-select: none;
           pointer-events: none;
           display: none;" class="dontdontclick">
  你
</h1>

<h1 style="background: orange;
           font-size: 180px;
           line-height: 1;
           transform: rotate(-15deg);
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           position: relative;
           bottom: 400px;
           user-select: none;
           pointer-events: none;
           display: none;" class="dontdontclick">
  为什么要
</h1>

<h1 style="background: red;
           font-size: 240px;
           line-height: 1;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           position: relative;
           bottom: 700px;
           left: 16%;
           user-select: none;
           pointer-events: none;
           display: none;" class="dontdontclick">
  点？
</h1>
