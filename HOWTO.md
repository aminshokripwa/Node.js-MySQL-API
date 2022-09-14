Ensure you create directory in your directory.

`git clone https://github.com/aminshokripwa/Node.js-MySQL-API.git`

## Download the packages used to create this rest API
Run the following Node.js commands to install all the necessary packages.

```
npm install
```

## Setting configuration file
Edit .env file in the root of the project and set the parameters for connect to database

## Running the project (As developer `npm run start:dev`)

`npm run start`

## Database Table Creation Statement
Use the following DDL (Data Definition Language) to create the users table.

``` SQL
CREATE TABLE IF NOT EXISTS `blogs` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  published BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

## API Endpoints & Usage

To be able to add new post to blog

* POST    `api/v1/blog` send title and description of new post

```
{
    "title": "Node Rest API",
    "description": "Rest API for connect to MySQL and show stored data"
}
```

*** Output ***

Note that the current implementation still returns the sent data and its id

```
{
    "data": {
    "title": "Node Rest API",
    "description": "Rest API for connect to MySQL and show stored data"
    },
    "message": "success",
    "status": true
}
```

* GET     `api/v1/blog?page=1&limit=4` Retrieving the blogs
* GET     `api/v1/blog?title=API&page=1&limit=4` Retrieving blogs include title API
* GET     `api/v1/blog/1` Retrieve blog with id = 1
* GET     `api/v1/blog/published` Published blogs
* PUT     `api/v1/blog/1` Update the blog with id = 1
* DELETE  `api/v1/blog/1` Delete the blog with id = 1
