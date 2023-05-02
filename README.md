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

