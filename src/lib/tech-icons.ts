/**
 * Tech Icon Mapping Utility
 * Maps technology names and aliases to their official brand SVGs (Devicon & Simple Icons).
 */

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Curated lookup table of original tech logos
const TECH_REGISTRY: Record<string, { icon: string }> = {
  // ─── Languages ─────────────────────────────────────────────────────────────
  javascript: { icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  js: { icon: `${DEVICON_BASE}/javascript/javascript-original.svg` },
  typescript: { icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  ts: { icon: `${DEVICON_BASE}/typescript/typescript-original.svg` },
  python: { icon: `${DEVICON_BASE}/python/python-original.svg` },
  py: { icon: `${DEVICON_BASE}/python/python-original.svg` },
  ruby: { icon: `${DEVICON_BASE}/ruby/ruby-original.svg` },
  rails: { icon: `${DEVICON_BASE}/rails/rails-plain.svg` },
  "ruby on rails": { icon: `${DEVICON_BASE}/rails/rails-plain.svg` },
  dotnet: { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },
  ".net": { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },
  ".net core": { icon: `${DEVICON_BASE}/dotnetcore/dotnetcore-original.svg` },
  dotnetcore: { icon: `${DEVICON_BASE}/dotnetcore/dotnetcore-original.svg` },
  csharp: { icon: `${DEVICON_BASE}/csharp/csharp-original.svg` },
  "c#": { icon: `${DEVICON_BASE}/csharp/csharp-original.svg` },
  cplusplus: { icon: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg` },
  "c++": { icon: `${DEVICON_BASE}/cplusplus/cplusplus-original.svg` },
  c: { icon: `${DEVICON_BASE}/c/c-original.svg` },
  go: { icon: `${DEVICON_BASE}/go/go-original.svg` },
  golang: { icon: `${DEVICON_BASE}/go/go-original.svg` },
  rust: { icon: `${DEVICON_BASE}/rust/rust-original.svg` },
  java: { icon: `${DEVICON_BASE}/java/java-original.svg` },
  kotlin: { icon: `${DEVICON_BASE}/kotlin/kotlin-original.svg` },
  swift: { icon: `${DEVICON_BASE}/swift/swift-original.svg` },
  php: { icon: `${DEVICON_BASE}/php/php-original.svg` },
  scala: { icon: `${DEVICON_BASE}/scala/scala-original.svg` },
  elixir: { icon: `${DEVICON_BASE}/elixir/elixir-original.svg` },
  clojure: { icon: `${DEVICON_BASE}/clojure/clojure-original.svg` },
  dart: { icon: `${DEVICON_BASE}/dart/dart-original.svg` },
  r: { icon: `${DEVICON_BASE}/r/r-original.svg` },
  lua: { icon: `${DEVICON_BASE}/lua/lua-original.svg` },
  perl: { icon: `${DEVICON_BASE}/perl/perl-original.svg` },
  haskell: { icon: `${DEVICON_BASE}/haskell/haskell-original.svg` },
  zig: { icon: `${DEVICON_BASE}/zig/zig-original.svg` },
  solidity: { icon: `${DEVICON_BASE}/solidity/solidity-original.svg` },
  html: { icon: `${DEVICON_BASE}/html5/html5-original.svg` },
  html5: { icon: `${DEVICON_BASE}/html5/html5-original.svg` },
  css: { icon: `${DEVICON_BASE}/css3/css3-original.svg` },
  css3: { icon: `${DEVICON_BASE}/css3/css3-original.svg` },
  bash: { icon: `${DEVICON_BASE}/bash/bash-original.svg` },
  shell: { icon: `${DEVICON_BASE}/bash/bash-original.svg` },
  powershell: { icon: `${DEVICON_BASE}/powershell/powershell-original.svg` },

  // ─── Mobile Development ───────────────────────────────────────────────────
  "react native": { icon: `${DEVICON_BASE}/react/react-original.svg` },
  reactnative: { icon: `${DEVICON_BASE}/react/react-original.svg` },
  flutter: { icon: `${DEVICON_BASE}/flutter/flutter-original.svg` },
  android: { icon: `${DEVICON_BASE}/android/android-original.svg` },
  ios: { icon: `${DEVICON_BASE}/apple/apple-original.svg` },
  apple: { icon: `${DEVICON_BASE}/apple/apple-original.svg` },
  swiftui: { icon: `${DEVICON_BASE}/swift/swift-original.svg` },
  expo: { icon: `https://cdn.simpleicons.org/expo` },
  ionic: { icon: `${DEVICON_BASE}/ionic/ionic-original.svg` },
  capacitor: { icon: `https://cdn.simpleicons.org/capacitor` },
  cordova: { icon: `https://cdn.simpleicons.org/apachecordova` },
  "jetpack compose": { icon: `https://cdn.simpleicons.org/jetpackcompose` },
  xamarin: { icon: `https://cdn.simpleicons.org/xamarin` },
  maui: { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },
  ".net maui": { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },

  // ─── Frontend Frameworks & Libraries ─────────────────────────────────────
  react: { icon: `${DEVICON_BASE}/react/react-original.svg` },
  reactjs: { icon: `${DEVICON_BASE}/react/react-original.svg` },
  "react.js": { icon: `${DEVICON_BASE}/react/react-original.svg` },
  nextjs: { icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  "next.js": { icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  next: { icon: `${DEVICON_BASE}/nextjs/nextjs-original.svg` },
  vue: { icon: `${DEVICON_BASE}/vuejs/vuejs-original.svg` },
  vuejs: { icon: `${DEVICON_BASE}/vuejs/vuejs-original.svg` },
  "vue.js": { icon: `${DEVICON_BASE}/vuejs/vuejs-original.svg` },
  nuxt: { icon: `${DEVICON_BASE}/nuxtjs/nuxtjs-original.svg` },
  nuxtjs: { icon: `${DEVICON_BASE}/nuxtjs/nuxtjs-original.svg` },
  "nuxt.js": { icon: `${DEVICON_BASE}/nuxtjs/nuxtjs-original.svg` },
  angular: { icon: `${DEVICON_BASE}/angular/angular-original.svg` },
  angularjs: { icon: `${DEVICON_BASE}/angularjs/angularjs-original.svg` },
  svelte: { icon: `${DEVICON_BASE}/svelte/svelte-original.svg` },
  sveltekit: { icon: `${DEVICON_BASE}/svelte/svelte-original.svg` },
  remix: { icon: `${DEVICON_BASE}/remix/remix-original.svg` },
  astro: { icon: `${DEVICON_BASE}/astro/astro-original.svg` },
  solidjs: { icon: `${DEVICON_BASE}/solidjs/solidjs-original.svg` },
  solid: { icon: `${DEVICON_BASE}/solidjs/solidjs-original.svg` },
  qwik: { icon: `https://cdn.simpleicons.org/qwik` },
  gatsby: { icon: `${DEVICON_BASE}/gatsby/gatsby-original.svg` },
  redux: { icon: `${DEVICON_BASE}/redux/redux-original.svg` },
  zustand: { icon: `https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg` },
  mobx: { icon: `${DEVICON_BASE}/mobx/mobx-original.svg` },
  jotai: { icon: `https://cdn.simpleicons.org/jotai` },
  recoil: { icon: `https://cdn.simpleicons.org/recoil` },
  tailwindcss: { icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  tailwind: { icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  "tailwind css": { icon: `${DEVICON_BASE}/tailwindcss/tailwindcss-original.svg` },
  bootstrap: { icon: `${DEVICON_BASE}/bootstrap/bootstrap-original.svg` },
  sass: { icon: `${DEVICON_BASE}/sass/sass-original.svg` },
  scss: { icon: `${DEVICON_BASE}/sass/sass-original.svg` },
  less: { icon: `${DEVICON_BASE}/less/less-plain-wordmark.svg` },
  "framer motion": { icon: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
  framermotion: { icon: `${DEVICON_BASE}/framermotion/framermotion-original.svg` },
  threejs: { icon: `${DEVICON_BASE}/threejs/threejs-original.svg` },
  "three.js": { icon: `${DEVICON_BASE}/threejs/threejs-original.svg` },
  d3: { icon: `${DEVICON_BASE}/d3js/d3js-original.svg` },
  "d3.js": { icon: `${DEVICON_BASE}/d3js/d3js-original.svg` },
  d3js: { icon: `${DEVICON_BASE}/d3js/d3js-original.svg` },
  mui: { icon: `${DEVICON_BASE}/materialui/materialui-original.svg` },
  "material ui": { icon: `${DEVICON_BASE}/materialui/materialui-original.svg` },
  "chakra ui": { icon: `https://cdn.simpleicons.org/chakraui` },
  chakra: { icon: `https://cdn.simpleicons.org/chakraui` },
  "ant design": { icon: `${DEVICON_BASE}/antdesign/antdesign-original.svg` },
  antd: { icon: `${DEVICON_BASE}/antdesign/antdesign-original.svg` },
  "radix ui": { icon: `https://cdn.simpleicons.org/radixui` },
  radix: { icon: `https://cdn.simpleicons.org/radixui` },
  shadcn: { icon: `https://cdn.simpleicons.org/shadcnui` },
  "shadcn ui": { icon: `https://cdn.simpleicons.org/shadcnui` },
  tanstack: { icon: `https://cdn.simpleicons.org/reactquery` },
  "react query": { icon: `https://cdn.simpleicons.org/reactquery` },
  gsap: { icon: `https://cdn.simpleicons.org/greensock` },

  // ─── Backend & APIs ───────────────────────────────────────────────────────
  nodejs: { icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  "node.js": { icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  node: { icon: `${DEVICON_BASE}/nodejs/nodejs-original.svg` },
  deno: { icon: `${DEVICON_BASE}/denojs/denojs-original.svg` },
  bun: { icon: `${DEVICON_BASE}/bun/bun-original.svg` },
  express: { icon: `${DEVICON_BASE}/express/express-original.svg` },
  "express.js": { icon: `${DEVICON_BASE}/express/express-original.svg` },
  expressjs: { icon: `${DEVICON_BASE}/express/express-original.svg` },
  nestjs: { icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
  nest: { icon: `${DEVICON_BASE}/nestjs/nestjs-original.svg` },
  fastify: { icon: `${DEVICON_BASE}/fastify/fastify-original.svg` },
  fastapi: { icon: `${DEVICON_BASE}/fastapi/fastapi-original.svg` },
  django: { icon: `${DEVICON_BASE}/django/django-plain.svg` },
  flask: { icon: `${DEVICON_BASE}/flask/flask-original.svg` },
  spring: { icon: `${DEVICON_BASE}/spring/spring-original.svg` },
  "spring boot": { icon: `${DEVICON_BASE}/spring/spring-original.svg` },
  springboot: { icon: `${DEVICON_BASE}/spring/spring-original.svg` },
  laravel: { icon: `${DEVICON_BASE}/laravel/laravel-original.svg` },
  symfony: { icon: `${DEVICON_BASE}/symfony/symfony-original.svg` },
  aspnet: { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },
  "asp.net": { icon: `${DEVICON_BASE}/dot-net/dot-net-original.svg` },
  "asp.net core": { icon: `${DEVICON_BASE}/dotnetcore/dotnetcore-original.svg` },
  graphql: { icon: `${DEVICON_BASE}/graphql/graphql-plain.svg` },
  grpc: { icon: `${DEVICON_BASE}/grpc/grpc-original.svg` },
  trpc: { icon: `${DEVICON_BASE}/trpc/trpc-original.svg` },
  apollo: { icon: `${DEVICON_BASE}/apollographql/apollographql-original.svg` },
  "apollo graphql": { icon: `${DEVICON_BASE}/apollographql/apollographql-original.svg` },
  websockets: { icon: `${DEVICON_BASE}/socketio/socketio-original.svg` },
  "socket.io": { icon: `${DEVICON_BASE}/socketio/socketio-original.svg` },
  socketio: { icon: `${DEVICON_BASE}/socketio/socketio-original.svg` },
  kafka: { icon: `${DEVICON_BASE}/apachekafka/apachekafka-original.svg` },
  "apache kafka": { icon: `${DEVICON_BASE}/apachekafka/apachekafka-original.svg` },
  rabbitmq: { icon: `${DEVICON_BASE}/rabbitmq/rabbitmq-original.svg` },
  hono: { icon: `https://cdn.simpleicons.org/hono` },
  koa: { icon: `https://cdn.simpleicons.org/koa` },

  // ─── Databases & ORMs ─────────────────────────────────────────────────────
  mongodb: { icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
  mongo: { icon: `${DEVICON_BASE}/mongodb/mongodb-original.svg` },
  postgresql: { icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
  postgres: { icon: `${DEVICON_BASE}/postgresql/postgresql-original.svg` },
  mysql: { icon: `${DEVICON_BASE}/mysql/mysql-original.svg` },
  redis: { icon: `${DEVICON_BASE}/redis/redis-original.svg` },
  sqlite: { icon: `${DEVICON_BASE}/sqlite/sqlite-original.svg` },
  mariadb: { icon: `${DEVICON_BASE}/mariadb/mariadb-original.svg` },
  oracle: { icon: `${DEVICON_BASE}/oracle/oracle-original.svg` },
  cassandra: { icon: `${DEVICON_BASE}/apachecassandra/apachecassandra-original.svg` },
  couchdb: { icon: `${DEVICON_BASE}/couchdb/couchdb-original.svg` },
  supabase: { icon: `${DEVICON_BASE}/supabase/supabase-original.svg` },
  firebase: { icon: `${DEVICON_BASE}/firebase/firebase-plain.svg` },
  prisma: { icon: `${DEVICON_BASE}/prisma/prisma-original.svg` },
  drizzle: { icon: `https://cdn.simpleicons.org/drizzle` },
  "drizzle orm": { icon: `https://cdn.simpleicons.org/drizzle` },
  mongoose: { icon: `${DEVICON_BASE}/mongoose/mongoose-original.svg` },
  sequelize: { icon: `${DEVICON_BASE}/sequelize/sequelize-original.svg` },
  typeorm: { icon: `${DEVICON_BASE}/typeorm/typeorm-original.svg` },
  neo4j: { icon: `${DEVICON_BASE}/neo4j/neo4j-original.svg` },
  elasticsearch: { icon: `${DEVICON_BASE}/elasticsearch/elasticsearch-original.svg` },
  planetscale: { icon: `https://cdn.simpleicons.org/planetscale` },
  neon: { icon: `https://cdn.simpleicons.org/neon` },
  pinecone: { icon: `https://cdn.simpleicons.org/pinecone` },
  weaviate: { icon: `https://cdn.simpleicons.org/weaviate` },
  qdrant: { icon: `https://cdn.simpleicons.org/qdrant` },
  clickhouse: { icon: `https://cdn.simpleicons.org/clickhouse` },

  // ─── AI, ML & Data ────────────────────────────────────────────────────────
  pytorch: { icon: `${DEVICON_BASE}/pytorch/pytorch-original.svg` },
  tensorflow: { icon: `${DEVICON_BASE}/tensorflow/tensorflow-original.svg` },
  keras: { icon: `${DEVICON_BASE}/keras/keras-original.svg` },
  opencv: { icon: `${DEVICON_BASE}/opencv/opencv-original.svg` },
  pandas: { icon: `${DEVICON_BASE}/pandas/pandas-original.svg` },
  numpy: { icon: `${DEVICON_BASE}/numpy/numpy-original.svg` },
  scikitlearn: { icon: `${DEVICON_BASE}/scikitlearn/scikitlearn-original.svg` },
  "scikit-learn": { icon: `${DEVICON_BASE}/scikitlearn/scikitlearn-original.svg` },
  openai: { icon: `https://cdn.simpleicons.org/openai` },
  anthropic: { icon: `https://cdn.simpleicons.org/anthropic` },
  claude: { icon: `https://cdn.simpleicons.org/anthropic` },
  gemini: { icon: `https://cdn.simpleicons.org/google` },
  "google gemini": { icon: `https://cdn.simpleicons.org/google` },
  deepseek: { icon: `https://cdn.simpleicons.org/deepseek` },
  huggingface: { icon: `https://cdn.simpleicons.org/huggingface` },
  "hugging face": { icon: `https://cdn.simpleicons.org/huggingface` },
  langchain: { icon: `https://cdn.simpleicons.org/langchain` },
  llamaindex: { icon: `https://cdn.simpleicons.org/llamaindex` },
  ollama: { icon: `https://cdn.simpleicons.org/ollama` },

  // ─── CMS & Headless ───────────────────────────────────────────────────────
  strapi: { icon: `https://cdn.simpleicons.org/strapi` },
  sanity: { icon: `https://cdn.simpleicons.org/sanity` },
  wordpress: { icon: `${DEVICON_BASE}/wordpress/wordpress-plain.svg` },
  contentful: { icon: `https://cdn.simpleicons.org/contentful` },
  ghost: { icon: `https://cdn.simpleicons.org/ghost` },

  // ─── DevOps, Cloud & Infra ────────────────────────────────────────────────
  docker: { icon: `${DEVICON_BASE}/docker/docker-original.svg` },
  kubernetes: { icon: `${DEVICON_BASE}/kubernetes/kubernetes-original.svg` },
  k8s: { icon: `${DEVICON_BASE}/kubernetes/kubernetes-original.svg` },
  aws: { icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  "amazon web services": { icon: `${DEVICON_BASE}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  azure: { icon: `${DEVICON_BASE}/azure/azure-original.svg` },
  "microsoft azure": { icon: `${DEVICON_BASE}/azure/azure-original.svg` },
  gcp: { icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg` },
  "google cloud": { icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg` },
  "google cloud platform": { icon: `${DEVICON_BASE}/googlecloud/googlecloud-original.svg` },
  vercel: { icon: `${DEVICON_BASE}/vercel/vercel-original.svg` },
  netlify: { icon: `${DEVICON_BASE}/netlify/netlify-original.svg` },
  heroku: { icon: `${DEVICON_BASE}/heroku/heroku-original.svg` },
  digitalocean: { icon: `${DEVICON_BASE}/digitalocean/digitalocean-original.svg` },
  terraform: { icon: `${DEVICON_BASE}/terraform/terraform-original.svg` },
  ansible: { icon: `${DEVICON_BASE}/ansible/ansible-original.svg` },
  helm: { icon: `${DEVICON_BASE}/helm/helm-original.svg` },
  argocd: { icon: `https://cdn.simpleicons.org/argo` },
  pulumi: { icon: `https://cdn.simpleicons.org/pulumi` },
  nginx: { icon: `${DEVICON_BASE}/nginx/nginx-original.svg` },
  apache: { icon: `${DEVICON_BASE}/apache/apache-original.svg` },
  caddy: { icon: `https://cdn.simpleicons.org/caddy` },
  linux: { icon: `${DEVICON_BASE}/linux/linux-original.svg` },
  ubuntu: { icon: `${DEVICON_BASE}/ubuntu/ubuntu-original.svg` },
  debian: { icon: `${DEVICON_BASE}/debian/debian-original.svg` },
  alpine: { icon: `https://cdn.simpleicons.org/alpinelinux` },
  github: { icon: `${DEVICON_BASE}/github/github-original.svg` },
  "github actions": { icon: `${DEVICON_BASE}/githubactions/githubactions-original.svg` },
  gitlab: { icon: `${DEVICON_BASE}/gitlab/gitlab-original.svg` },
  bitbucket: { icon: `${DEVICON_BASE}/bitbucket/bitbucket-original.svg` },
  jenkins: { icon: `${DEVICON_BASE}/jenkins/jenkins-original.svg` },
  ci: { icon: `${DEVICON_BASE}/githubactions/githubactions-original.svg` },
  "ci/cd": { icon: `${DEVICON_BASE}/githubactions/githubactions-original.svg` },
  circleci: { icon: `${DEVICON_BASE}/circleci/circleci-plain.svg` },
  cloudflare: { icon: `${DEVICON_BASE}/cloudflare/cloudflare-original.svg` },
  prometheus: { icon: `${DEVICON_BASE}/prometheus/prometheus-original.svg` },
  grafana: { icon: `${DEVICON_BASE}/grafana/grafana-original.svg` },
  datadog: { icon: `https://cdn.simpleicons.org/datadog` },
  sentry: { icon: `https://cdn.simpleicons.org/sentry` },

  // ─── Tools & Bundlers ─────────────────────────────────────────────────────
  git: { icon: `${DEVICON_BASE}/git/git-original.svg` },
  vscode: { icon: `${DEVICON_BASE}/vscode/vscode-original.svg` },
  "visual studio code": { icon: `${DEVICON_BASE}/vscode/vscode-original.svg` },
  "visual studio": { icon: `${DEVICON_BASE}/visualstudio/visualstudio-original.svg` },
  intellij: { icon: `${DEVICON_BASE}/intellij/intellij-original.svg` },
  webstorm: { icon: `${DEVICON_BASE}/webstorm/webstorm-original.svg` },
  pycharm: { icon: `${DEVICON_BASE}/pycharm/pycharm-original.svg` },
  postman: { icon: `${DEVICON_BASE}/postman/postman-original.svg` },
  insomnia: { icon: `${DEVICON_BASE}/insomnia/insomnia-original.svg` },
  figma: { icon: `${DEVICON_BASE}/figma/figma-original.svg` },
  jira: { icon: `${DEVICON_BASE}/jira/jira-original.svg` },
  linear: { icon: `https://cdn.simpleicons.org/linear` },
  jest: { icon: `${DEVICON_BASE}/jest/jest-plain.svg` },
  vitest: { icon: `${DEVICON_BASE}/vitest/vitest-original.svg` },
  cypress: { icon: `${DEVICON_BASE}/cypressio/cypressio-original.svg` },
  playwright: { icon: `${DEVICON_BASE}/playwright/playwright-original.svg` },
  selenium: { icon: `${DEVICON_BASE}/selenium/selenium-original.svg` },
  storybook: { icon: `${DEVICON_BASE}/storybook/storybook-original.svg` },
  webpack: { icon: `${DEVICON_BASE}/webpack/webpack-original.svg` },
  vite: { icon: `${DEVICON_BASE}/vitejs/vitejs-original.svg` },
  vitejs: { icon: `${DEVICON_BASE}/vitejs/vitejs-original.svg` },
  turborepo: { icon: `https://cdn.simpleicons.org/turborepo` },
  turbopack: { icon: `https://cdn.simpleicons.org/turborepo` },
  rollup: { icon: `${DEVICON_BASE}/rollup/rollup-original.svg` },
  esbuild: { icon: `https://cdn.simpleicons.org/esbuild` },
  babel: { icon: `${DEVICON_BASE}/babel/babel-original.svg` },
  eslint: { icon: `${DEVICON_BASE}/eslint/eslint-original.svg` },
  prettier: { icon: `https://cdn.simpleicons.org/prettier` },
  npm: { icon: `${DEVICON_BASE}/npm/npm-original-wordmark.svg` },
  yarn: { icon: `${DEVICON_BASE}/yarn/yarn-original.svg` },
  pnpm: { icon: `${DEVICON_BASE}/pnpm/pnpm-original.svg` },
  swagger: { icon: `${DEVICON_BASE}/swagger/swagger-original.svg` },
  openapi: { icon: `${DEVICON_BASE}/openapi/openapi-original.svg` },
};

/**
 * Normalizes a tech string to match registry keys
 */
export function normalizeTechName(name: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .trim()
    .replace(/[@#]/g, (match) => (match === "#" ? "sharp" : ""))
    .replace(/\s+/g, " ");
}

/**
 * Resolves the official original brand logo URL for any technology or skill name
 */
export function getTechLogoUrl(name: string, customIcon?: string): string | null {
  // Direct image/svg URL
  if (customIcon && (customIcon.startsWith("http://") || customIcon.startsWith("https://") || customIcon.startsWith("/"))) {
    return customIcon;
  }

  // Custom key in registry
  if (customIcon) {
    const customKey = normalizeTechName(customIcon);
    if (TECH_REGISTRY[customKey]) {
      return TECH_REGISTRY[customKey].icon;
    }
  }

  if (!name) return null;

  const rawKey = name.toLowerCase().trim();
  const normalizedKey = normalizeTechName(name);

  // Exact match
  if (TECH_REGISTRY[rawKey]) return TECH_REGISTRY[rawKey].icon;
  if (TECH_REGISTRY[normalizedKey]) return TECH_REGISTRY[normalizedKey].icon;

  // Clean characters match (e.g. "React.js" -> "react", "Node.js" -> "node")
  const stripped = rawKey.replace(/[^a-z0-9]/g, "");
  if (TECH_REGISTRY[stripped]) return TECH_REGISTRY[stripped].icon;

  // Partial match in known keys
  for (const [key, value] of Object.entries(TECH_REGISTRY)) {
    if (key.length >= 3 && (rawKey.includes(key) || key.includes(rawKey))) {
      return value.icon;
    }
  }

  // Fallback to simpleicons cdn
  if (stripped) {
    return `https://cdn.simpleicons.org/${stripped}`;
  }

  return null;
}

/**
 * Returns a list of popular tech names for autocomplete suggestions in the admin editor
 */
export const POPULAR_TECH_NAMES: string[] = [
  "React",
  "React Native",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Python",
  "Ruby",
  "Ruby on Rails",
  ".NET",
  "C#",
  "C++",
  "Go",
  "Rust",
  "Java",
  "Kotlin",
  "Swift",
  "Flutter",
  "Spring Boot",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "MySQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "GraphQL",
  "Tailwind CSS",
  "Vue.js",
  "Angular",
  "Svelte",
  "Express.js",
  "NestJS",
  "FastAPI",
  "Django",
  "Git",
  "GitHub Actions",
  "Terraform",
  "Prisma",
  "Supabase",
  "Firebase",
  "Kafka",
  "RabbitMQ",
  "Figma",
  "Linux",
  "Nginx",
];
