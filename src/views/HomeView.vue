<script >
import { FetchClient } from "@/utils/FetchClient";
import HeroSection from "../components/Hero.vue";
import Lesson from "../components/Lesson.vue";
import Checkout from "../components/Checkout.vue";

export default {
  components: { HeroSection, Lesson, Checkout },
  data() {
    return {
      lessons: [],
      courseCartModalVisibility: false,
      appView: "SELECT_ITEMS", // ITEMS_PAYMENT /OR/ CHECKOUT_ITEMS /OR/ CHECKOUT_COMPLETE

      customerName: "",
      customerPhoneNumber: "",

      searchText: "",
      sortField: "",
      sortOrder: "ascending",
      checkoutInfo: {},
      course_cart: [],
    };
  },
  async mounted() {
    await this.loadAllLessons();
  },
  methods: {
    loadAllLessons: async function () {
      const fetchedLessons = await FetchClient({ endpoint: "lessons" });

      if (fetchedLessons) {
        this.lessons = fetchedLessons;
      }
    },
    validateNameKeyPress: function (event) {
      if (!/^[A-Za-z]+$/.test(event.key)) {
        return event.preventDefault();
      }
    },
    validatePhoneNumberKeyPress: function (event) {
      if (!/^[0-9]+$/.test(event.key) && event.key !== "Backspace") {
        return event.preventDefault();
      }
    },
    addCourseToCart: function (lessonId) {
      const course = this.lessons.find((item) => item._id === lessonId);

      this.lessons = this.lessons.map((item) => {
        if (item._id === lessonId) {
          return { ...item, spaces: item.spaces - 1 };
        }

        return item;
      });

      this.course_cart.push(course);
    },
    removeCourseFromCart(lessonId) {
      const courseInCart = this.course_cart.find(
        (course) => course._id === lessonId
      );

      // extra check to confirm course is in cart before filtering out
      if (courseInCart) {
        this.course_cart = this.course_cart.filter(
          (item) => item?._id !== courseInCart?._id
        );

        this.lessons = this.lessons.map((item) => {
          if (item._id === lessonId) {
            return { ...item, spaces: item.spaces + 1 };
          }

          return item;
        });

        // close checkout if last item is removed
        if (this.course_cart.length <= 0) {
          this.setCourseCartModalVisibility(false);
        }
      }
    },
    setCourseCartModalVisibility: function (visibility) {
      this.courseCartModalVisibility = visibility;
    },
    setappView: async function (view) {
      if (view === "CHECKOUT_COMPLETE") {
        const orderData = {
          name: this.customerName,
          phoneNumber: this.customerPhoneNumber,
          lessonIds: this.course_cart.map((items) => items._id),
          spaceAmount: this.course_cart.length,
        };

        const request = await FetchClient({
          endpoint: "orders",
          payload: orderData,
          method: "POST",
        });

        if (request.status === 200) {
          for (const item in this.course_cart) {
            const course = this.course_cart[item];

            await FetchClient({
              endpoint: `lessons/${course._id}`,
              method: "PUT",
              payload: {
                spaces: course.spaces,
              },
            });
          }

          await this.loadAllLessons();
          this.course_cart = [];
        }

        this.appView = view;
        return;
      }

      this.appView = view;
    },
    sortAscending: function (field) {
      this.lessons.sort((a, b) => {
        if (a[field] < b[field]) {
          return -1;
        }

        if (b[field] > a[field]) {
          return 1;
        }
      });
    },
    sortDescending: function (field) {
      this.lessons.sort((a, b) => {
        if (a[field] > b[field]) {
          return -1;
        }

        if (b[field] < a[field]) {
          return 1;
        }
      });
    },
  },
  computed: {
    hasEnoughInfoToCheckout() {
      return (
        /^[A-Za-z]+$/.test(this.customerName) &&
        /^[0-9]+$/.test(this.customerPhoneNumber)
      );
    },
    totalCartPrice() {
      return this.course_cart.reduce(
        (acc, newVal) => ({ price: acc.price + newVal.price }),
        { price: 0 }
      );
    },
  },
  watch: {
    searchText: async function (newVal) {
      if (!newVal) {
        return await this.loadAllLessons();
      }

      const response = await FetchClient({
        endpoint: `lessons/search/${newVal.toLowerCase()}`,
      });

      if (response?.length >= 1) {
        this.lessons = response;
      }
    },
    sortField: function (newVal) {
      if (this.sortOrder === "ascending") {
        this.sortAscending(newVal);
        return;
      }

      this.sortDescending(newVal);
    },
    sortOrder: function (newVal) {
      /*
        watcher sortOrder method uses `price` field by default to sort results 
      */
      if (newVal === "ascending") {
        this.sortAscending("price");
        return;
      }

      this.sortDescending("price");
    },
  },
};
</script>

