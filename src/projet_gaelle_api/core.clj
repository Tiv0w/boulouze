(ns projet-gaelle-api.core
  (:require [projet-gaelle-api.middleware :as middleware]
            [projet-gaelle-api.resources :as resources]
            [compojure.core :refer [defroutes GET POST ANY]]
            [jumblerg.middleware.cors :refer [wrap-cors]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.multipart-params :refer [wrap-multipart-params]]))

(defroutes app-routes
  (GET "/" [] (resources/welcome))
  (GET "/hi/:name" [name] (resources/oh-hi name))
  (GET "/wtf" [] (resources/wtf))
  (GET "/yes" [] (resources/yes-sir))
  (ANY "/upload-file" [] (resources/upload-file))
  ;; (GET "/favicon.ico" [] (favicon))
  )

(def handler
  (-> app-routes
      middleware/remove-trailing-slashes
      (wrap-resource "public")
      (wrap-cors identity)
      wrap-params
      ;; wrap-keyword-params
      wrap-multipart-params))
