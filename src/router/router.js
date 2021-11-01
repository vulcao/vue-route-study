import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      props: true,
    },
    /*{
      path: "/brazil",
      name: "brazil",
      component: () => import(/* webpackChunkName: "brazil" * / "../views/Brazil"),
    },*/
    {
      path: "/details/:slug",
      name: "DestinationDetails",
      component: () =>
        import(
          /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails"
        ),
      props: true,
      children: [
        {
          path: "/details/:slug/:experienceSlug",
          name: "experienceDetails",
          props: true,
          component: () =>
            import()
        }
      ]
    },
  ],
});

export default router;
