# Use a lightweight Nginx image
FROM nginx:alpine

# Remove default static files from nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy your frontend files into the Nginx web directory
COPY . /usr/share/nginx/html

# Expose port 8001 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
