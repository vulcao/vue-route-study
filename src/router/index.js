import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/brazil",
    name: "brazil",
    component: () => import(/* webpackChunkName: "brazil" */ "../views/Brazil"),
  },
  {
    path: "/hawaii",
    name: "hawaii",
    component: () => import(/* webpackChunkName: "hawaii" */ "../views/Hawaii"),
  },
  {
    path: "/jamaica",
    name: "jamaica",
    component: () => import(/* webpackChunkName: "janaica" */ "../views/Jamaica"),
  },
  {
    path: "/panama",
    name: "panama",
    component: () => import(/* webpackChunkName: "panama" */ "../views/Panama"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
