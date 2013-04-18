-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Апр 18 2013 г., 12:02
-- Версия сервера: 5.5.27
-- Версия PHP: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `scand`
--

-- --------------------------------------------------------

--
-- Структура таблицы `employers`
--

CREATE TABLE IF NOT EXISTS `employers` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` text NOT NULL,
  `surname` text NOT NULL,
  `date_of_birth` datetime NOT NULL,
  `salary` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=119 ;

--
-- Дамп данных таблицы `employers`
--

INSERT INTO `employers` (`id`, `first_name`, `surname`, `date_of_birth`, `salary`) VALUES
(1, 'Ivan', 'Ivanov', '2011-03-23 00:00:00', 1500),
(2, 'Petr', 'Petrov', '2012-11-07 00:00:00', 1200),
(3, 'Sidor ', 'Sidorov', '2013-04-09 00:00:00', 1000),
(5, 'Konstantin', 'Konstantinov', '2013-02-06 00:00:00', 1800),
(7, 'Michail', 'Galkin', '2012-12-14 00:00:00', 3500),
(8, 'James', 'Hetfield', '2012-11-13 00:00:00', 2500),
(9, 'Paula', 'Abdul', '2012-12-19 00:00:00', 1800),
(10, 'Adele', 'Etkins', '2013-01-31 00:00:00', 2800),
(11, 'Albano', 'Corrizi', '2012-10-23 00:00:00', 1800),
(12, 'Justin', 'Baber', '2013-04-22 00:00:00', 2100),
(13, 'Christofer', 'Brown', '2013-01-14 00:00:00', 3300),
(14, 'Test1', 'Test1', '2013-01-14 00:00:00', 3300),
(15, 'Test2', 'Test2', '2013-01-14 00:00:00', 33010),
(21, 'Test8', 'Test8', '2013-01-14 00:00:00', 33200),
(25, 'Test12', 'Test12', '2013-01-14 00:00:00', 34300),
(26, 'Test13', 'Test13', '2013-01-14 00:00:00', 33001),
(27, 'Test14', 'Test14', '2013-01-14 00:00:00', 33020),
(28, 'Test15', 'Test15', '2013-01-14 00:00:00', 343030),
(29, 'Test16', 'Test16', '2013-01-14 00:00:00', 33100),
(32, 'Test19', 'Test19', '2013-01-14 00:00:00', 33400),
(33, 'Test20', 'Test20', '2013-01-14 00:00:00', 33200),
(38, 'Test25', 'Test24', '2013-01-14 00:00:00', 33100),
(39, 'Test26', 'Test25', '2013-01-14 00:00:00', 33200),
(40, 'Test27', 'Test26', '2013-01-14 00:00:00', 323010),
(44, 'Test31', 'Test30', '2013-01-14 00:00:00', 33300),
(45, 'Test32', 'Test31', '2013-01-14 00:00:00', 33030),
(46, 'Test33', 'Test32', '2013-01-14 00:00:00', 33300),
(47, 'Test34', 'Test33', '2013-01-14 00:00:00', 33100),
(48, 'Test35', 'Test34', '2013-01-14 00:00:00', 33010),
(49, 'Test36', 'Test35', '2013-01-14 00:00:00', 31300),
(50, 'Test37', 'Test36', '2013-01-14 00:00:00', 33010),
(51, 'Test38', 'Test37', '2013-01-14 00:00:00', 33010),
(52, 'Test39', 'Test38', '2013-01-14 00:00:00', 31300),
(53, 'Test40', 'Test39', '2013-01-14 00:00:00', 33010),
(54, 'Test41', 'Test40', '2013-01-14 00:00:00', 31300),
(55, 'Test42', 'Test41', '2013-01-14 00:00:00', 33001),
(56, 'Test43', 'Test42', '2013-01-14 00:00:00', 31300),
(57, 'Test44', 'Test43', '2013-01-14 00:00:00', 33100),
(58, 'Test45', 'Test44', '2013-01-14 00:00:00', 33100),
(74, 'Test60', 'Test60', '2013-01-14 00:00:00', 3300),
(75, 'Test61', 'Test61', '2013-01-14 00:00:00', 34300),
(76, 'Test62', 'Test62', '2013-01-14 00:00:00', 33400),
(77, 'Test63', 'Test63', '2013-01-14 00:00:00', 33030),
(78, 'Test64', 'Test64', '2013-01-14 00:00:00', 33400),
(79, 'Test65', 'Test64', '2013-01-14 00:00:00', 34300),
(80, 'Test66', 'Test65', '2013-01-14 00:00:00', 3300),
(81, 'Test67', 'Test66', '2013-01-14 00:00:00', 33400),
(82, 'Test67', 'Test67', '2013-01-14 00:00:00', 33400),
(83, 'Test68', 'Test68', '2013-01-14 00:00:00', 33040),
(84, 'Test69', 'Test69', '2013-01-14 00:00:00', 33040),
(85, 'Test70', 'Test70', '2013-01-14 00:00:00', 3300),
(110, 'Test95', 'Test95', '2013-01-14 00:00:00', 33300),
(111, 'Test96', 'Test96', '2013-01-14 00:00:00', 33020),
(112, 'Test97', 'Test97', '2013-01-14 00:00:00', 33040),
(113, 'tttt3', 'tttt3', '1999-12-12 00:00:00', 558),
(114, 'Kilan', 'Kazuil', '2000-03-20 00:00:00', 1500),
(115, 'Kilan', 'Kazuil', '2000-01-30 00:00:00', 1500),
(116, 'Asor', 'Bulaned', '1998-10-15 00:00:00', 1200),
(117, 'Ase', 'Birka', '1990-02-05 00:00:00', 1300),
(118, 'aaa4', 'aaa', '1990-02-05 00:00:00', 1000);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
