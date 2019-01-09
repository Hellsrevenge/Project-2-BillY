INSERT INTO category (id, name) VALUES (1, 'traffic tickets'),(2,'medical bills'),(3,'other fines');

INSERT INTO users (email, password, name)
VALUES ('aaa@gmail.com', '1234', 'John'),
('bbb@gmail.com','4321','Max'),
('ccc@gmail.com','0987','Lena');


INSERT INTO bills (categoryId,userId,status,amount,title)
VALUES
(1,1,0,300,'red light violation'),
(2,1,0,20000,'Zuckenberg hospital medical bill'),
(3,1,0,10000, 'indicent exposure'),
(3,2,0,15000,'battery incident administrative fine'),
(1,3,0,179,'parking violation');