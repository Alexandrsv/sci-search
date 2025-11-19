FROM node:24

ENV TZ=Europe/Moscow

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma

RUN npm ci
RUN npm install --platform=linux --arch=x64 @next/swc-linux-x64-gnu

COPY . .

RUN npx prisma generate --schema ./prisma/schema.prisma

CMD ["npm", "run", "start:prod"]

