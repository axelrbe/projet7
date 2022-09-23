# HotTakes

Recommended node version for installing packages on this project: 14.x
Recommended for being able to live reload project without restarting server: run in terminal `npm install -g nodemon`

## Development server

First use: run `npm install`
Run `nodemon` or `node server`

## Configuration

### -You have to create an empty "images" folder in your project root

### -You need to have mySql installed

### -Create in project root a file named ".env"

### -This file should contain the following code:

HOST=<localhost or web url if you host this backend>
USER=<username of your mySQL session, e.g:root>
PASSWORD=<password of your mySQL session, e.g:root>
DB=<name of the empty database you created on mySQL, e.g:groupomania>
JWT_SECRET=<whateverasyoulike>
