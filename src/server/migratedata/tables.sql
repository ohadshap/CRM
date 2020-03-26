USE sql_testing;

CREATE TABLE Owner (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(15)
);

CREATE TABLE Country (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE First_Contact (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    year INT,
    month INT,
    day INT
);

CREATE TABLE User (
    id VARCHAR(35) NOT NULL PRIMARY KEY,
    name VARCHAR(15),
    surname VARCHAR(15),
    email VARCHAR(35),
    firstContact INT,
    emailType VARCHAR(4),
    sold BOOLEAN,
    owner INT,
    country INT,

    FOREIGN KEY (firstContact) REFERENCES First_Contact(id),
    FOREIGN KEY (owner) REFERENCES Owner(id),
    FOREIGN KEY (country) REFERENCES Country(id)
);

CREATE TABLE User_Owner (
    u_id VARCHAR(35) NOT NULL,
    o_id INT NOT NULL,

    FOREIGN KEY (u_id) REFERENCES User(id),
    FOREIGN KEY (o_id) REFERENCES Owner(id)
);

-- DROP TABLE Country, First_Contact, Owner, User, User_Owner