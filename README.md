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
    - [Docker (Optional)](#docker-optional)
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

### Docker (Optional)
> Create image and run container
> 
```shell
$ cd TeleQuest/
$ docker build -t rajendrabhagroo/telequest .
$ docker run --name telequest -p 3001:3001 -p 3000:3000 -d rajendrabhagroo/telequest
```

> Teardown container

```shell
$ docker ps 
$ docker stop <CONTAINER ID>
```

## Features

## Usage

* Follow installation instructions prior to usage and ensure you are at project root directory

> Run application (Server And Client)

```shell
$ npm run app
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

- Config folder is located at the root of the project

> Folder structure

<pre>
config/
    .env
</pre>

> .env [Example]

```dosini
HOST=http://127.0.0.1
NODE_PORT=3001
MONGO_DB_URI=<Insert Your Mongo URI>
JWT_SECRET=<Insert Your Secret>
```

## Tests

## Contributing

> To get started...
- Review our <a href="https://github.com/RajendraBhagroo/TeleQuest/blob/master/CODE_OF_CONDUCT.md" target="_blank">`Code Of Conduct`</a>
- 🔃 Create a new pull request using our <a href="https://github.com/RajendraBhagroo/TeleQuest/blob/master/.github/CONTRIBUTOR_TEMPLATES/feature_request.md" target="_blank">`Template`</a>


## Team

> Core development team

|                <a href="https://github.com/RajendraBhagroo" target="_blank">**RajendraBhagroo**</a>                |       <a href="https://github.com/gint0kix" target="_blank">**Chris**</a>       |         <a href="https://github.com/Gold-Turtle" target="_blank">**Kim**</a>          |
| :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| [![Rajendra Bhagroo](https://avatars1.githubusercontent.com/u/18294827?s=200)](https://github.com/RajendraBhagroo) |                  [![Chris](LINK)](https://github.com/gint0kix)                  |                    [![Kim](LINK)](https://github.com/Gold-Turtle)                     |
|           <a href="https://github.com/RajendraBhagroo" target="_blank">`github.com/RajendraBhagroo`</a>            | <a href="https://github.com/gint0kix" target="_blank">`github.com/gint0kix`</a> | <a href="https://github.com/Gold-Turtle" target="_blank">`github.com/Gold-Turtle`</a> |

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

- **[Massachusetts Institute of Technology](http://opensource.org/licenses/MIT)**
