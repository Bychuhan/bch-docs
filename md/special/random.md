<ClientOnly>
<script>

const pages = [
    './？.py',
    './wtfbro',
    './zw'
];

const randomIndex = Math.floor(Math.random() * pages.length);
const randomPage = pages[randomIndex];

window.location.href = randomPage;

</script>
</ClientOnly>