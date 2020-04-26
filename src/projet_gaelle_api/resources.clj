(ns projet-gaelle-api.resources
  (:require [projet-gaelle-api.services.file :as file-service]
            [liberator.core :refer [defresource]]))

(defresource welcome []
  :available-media-types ["text/html"]
  :handle-ok (clojure.java.io/file "resources/public/index.html"))

(defresource yes-sir []
  :available-media-types ["text/plain"]
  :handle-ok "yes sir")

(defresource oh-hi [name]
  :available-media-types ["text/html"]
  :handle-ok (fn [_]
               (->> name
                    clojure.string/upper-case
                    (format "<html><h1>OH HI %s!</h1></html>"))))

(defresource wtf []
  :available-media-types ["text/html"]
  :malformed? (fn [ctx]
                (nil? (get-in ctx [:request :params "name"])))
  :handle-ok (fn [ctx]
               (->> (get-in ctx [:request :params "name"])
                    clojure.string/upper-case
                    (format "<html><h1>WHAT THE F*CK %s?!</h1></html>")))
  :handle-malformed "We could not process your request, it seems like the parameter \"name\" was omitted.")

(defresource upload-file []
  :available-media-types ["text/plain"]
  :allowed-methods [:post]
  :malformed? (fn [ctx]
                (let [fichier (get-in ctx [:request :params "file"])]
                  (or
                   (nil? fichier)
                   (= "undefined" fichier))))
  :post! (fn [ctx]
           (let [fichier (get-in ctx [:request :params "file"])]
             (println fichier)
             (file-service/save-param-to-dir fichier "pics/")))
  :handle-method-not-allowed "Method should be a POST")

;; (defresource favicon []
;;   :available-media-types ["image/vnd.microsoft.icon"]
;;   :exists? (fn [ctx]
;;              (.exists (clojure.java.io/file "resources/favicon.ico")))
;;   :handle-ok (new java.io.File "resources/favicon.ico"))
