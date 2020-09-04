![CircleCI](https://circleci.com/gh/JuanAlmeida12/dasalab.svg?style=svg&circle-token=d2f848ffb0bb478ce77a4da6cc6e8e282532a6f2)
[![Coverage Status](https://coveralls.io/repos/github/JuanAlmeida12/dasalab/badge.svg?branch=master&t=6U7xTD)](https://coveralls.io/github/JuanAlmeida12/dasalab?branch=master)

# DasaLab API

## Summary

- [Dependencies](#dependencies)
- [Installation](#installation)
- [Setup](#setup)
- [Docker](#docker)
- [Running](#running)
- [Tests](#tests)
- [API](#api)
    - [Laboratories](#laboratories)
        - [Add new laboratory](#add-new-laboratory)
        - [Get all actives laboratories](#get-all-actives-laboratories)
        - [Get an active laboratory by id](#get-an-active-laboratory-by-id)
        - [Update an active laboratory](#update-an-active-laboratory)
        - [Delete a laboratory](#delete-a-laboratory)
    - [Exams](#exams)
        - [Add new exam](#add-new-exam)
        - [Get all actives exams](#get-all-actives-exams)
        - [Get an active exam by id](#get-an-active-exam-by-id)
        - [Update an active exam](#update-an-active-exam)
        - [Delete a exam](#delete-a-exam)
        - [Associate with a laboratory](#associate-with-a-laboratory)
        - [Unassociate with a laboratory](#associate-with-a-laboratory)

## Dependencies

The project requires [NodeJs](www.nodejs.org), and a MongoDB base. Its possible run without mongo using a self implementation of an inmemory database.

## Installation

Clone the repository:

```shell
git clone https://github.com/JuanAlmeida12/dasalab.git
```

Open prompt/bash into repository directory and run the following command:
```shell
npm install
```
or just:
```shell
npm i
```
Now you are able to run the server.

## Setup

If you want connect with a Mongo database, ypu must configure some env variables:
```shell
ENV DATA_PROVIDER=mongo
ENV MONGO_URL=<Mongo Connection String>
ENV NODE_ENV=production
```

## Docker

You can use Docker, just build the image:
```shell
 docker build -t dasalab .
```

Create the container using image:
```shell
 docker run -d -p 3333:3333 --name dasalab-container dasalab
```

Now the service already is runnig.
You can config env variable at `Dockerfile`

## Running

The server can be started on two modes:
### Development
In development mode the server runs using ```nodemon```, which is a simple monitor script for use in development.

To run in this mode, run the following command:
```shell
npm run dev
```

### Production
In production mode the server runs using ```pm2```, which is a production process manager.

To run in this mode, run the following command:
```shell
npm run production
```

## Tests

To run the test suite, run the following command
```shell
npm test
```
## API
### Laboratories
#### Add new Laboratory
```
POST /api/laboratories
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | **Required**. Name of laboratory |
| `address` | `string` | Address of laboratory. |
| `status` | `string` | Laboratorie status, can be only `active` or `inactive`. Default: `active`|

##### Exemple
```json
{
    "name": "Laboratory Yankee",
    "address": "Street 4 with Third Avenue"
}
```

##### Response
```
Status: 201 Created
```
```json
{
    "id": "5f52801ff2754d00326ab194",
    "name": "Laboratory Yankee",
    "address": "Street 4 with Third Avenue",
    "status": "active"
}
```

#### Get all actives laboratories
```
GET /api/laboratories
```
##### Response
```
Status: 200 OK
```
```json
[
    {
        "id": "5f519f0b2a011b3dd016dadb",
        "name": "Lab Celtics",
        "address": "Address Main Street, numer 4",
        "status": "active"
    },
    {
        "id": "5f519f0b2a011b3dd016dadc",
        "name": "Lab Yankee",
        "address": "Address Main Street, numer 9",
        "status": "active"
    },
    {
        "id": "5f52801ff2754d00326ab194",
        "name": "Laboratory Yankee",
        "address": "Street 4 with Third Avenue",
        "status": "active"
    }
]
```

#### Get an active laboratory by id
```
GET /api/laboratories/:id
```
##### Response
```
Status: 200 OK
```
```json
{
    "id": "5f519f0b2a011b3dd016dadc",
    "name": "Lab Yankes",
    "address": "Address Main Street, numer 9",
    "status": "active"
}
```

#### Update an active laboratory
```
PUT /api/laboratories/:id
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | **Required**. Name of laboratory |
| `address` | `string` | Address of laboratory. |
| `status` | `string` | Laboratorie status, can be only `active` or `inactive`. Default: `active`|

##### Exemple
```json
{
    "name": "Laboratory Yanke Update",
    "address": "new address"
}
```

##### Response
```
Status: 200 OK
```
```json
{
    "laboratory_old": {
        "id": "5f519f0b2a011b3dd016dadc",
        "name": "Lab Yankes",
        "address": "Address Main Street, numer 9",
        "status": "active"
    },
    "laboratory": {
        "id": "5f519f0b2a011b3dd016dadc",
        "name": "Laboratory Yanke Update",
        "address": "new address",
        "status": "active"
    },
    "status": "success"
}
```

#### Delete a laboratory
```
DELETE /api/laboratories/:id
```
##### Response
```
Status: 204
```

**Object is not removed from base, just inactivated**

### Exams
#### Add new Exam
```
POST /api/exams
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | **Required**. Name of laboratory |
| `type` | `string` | **Required**. Type of exam, can be only `image` or `clinical_analysis`. |
| `status` | `string` | Laboratorie status, can be only `active` or `inactive`. Default: `active`|

##### Exemple
```json
{
    "name": "Some Exam name",
    "type": "clinical_analysis"
}
```

##### Response
```
Status: 201 Created
```
```json
{
    "id": "5f528404f2754d00326ab196",
    "name": "Some Exam name",
    "type": "clinical_analysis",
    "status": "active",
    "labs": []
}
```

#### Get all actives exams
```
GET /api/exams
```
##### Response
```
Status: 200 OK
```
```json
[
    {
        "id": "5f52769cf2754d00326ab192",
        "name": "Exam name n 12",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    },
    {
        "id": "5f5277c5f2754d00326ab193",
        "name": "Exam name Mongo",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    },
    {
        "id": "5f5283f4f2754d00326ab195",
        "name": "Exam awesome",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    },
    {
        "id": "5f528404f2754d00326ab196",
        "name": "Some Exam name",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    }
]
```

#### Get an active exam by id
```
GET /api/exams/:id
```
##### Response
```
Status: 200 OK
```
```json
{
    "id": "5f528404f2754d00326ab196",
    "name": "Some Exam name",
    "type": "clinical_analysis",
    "status": "active",
    "labs": []
}
```

#### Update an active exam
```
PUT /api/exams/:id
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | **Required**. Name of laboratory |
| `type` | `string` | **Required**. Type of exam, can be only `image` or `clinical_analysis`. |
| `status` | `string` | Laboratorie status, can be only `active` or `inactive`. Default: `active`|

##### Exemple
```json
{
    "name": "Some Exam name Updated",
    "type": "clinical_analysis"
}
```

##### Response
```
Status: 200 OK
```
```json
{
    "exam_old": {
        "id": "5f528404f2754d00326ab196",
        "name": "Some Exam name",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    },
    "exam": {
        "id": "5f528404f2754d00326ab196",
        "name": "Some Exam name Updated",
        "type": "clinical_analysis",
        "status": "active",
        "labs": []
    },
    "status": "success"
}
```

#### Delete a exam
```
DELETE /api/exams/:id
```
##### Response
```
Status: 204
```
**Object is not removed from base, just inactivated**

#### Associate with a laboratory
```
PUT /api/exams/:id/associate
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `laboratoryId` | `string` | **Required**. ID of laboratory |

##### Exemple
```json
{
    "laboratoryId": "5f519f0b2a011b3dd016dadb"
}
```

##### Response
```
Status: 201
```
```json
{
    "examId": "5f528404f2754d00326ab196",
    "labId": "5f519f0b2a011b3dd016dadb",
    "status": "success"
}
```

#### Unassociate with a laboratory
```
DELETE /api/exams/:id/unassociate
```
##### Parameters
| Name | Type | Description |
| --- | --- | --- |
| `laboratoryId` | `string` | **Required**. ID of laboratory |

##### Exemple
```json
{
    "laboratoryId": "5f519f0b2a011b3dd016dadb"
}
```

##### Response
```
Status: 204
```
