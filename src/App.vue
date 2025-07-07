<template>
  <div id="app">
    <h1>Vue Color Picker Wheel</h1>
    <p>
      A Vue color picker component based on the Farbtastic jQuery Color Picker plug-in.
    </p>
    <color-picker @color-change="setHex"></color-picker>
    <div class="selected-color-info">
      <p>Selected color:</p>
      <svg height="32" width="32">
        <circle cx="16" cy="16" r="15" :fill="color" />
      </svg>
    </div>
    <p>{{ color }}</p>
  </div>
</template>

<script>
import ColorPicker from "vue-color-picker-wheel";

export default {
  name: "App",
  components: {
    ColorPicker,
  },
  data() {
    return {
      color: "#ff6600",
    };
  },
  methods: {
    setHex(e) {
      this.color = e; // Atualiza a cor selecionada
      console.log("Cor selecionada:", e);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Barlow");

#app {
  font-family: "Barlow", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-top: 20px;
}

#color-wheel {
  margin-left: auto;
  margin-right: auto;
}

.selected-color-info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.selected-color-info p {
  margin: 0 5px 0 0;
}
</style>
