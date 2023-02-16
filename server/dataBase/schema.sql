-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`serves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`serves` (
  `id_serves` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
  `price` INT NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id_serves`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`availibility`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`availibility` (
  `idavailibility` INT NOT NULL AUTO_INCREMENT,
  `state` ENUM('Available', 'Not Available') NOT NULL DEFAULT 'Available',
  `serves_id_serves` INT NOT NULL,
  `date` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idavailibility`),
  INDEX `fk_availibility_serves1_idx` (`serves_id_serves` ASC) VISIBLE,
  CONSTRAINT `fk_availibility_serves1`
    FOREIGN KEY (`serves_id_serves`)
    REFERENCES `mydb`.`serves` (`id_serves`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id_user` VARCHAR(50) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `gender` ENUM('Male', 'Female') NULL DEFAULT NULL,
  `adress` VARCHAR(200) NULL DEFAULT NULL,
  `photo` VARCHAR(700) NULL DEFAULT NULL,
  `phone_number` VARCHAR(8) NULL DEFAULT NULL,
  `ville` ENUM('Tunis', 'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Touzeur', 'Zaghouan') NULL DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cart` (
  `id_cart` INT NOT NULL AUTO_INCREMENT,
  `payment_type` ENUM('Cash', 'Bank Card') NOT NULL,
  `date` VARCHAR(25) NULL DEFAULT 'Null',
  `user_id_user` VARCHAR(50) NOT NULL,
  `state` ENUM('done', 'not done') NOT NULL DEFAULT 'not done',
  PRIMARY KEY (`id_cart`),
  INDEX `fk_cart_user1_idx` (`user_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_cart_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`user` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reservation` (
  `id_reservation` INT NOT NULL AUTO_INCREMENT,
  `date` ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31') NOT NULL,
  `employer_id` VARCHAR(45) NULL DEFAULT NULL,
  `user_id_user` VARCHAR(50) NOT NULL,
  `serves_id_serves` INT NOT NULL,
  `cart_id_cart` INT NOT NULL,
  `time` VARCHAR(30) NULL DEFAULT NULL,
  `fromPlace` VARCHAR(30) NULL DEFAULT NULL,
  `toPlace` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`id_reservation`),
  INDEX `fk_reservation_user1_idx` (`user_id_user` ASC) VISIBLE,
  INDEX `fk_reservation_serves1_idx` (`serves_id_serves` ASC) VISIBLE,
  INDEX `fk_reservation_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_reservation_serves1`
    FOREIGN KEY (`serves_id_serves`)
    REFERENCES `mydb`.`serves` (`id_serves`),
  CONSTRAINT `fk_reservation_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`user` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 66
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`cart_has_reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`cart_has_reservation` (
  `cart_id_cart` INT NOT NULL,
  `reservation_id_reservation` INT NOT NULL,
  PRIMARY KEY (`cart_id_cart`, `reservation_id_reservation`),
  INDEX `fk_cart_has_reservation_reservation1_idx` (`reservation_id_reservation` ASC) VISIBLE,
  INDEX `fk_cart_has_reservation_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  CONSTRAINT `fk_cart_has_reservation_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_cart_has_reservation_reservation1`
    FOREIGN KEY (`reservation_id_reservation`)
    REFERENCES `mydb`.`reservation` (`id_reservation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`devi`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`devi` (
  `id_devi` INT NOT NULL AUTO_INCREMENT,
  `departureDestination` ENUM('Tunis', 'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Touzeur', 'Zaghouan') NOT NULL,
  `arrivalDestination` ENUM('Tunis', 'Ariana', 'Beja', 'Ben Arous', 'Bizerte', 'Gabes', 'Gafsa', 'Jendouba', 'Kairouan', 'Kasserine', 'kebili', 'Kef', 'Mahdia', 'Manouba', 'Medenine', 'Monastir', 'Nabeul', 'Sfax', 'Sidi Bouzid', 'Siliana', 'Sousse', 'Tataouine', 'Touzeur', 'Zaghouan') NOT NULL,
  `dismountType` ENUM('House', 'Company') NOT NULL,
  `startingStage` ENUM('S+1', 'S+2', 'S+3', 'Duplex', 'Villa') NOT NULL,
  `arrivingStage` ENUM('S+1', 'S+2', 'S+3', 'Duplex', 'Villa') NOT NULL,
  `qestion` ENUM('Yes', 'No') NOT NULL,
  `user_id_user` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id_devi`),
  INDEX `fk_devi_user1_idx` (`user_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_devi_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`user` (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`employer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`employer` (
  `id_employer` VARCHAR(45) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `cv` VARCHAR(700) NOT NULL,
  `gender` ENUM('Male', 'female') NOT NULL,
  `adress` VARCHAR(45) NOT NULL,
  `photo` VARCHAR(300) NOT NULL,
  `phone_number` VARCHAR(8) NOT NULL,
  `state` ENUM('Accepted', 'Not Accepted') NOT NULL DEFAULT 'Not Accepted',
  `serves_id_serves` INT NOT NULL,
  PRIMARY KEY (`id_employer`),
  INDEX `fk_employer_serves1_idx` (`serves_id_serves` ASC) VISIBLE,
  CONSTRAINT `fk_employer_serves1`
    FOREIGN KEY (`serves_id_serves`)
    REFERENCES `mydb`.`serves` (`id_serves`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`feedback`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`feedback` (
  `id_feedback` INT NOT NULL AUTO_INCREMENT,
  `etoile` ENUM('1', '2', '3', '4', '5') NOT NULL,
  `details` VARCHAR(400) NULL DEFAULT '0',
  `user_id_user` VARCHAR(50) NOT NULL,
  `serves_id_serves` INT NOT NULL,
  PRIMARY KEY (`id_feedback`),
  INDEX `fk_feedBack_user1_idx` (`user_id_user` ASC) VISIBLE,
  INDEX `fk_feedBack_serves1_idx` (`serves_id_serves` ASC) VISIBLE,
  CONSTRAINT `fk_feedBack_serves1`
    FOREIGN KEY (`serves_id_serves`)
    REFERENCES `mydb`.`serves` (`id_serves`),
  CONSTRAINT `fk_feedBack_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`user` (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `sellIerd` VARCHAR(60) CHARACTER SET 'utf8mb3' NULL DEFAULT 'Null',
  `buyerId` VARCHAR(60) NULL DEFAULT 'Null',
  `name` VARCHAR(45) NOT NULL,
  `category` ENUM('Kitchen', 'Garden', 'Furniture', 'Accessories') NOT NULL,
  `price` INT NOT NULL,
  `description` VARCHAR(600) NOT NULL,
  `photo` VARCHAR(300) NOT NULL,
  `quantity` INT NOT NULL DEFAULT '1',
  `user_id_user` VARCHAR(50) NOT NULL,
  `cart_id_cart` INT NOT NULL,
  PRIMARY KEY (`id_product`),
  INDEX `fk_product_user_idx` (`user_id_user` ASC) VISIBLE,
  INDEX `fk_product_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  CONSTRAINT `fk_product_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_product_user`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `mydb`.`user` (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`product_photo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`product_photo` (
  `id_Product_photo` INT NOT NULL AUTO_INCREMENT,
  `Photo1` VARCHAR(600) NULL DEFAULT NULL,
  `Photo2` VARCHAR(600) NULL DEFAULT NULL,
  `Photo3` VARCHAR(600) NULL DEFAULT NULL,
  `product_id_product` INT NOT NULL,
  PRIMARY KEY (`id_Product_photo`),
  INDEX `fk_Product_photo_product1_idx` (`product_id_product` ASC) VISIBLE,
  CONSTRAINT `fk_Product_photo_product1`
    FOREIGN KEY (`product_id_product`)
    REFERENCES `mydb`.`product` (`id_product`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`products_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`products_cart` (
  `product_id_product` INT NOT NULL,
  `cart_id_cart` INT NOT NULL,
  PRIMARY KEY (`product_id_product`, `cart_id_cart`),
  INDEX `fk_product_has_cart_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  INDEX `fk_product_has_cart_product1_idx` (`product_id_product` ASC) VISIBLE,
  CONSTRAINT `fk_product_has_cart_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_product_has_cart_product1`
    FOREIGN KEY (`product_id_product`)
    REFERENCES `mydb`.`product` (`id_product`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`reservation_has_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`reservation_has_cart` (
  `reservation_id_reservation` INT NOT NULL,
  `cart_id_cart` INT NOT NULL,
  PRIMARY KEY (`reservation_id_reservation`, `cart_id_cart`),
  INDEX `fk_reservation_has_cart_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  INDEX `fk_reservation_has_cart_reservation1_idx` (`reservation_id_reservation` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_has_cart_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_reservation_has_cart_reservation1`
    FOREIGN KEY (`reservation_id_reservation`)
    REFERENCES `mydb`.`reservation` (`id_reservation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `mydb`.`serves_has_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`serves_has_cart` (
  `serves_id_serves` INT NOT NULL,
  `cart_id_cart` INT NOT NULL,
  PRIMARY KEY (`serves_id_serves`, `cart_id_cart`),
  INDEX `fk_serves_has_cart_cart1_idx` (`cart_id_cart` ASC) VISIBLE,
  INDEX `fk_serves_has_cart_serves1_idx` (`serves_id_serves` ASC) VISIBLE,
  CONSTRAINT `fk_serves_has_cart_cart1`
    FOREIGN KEY (`cart_id_cart`)
    REFERENCES `mydb`.`cart` (`id_cart`),
  CONSTRAINT `fk_serves_has_cart_serves1`
    FOREIGN KEY (`serves_id_serves`)
    REFERENCES `mydb`.`serves` (`id_serves`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
