(ns boulouze-api.services.file
  "This service interacts with files and the filesystem.
  It provides a cp-like command."
  (:require
   [boulouze-api.services.db :as db-service]
   [boulouze-api.utils.filesystem :as utils.fs]
   [cheshire.core :as cheshire]
   [clojure.java.io :as io]))


(defn save-param-to-dir
  "From a ring request file param, save the tempfile to the indicated directory."
  ([file-param dir]
   (save-param-to-dir file-param dir nil))
  ([file-param dir save-to-db]
   (let [in (get-in file-param [:tempfile])
         filename (get-in file-param [:filename])
         out (io/file (str dir filename))]
     (utils.fs/copy in out true)
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
