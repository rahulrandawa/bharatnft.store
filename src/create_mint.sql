-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 24, 2022 at 10:27 AM
-- Server version: 5.7.38
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bharatnft_bharat_nft`
--

-- --------------------------------------------------------

--
-- Table structure for table `create_mint`
--

CREATE TABLE `create_mint` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `token_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preview_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `chain` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '1=ETH,2=BNB',
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `royalty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mint_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '1=fixed_price,2=auction,3=bid',
  `price` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aucation_timestamp` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aucation_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mint_status` int(11) NOT NULL DEFAULT '0' COMMENT '0=marketplace,1=not marketplace',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `create_mint`
--

INSERT INTO `create_mint` (`id`, `user_id`, `token_id`, `image`, `preview_image`, `name`, `description`, `chain`, `category`, `royalty`, `mint_type`, `price`, `aucation_timestamp`, `aucation_date`, `mint_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '1', 'images/lvJR3SD9sCUAmPPGT07OeSHjTvzJIDaRSqg5mSaB.png', NULL, 'NFT', 'NFT', 'ETH', 'artwork', '3', '1', '0.002', ' ', '18 June 2022 11:28 AM', 0, '2022-06-18 11:29:09', '2022-06-18 11:29:09', NULL),
(2, 1, '2', 'images/6e0p4NMa3fjh19XBX0mqxdsF5geNYt3rx0YBIBIw.jpg', NULL, 'Ganesh', 'Ganesh', 'ETH', 'photography', '2', '1', '0.03', ' ', '18 June 2022 11:31 AM', 0, '2022-06-18 11:32:24', '2022-06-18 11:32:24', NULL),
(3, 1, '3', 'images/xTPPbB8UDXPDFHNkpd870nYkckUUwCDwK35t5eYy.gif', NULL, 'NFT', 'NFT', 'ETH', 'video', '3', '2', '0.03', '1655622240', '19 June 2022 12:34 PM', 0, '2022-06-18 12:36:37', '2022-06-18 12:36:37', NULL),
(4, 3, '4', 'images/5xKpsQwj4nOr3ZmuaHGUfENNPz4LHGrLwVS6zxvf.mp3', 'images/lvJR3SD9sCUAmPPGT07OeSHjTvzJIDaRSqg5mSaB.png', 'SONG', 'asdasd', 'ETH', 'audio', '2', '1', '0.002', ' ', '18 June 2022 1:01 PM', 0, '2022-06-18 13:03:51', '2022-06-18 13:03:51', NULL),
(5, 4, '5', 'images/27EuVLMtxBVV5YlyZmaHzawo4WS1dcDdXF5LjNNJ.png', NULL, 'AA nft', 'dfgfdsdfd', 'ETH', 'photography', '2', '2', '0.005', '1655559000', '18 June 2022 7:00 PM', 0, '2022-06-18 18:44:20', '2022-06-18 18:44:20', NULL),
(6, 1, '7', 'images/gs21D70djN86vhk7y0ZTpjlYsPt3eTWA9EDpSOoG.png', ' ', 'NFT', 'NFT NFT', 'ETH', 'photography', '2', '2', '0.01', '1656508200', '29 June 2022 6:40 PM', 0, '2022-06-21 18:29:55', '2022-06-21 18:29:55', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `create_mint`
--
ALTER TABLE `create_mint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `create_mint_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `create_mint`
--
ALTER TABLE `create_mint`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `create_mint`
--
ALTER TABLE `create_mint`
  ADD CONSTRAINT `create_mint_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
