## Ekki MVP

MVP com CRUD de amigos, possibilidade de fazer transações em dinheiro, depósitos para sua conta e listagem de todas as suas transações, bem como o saldo atual de sua conta no débito e cartão de crédito, esse segundo dependendo se já foi criado ou não;

### Pré-requisitos

```
MySQL
NodeJS
```

### Instalando
Crie uma nova pasta com o nome que desejar, ali clone o repósito do front-end e back-end:
```
$ ~/path/to/folder: git clone https://github.com/LucasBKing/bank-app-front.git
$ ~/path/to/folder: git clone https://github.com/LucasBKing/bank-app-back.git
```

Após clonar o repositório instale as dependências de ambos os repositorios:

```
$ ~/path/to/folder/bank-app-front: git clone npm install
$ ~/path/to/folder/bank-app-back: git clone npm install
```

Com o MySQL instalado rode o comando abaixo, dentro da pasta 'bank-app-back' para criar o database que será utilizado pela API:

```
mysql -u [username] -p < ekkiDB.sql
```

Dentro do diretório bank-app-back edite o arquivo 'db_connection.js' com os dados do seu servidor local MySQL.

```
...
const pool =  mysql.createPool({
    connectionLimit: 10,
    host: 'XXX',
    user: 'XXX',
    password: 'XXX',
    database: 'ekkiDatabase'
});
...
```

Se tiver problemas em conseguir efetuar a conexão com o usuário MySQL, [esse](https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html) acesse esse link.


### Inicializando

Inicialize ambos projetos, utilizando npm start ou yarn start
```
$ ~/path/to/folder/bank-app-front: npm start
$ ~/path/to/folder/bank-app-back: npm start
```

## Autores
* **Lucas Barbosa **
