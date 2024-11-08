# Use Bun as the base image
FROM oven/bun:latest

# Set the working directory for the app

COPY ./frontend /app/frontend

WORKDIR /app/frontend
RUN bun install

RUN bun run build

WORKDIR /app/backend

COPY ./backend /app/backend

RUN bun install

RUN rm -rf /app/backend/public/dist

RUN mv /app/frontend/dist /app/backend/public

EXPOSE 3000

CMD ["bun", "run", "start"]