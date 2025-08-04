# Stage: base
# This is the shared base stage that all other stages inherit or copy from.
# It copies the package.json files from the root, shared, and chosen app directories.
FROM node:22.11.0-alpine AS base

# TARGET_APP decides which app to build dynamically.
ARG TARGET_APP
ENV TARGET_APP=${TARGET_APP}

WORKDIR /monorepo

# Copy the root package.json and package-lock.json files
COPY package*.json ./

COPY turbo.json ./

# Copy the shared packages' package.json file
COPY packages/dtos/package*.json ./packages/dtos/

# Copy the chosen app's package.json file
COPY apps/${TARGET_APP}/package*.json ./apps/${TARGET_APP}/


# --------------------------------------------
# --------------------------------------------
# Stage: Development
# This stage installs the development dependencies and copies the shared packages and the chosen app.
FROM base AS base-dev

# Install the dependencies with dev dependencies
RUN --mount=type=cache,target=/root/.npm npm install --force

# Copy the shared packages
COPY packages/dtos ./packages/dtos

# Copy the chosen app
COPY apps/${TARGET_APP} ./apps/${TARGET_APP}

# Build the dtos packages
RUN npm run build -w ./packages/dtos

ENV NODE_ENV=development

# Set the base command to run the chosen app
CMD ["sh", "-c", "npm run dev:docker"]

# --------------------------------------------
# Stage: Frontend development
# Make a copy of the base stage and continue building on top of it.
FROM base-dev AS frontend-dev

EXPOSE 5173

# --------------------------------------------
# Stage: Backend development
# Make a copy of the base stage and continue building on top of it.
FROM base-dev AS backend-dev

# Generate Prisma client
RUN npm run prisma:generate -w ./apps/backend

RUN echo "DATABASE_URL=mysql://root:mysql@database:3306/movies_platform" > ./apps/backend/.env

EXPOSE 3000
