# syntax=docker/dockerfile:1

# --- Stage 1: build the static site with pnpm ---
FROM node:24-alpine AS build
WORKDIR /app
RUN corepack enable

# Install deps first (cached unless the lockfile changes)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
COPY . .
RUN pnpm build

# --- Stage 2: serve the built site with nginx ---
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Run as the unprivileged nginx user; validate config at build time.
RUN nginx -t
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
