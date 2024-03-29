(ns boulouze-api.services.product
  "This service manages products."
  (:require
   [boulouze-api.services.db :as db-service]
   [clojure.set :refer [rename-keys]]))

(defn save-product
  "Save a new product in DB."
  [product]
  (db-service/execute
   ["INSERT INTO products (name, price, description, fileId) VALUES (?, ?, ?, ?);"
    (:name product)
    (:price product)
    (:description product)
    (:fileId product)]))

(defn list-products
  "List all products saved in DB."
  []
  (map #(rename-keys % {:fileid :fileId})
     (db-service/fetch "SELECT * FROM products")))
