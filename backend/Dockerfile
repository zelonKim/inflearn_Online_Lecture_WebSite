FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

COPY prisma/schema.prisma ./prisma/

RUN pnpm install

COPY . .

RUN pnpm prisma generate

RUN pnpm run build

EXPOSE 8000

# 예시
CMD ["sh", "-c", "pnpm prisma db push && node dist/src/main.js"]

