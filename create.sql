create database araujoimobiliaria;

use araujoimobiliaria;

create table user ( 
id varchar(36) not null primary key, 
name varchar(50) not null, 
email varchar(50) not null, 
password varchar(50) not null,
phone int not null
);

create table owner ( 
id varchar(36) not null primary key, 
name varchar(50) not null, 
phone int not null, 
email varchar(50) not null 
);

create table property ( 
id varchar(36) not null primary key, 
title varchar(50) not null, 
privateTitle varchar(50) not null, 
description varchar(50) not null, 
privateDescription varchar(50) not null, 
publishDate datetime not null, 
userId varchar(36) not null, 
ownerId varchar(36) not null, 
foreign key (userId) references user (id), 
foreign key (ownerId) references owner (id) 
);


create table address (
id varchar(36) not null primary key,
propertyId varchar(36) not null,
cep int not null,
state varchar(50) not null,
city varchar(50) not null,
district varchar(50) not null,
street varchar(50) not null,
number int not null,
complement varchar(20) not null,
foreign key (propertyId) references property (id)
);

create table feature (
id varchar(36) not null primary key,
type varchar(10) not null,
description varchar(50) not null
);

create table propertyFeature (
id varchar(36) not null primary key,
propertyId varchar(36) not null,
featureId varchar(36) not null,
foreign key (propertyId) references property (id),
foreign key (featureId) references feature (id)
);

create table financial (
id varchar(36) not null primary key,
propertyId varchar(36) not null,
sale boolean not null,
rent boolean not null,
purchaseMethod varchar(10) not null,
saleCost long not null,
rentCost int not null,
purchasingDetails varchar(50) not null,
condominiumCost int not null,
iptuCost int not null,
register varchar(50) not null,
registration varchar(50) not null,
transcription varchar(50) not null,
regularDocumentation boolean not null,
documentationObservation varchar(100) not null,
acceptsExchange boolean not null,
foreign key (propertyId) references property (id) 
);

create table infrastructure (
id varchar(36) not null primary key,
propertyId varchar(36) not null,
type varchar(50) not null,
subtype varchar(50) not null,
bathrooms int not null,
sleepingRooms int not null,
garageSpots int not null,
area int not null,
foreign key (propertyId) references property (id)
);