<template>
  <main>
    <div>
      <div id="vue-app-container">
        <header>
          <nav class="flex justify-between h-[55px] items-center px-8">
            <div>
              <p class="text-xl md:text-2xl font-semibold">
                <a href="/"> Coursely </a>
              </p>
            </div>

            <div>
              <ul class="flex flex-row">
                <li class="px-4">
                  <div class="flex relative flex-row">
                    <button :disabled="course_cart.length <= 0" :class="course_cart.length <= 0
                      ? 'flex flex-row py-2 px-4'
                      : 'flex flex-row hover:cursor-pointer hover:bg-[#FFF8F0] rounded-lg py-2 px-4'
                      " @click="setappView('CHECKOUT_ITEMS')">
                      <p class="mr-2">Lessons Cart</p>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>

                      <div
                        class="absolute flex justify-center text-white items-center bg-blue-500 -right-2 -bottom-3 h-[27px] w-[27px] rounded-3xl">
                        <p class="text-sm">{{ course_cart.length }}</p>
                      </div>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        <!-- Page Hero Component -->
        <HeroSection />

        <section class="max-w-[1240px] mx-6 lg:m-auto">
          <div v-if="appView == 'SELECT_ITEMS'">
            <div class="py-4 mb-6 flex flex-col lg:flex-row justify-between md:items-center">
              <div class="mb-4 md:mb-0">
                <p v-if="searchText.length >= 1" class="text-3xl font-medium" id="available-courses">
                  Lessons for {{ searchText }}
                </p>

                <p v-else class="text-2xl md:text-3xl font-medium" id="available-courses">
                  All Available Lessons
                </p>
              </div>

              <div class="w-full md:w-fit">
                <div class="border-2 px-2 flex w-full lg:w-[600px] rounded-lg items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>

                  <input id="search_text" type="text" v-model="searchText" class="p-2 outline-0 w-full h-[45px]"
                    placeholder="Find lesson by Subject, Location and Price" />
                </div>
              </div>
            </div>

            <div class="px-4">
              <div class="flex mb-4 items-center">
                <div class="flex items-center mr-4">
                  <div class="mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                    </svg>
                  </div>

                  <p class="text-xl font-medium">Filter:</p>
                </div>

                <div class="flex">
                  <select v-model="sortField">
                    <option value="" disabled>None</option>
                    <option value="subject">Subject</option>
                    <option value="price">Price</option>
                    <option value="location">Location</option>
                    <option value="spaces">Space</option>
                  </select>

                  <select class="ml-8" v-model="sortOrder">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                  </select>
                </div>
              </div>
            </div>

            <hr />
            <br />
            <br />

            <Lesson :lessons="lessons" @add-item-to-cart="(itemId) => addCourseToCart(itemId)" />
          </div>

          <Checkout @remove-item-from-cart="(value) => removeCourseFromCart(value)"
            @set-app-view="(value) => setappView(value)" :course_cart="course_cart" :totalCartPrice="totalCartPrice"
            :hasEnoughInfoToCheckout="hasEnoughInfoToCheckout" :appView="appView" />
        </section>
      </div>
    </div>
  </main>
</template>
../components/Lesson.vue
