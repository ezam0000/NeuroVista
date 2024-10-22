# Updating and Redeploying Your NeuroVista Application on Heroku with Docker

This document outlines the steps involved in updating your NeuroVista application and redeploying it to Heroku using a Docker image.

## Steps

1. **Make Changes to Your Project:**
   - Update your application code, configuration files, or dependencies.

2. **Rebuild Your Docker Image:**
   - Ensure your Docker image is built for the correct architecture (x86_64):
     ```bash
     docker build --platform linux/amd64 -t neurovista .
     ```

3. **Tag Your Docker Image:**
   - Tag the image for Heroku:
     ```bash
     docker tag neurovista registry.heroku.com/neurovista-app/web
     ```

4. **Push Your Docker Image:**
   - Push the updated image to Heroku Container Registry:
     ```bash
     docker push registry.heroku.com/neurovista-app/web
     ```

5. **Release the Container:**
   - Release the updated container on Heroku:
     ```bash
     heroku container:release web -a neurovista-app
     ```

6. **Open Your App:**
   - Open your updated application in the browser:
     ```bash
     heroku open
     ```

## Important Notes

- **Environment Variables:** If you've made changes to environment variables, update them on Heroku using `heroku config:set`.
- **Heroku Documentation:** Refer to the Heroku documentation for more detailed instructions and best practices: [https://devcenter.heroku.com/](https://devcenter.heroku.com/)

## Conclusion

By following these steps, you can efficiently update your NeuroVista application and redeploy it to Heroku using Docker, ensuring a smooth and consistent deployment process.