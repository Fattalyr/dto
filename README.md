## Description

Demonstration of working with DTO for data validation and transformation.
## Installation

Rename `sample.env` to `.env`. Then install packages in the `gateway` and `users` microservices.

```bash
$ cd gateway && npm install
$ cd .. && cd users && npm install
```

## Running the app

Go to the each microservice and run:

```bash
# development
$ npm run start:dev
```

The app supports 2 endpoints: GET a user (returns the mock user) and PUT (create, update, delete) addresses of the user (returns mock user with populated `addresses` field).

To get the user use GET http://localhost:9000/api/v1/users/one/62a9ef6adebb376060207f81.

To "edit" addresses field use PUT http://localhost:9000/api/v1/users/addresses/62a9ef6adebb376060207f81 with body (it doesn't allow you edit the address, it's just to demonstrate DTO validations):

```json
{
    "add": [
        {
            "country": "USA",
            "region": "California",
            "city": "Los Angeles",
            "street": "Cheviot Drive",
            "building": "39",
            "flat": "125"
        },
        {
            "country": "Armenia",
            "city": "Dilijan",
            "street": "Gai",
            "building": "82",
            "flat": "40"
        }
    ],
    "update": [
        {
          "_id": "62b1cee0213655a4918adeec",
          "street": "University drive",
          "building": "40",
          "flat": null
        },
        {
          "_id": "62b1cee0213655a4918adeed",
          "country": "Armenia",
          "building": "83",
          "flat": null
        }
    ],
    "delete": [ "62b1cee0213655a4918adeec", "62b1cee0213655a4918adeed" ]
}

```

The app is [MIT licensed](LICENSE).
