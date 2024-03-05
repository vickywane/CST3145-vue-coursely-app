<script setup>
const props = defineProps(['course_cart', 'appView', 'totalCartPrice', 'hasEnoughInfoToCheckout'])
const emit = defineEmits(['remove-item-from-cart', 'set-app-view'])

const handleRemoveCourseFromCart = (itemId) => emit('remove-item-from-cart', itemId)
const handleSetAppView = (newView) => emit('set-app-view', newView)

const handleCompleteCheckout = (event) => {
    event.preventDefault();
    
    handleSetAppView("CHECKOUT_COMPLETE")
}

console.log(props.appView);
</script>

<template>
    <div id="course-cart-modal" v-if="appView !== 'SELECT_ITEMS'" class="bg-[#fff] shadow-xl w-full right-0 top-12">
        <div class="flex items-center justify-between p-4">
            <div>
                <p class="text-2xl font-semibold">Checkout</p>
            </div>

            <button @click="handleSetAppView('SELECT_ITEMS')"
                class="bg-gray-400 hover:bg-gray-500 text-white py-2 px-8 rounded">
                Back To All Lessons
            </button>
        </div>

        <div class="p-4 h-full">
            <div v-if="appView == 'CHECKOUT_ITEMS'">
                <div>
                    <ul class="mb-6" v-for="course in course_cart">
                        <li class="border-2 mt-4 p-4 rounded-xl">
                            <div class="flex items-center justify-between">
                                <div>
                                    <p class="text-xl mb-2 font-semibold">
                                        {{ course.subject }}
                                    </p>

                                    <p>${{ course.price }}</p>
                                </div>

                                <div @click="handleRemoveCourseFromCart(course._id)" class="hover:cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

                <hr />

                <div class="mt-16">
                    <div>
                        <p class="text-2xl font-semibold">Complete Payment</p>

                        <p class="mt-2 mb-4 text-gray-600">
                            Please provide your details to make payment
                            of ${{ totalCartPrice.price }} for the {{ course_cart.length }}
                            item(s) in your cart. <br /> Your name must be in <b>alphabets</b> and Phone number in
                            <b>numbers</b>.
                        </p>
                    </div>

                    <hr />

                    <form :action="event => event.preventDefault()">
                        <div class="flex flex-col mt-6">
                            <label class="text-lg" for="name"> Name </label>
                            <input type="text" v-model="customerName" id="name" @keydown="validateNameKeyPress"
                                class="mt-4 p-2 border-2 h-[40px]" placeholder="Your Name E.g John Doe" />
                        </div>

                        <div class="flex flex-col mt-6">
                            <label class="text-lg" for="mobile_number">
                                Phone Number
                            </label>
                            <input @keydown="validatePhoneNumberKeyPress" v-model="customerPhoneNumber"
                                id="mobile_number" class="mt-4 p-2 border-2 h-[40px]"
                                placeholder="Your mobile number" />
                        </div>

                        <div class="flex flex-col mt-4">
                            <label class="text-lg" for="address"> Home Address </label>
                            <input type="text" id="address" class="mt-4 p-2 border-2 h-[40px]"
                                placeholder="Street / Town / City" />
                        </div>

                        <div class="flex flex-col mt-4">
                            <label class="text-lg" for="card_name"> Card Name </label>
                            <input id="card_name" type="text" class="mt-4 p-2 border-2 h-[40px]"
                                placeholder="Your Card Name" />
                        </div>

                        <div class="flex flex-col mt-4">
                            <label class="text-lg" for="card_number">
                                Card Number
                            </label>
                            <input id="card_number" type="number" class="mt-4 p-4 border-2 h-[40px]"
                                placeholder="Your Card Number" />
                        </div>

                        <div class="mt-6">
                            <!-- <button :disabled="!hasEnoughInfoToCheckout" @click="handleSetAppView('CHECKOUT_COMPLETE')"
                                :class="!hasEnoughInfoToCheckout ? 'bg-blue-400 text-center w-full text-white py-2 px-4 rounded' : 'bg-blue-500 w-full hover:bg-blue-700 text-white py-2 px-4 rounded'">
                                <span>
                                    Confirm Payment Of
                                    <span class="font-semibold">
                                        ${{ totalCartPrice.price }}
                                    </span>
                                </span>
                            </button> -->

                            <!-- <button @click="handleSetAppView('CHECKOUT_COMPLETE')" -->
                            <button @click="handleCompleteCheckout"
                                class="bg-blue-500 w-full hover:bg-blue-700 text-white py-2 px-4 rounded">
                                <span>
                                    Confirm Payment Of
                                    <span class="font-semibold">
                                        ${{ totalCartPrice.price }}
                                    </span>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div v-if="appView == 'CHECKOUT_COMPLETE'">
                <div class="py-6">
                    <div class="flex justify-center mb-6 text-[green]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <div class="flex justify-center">
                        <p class="text-center text-xl w-[80%] text-gray-500">
                            Your payment has been recieved succesfully and the cart has
                            been cleared!

                            <br />
                            <br />

                            Happy learning!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
