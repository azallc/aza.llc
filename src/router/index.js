import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import { updateMeta } from "@/utils/seo";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/pages/Home.vue"),
    meta: {
      title: "aza.llc",
      description: "aza's projects, and blog posts.",
    },
  },
  {
    path: "/blog/:slug?",
    name: "Blog",
    component: () => import("@/pages/Blog.vue"),
    meta: {
      title: "Blog | aza",
      description: "random thoughts and stuff.",
    },
  },
{
    path: "/projects",
    name: "Projects",
    component: () => import("@/pages/Projects.vue"),
    meta: {
      title: "Projects | aza",
      description: "tools, experiments, and projects.",
    },
  },
  {
    path: "/now",
    name: "Now",
    component: () => import("@/pages/Now.vue"),
    meta: {
        title: "Now | aza",
        description: "what i'm currently working on.",
    },
  },
  {
    path: "/colophon",
    name: "Colophon",
    component: () => import("@/pages/Colophon.vue"),
    meta: {
      title: "Colophon | aza",
      description: "what this site is built with.",
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"),
    meta: {
      title: "404 Not Found | aza",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  updateMeta({
    title: to.meta.title,
    description: to.meta.description,
    url: `https://aza.llc${to.path}`,
  });
  next();
});

// Cross-fade between pages with the View Transitions API where supported.
// Skips the initial load and honors prefers-reduced-motion; falls back to an
// instant swap everywhere else.
router.beforeResolve((to, from) => {
  if (
    typeof document === "undefined" ||
    typeof document.startViewTransition !== "function" ||
    !from.matched.length ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  return new Promise((resolve) => {
    document.startViewTransition(async () => {
      resolve();
      await nextTick();
    });
  });
});

export default router;
