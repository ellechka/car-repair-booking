/* tables for different repairservices */

CREATE TABLE services (
  id               BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,          -- unique service ID, automatically generated and incremented
  name             VARCHAR(150) NOT NULL,                               -- service name, cant be empty
  description      TEXT,                                                -- service description, optional
  price_cents      INT UNSIGNED NOT NULL,                               -- price in cents, cant be negative
  duration_minutes SMALLINT UNSIGNED NOT NULL,                          -- duration in minutes, cant be zero or negative
  is_active        TINYINT(1) NOT NULL DEFAULT 1,                       -- service availability status, 1 for active, 0 for inactive
  CONSTRAINT chk_services_duration CHECK (duration_minutes > 0)         -- ensure duration is positive
) ENGINE=InnoDB;

CREATE TABLE inquiries (
  id                  BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,                                                   
  user_id             BIGINT UNSIGNED NULL,                                                                         -- NULL for guests
  guest_name          VARCHAR(120),                                                                                 -- customer name if no saved user
  guest_email         VARCHAR(255),                                                                                 -- customer email if no saved user
  guest_phone         VARCHAR(40),                                                                                  -- customer phone if no saved user                                               
  vehicle_id          BIGINT UNSIGNED NULL,                                                                         -- NULL if no saved vehicle 
  vehicle_description VARCHAR(200),                                                                                 -- free text if no saved vehicle
  description         TEXT NOT NULL,                                                                                -- customer description of the issue, cant be empty                            
  status              ENUM('new','in_review','quoted','accepted','declined','closed') NOT NULL DEFAULT 'new',       -- inquiry status, default is new
  quoted_cents        INT UNSIGNED NULL,                                                                            -- price staff quoted, if any
  staff_notes         TEXT,                                                                                         -- internal notes and reply summary
  assigned_to         BIGINT UNSIGNED NULL,                                                                         -- staff member assigned to the inquiry, NULL if unassigned
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,                                                  -- timestamp when inquiry was created                                    
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,                      -- timestamp when inquiry was last updated

  FOREIGN KEY (user_id)     REFERENCES users(id),                                                                   -- foreign key referencing the user who submitted the inquiry, NULL for guests
  FOREIGN KEY (vehicle_id)  REFERENCES vehicles(id),                                                                -- foreign key referencing the vehicle related to the inquiry, NULL if no saved vehicle
  FOREIGN KEY (assigned_to) REFERENCES users(id)                                                                    -- foreign key referencing the staff member assigned to the inquiry, NULL if unassigned
) ENGINE=InnoDB;