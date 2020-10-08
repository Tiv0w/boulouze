(ns boulouze-api.utils.filesystem
  (:require
   [clojure.java.io :as io])
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
