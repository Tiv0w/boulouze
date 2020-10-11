(ns boulouze-api.services.file
  "This service interacts with files and the filesystem.
  It provides a cp-like command."
  (:require
   [boulouze-api.services.db :as db-service]
   [boulouze-api.utils.filesystem :as utils.fs]
   [cheshire.core :as cheshire]
   [clojure.java.io :as io]))

(defn save-file
  "Save a tempfile to the 'files' directory.
  Optional parameter to control whether or not
  an entry must be created in database as well."
  ([file filename]
   (save-file file filename false))
  ([file filename save-to-db]
   (let [in file
         output-path (str "files/" filename)
         out (io/file output-path)]
     (utils.fs/copy in out true)
     (when (true? save-to-db)
       (db-service/execute ["INSERT INTO files (name, path) VALUES (?, ?);"
                            filename
                            output-path])))))

(defn last-saved-file
  "Returns the id of the last entry in table `files`."
  []
  (let [res (db-service/fetch "SELECT id FROM files ORDER BY id DESC LIMIT 1;")]
    (first res)))

(defn list-files
  "List all files saved in DB."
  []
  (let [result (db-service/fetch "SELECT * FROM files")]
    (println result)
    (cheshire/generate-string result)))
