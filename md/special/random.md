<script setup>
import { onMounted } from "vue"

onMounted(() => {
    const pages = [
        "./？.py",
        "./wtfbro",
        "./zw",
        "./404",
        "./sdfsdf",
    ];

    const randomIndex = Math.floor(Math.random() * pages.length);
    const randomPage = pages[randomIndex];

    window.location.href = randomPage;
})

</script>