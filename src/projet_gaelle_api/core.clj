(ns projet-gaelle-api.core
  (:require [compojure.core :refer [defroutes GET]]
            [liberator.core :refer [defresource]]
            [liberator.core :as l]
            [ring.middleware.params :refer [wrap-params]]))

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

(defresource favicon []
  :available-media-types ["image/vnd.microsoft.icon"]
  :exists? (fn [ctx]
             (.exists (clojure.java.io/file "resources/favicon.ico")))
  :handle-ok (new java.io.File "resources/favicon.ico"))


(defroutes app-routes
  (GET "/" [] (welcome))
  (GET "/favicon.ico" [] (favicon))
  (GET "/hi/:name" [name] (oh-hi name))
  (GET "/wtf" [] (wtf)))

(def handler
  (-> app-routes
      wrap-params))
