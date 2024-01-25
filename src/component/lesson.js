const regexMatcher = (regex, text) => {
  return text.match(text);
};

// const BASE_ENDPOINT_URL = "http://localhost:4040";
const BASE_ENDPOINT_URL = "https://a56b-92-40-101-49.ngrok-free.app";

new Vue({
  el: "#vue-app-container",
  data: {
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
  },
  methods: {
    loadAllLessons: async function () {
      const request = await fetch(`${BASE_ENDPOINT_URL}/lessons`);
      const response = await request.json();

      if (request.status === 200) {
        this.lessons = response.data;
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

      // confirm that the course isnt already in cart

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

        const request = await fetch(`${BASE_ENDPOINT_URL}/orders`, {
          method: "POST",
          body: JSON.stringify(orderData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        await request.json();

        if (request.status === 200) {
          for (const item in this.course_cart) {
            const course = this.course_cart[item];

            const updateLessonRequest = await fetch(
              `${BASE_ENDPOINT_URL}/lessons/${course._id}`,
              {
                method: "PUT",
                body: JSON.stringify({
                  spaces: course.spaces
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            await updateLessonRequest.json()
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
  async mounted() {
    await this.loadAllLessons();
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

      const searchRequest = await fetch(
        `${BASE_ENDPOINT_URL}/lessons/search/${newVal.toLowerCase()}`
      );

      const response = await searchRequest.json();

      if (searchRequest.status === 200) {
        if (response.data.length >= 1) {
          this.lessons = response.data;
        }
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
});
