const routes = [
  {
    path: "/game",
    name: "game",
    component: () => import("components/GamePage.vue"),
  },
  {
    path: "/",
    name: "startPage",
    component: () => import("components/StartPage.vue"),
  },
  {
    path: "/score",
    name: "score",
    component: () => import("components/TotalScore.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
