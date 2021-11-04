import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      const position = {};
      if (to.hash) {
        position.selector = to.hash;
        if (to.hash === "#experience") {
          position.offset = { y: 140 };
        }
        if (document.querySelector(to.hash)) {
          return position;
        }
        return false;
      }
    }
  },
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
      path: "/destination/:slug",
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
            import(
              /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails"
            ),
        },
      ],
      beforeEnter: (to, from, next) => {
        const exists = store.destinations.find(
          (destination) => destination.slug === to.params.slug
        );
        if (exists) {
          next();
        } else {
          next({ name: "notFound" });
        }
      },
    },
    {
      path: "/user",
      name: "user",
      component: () =>
        import(/* webpackChunkName: "User" */ "../views/User.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "Login" */ "../views/Login"),
    },
    {
      path: "/invoices",
      name: "invoices",
      component: () =>
        import(/* webpacjChunkName: "Invoices" */ "../views/Invoices"),
      meta: { requiresAuth: true },
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "NotFound" */ "../views/NotFound"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  //if(to.meta.requiresAuth){  // <- mais simples, substituido pelo de baixo
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // testa autenticação
    if (!store.user) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
