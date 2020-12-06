FROM node
WORKDIR /app
ADD package.json .
RUN npm install --production
ADD . /app/
ENV PORT=9000
EXPOSE 9000
CMD node index.js