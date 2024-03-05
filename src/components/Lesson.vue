<script setup>
defineProps(['lessons'])
const emit = defineEmits(['add-item-to-cart'])

const handleAddToCart = (itemId) => {
    emit('add-item-to-cart', itemId)
}
</script>

<template>
    <div>
        <div v-if="lessons.length <= 0">
            <br />
            <br />
            <p class="text-center text-gray-400 text-2xl">
                We currently do not have any lesson for {{ searchText }} <br />
                Search again later!
            </p>
        </div>

        <ul v-else class="grid grid-cols-1 lggrid-cols-2 lg:grid-cols-3 gap-12">
            <li v-for="item in lessons">
                <div class="shadow-xl w-full lgw-[380px] rounded-lg" :key="item._id">
                    <div class="flex justify-between">
                        <div class="flex items-center bg-[#FFF8F0] w-fit py-2 px-4">
                            <div class="mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                </svg>
                            </div>

                            <div>
                                <p class="text-lg">{{ item.location }}</p>
                            </div>
                        </div>

                        <div class="flex items-center mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>

                            <p class="ml-2 text-lg">{{ item.rating }}</p>
                        </div>
                    </div>

                    <div class="mb-2">
                        <img class="w-full" :alt="item.subject" :src="item.img_url" />
                    </div>

                    <div class="p-6">
                        <p class="text-2xl font-semibold mb-4">{{ item.subject }}</p>

                        <p class="text-xl text-gray-600">{{ item.description }}</p>

                        <div class="flex justify-between mt-8">
                            <p class="text-lg">${{ item.price }}</p>

                            <div class="flex flex-row">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                </svg>

                                <p class="ml-2 text-lg">Slots: {{ item.spaces }}</p>
                            </div>
                        </div>

                        <div class="w-full mt-8">
                            <button :disabled="item.spaces <= 0" @click="handleAddToCart(item._id)"
                                :class="item.spaces <= 0 ? 'bg-blue-300 flex justify-center w-full text-white py-2 px-4 rounded' : 'bg-blue-500 hover:bg-blue-700 flex justify-center w-full text-white font-bold py-2 px-4 rounded'">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>

                                <span class="ml-4 font-normal"> Add To Cart </span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
