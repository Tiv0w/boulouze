(ns projet-gaelle-api.core
  (:require [compojure.core :refer [defroutes GET POST]]
            [liberator.core :refer [defresource]]
            [liberator.core :as l]
            [projet-gaelle-api.middleware :as m]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]))

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

(defresource welcome []
  :available-media-types ["text/html"]
  :handle-ok (clojure.java.io/file "resources/index.html"))

(defresource yes-sir []
  :available-media-types ["text/plain"]
  :handle-ok "yes sir")

(defresource upload-file []
  :available-media-types ["text/plain"]
  :allowed-methods [:post]
  :malformed? (fn [ctx]
                (nil? (get-in ctx [:request :params "file"])))
  :handle-created (fn [ctx]
                    (let [fichier (get-in ctx [:request :params "file"])]
                      (println fichier)
                      (println (get-in fichier [:tempfile]))))
  :handle-method-not-allowed "Method should be a POST")


;; (defresource favicon []
;;   :available-media-types ["image/vnd.microsoft.icon"]
;;   :exists? (fn [ctx]
;;              (.exists (clojure.java.io/file "resources/favicon.ico")))
;;   :handle-ok (new java.io.File "resources/favicon.ico"))


(defroutes app-routes
  (GET "/" [] (welcome))
  ;; (GET "/favicon.ico" [] (favicon))
  (GET "/hi/:name" [name] (oh-hi name))
  (GET "/wtf" [] (wtf))
  (GET "/yes" [] (yes-sir))
  (POST "/upload-file" [] (upload-file)))

(def handler
  (-> app-routes
      m/remove-trailing-slashes
      (wrap-resource "public")
      wrap-params
      wrap-multipart-params))
