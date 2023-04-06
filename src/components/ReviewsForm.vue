<template>
  <div>
    <form class="review-form">
      <label for="review-text">Review:</label>
      <textarea
        class="review-text"
        id="review-text"
        v-model="review"
        rows="4"
        cols="50"
      ></textarea>

      <label for="rating">Rating:</label>
      <div class="star-rating">
        <input
          id="star-5"
          type="radio"
          name="rating"
          value="5"
          v-model="rating"
        />
        <label for="star-5" title="5 stars">
          <i class="fa fa-star"></i>
        </label>
        <input
          id="star-4"
          type="radio"
          name="rating"
          value="4"
          v-model="rating"
        />
        <label for="star-4" title="4 stars">
          <i class="fa fa-star"></i>
        </label>
        <input
          id="star-3"
          type="radio"
          name="rating"
          value="3"
          v-model="rating"
        />
        <label for="star-3" title="3 stars">
          <i class="fa fa-star"></i>
        </label>
        <input
          id="star-2"
          type="radio"
          name="rating"
          value="2"
          v-model="rating"
        />
        <label for="star-2" title="2 stars">
          <i class="fa fa-star"></i>
        </label>
        <input
          id="star-1"
          type="radio"
          name="rating"
          value="1"
          v-model="rating"
        />
        <label for="star-1" title="1 star">
          <i class="fa fa-star"></i>
        </label>
      </div>

      <button @click.prevent="submitReview">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: "",
      rating: null,
    };
  },
  methods: {
    submitReview() {
      // send review and rating to backend
      // clear form fields
      this.$emit("add-review", { comment: this.review, rating: this.rating });
      this.review = "";
      this.rating = null;
    },
  },
};
</script>

<style scoped>
.review-form {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  gap: 10px;
}
.star-rating {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.star-rating label {
  font-size: 2rem;
  color: gray;
  cursor: pointer;
}

.star-rating input[type="radio"] {
  display: none;
}

.star-rating label i {
  font-size: 2rem;
  color: gray;
  cursor: pointer;
}

.star-rating input[type="radio"]:checked ~ label i {
  color: orange;
}

.review-text {
  padding: 9px;
}
button {
  margin-top: 20px;
}
</style>
