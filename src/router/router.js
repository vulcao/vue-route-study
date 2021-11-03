import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  linkExactActiveClass: "vue-school-active-class",
  scrollBehavior(to,from,savedPosition){
    if(savedPosition){
      return savedPosition;
    }
    else {
      const position = {}
      if(to.hash){
        position.selector = to.hash;
        if(to.hash === '#experience'){
          position.offset = {y:140}
        }
        if(document.querySelector(to.hash)){
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
            import(/* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails"
            ),
        }
      ],
      beforeEnter: (to,from,next) => {
        const exists = store.destinations.find(
          destination => destination.slug === to.params.slug
        )
        if(exists){
          next()
        }
        else{
          next({name: "notFound"})
        }
      }
    },
    {
      path: "/404",
      alias: "*",
      name: "notFound",
      component: () => 
        import(/* webpackChunkName: "NotFound" */ "../views/NotFound"
      )
    }
  ],
});

export default router;
