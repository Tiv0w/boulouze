(ns projet-gaelle-api.services.file
  (:require [clojure.java.io :as io]
            [mikera.image.core :refer [load-image show]])
  (:import [org.apache.commons.io FileUtils]))

(defn copy
  "Copy a file, preserving last modified time by default."
  [from to & {:keys [preserve] :or {preserve true}}]
  (let [from-file (io/file from)
        to-file (io/file to)]
    (FileUtils/copyFile from-file to-file preserve)))

(defn save-param-to-dir
  "From a ring request file param, save the tempfile to the indicated directory."
  [file-param dir]
  (let [in (get-in file-param [:tempfile])
        out (io/file (str dir (get-in file-param [:filename])))]
    ;; (-> my-file load-image show)
    (FileUtils/copyFile
     in
     out
     true)))
