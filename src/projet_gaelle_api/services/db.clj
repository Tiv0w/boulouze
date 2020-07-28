(ns projet-gaelle-api.services.db
  (:require
   [jdbc.core :as jdbc]))

(let [root-dir (java.lang.System/getProperty "user.dir")]
  (def dbspec (str "sqlite:" root-dir "/database/test.db")))

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
