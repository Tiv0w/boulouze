(ns boulouze-api.services.db
  "This service interacts with the database."
  (:require
   [boulouze-api.utils.db :refer [get-dbspec]]
   [jdbc.core :as jdbc]))

(def dbspec (get-dbspec))

(defn execute
  "Execute a SQL statement on the DB."
  [statement]
  (with-open [conn (jdbc/connection dbspec)]
    (jdbc/execute conn (if (coll? statement)
                         (vec statement)
                         statement))))

(defn fetch
  "Execute a SQL statement on the DB."
  [statement]
  (with-open [conn (jdbc/connection dbspec)]
    (jdbc/fetch conn (if (coll? statement)
                       (vec statement)
                       statement))))

(defn execute-parameterized
  "Execute a parameterized SQL statement on the DB."
  [statement & args]
  (with-open [conn (jdbc/connection dbspec)]
    (jdbc/execute conn [statement args])))
