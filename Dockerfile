


FROM nginx
COPY public /usr/share/nginx/html

# docker run --name referendum-server -d -p 3000:80 referendum-server