(ns boulouze-api.services.product
  "This service interacts with files and the filesystem.
  It provides a cp-like command."
  (:require
   [boulouze-api.services.db :as db-service]))

(defn save-product
  "Save a product in db."
  [product]
  (db-service/execute
   ["INSERT INTO products (name, price, description, fileId) VALUES (?, ?, ?, ?);"
    (:name product)
    (:price product)
    (:description product)
    (:fileid product)]))
