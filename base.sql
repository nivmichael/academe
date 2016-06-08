-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2016 at 09:27 AM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `base`
--

-- --------------------------------------------------------

--
-- Table structure for table `--type_user_params`
--

CREATE TABLE IF NOT EXISTS `--type_user_params` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `p_name` varchar(255) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `css`
--

CREATE TABLE IF NOT EXISTS `css` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `property` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `css`
--

INSERT INTO `css` (`id`, `property`, `value`) VALUES
(1, 'main_color', '#5D2C87'),
(2, 'logo', 'http://cims.nyu.edu/~oza/NYULogo.png');

-- --------------------------------------------------------

--
-- Table structure for table `doc_param`
--

CREATE TABLE IF NOT EXISTS `doc_param` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `doc_type_id` mediumint(9) NOT NULL,
  `doc_sub_type` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_type_id` (`doc_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `doc_param`
--

INSERT INTO `doc_param` (`id`, `name`, `slug`, `doc_type_id`, `doc_sub_type`, `created_at`, `updated_at`) VALUES
(1, 'education', 'Education', 1, 'jobseeker', NULL, NULL),
(2, 'education', 'Education', 2, NULL, NULL, NULL),
(3, 'employment', 'Employment', 1, 'jobseeker', NULL, NULL),
(4, 'employment', 'Employment', 2, NULL, NULL, NULL),
(5, 'career_goals', 'Career Goals', 1, 'jobseeker', NULL, NULL),
(6, 'career_goals', 'Career Goals', 2, NULL, NULL, NULL),
(7, 'company', 'Company', 1, 'employer', NULL, NULL),
(8, 'files', 'Files', 1, 'jobseeker', NULL, NULL),
(9, 'files', 'Files', 1, 'employer', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `doc_type`
--

CREATE TABLE IF NOT EXISTS `doc_type` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `doc_type`
--

INSERT INTO `doc_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'user', NULL, NULL),
(2, 'post', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `param`
--

CREATE TABLE IF NOT EXISTS `param` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `authorized` tinyint(1) NOT NULL DEFAULT '1',
  `position` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `type_id` mediumint(9) DEFAULT NULL,
  `doc_param_id` mediumint(9) DEFAULT NULL,
  `param_parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_param_id` (`doc_param_id`),
  KEY `type_id` (`type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=32 ;

--
-- Dumping data for table `param`
--

INSERT INTO `param` (`id`, `authorized`, `position`, `name`, `slug`, `type_id`, `doc_param_id`, `param_parent_id`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 'degree', 'Degree', 2, 1, NULL, NULL, NULL),
(2, 1, 1, 'major', 'Major', 2, 1, 1, NULL, NULL),
(3, 1, 2, 'minor', 'Minor', 2, 1, 2, NULL, NULL),
(4, 1, 3, 'start_date', 'Start Date', 7, 1, NULL, NULL, NULL),
(5, 1, 4, 'end_date', 'End Date', 7, 1, NULL, NULL, NULL),
(6, 1, 0, 'degree', 'Degree', 2, 2, NULL, NULL, NULL),
(7, 1, 1, 'major', 'Major', 2, 2, 6, NULL, NULL),
(8, 1, 2, 'minor', 'Minor', 2, 2, 7, NULL, NULL),
(9, 1, 3, 'start_date', 'Start Date', 7, 2, NULL, NULL, NULL),
(10, 1, 4, 'end_date', 'End Date', 7, 2, NULL, NULL, NULL),
(11, 1, 0, 'main_field', 'Main Field', 2, 3, NULL, NULL, NULL),
(12, 1, 1, 'profession', 'Profession', 2, 3, 11, NULL, NULL),
(13, 1, 2, 'start_date', 'Start Date', 7, 3, NULL, NULL, NULL),
(14, 1, 3, 'end_date', 'End Date', 7, 3, NULL, NULL, NULL),
(15, 1, 0, 'main_field', 'Main Field', 2, 4, NULL, NULL, NULL),
(16, 1, 1, 'profession', 'Profession', 2, 4, 15, NULL, NULL),
(17, 1, 2, 'start_date', 'Start Date', 7, 4, NULL, NULL, NULL),
(18, 1, 3, 'end_date', 'End Date', 7, 4, NULL, NULL, NULL),
(19, 1, 0, 'main_field', 'Main Field', 2, 5, NULL, NULL, NULL),
(20, 1, 1, 'profession', 'Profession', 2, 5, 19, NULL, NULL),
(21, 1, 2, 'job_title', 'Job Title', 2, 5, NULL, NULL, NULL),
(22, 1, 3, 'language', 'Language', 2, 5, NULL, NULL, NULL),
(23, 1, 4, 'location', 'Location', 1, 5, NULL, NULL, NULL),
(24, 1, 5, 'available_from', 'Available From', 7, 5, NULL, NULL, NULL),
(25, 1, NULL, 'main_field', 'Main Field', 2, 6, NULL, NULL, NULL),
(26, 1, NULL, 'profession', 'Profession', 2, 6, 25, NULL, NULL),
(27, 1, 0, 'job_title', 'Job Title', 2, 6, NULL, NULL, NULL),
(28, 1, 1, 'language', 'Language', 2, 6, NULL, NULL, NULL),
(29, 1, 2, 'location', 'Location', 1, 6, NULL, NULL, NULL),
(30, 1, NULL, 'profile_picture', 'Profile Picture', 6, 8, NULL, NULL, NULL),
(31, 1, NULL, 'company_logo', 'Company Logo', 6, 9, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `param_type`
--

CREATE TABLE IF NOT EXISTS `param_type` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `param_type`
--

INSERT INTO `param_type` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'text', NULL, NULL),
(2, 'select', NULL, NULL),
(3, 'checkbox', NULL, NULL),
(4, 'checklist', NULL, NULL),
(5, 'textarea', NULL, NULL),
(6, 'files', NULL, NULL),
(7, 'date', NULL, NULL),
(8, 'cv', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `param_value`
--

CREATE TABLE IF NOT EXISTS `param_value` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `param_id` mediumint(9) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `param_id` (`param_id`),
  KEY `param_name` (`value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('dor@acade-me.co.il', '9e118e971dc7783029f6d06c19570a3261b6a49f3e310c6a2c93a9e086bae5e0', '2016-02-21 11:37:08');

-- --------------------------------------------------------

--
-- Table structure for table `sys_param_values`
--

CREATE TABLE IF NOT EXISTS `sys_param_values` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `doc_type` mediumint(9) NOT NULL DEFAULT '12',
  `ref_id` mediumint(9) unsigned NOT NULL,
  `param_id` mediumint(9) NOT NULL,
  `iteration` tinyint(4) DEFAULT NULL,
  `value_short` text,
  `value_long` text,
  `value_ref` int(9) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `doc_type` (`doc_type`,`ref_id`,`param_id`),
  KEY `doc_type_2` (`doc_type`),
  KEY `ref_user_id` (`ref_id`),
  KEY `param_id` (`param_id`),
  KEY `ref_user_id_2` (`ref_id`),
  KEY `value_ref` (`value_ref`),
  KEY `doc_type_3` (`doc_type`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `sys_param_values`
--

INSERT INTO `sys_param_values` (`id`, `doc_type`, `ref_id`, `param_id`, `iteration`, `value_short`, `value_long`, `value_ref`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, '', NULL, NULL, NULL, NULL),
(2, 1, 1, 2, 0, '', NULL, NULL, NULL, NULL),
(3, 1, 1, 3, 0, '', NULL, NULL, NULL, NULL),
(4, 1, 1, 4, 0, '', NULL, NULL, NULL, NULL),
(5, 1, 1, 5, 0, '', NULL, NULL, NULL, NULL),
(6, 1, 1, 0, 0, NULL, NULL, NULL, NULL, NULL),
(7, 1, 1, 11, 0, '', NULL, NULL, NULL, NULL),
(8, 1, 1, 12, 0, '', NULL, NULL, NULL, NULL),
(9, 1, 1, 13, 0, '', NULL, NULL, NULL, NULL),
(10, 1, 1, 14, 0, '', NULL, NULL, NULL, NULL),
(11, 1, 1, 19, 0, '', NULL, NULL, NULL, NULL),
(12, 1, 1, 20, 0, '', NULL, NULL, NULL, NULL),
(13, 1, 1, 21, 0, '', NULL, NULL, NULL, NULL),
(14, 1, 1, 22, 0, '', NULL, NULL, NULL, NULL),
(15, 1, 1, 23, 0, '', NULL, NULL, NULL, NULL),
(16, 1, 1, 24, 0, '', NULL, NULL, NULL, NULL),
(17, 1, 1, 30, 0, '', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `type_post`
--

CREATE TABLE IF NOT EXISTS `type_post` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `description_short` text NOT NULL,
  `description` text NOT NULL,
  `authorized` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `type_user`
--

CREATE TABLE IF NOT EXISTS `type_user` (
  `id` mediumint(9) unsigned NOT NULL AUTO_INCREMENT,
  `role` set('user','admin','','') NOT NULL,
  `type` enum('tech-admin','system-admin','system-manager','user') NOT NULL DEFAULT 'user',
  `subtype` text,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `password_new` varchar(255) DEFAULT NULL,
  `first_name` varchar(15) DEFAULT NULL,
  `last_name` varchar(15) DEFAULT NULL,
  `gender` set('male','female','','') NOT NULL,
  `martial_status` varchar(255) DEFAULT NULL,
  `education_status` set('student','graduate','intern','') DEFAULT NULL,
  `street_1` varchar(256) DEFAULT NULL,
  `city` varchar(25) DEFAULT NULL,
  `state` varchar(25) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `country` varchar(25) DEFAULT NULL,
  `phone_1` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `date_of_birth` timestamp NULL DEFAULT NULL,
  `registration` timestamp NULL DEFAULT NULL,
  `last_login` timestamp NULL DEFAULT NULL,
  `send_newsletters` tinyint(1) NOT NULL,
  `send_notifications` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `remember_token` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `send_newsletters` (`send_newsletters`),
  KEY `send_notifications` (`send_notifications`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `type_user`
--

INSERT INTO `type_user` (`id`, `role`, `type`, `subtype`, `status`, `email`, `password`, `password_new`, `first_name`, `last_name`, `gender`, `martial_status`, `education_status`, `street_1`, `city`, `state`, `zipcode`, `country`, `phone_1`, `mobile`, `date_of_birth`, `registration`, `last_login`, `send_newsletters`, `send_notifications`, `created_at`, `updated_at`, `remember_token`) VALUES
(1, '', 'user', 'jobseeker', 'active', 'dorshoham88@gmail.com', '$2y$10$yUx87Pyl0Py8rSMc.F9ha.54FvMhaQrh2MEQwLSPN8bVPECDcwcQW', NULL, 'dor', 'shoam', '', 'married', 'student', '', '', '', '', '', '', '', '0000-00-00 00:00:00', NULL, '2016-04-12 03:42:43', 0, 0, '2016-04-12 03:41:20', '2016-04-12 03:42:43', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
