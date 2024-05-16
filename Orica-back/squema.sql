CREATE TABLE statusQuotation (
  id SERIAL PRIMARY KEY,
  quoteStatus VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE statusSupport (
  id SERIAL PRIMARY KEY,
  supportStatus VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE role (
  id SERIAL PRIMARY KEY,
  typeRole VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE userStatus (
  id SERIAL PRIMARY KEY,
  status VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE supportRole (
  id SERIAL PRIMARY KEY,
  typeSupport VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE listProducts (
  id SERIAL PRIMARY KEY,
  product VARCHAR(150) NOT NULL,
  visible BOOLEAN DEFAULT true
);
CREATE TABLE listSupportType (
  id SERIAL PRIMARY KEY,
  type VARCHAR(150) NOT NULL,
  visible BOOLEAN DEFAULT true
);
CREATE TABLE Ports (
  id SERIAL PRIMARY KEY,
  port VARCHAR(150) NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true
);
-----------------------------------------------
--
-----------------------------------------------
INSERT INTO statusQuotation (quoteStatus)
VALUES ('Open'),
  ('In porcess'),
  ('Approved'),
  ('On shiping'),
  ('Complete');
INSERT INTO statusSupport (supportStatus)
VALUES ('Open'),
  ('In porcess'),
  ('Solve');
INSERT INTO role (typeRole)
VALUES ('SuperAdmin'),
  ('Admin'),
  ('ChiefCommercial'),
  ('Commercial'),
  ('Customer'),
  ('Proforma'),
  ('ChiefProforma'),
  ('Shipment'),
  INSERT INTO userStatus (status)
VALUES ('Active'),
  ('In Review'),
  ('Inactive');
INSERT INTO supportRole (typeSupport)
VALUES ('Commercial'),
  ('Customer service'),
  ('Management');
INSERT INTO listProducts(product)
VALUES('Truck'),
  ('excavator'),
  ('forklift');
INSERT INTO listSupportType(type)
VALUES('My order has not arrived '),
  ("I don't have my quote "),
  ('I have no answer '),
  ('Please contact me ');
INSERT INTO Ports (port)
VALUES ('Perú (Lurin)'),
  ('Mexico (Cuatrocienagas)'),
  ('Australia'),
  ('Rusia');
-----------------------------------------------
--
-----------------------------------------------
CREATE SEQUENCE accountstatement_secualize START 1;
CREATE SEQUENCE product_secualize START 100;
CREATE SEQUENCE shipment_secualize START 100;
CREATE SEQUENCE quote_secualize START 1000;
CREATE SEQUENCE proforma_secualize START 1000;
CREATE SEQUENCE support_secualize START 10000;
CREATE SEQUENCE divisions_secualize START 10000;
CREATE SEQUENCE ordername_secualize START 100000;
-----------------------------------------------
--
-----------------------------------------------
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  lastname VARCHAR(150) NOT NULL,
  username VARCHAR(150) NOT NULL,
  password VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  idRole INT NOT NULL,
  idstatus INT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  FOREIGN KEY (idRole) REFERENCES role(id),
  FOREIGN KEY (idstatus) REFERENCES userStatus(id)
);
CREATE TABLE quote (
  id INT PRIMARY KEY DEFAULT nextval('quote_secualize'),
  statusId INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  port VARCHAR(150) NOT NULL,
  phone VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  observations TEXT,
  subtotal INT DEFAULT 0,
  taxes DOUBLE PRECISION DEFAULT 0,
  total INT DEFAULT 0,
  idCustumer INT NOT NULL,
  idCommercial INT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  FOREIGN KEY (statusId) REFERENCES statusQuotation(id)
);
CREATE TABLE products (
  id INT PRIMARY KEY DEFAULT nextval('product_secualize'),
  product VARCHAR(150) NOT NULL,
  quantity INT NOT NULL,
  price INT DEFAULT 0,
  total INT DEFAULT 0,
  quoteId INT NOT NULL,
  FOREIGN KEY (quoteId) REFERENCES quote(id)
);
CREATE TABLE support (
  id INT PRIMARY KEY DEFAULT nextval('support_secualize'),
  type VARCHAR(150) NOT NULL,
  subject VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  idCustumer INT NOT NULL,
  idSupportType INT NOT NULL,
  idSupportStatus INT NOT NULL,
  FOREIGN KEY (idSupportType) REFERENCES supportRole(id),
  FOREIGN KEY (idSupportStatus) REFERENCES statusSupport(id)
);
CREATE TABLE proforma (
  id INT PRIMARY KEY DEFAULT nextval('proforma_secualize'),
  idQuote INT NOT NULL,
  paganName VARCHAR(150) NOT NULL,
  paganLastname VARCHAR(150) NOT NULL,
  bank VARCHAR(150) NOT NULL,
  date TIMESTAMP DEFAULT NOW(),
  accountNumber INT NOT NULL,
  visible BOOLEAN NOT NULL DEFAULT true,
  FOREIGN KEY (idQuote) REFERENCES quote(id)
);
CREATE TABLE AccountStatement (
  id INT PRIMARY KEY DEFAULT nextval('accountstatement_secualize'),
  account VARCHAR(150) NOT NULL,
  glAccount VARCHAR(150),
  billingDocument VARCHAR(150),
  assignment VARCHAR(150),
  documentNumber VARCHAR(150),
  postingDate DATE,
  netDueDate DATE,
  arrearsbyNetDueDate VARCHAR(150),
  amountinDoc VARCHAR(150),
  documentCurrency VARCHAR(150),
  localCurrency VARCHAR(150),
  reference VARCHAR(150),
  documentType VARCHAR(150),
  text TEXT,
  visible BOOLEAN DEFAULT true
);
CREATE TABLE Shipments (
  id INT PRIMARY KEY DEFAULT nextval('shipment_secualize'),
  source VARCHAR(150) NOT NULL,
  status VARCHAR(150),
  departure VARCHAR(150),
  arrive VARCHAR(150),
  vessel VARCHAR(150),
  product VARCHAR(150),
  netWeight VARCHAR(150),
  grossWeigth VARCHAR(150),
  purpose VARCHAR(150),
  billoflading VARCHAR(150),
  pol VARCHAR(150),
  pod VARCHAR(150),
  visible BOOLEAN DEFAULT true
);
CREATE TABLE Divisions (
  id INT PRIMARY KEY DEFAULT nextval('divisions_secualize'),
  quantity VARCHAR(150) NOT NULL,
  price double precision NOT NULL,
  date DATE NOT NULL,
  idPort INT NOT NULL,
  idQuote INT NOT NULL,
  idProduct INT NOT NULL,
  selectedOrder BOOLEAN,
  OrderName VARCHAR(150),
  total INT NOT NULL,
  visible BOOLEAN DEFAULT true,
  FOREIGN KEY (idPort) REFERENCES ports(id),
  FOREIGN KEY (idQuote) REFERENCES quote(id),
  FOREIGN KEY (idProduct) REFERENCES products(id)
);