<img src="https://i.imgur.com/Ee9s1Xx.png" />

# TeleQuest

> Web App That Promotes Interactivity During A Live Video Streaming Session (Senior Project - Spring 2019)

[![CircleCI](https://circleci.com/gh/RajendraBhagroo/TeleQuest/tree/master.svg?style=svg)](https://circleci.com/gh/RajendraBhagroo/TeleQuest/tree/master)

## Table of Contents

- [TeleQuest](#telequest)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
    - [Clone](#clone)
    - [Setup](#setup)
  - [Docker](#docker)
    - [Troubleshooting](#troubleshooting)
  - [Features](#features)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Wiki](#wiki)
    - [Config Folder](#config-folder)
  - [Tests](#tests)
  - [Contributing](#contributing)
  - [Team](#team)
  - [License](#license)

## Installation

> Please refer to our project Wiki for <a href="https://github.com/RajendraBhagroo/TeleQuest/wiki/1.-Installing-Node.js" target="_blank">`Node.js`</a> installation

### Clone

> Clone this repo to your local machine using `https://github.com/RajendraBhagroo/TeleQuest.git`

```shell
$ git clone https://github.com/RajendraBhagroo/TeleQuest.git
```


### Setup

> Install dependencies from all npm packages 

```shell
$ cd TeleQuest/ 
$ npm run install-script-dev
```

- To complete setup, please refer to the [Config Folder](#config-folder) section

## Docker
> Build and run containers

```shell
$ cd TeleQuest/
$ docker-compose -f docker-compose-dev.yml build
$ docker-compose -f docker-compose-dev.yml up -d
```

> Teardown containers

```shell
$ docker-compose -f docker-compose-dev.yml down
```

### Troubleshooting

- If you are using Docker Toolbox, please use the IP address of your docker-machine when accessing ports locally

```shell
$ docker-machine ip
```

- Run only server

```shell
$ docker-compose -f docker-compose-dev.yml run server
```

## Features

## Usage

* Follow installation instructions prior to usage and ensure you are at project root directory

> Run application (Server And Client)

```shell
$ npm run app-dev
```

> Run only server

```shell
$ npm run server
```

> Run only client

```shell
$ npm run client
```


## Documentation

### Wiki

> Please refer to our project <a href="https://github.com/RajendraBhagroo/TeleQuest/wiki" target="_blank">`Wiki`</a> for extended documentation

### Config Folder

- Config folder is located at the root of the project. 
- Both, client & server share the same config. [CRA obscures .env at build-time]

> Folder structure

<pre>
config/
    .env
    .env.example
</pre>

> .env [Example]

```dosini
# Client
PORT=3000

# Server
HOST=127.0.0.1
NODE_PORT=3001
SERVER_VERSION=v1
MONGO_DB_URI=<Insert Your Mongo URI>
JWT_SECRET=<Insert Your Secret>
JWT_EXPIRE=604800
```

## Tests

## Contributing

> To get started...
- Review our <a href="https://github.com/RajendraBhagroo/TeleQuest/blob/master/.github/CONTRIBUTOR/CODE_OF_CONDUCT.md" target="_blank">`Code Of Conduct`</a>
- Please refer to our project Wiki for setting up <a href="https://github.com/RajendraBhagroo/TeleQuest/wiki/2.-Setting-Up-Verified-Commits" target="_blank">`Verified Commits`</a> (required)
- 🔃 Create a new pull request using our <a href="https://github.com/RajendraBhagroo/TeleQuest/blob/master/.github/CONTRIBUTOR/feature_request.md" target="_blank">`Template`</a>


## Team

> Core development team

|                <a href="https://github.com/RajendraBhagroo" target="_blank">**RajendraBhagroo**</a>                |       <a href="https://github.com/gint0kix" target="_blank">**Chris**</a>       |         <a href="https://github.com/Gold-Turtle" target="_blank">**Kim**</a>          |
| :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| [![Rajendra Bhagroo](https://avatars1.githubusercontent.com/u/18294827?s=200)](https://github.com/RajendraBhagroo) |                  [![Chris](LINK)](https://github.com/gint0kix)                  |                    [![Kim](LINK)](https://github.com/Gold-Turtle)                     |
|           <a href="https://github.com/RajendraBhagroo" target="_blank">`github.com/RajendraBhagroo`</a>            | <a href="https://github.com/gint0kix" target="_blank">`github.com/gint0kix`</a> | <a href="https://github.com/Gold-Turtle" target="_blank">`github.com/Gold-Turtle`</a> |

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

- **[Massachusetts Institute of Technology](http://opensource.org/licenses/MIT)**
