import { web, instagram, twitter } from "../assets";
/* eslint-disable import/no-anonymous-default-export */
export default {
  FILTERS: [
    "All Filters",
    "Addresses",
    "Tokens",
    "Name Tags",
    "Labels",
    "Websites",
  ],

  BLOCKCHAIN: [
    {
      name: "Transactions",
      link: "/transactions",
    },
    {
      name: "View blocks",
      link: "/blocks",
    },
  ],
  SOCIAL: [
    { icon: web, url: "" },
    { icon: instagram, url: "" },
    { icon: twitter, url: "" },
  ],
};
