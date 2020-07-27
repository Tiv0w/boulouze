(ns projet-gaelle-api.services.db
  (:require [jdbc.core :as jdbc]))


(def dbspec "sqlite:/home/bobmc/prog/multi-lang/projet-gaelle/projet-gaelle-api/database/test.db")

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
