<template>
  <!-- The Modal -->
  <div id="myModal" class="modal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="close" @click="emit">&times;</div>
      <div class="main-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    emit() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style>
/* The Modal (background) */
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 30px 0px;
  border: 1px solid #888;
  border-radius: 5px;
  width: 30%;
}
.main-content {
  justify-content: center;

}
/* The Close Button */
.close {
  color: #aaaaaa;
  font-size: 28px;
  font-weight: bold;
  position: relative;
  top: 0px;
  left: 90%;
  margin-bottom: 23px;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
