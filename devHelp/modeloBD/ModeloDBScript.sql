CREATE TABLE `product` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login_id` int,
  `name` varchar(255),
  `category_id` int,
  `comment` varchar(255),
  `provider_id` int,
  `price` double,
  `quantity` int,
  `date_in` datetime
);

CREATE TABLE `category` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login_id` int,
  `name` varchar(255)
);

CREATE TABLE `provider` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login_id` int,
  `name` varchar(255),
  `cel` int,
  `info` varchar(255),
  `per_price` double COMMENT 'porcentagem do fornecedor sobre os produtos'
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `login` varchar(255),
  `password` varchar(255)
);

ALTER TABLE `product` ADD FOREIGN KEY (`login_id`) REFERENCES `users` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

ALTER TABLE `product` ADD FOREIGN KEY (`provider_id`) REFERENCES `provider` (`id`);

ALTER TABLE `category` ADD FOREIGN KEY (`login_id`) REFERENCES `users` (`id`);

ALTER TABLE `provider` ADD FOREIGN KEY (`login_id`) REFERENCES `users` (`id`);
