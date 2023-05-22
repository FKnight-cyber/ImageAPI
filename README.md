# Projeto ImageAPI
Consiste em uma simples API que permite o tratamento e download de imagens.

<p align="center">
  <img  src="https://img.freepik.com/free-vector/boss-manipulating-employee_1133-221.jpg" height="240px">
</p>
<h1 align="center">
  ImageAPI
</h1>
<div align="center">

  <h3>Built With</h3>
  <img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white" height="30px"/>
   <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>  
</div>

# Description

Nesse desafio foi proposto a criação de uma API que recebesse o url de uma imagem pública e um fator compress para reduzir a mesma.
Deve-se então salvar a imagem original em um arquivo assim como sua versão reduzida.

## Features

-   Save image.

</br>

### Save image

```
http://localhost:5000
POST /image/save
```

#### Request:

| Body              | Type       | Description                    |
| :---------------- | :--------- | :----------------------------- |
| `image`           | `string`   | **Required**. imageURL         |
| `compress`        | `string`   | **Required**. compress factor  |

####

#### Response:

```json
status: 201
body:{
  "localpath": {
    "original": "/path/0e406885-9d03-4c72-bd92-c6411fbe5c49.jpeg",
    "thumb": "/path/0e406885-9d03-4c72-bd92-c6411fbe5c49_thumb.jpg"
  },
  "metadata": {
    "format": "jpeg",
    "size": 4673976,
    "width": 3024,
    "height": 4032,
    "space": "srgb",
    "channels": 3,
    "depth": "uchar",
    "density": 72,
    "chromaSubsampling": "4:4:4",
    "isProgressive": false,
    "resolutionUnit": "inch",
    "hasProfile": true,
    "hasAlpha": false,
    "orientation": 1,
    "exif": {
      "type": "Buffer",
      "data": [...]
    }
  }
}
```

## Environment Variables

`
FOLDER_PATH=/path/
`

`
PORT=5000
`

`
MONGO_URL=mongodb://localhost:27017/database_name
`
#

## Run Locally

Clone the project

```bash
  git clone https://github.com/FKnight-cyber/ImageAPI.git
```

Start the server

`
Crie um arquivo .env, há um modelo no arquivo .env-example
`

`on root folder`
```bash
  run: npm i 
```

## Para rodar localmente, caso tenha mongodb e as demais dependências

```bash
  run: sudo systemctl start mongod
```

```bash
  run: npm run start:dev
```

## Para rodar utilizando docker

```bash
  run: docker-compose up --build -d
```

## Run e2e tests

```bash
 run: npm run test:e2e
```
#


## Lessons Learned

Apesar de simples foi um projeto que me fez aprender bastante, é a primeira vez que lido com tratamento de imagens, então utilizei a lib sharp para realizar esse processo e foi bem gratificante.

## Authors

-   Ryan Nicholas a full-stack developer looking for new challenges!.
<br/>

#