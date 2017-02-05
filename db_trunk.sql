-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Feb 04, 2017 at 06:23 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `mydevnxl_portfolio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `userRatings`
--

CREATE TABLE `userRatings` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `message` varchar(1000) NOT NULL,
  `rating` int(11) NOT NULL,
  `RatingRead` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userRatings`
--

INSERT INTO `userRatings` (`id`, `email`, `message`, `rating`, `RatingRead`) VALUES
(1, 'me@gmail.com', 'I love your website because There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don''t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn''t anything embarrassing hidden in the middle of text.', 4, 1),
(2, 's@g.cm', 'I love', 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userRatings`
--
ALTER TABLE `userRatings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `userRatings`
--
ALTER TABLE `userRatings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=56;