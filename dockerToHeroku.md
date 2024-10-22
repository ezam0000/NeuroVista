# Deploying NeuroVista to Heroku with Docker

This document outlines the steps involved in deploying the NeuroVista application to Heroku using a Docker image.

## Prerequisites

- **Heroku Account:** Create a free account at [https://www.heroku.com/](https://www.heroku.com/).
- **Heroku CLI:** Install the Heroku command-line interface (CLI) from [https://devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).
- **Docker:** Install Docker on your system.
- **Docker Image:** You should have a Docker image built for your NeuroVista application.

## Steps

1. **Create a Heroku App:**
   ```bash
   heroku create neurovista-app
   ```

2. **Log in to Heroku Container Registry:**
   ```bash
   heroku container:login
   ```

3. **Tag Your Docker Image:**
   ```bash
   docker tag neurovista registry.heroku.com/neurovista-app/web
   ```

4. **Push Your Docker Image:**
   ```bash
   docker push registry.heroku.com/neurovista-app/web
   ```

5. **Switch to the Container Stack:**
   ```bash
   heroku stack:set container -a neurovista-app
   ```

6. **Release the Container:**
   ```bash
   heroku container:release web -a neurovista-app
   ```

7. **Open Your App:**
   ```bash
   heroku open
   ```

## Important Notes

- **Docker Image Architecture:** Ensure your Docker image is built for the x86_64 architecture using the `--platform linux/amd64` flag during the `docker build` command.
- **Environment Variables:** Set any necessary environment variables (e.g., MongoDB URI) using `heroku config:set`.
- **Heroku Documentation:** Refer to the Heroku documentation for more detailed instructions and best practices: [https://devcenter.heroku.com/](https://devcenter.heroku.com/)

## Conclusion

By following these steps, you can successfully deploy your NeuroVista application to Heroku using a Docker image, ensuring a consistent and reproducible deployment process.

