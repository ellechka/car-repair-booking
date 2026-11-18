/* tables for accounts */

CREATE TABLE users (
  id            BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                                 --unique user ID, automatically generated and incremented
  email         VARCHAR(255) NOT NULL,                                                      --users email, must be unique, cant be empty
  password_hash VARCHAR(255) NOT NULL,                                                      -- bcrypt/argon2 hash, never the password
  name          VARCHAR(120) NOT NULL,                                                      -- first and last name, cant be empty
  phone         VARCHAR(40),                                                                -- users phone number, optional, can be empty
  role          ENUM('customer','employee','admin') NOT NULL DEFAULT 'customer',            -- user role, default is customer
  is_active     TINYINT(1) NOT NULL DEFAULT 1,                                              -- user account status, 1 for active, 0 for inactive
  created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,                                -- timestamp when user account was created
  updated_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,    -- timestamp when user account was last updated
  UNIQUE KEY uq_users_email (email),                                                        -- unique constraint on email to ensure no duplicates
) ENGINE=InnoDB;

CREATE TABLE vehicles (
  id         BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                                 -- unique vehicle ID, automatically generated and incremented
  user_id    BIGINT UNSIGNED NOT NULL,                                                   -- foreign key referencing the user who owns the vehicle
  make       VARCHAR(60) NOT NULL,                                                       -- vehicle make, cant be empty
  model      VARCHAR(60) NOT NULL,                                                       -- vehicle model, cant be empty
  year       SMALLINT UNSIGNED,                                                          -- vehicle year, optional
  plate      VARCHAR(20),                                                                -- vehicle license plate, optional
  vin        VARCHAR(17),                                                                -- vehicle VIN, optional                 
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,                                -- timestamp when vehicle record was created                                                   
) ENGINE=InnoDB;
