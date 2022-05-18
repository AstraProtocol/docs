module.exports = {
  title: "Astra",
  description: "View our latest chain documentation on Astra. Sign up to our newsletter to get the latest updates and read the documentation to connect to our Testnet.",
  themeConfig: {
    navbar: true,
    logo: '/astra.svg',
    nav: [{
      text: "Home",
      link: "/"
    },
    {
      text: "Getting Started",
      link: "/getting-started/"
    },

      {
        text: "Astra Chain",
        items: [
          // {
          //   text: "astra Mainnet Beta",
          //   link: "/getting-started/astra-mainnet"
          // },
          // {
          //   text: "Using Metamask",
          //   link: "/getting-started/metamask"
          // },
          {
            text: "Astra Testnet",
            link: "/getting-started/astra-testnet"
          },
          // {
          //   text: "Local network deployment",
          //   link: "/getting-started/local-devnet"
          // },
          // {
          //   text: "Deploy Smart Contract at Astra",
          //   link: "/getting-started/astra-smart-contract"
          // },
          // {
          //   text: "Best Practices for DeFi Project in Astra",
          //   link: "/getting-started/defi-practice"
          // },
          // {
          //   text: "Block Explorer",
          //   link: "https://astra-explorer.crypto.org"
          // }

//          {
//            text: "Cronos Testnet Faucet",
//              link: "https://crypto.org/faucet"
//            text}
        ]
      },
      // {
      //   text: "Design",
      //   items: [
      //     {
      //       text: "Introduction",
      //       link: "/chain-details/introduction.md"
      //     },
      //     {
      //       text: "Design Goals",
      //       link: "/chain-details/architecture.md"
      //     },
      //     {
      //       text: "Modules",
      //       link: "/chain-details/module_overview.md"
      //     }
      //   ]
      // },
      // {
      //   text: "Bridge",
      //   items: [
      //     {
      //       text: "Via Crypto.com App and Exchange",
      //       link: "/bridge/app_n_ex.md"
      //     },
      //     {
      //       text: "From other chains (Cronos Bridge WebApp)",
      //       link: "/bridge/other_chain#via-cronos-bridge-web-app"
      //     }, 
      //     {
      //       text: "From other chains (Crypto.com DeFi Wallet)",
      //       link: "/bridge/other_chain#via-crypto-com-defi-wallet"
      //     },      
      //     {
      //       text: "From other chains (Crypto.org Chain Desktop Wallet)",
      //       link: "/bridge/other_chain#via-crypto-org-chain-desktop-wallet"
      //     }                   
      //   ]
      // },   
      // {
      //   text: "Cronos Play",
      //   items: [
      //     {
      //       text: "Introduction",
      //       link: "/play/introduction.html",           
      //     },
      //     {
      //       text: "Getting Started",
      //       link: "/play/getting-started.html",           
      //     },
      //     {
      //       text: "Login Example",
      //       link: "/play/login-example.html",           
      //     },
      //     {
      //       text: "Intergrating with Cronos Play",
      //       link: "/play/cronos-gamefi-integraton.html",           
      //     }
      //   ]
      // },

      // {
      //   text: "Resources",
      //   items: [
      //     {
      //       text: "Integrating with Cronos Chain",
      //       link: "/resources/chain-integration"
      //     },
      //     {
      //       text: "Web extension integration",
      //       link: "/resources/web-extension-integration"
      //     },
      //     {
      //       text: "Node Setup and RPC note",
      //       link: "/resources/node-and-rpc-setup-notes"
      //     },
      //     {
      //       text: "gRPC API",
      //       link: "/resources/cosmos-grpc-docs"
      //     },
      //     {
      //       text: "Technical Glossary",
      //       link: "/resources/technical-glossary"
      //     }
      //   ]
      // }
    ],
    sidebar: {
      "/getting-started/": [
        // "astra-mainnet",
        // "metamask",
        "astra-testnet",
        // "local-devnet",
        // "security-checklist.md",
        // "defi-practice",
        // "cronos-smart-contract"
      ],
      // "/chain-details/": [
      //   "introduction",
      //   "architecture",
      //   "chain-id",
      //   "genesis_file",
      //   "module_overview",
      //   "parameters",
      //   "govprocess"
      // ],
      // "/wallets/": [
      //   "cli"
      // ],
      // "/bridge/": [
      //   "app_n_ex",
      //   "other_chain"
      // ],
      // "/play/": [
      //   "introduction",
      //   "getting-started",
      //   "login-example",
      //   "scripts",
      //   "cronos-gamefi-integraton",
      //   "useful-links",
      // ],
      // "/resources/": [
      //   "chain-integration",
      //   "web-extension-integration",
      //   "desktop-wallet-integration",
      //   "node-and-rpc-setup-notes",
      //   "cosmos-grpc-docs",
      //   "technical-glossary"
      // ],
      "/api/": "auto"
    },
    displayAllHeaders: true
  },
  base: "/docs/",
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/astra.svg" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/astra.svg" }],
    // [
    //   'script',
    //   {},
    //   [
    //     `
    //     (function (w, d, s, l, i) {
    //       w[l] = w[l] || [];
    //       w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    //       var f = d.getElementsByTagName(s)[0],
    //         j = d.createElement(s),
    //         dl = l != "dataLayer" ? "&l=" + l : "";
    //       j.async = true;
    //       j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    //       f.parentNode.insertBefore(j, f);
    //     })(window, document, "script", "dataLayer", "GTM-PSV99SS");
    //   `,
    //   ],
    // ],
  ],
  plugins: [
    [
      "vuepress-plugin-export",
      {
        page: {
          format: 'A4',
          printBackground: true,
          margin: {
            top: 60,
            left: 20,
            right: 20,
            bottom: 60
          }
        },
        sorter: function (a, b) {
          var ordering = {
            Home: 0,
            "Getting Started": 1,
            "Astra Testnet": 2,
            // "Devnet": 3,
            // "Send Your First Transaction": 4,
            // Consensus: 5,
            // Genesis: 7,
            // "Transaction Accounting Model": 7,
            // Transaction: 8,
            // Serialization: 9,
            // "Signature Schemes": 10,
            // "Transaction Flow": 11,
            // "Enclave Architecture": 12,
            // "Transaction Privacy": 13,
            // "node-joining": 14,
            // Staking: 15,
            // "reward-and-punishments": 16,
            // "network-parameters": 17,
            // "Notes on Performance": 18,
            // "Notes on Production Deployment": 19,
            // "Threat Model": 20,
            // "technical_glossary": 21

          };
          return ordering[a["title"]] - ordering[b["title"]];
        }
      }
    ]
  ]
};