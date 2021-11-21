<template>
    <div class="flex justify-end ml-10">
            <!--ヘッダー-->
            <div 
                class="flex items-end text-3xl mr-10"
                @click="$emit('openList')">
                <!--かいものメモ発行ボタン-->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 20 20" fill="currentColor" onclick="console.log('clicked')">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
                </svg>
                <div>買い物メモを発行</div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>

</style>