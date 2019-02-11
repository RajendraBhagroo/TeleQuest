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
  - [Features](#features)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Config File](#config-file)
    - [Default Development Ports](#default-development-ports)
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

> Install all npm packages

```shell
$ cd TeleQuest/ 
$ npm run install-script
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

### Config File

>Folder structure

<pre>
config/
	keys.js
</pre>

> keys.js

```javascript
module.exports = {
  mongoURI: "<INSERT URI KEY HERE>"
};
```

### Default Development Ports

> Server : http://localhost:3001

> Client : http://localhost:3000


## Tests

## Contributing

> To get started...
- 🔃 Create a new pull request using our <a href="https://github.com/RajendraBhagroo/TeleQuest/blob/master/.github/ISSUE_TEMPLATE/feature_request.md" target="_blank">`Template`</a>


## Team

> Core development team

|                <a href="https://github.com/RajendraBhagroo" target="_blank">**RajendraBhagroo**</a>                |       <a href="https://github.com/gint0kix" target="_blank">**Chris**</a>       |         <a href="https://github.com/Gold-Turtle" target="_blank">**Kim**</a>          |
| :----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: |
| [![Rajendra Bhagroo](https://avatars1.githubusercontent.com/u/18294827?s=200)](https://github.com/RajendraBhagroo) |                  [![Chris](LINK)](https://github.com/gint0kix)                  |                    [![Kim](LINK)](https://github.com/Gold-Turtle)                     |
|           <a href="https://github.com/RajendraBhagroo" target="_blank">`github.com/RajendraBhagroo`</a>            | <a href="https://github.com/gint0kix" target="_blank">`github.com/gint0kix`</a> | <a href="https://github.com/Gold-Turtle" target="_blank">`github.com/Gold-Turtle`</a> |

## License

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

- **[GNU Affero General Public License v3.0](https://www.gnu.org/licenses/agpl.txt)**
