(ns boulouze-api.utils.db
  "Database utils and init functions."
  (:require
   [boulouze-api.utils.filesystem :as utils.fs]
   [clojure.java.io :as io]
   [clojure.java.shell :as shell]
   [jdbc.core :as jdbc]))

(defn project-db-path
  "Gets the path to the project's database."
  []
  (let [root-dir (utils.fs/project-root-dir)
        root-end-with-slash? (.endsWith root-dir "/")
        db-relative-path-corrected (if root-end-with-slash?
                                     "boulouze-api-database/"
                                     "/boulouze-api-database/")]
    (str root-dir db-relative-path-corrected)))

(defn get-dbspec
  "Returns the dbspec string."
  ([]
   (get-dbspec "main.db"))
  ([db-name]
   (str "sqlite:" (project-db-path) db-name)))

(defn create-files-table
  "Creates the files table in database."
  [conn]
  (jdbc/execute conn "CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), path VARCHAR(255));"))

(defn create-products-table
  "Creates the products table in database."
  [conn]
  (jdbc/execute conn "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(255), price INTEGER NULL, description VARCHAR(255) NULL, fileId INTEGER, FOREIGN KEY (fileId) REFERENCES files (id));"))

(defn create-db-if-not-existing
  "Creates the database if it doesn't exists."
  [project-path db-path]
  (when-not (.exists (io/file (str project-path db-path)))
    (println project-path)
    (shell/sh "mkdir" "-p" project-path)
    (shell/sh "sqlite3" (str project-path db-path))))

(defn init-db
  "The main initialization function for the database."
  []
  (create-db-if-not-existing (project-db-path) "main.db")
  (with-open [conn (jdbc/connection (get-dbspec))]
    (create-files-table conn)
    (create-products-table conn)))
