(ns boulouze-api.services.db
  "This service interacts with the database."
  (:require
   [boulouze-api.utils.filesystem :as utils.fs]
   [clojure.java.io :as io]
   [clojure.java.shell :as shell]
   [jdbc.core :as jdbc]))

(defn project-db-path
  "Gets the path to the project's database."
  ([]
   (project-db-path "test.db"))
  ([db-name]
   (let [root-dir (utils.fs/project-root-dir)
         root-end-with-slash? (.endsWith root-dir "/")
         db-relative-path (str "database/" db-name)
         db-relative-path-corrected (if root-end-with-slash?
                                      db-relative-path
                                      (str "/" db-relative-path))]
     (str root-dir db-relative-path-corrected))))

(defn get-dbspec
  "Returns the dbspec string."
  []
  (str "sqlite:" (project-db-path)))

(defn create-db-if-not-existing [db-path]
  (when-not (.exists (io/file db-path))
    (shell/sh "sqlite" db-path)))

;; TODO: add init functions for the db

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

(defn create-files-table
  "Create the files table in database."
  []
  (execute "CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), path VARCHAR(255));"))

(defn create-products-table
  "Create the products table in database."
  []
  (execute "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), price VARCHAR(255) NULL, description VARCHAR(255) NULL, fileId INTEGER, FOREIGN KEY (fileId) REFERENCES files (id));"))
