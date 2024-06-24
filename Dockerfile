# Use as the base image (Ustawia podstawowy obraz Docker)
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

### Configuration inside of the conteiner

# Creates the /app directory (Tworzy katalog /app)
RUN mkdir /app

# Sets the working directory to /app (Ustawia katalog roboczy na /app)
WORKDIR /app

# Copy all the files from the host to the container's working directory (Kopiuje pliki z hosta do kontenera)
COPY . /app/

# Installs npm dependencies (Instaluje zależności npm)
RUN npm install --force

# Installs Playwright browsers (Instaluje przeglądarki Playwright)
RUN npx playwright install




