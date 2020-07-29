(ns projet-gaelle-api.services.file
  "This service interacts with files and the filesystem.
  It provides a cp-like command."
  (:require
   [cheshire.core :as cheshire]
   [clojure.java.io :as io]
   [projet-gaelle-api.services.db :as db-service])
  (:import
   (org.apache.commons.io FileUtils)))

(defn project-root-dir
  "Gets the root directory of the project.
  (Returns the directory where the JVM was invoked.)"
  []
  (java.lang.System/getProperty "user.dir"))

(defn copy
  "Copy a file, preserving last modified time by default."
  [from to & {:keys [preserve] :or {preserve true}}]
  (let [from-file (io/file from)
        to-file (io/file to)]
    (FileUtils/copyFile from-file to-file preserve)))

(defn save-param-to-dir
  "From a ring request file param, save the tempfile to the indicated directory."
  ([file-param dir]
   (save-param-to-dir file-param dir nil))
  ([file-param dir save-to-db]
   (let [in (get-in file-param [:tempfile])
         filename (get-in file-param [:filename])
         out (io/file (str dir filename))]
     ;; (-> my-file load-image show)
     (FileUtils/copyFile in out true)
     (when (true? save-to-db)
       (db-service/execute ["INSERT INTO files (name, path) VALUES (?, ?)"
                            filename
                            (str "pics/" filename)])))))

(defn list-files
  "List all files saved in DB."
  []
  (let [result (db-service/fetch "SELECT * FROM files")]
    (println result)
    (cheshire/generate-string result)))
