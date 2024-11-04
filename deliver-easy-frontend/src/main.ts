import { createApp } from "vue"; // Assurez-vous que createApp est bien importé
import App from "./App.vue";
import router from "./router";
import "./index.css";

createApp(App).use(router).mount("#app");