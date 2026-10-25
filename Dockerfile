FROM node:26-alpine AS base
RUN npm install -g corepack@latest && corepack enable
WORKDIR /app
COPY package.json ./
RUN corepack prepare --activate

FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build

FROM base AS production-deps
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM node:26-alpine AS production
RUN apk upgrade --no-cache \
  && rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
  && rm -f /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack
WORKDIR /app
COPY --from=production-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/public ./public
COPY package.json ./
EXPOSE 3000
CMD ["node", "node_modules/@react-router/serve/bin.js", "./build/server/index.js"]
