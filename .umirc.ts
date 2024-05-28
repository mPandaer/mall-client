import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "@/pages/HomePage"},
    { path: "/login", component: "@/pages/LoginPage"},
    { path: "/product/list/:typeId", component: "@/pages/ProductList" },
    { path: "/product/all/:name", component: "@/pages/AllProductPage" },
    { path: "/product/all/", component: "@/pages/AllProductPage" },
    { path: "/product/detail/:productId", component: "@/pages/ProductDetailPage" },
    { path: "/cart", component: "@/pages/CartPage",wrappers: ["@/wrappers/auth"]},
    { path: "/confirm/order", component: "@/pages/ConfirmOrderPage" },
    {
      path: "/user", component: "@/pages/UserCenterPage",
      routes: [
        { path: "/user", redirect: "/user/order/0" },
        { path: "/user/order/:status", component: "@/pages/UserCenterPage/Order" },
        { path: "/user/order/detail/:orderId", component: "@/pages/OrderDetailPage" },
        { path: "/user/info", component: "@/pages/UserCenterPage/UserInfo" },
        { path: "/user/address", component: "@/pages/UserCenterPage/Address" },
        { path: "/user/reset", component: "@/pages/UserCenterPage/ResetPassword" },
      ]
    },

  ],
  npmClient: 'pnpm',

});


