FROM node:24

ENV TZ=Europe/Moscow

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

RUN npm ci

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

CMD ["npm", "run", "start:prod"]

