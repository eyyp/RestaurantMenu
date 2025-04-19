-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 20 Kas 2024, 19:50:15
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `restaurant`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `admin_user`
--

CREATE TABLE `admin_user` (
  `user_id` varchar(36) NOT NULL,
  `user_name` varchar(40) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `password` varchar(20) NOT NULL,
  `create_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `admin_user`
--

INSERT INTO `admin_user` (`user_id`, `user_name`, `restaurant_id`, `password`, `create_date`) VALUES
('7ca0543d-178f-4531-8d44-e41766197acf', 'artukbeyyönetim', '749c19c4-916a-471a-bdb9-81c1bdf17edc', 'Artukbey', '20-11-2024');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cart`
--

CREATE TABLE `cart` (
  `cart_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `total` varchar(10) NOT NULL,
  `create_date` varchar(35) NOT NULL,
  `table_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `cart`
--

INSERT INTO `cart` (`cart_id`, `user_id`, `restaurant_id`, `total`, `create_date`, `table_id`) VALUES
('11ddb5c0-a776-46a1-b4a4-9c694df737ed', '728b093d-222e-48fa-a4a5-5d64d4872f76', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '0', '2024-11-20 21:11:42.767', '11156817-0fac-48d6-985c-570343d76a11');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cart_item`
--

CREATE TABLE `cart_item` (
  `item_id` varchar(36) NOT NULL,
  `cart_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `cart_item_property`
--

CREATE TABLE `cart_item_property` (
  `cart_item_property_id` varchar(36) NOT NULL,
  `cart_item_id` varchar(36) NOT NULL,
  `property_id` varchar(36) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `categorys`
--

CREATE TABLE `categorys` (
  `category_id` varchar(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `categorys`
--

INSERT INTO `categorys` (`category_id`, `title`, `restaurant_id`, `create_date`) VALUES
('985bf90b-dea6-49a5-a8e0-15ada6d12533', 'Kahveler', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '20-11-2024'),
('0ca0a5a8-1aab-4ccc-9237-5fbb866ca6d5', 'Çaylar', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '20-11-2024'),
('408c7031-4559-4728-90ca-91fd9c903996', 'İçecekler', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '02-12-2015'),
('7e6e8927-f87f-4caf-89d3-b71e0c3a4405', 'Klasik Soğuklar', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '20-11-2024'),
('f0edc424-6f3d-4f01-b313-25f4f4fac858', 'Tatlılar', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '20-11-2024'),
('38abad7a-c92c-4271-a4cf-f53a3f2e3486', 'Aperatifler', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '20-11-2024');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `order_item`
--

CREATE TABLE `order_item` (
  `order_item_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `order_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `piece` varchar(10) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `order_item_property`
--

CREATE TABLE `order_item_property` (
  `order_item_property_id` varchar(36) NOT NULL,
  `order_item_id` varchar(36) NOT NULL,
  `property_id` varchar(36) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product`
--

CREATE TABLE `product` (
  `product_id` varchar(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `exp` varchar(100) NOT NULL,
  `price` varchar(10) NOT NULL,
  `category_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `summary` varchar(250) NOT NULL,
  `active` varchar(2) NOT NULL,
  `video_url` varchar(200) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `product`
--

INSERT INTO `product` (`product_id`, `title`, `exp`, `price`, `category_id`, `restaurant_id`, `summary`, `active`, `video_url`, `create_date`) VALUES
('b73ad7d6-2ad8-44b6-866e-6e354f353a52', 'Ice Banana Latte', 'Soğuk lütfen ve muzun mükemmel birleşimi.', '155', '7e6e8927-f87f-4caf-89d3-b71e0c3a4405', '749c19c4-916a-471a-bdb9-81c1bdf17edc', 'Ferahlatıcı soğuk kahve, hafif tatlı ve doğal muz artmasıyla harmanlanarak, kremamsı bir içecek yaratır. Soğuk süt ve buzla serinletici bir deneyim sunan ile banana latte, kahve severler için hem tatlı hem de keyifli bir seçenek oluşturur.', '1', 'vJFR_GYZjSU', '2024-11-20 18:43:51.444'),
('4f0b2baf-5550-41b6-ae62-2adcb18881a3', 'İle Americano', 'Yoğun kahve tadı buzlu ile americano ile.', '105', '985bf90b-dea6-49a5-a8e0-15ada6d12533', '749c19c4-916a-471a-bdb9-81c1bdf17edc', 'Sade kahve tadını sevenler için enfes bir lezzet. Enerjiye ihtiyac duyanlar için önerimizdir :)', '1', 'vJFR_GYZjSU', '2024-11-20 20:29:27.538'),
('f558212d-4070-4fc8-bae5-0c305df1cb9a', 'White Coffee İle Cream', 'Kahve tutkunları için özel tasarlanmış, kreması ve lezzetli bir dondurmadır.', '145', 'f0edc424-6f3d-4f01-b313-25f4f4fac858', '749c19c4-916a-471a-bdb9-81c1bdf17edc', 'Geleneksel kahve tadından daha hafif bir deneyim sunan bu dondurma, beyaz kahve aromasını yoğun ama yumuşak bir şekilde içerir.', '1', 'vJFR_GYZjSU', '2024-11-20 20:48:33.411');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_photo`
--

CREATE TABLE `product_photo` (
  `product_photo_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `photo_url` varchar(300) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `product_property`
--

CREATE TABLE `product_property` (
  `property_id` varchar(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `product_property_type_id` varchar(36) NOT NULL,
  `create_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `product_property`
--

INSERT INTO `product_property` (`property_id`, `title`, `product_id`, `product_property_type_id`, `create_date`) VALUES
('203b43e9-c998-4479-b938-09782472a468', 'Sert', 'f558212d-4070-4fc8-bae5-0c305df1cb9a', '84b02454-490d-4b36-a2d8-115985d5dab7', '2024-11-20 20:48:33.'),
('17550284-6f4d-4063-90a1-f6ec00fc8928', 'Orta', 'f558212d-4070-4fc8-bae5-0c305df1cb9a', '84b02454-490d-4b36-a2d8-115985d5dab7', '2024-11-20 20:48:33.'),
('de38d412-7b0d-4fda-8e05-8f97649c0ca1', 'Yumuşak', 'f558212d-4070-4fc8-bae5-0c305df1cb9a', '84b02454-490d-4b36-a2d8-115985d5dab7', '2024-11-20 20:48:33.');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `property_type`
--

CREATE TABLE `property_type` (
  `product_property_type_id` varchar(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `number_choices` varchar(20) NOT NULL,
  `difficualty` varchar(20) NOT NULL,
  `create_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `property_type`
--

INSERT INTO `property_type` (`product_property_type_id`, `title`, `restaurant_id`, `number_choices`, `difficualty`, `create_date`) VALUES
('294c89c7-d896-4b87-95e2-52d41d0867a6', 'Aromalı', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '1', 'false', '2024-11-20 18:19:55.'),
('49367f63-9996-4574-8447-77f8e5aa35e0', 'Soğuk-Sıcak', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '1', '0', '2024-11-20 18:20:32.'),
('84b02454-490d-4b36-a2d8-115985d5dab7', 'Kahve Düzeyi', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '1', 'true', '2024-11-20 20:28:51.');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurant_id` varchar(36) NOT NULL,
  `title` varchar(40) NOT NULL,
  `active` varchar(2) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `restaurant`
--

INSERT INTO `restaurant` (`restaurant_id`, `title`, `active`, `create_date`) VALUES
('749c19c4-916a-471a-bdb9-81c1bdf17edc', 'Artuk Bey', '1', '20-11-2024');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `restaurant_order`
--

CREATE TABLE `restaurant_order` (
  `order_id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `total` varchar(40) NOT NULL,
  `piece` varchar(10) NOT NULL,
  `create_date` varchar(20) NOT NULL,
  `delivery` varchar(30) NOT NULL,
  `table_id` varchar(36) NOT NULL,
  `active` varchar(2) NOT NULL,
  `notes` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `restaurant_table`
--

CREATE TABLE `restaurant_table` (
  `table_id` varchar(36) NOT NULL,
  `title` varchar(25) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `create_date` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `restaurant_table`
--

INSERT INTO `restaurant_table` (`table_id`, `title`, `restaurant_id`, `create_date`) VALUES
('11156817-0fac-48d6-985c-570343d76a11', '1', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '2024-11-20 21:11:19.'),
('79211b35-b191-4285-8dff-e9e73c27095a', '2', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '2024-11-20 21:11:25.'),
('d31dc4a1-a72c-41ed-9f6f-d68fa264343d', '3', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '2024-11-20 21:11:28.'),
('2d543982-795b-41ae-b0e5-f90df51b93c9', '4', '749c19c4-916a-471a-bdb9-81c1bdf17edc', '2024-11-20 21:11:33.');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `users`
--

CREATE TABLE `users` (
  `user_id` varchar(36) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `restaurant_id` varchar(36) NOT NULL,
  `password` varchar(20) NOT NULL,
  `create_date` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

--
-- Tablo döküm verisi `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `restaurant_id`, `password`, `create_date`) VALUES
('728b093d-222e-48fa-a4a5-5d64d4872f76', 'artukbey', '749c19c4-916a-471a-bdb9-81c1bdf17edc', 'artukbey1910', '20-11-2024');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
