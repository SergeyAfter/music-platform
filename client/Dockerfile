FROM node:16
#By default create-react-app sets port to 3000
EXPOSE 3000
#mkdir - make directories
# -p, --parents  - no error if existing, make parent directories as needed
RUN mkdir -p /app/public /app/src
WORKDIR /app

#ignore if don't have react with typescript
COPY tsconfig.json /app/tsconfig.json

#ignore if don't have react with typescript
# COPY tslint.json /app/tslint.json 

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm install

# Run 'npm run dev' when the container starts.
CMD ["npm", "run", "start"]