# Projeto do servidor utilizando TypeORM

## Ajuste do login da aplicação e credenciais

Adicionar o certificado na pasta `~/auth/{nome da sua chave do auth}.pem` referente a aplicação criada no [Auth0](https://auth0.com/).

o arquivo .pem tem o seguinte formato:

```
  -----BEGIN CERTIFICATE-----
BAMTGWRldi0wenNsb3hrOS51cy5hdXRoMCW5jb20wHhcNMjEwNjEzMTkzNjA5WhcN
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgEKCAQEAvkEpDXgexPOkIK0p
EHzxSoqL28x7ZJaYrxNFpKYOoD/rG6Pf9Vap2QGKf9GFzVGMWv1TIEz0o+Wjcs+gY
0OlzQ3NqgT5rT+QjLuEdpcmo4hHuJyNlZTZ5ZVoDEWQuzcugn6LBSON9yMQxVFVzC
qnWTTEeujW67Ejo+yGRL12gF8mmT0cwwcFZkDd2FvayRnH05LnTDprkDCZySccPKP
2Ov9/rX5mzyKdTgBPQB2ose2H85HGq50BS+ejFm8dHJs+cH99uZcNyv17YFqrKFQ
UEYxczHSBVLfZOjFxphRc8k6YMANHZ61HbJJI+xkHLZJEr7HK/c67DrYhWJsk73WG
yxL/lq3GEdovZdEVFepOaCT9ujFrfvKuBJT8UkN2vNIyDMPMSAlE/x8NpXEjGRpd3
R4GEgw2b8fIvqFfp/lE8L8OFzY8qDAm0gfQ8WdIWX1VmmD6jf9WmQeF7xVa+Iwr4G
2JtLFTu4BH5mKpxnqbU6dsg=
-----END CERTIFICATE-----
```


Passo a Passo para iniciar:

1. Escreva o comando `npm install` para baixar as dependencias do projeto
2. Escreva o comando `npm start` para iniciar (porta 3001) aberta

Passo a Passo para Iniciar o Database (sqlite3):

1. Escreva o comando `npm run typeorm-migration-generate` para gerar o migration das entidades
2. Escreva o comando `npm run typeorm-migration-run` para para criar o database

OBS: Escreva o comando `npm run typeorm-migration-revert` para para desfazer o database
