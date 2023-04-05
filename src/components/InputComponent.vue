<template>
  <div class="inputElement">
    <label :for="inputId">{{ inputLabel }}</label>
    <input
      :type="inputType"
      :id="inputId"
      @keyup="emit"
      :required="isRequired"
      :name="inputName"
      :placeholder="placehoder"
    />
  </div>
</template>

<script>
export default {
  props: {
    inputId: String,
    inputLabel: String,
    inputType: String,
    inputName: String,
    isRequired: Boolean,
    placehoder: String,
  },

  methods: {
    emit(e) {
      this.$emit("on-change", { key: e.target.name, value: e.target.value });
    },
  },
};
</script>

<style scoped>
.inputElement {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  gap: 10px;
  margin-bottom: 10px;
}
label {
  margin-top: 1rem;
}

input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
}
</style>
