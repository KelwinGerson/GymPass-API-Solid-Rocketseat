## App

## RFs (Requisitos funcionais) - What do ?

- [ ] It must be possible to create a new user;
- [ ] It must be possible to authenticate;
- [ ] It must be possible get a login profile.
- [ ] It must be possible get a number of check-ins realized of user;
- [ ] It must be possible a user get your historic check-in;
- [ ] It must be possible the user search nearby gyms;
- [ ] It must be possible search gym by name;
- [ ] It must be possible the user realize check-in in the gym;
- [ ] It must be possible validate the check-in of user;
- [ ] It must be possible create a register gym;

## RNs (Regras de negócio) - How do ?

- [ ] The user not can be register with duplicate emails;
- [ ] The user not can be make two check-ins in the same day;
- [ ] The user note can be make check-ins if don't be nearby (100m) of gym;
- [ ] The check-in can be validate up to 20 minutes after create;
- [ ] The check-in can be validate by adms;
- [ ] The gym can be create register by adms;

## RNF (Requisitos não-funcionais) - technical required without client know

- Cripto Key; 
- Persist data PostgreSQL;
- All list can be pagineted up to 20 items peer page;
- JWT;

---

### NODE

npm i typescript @types/node tsx tsup -D --> TS libs for dev and prod
npx tsc --init --> create a tsconfig.json
npm i fastify --> http lib

---

### ANOTHERS

ORM -> Objetct Relational Mapper 
    Map relationship of tables in object representations

---
### DOCKER 

 docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker-pg -e POSTGRESQL_PASSWORD=dockerpg -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql:latest

 The file docker-compose.yml content have a config for a new env to the docker. Is possible running with the follow command:

 ```
 docker compose up -d
 docker compose stop 
 ```

---
 ### PRISMA

 ```
 npx prisma migrate dev -> Manage and applu db schema migrations
 
 npx prisma studio -> open local site for access db 
 ```

