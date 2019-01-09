DROP DATABASE IF EXISTS paybills_db;
CREATE DATABASE paybills_db;
USE paybills_db;

CREATE TABLE category (
	id int NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	name varchar(255) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP,
	PRIMARY KEY (id)
);

CREATE TABLE bills (
	id int NOT NULL AUTO_INCREMENT,
	categoryId int NOT NULL,
	userId int NOT NULL,
	status TINYINT(1) NOT NULL,
	amount INT NULL,
	title varchar(255) NOT NULL,
	createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP,
	PRIMARY KEY (id),
	INDEX (userId),
	INDEX (categoryId)
);