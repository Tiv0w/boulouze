(ns boulouze-api.core
  (:require
   [compojure.core :refer [ANY defroutes GET]]
   [jumblerg.middleware.cors :refer [wrap-cors]]
   [boulouze-api.controllers :as resources]
   [boulouze-api.middleware :as middleware]
   [ring.middleware.multipart-params :refer [wrap-multipart-params]]
   [ring.middleware.params :refer [wrap-params]]
   [ring.middleware.resource :refer [wrap-resource]]))

(defroutes app-routes
  (GET "/" [] (resources/welcome))
  (GET "/hi/:name" [name] (resources/oh-hi name))
  (GET "/wtf" [] (resources/wtf))
  (GET "/yes" [] (resources/yes-sir))
  (ANY "/upload-file" [] (resources/upload-file))
  (GET "/list-files" [] (resources/list-files))
  (GET "/list" [] (resources/list))
  (GET "/get-image" [] (resources/get-image))
  ;; (GET "/favicon.ico" [] (favicon))
  (ANY "*" [] (resources/not-found))
  )

(def handler
  (-> app-routes
      middleware/remove-trailing-slashes
      (wrap-resource "public")
      (wrap-cors identity)
      wrap-params
      wrap-multipart-params))
