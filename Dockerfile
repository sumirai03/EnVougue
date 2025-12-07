# Option 1: Using Nginx (Recommended for static sites)
# Use a lightweight Nginx base image
FROM nginx:alpine

# Copy your static files (index.html, CSS, JS, etc.) to the Nginx default location
# NOTE: Make sure your static files are inside a 'dist' or 'build' folder if you have one, 
# or just use '.' if they are in the root. We assume they are in the root for now.
COPY app/ /usr/share/nginx/html

# Expose port 80 (default HTTP port)
EXPOSE 80 
# Nginx starts automatically