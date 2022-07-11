# Install dependencies
FROM node:16-alpine AS deps

WORKDIR /upload

COPY package.json package-lock.json ./

RUN npm ci

#Rebuild the source code
FROM node:16-alpine AS builder
WORKDIR /upload
COPY --from=deps /upload/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run nodejs process
FROM node:16-alpine AS runner
WORKDIR /upload

ENV NODE_ENV production

COPY --from=builder /upload/package.json ./package.json
COPY --from=builder /upload/dist ./dist
COPY --from=builder /upload/node_modules ./node_modules

EXPOSE 5001
ENV PORT 5001

CMD ["npm", "run", "start"]