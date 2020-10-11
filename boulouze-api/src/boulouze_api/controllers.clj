(ns boulouze-api.controllers
  (:require
   [boulouze-api.services.file :as file-service]
   [boulouze-api.services.product :as product-service]
   [cheshire.core :as cheshire]
   [liberator.core :as liberator]))

(liberator/defresource welcome []
  :available-media-types ["text/html"]
  :handle-ok (clojure.java.io/file "resources/public/index.html"))

(liberator/defresource yes-sir []
  :available-media-types ["text/plain"]
  :handle-ok "yes sir")

(liberator/defresource oh-hi [name]
  :available-media-types ["text/html"]
  :handle-ok (fn [_]
               (->> name
                    clojure.string/upper-case
                    (format "<html><h1>OH HI %s!</h1></html>"))))

(liberator/defresource wtf []
  :available-media-types ["text/html"]
  :malformed? (fn [ctx]
                (nil? (get-in ctx [:request :params "name"])))
  :handle-ok (fn [ctx]
               (->> (get-in ctx [:request :params "name"])
                    clojure.string/upper-case
                    (format "<html><h1>WHAT THE F*CK %s?!</h1></html>")))
  :handle-malformed "We could not process your request, it seems like the parameter \"name\" was omitted.")

(liberator/defresource upload-file []
  :available-media-types ["application/json" "text/plain"]
  :allowed-methods [:post]
  :malformed? (fn [ctx]
                (let [file (get-in ctx [:request :params "file"])]
                  (or
                   (nil? file)
                   (= "undefined" file))))
  :post! (fn [ctx]
           (let [file-param (get-in ctx [:request :params "file"])
                 file (:tempfile file-param)
                 filename (:filename file-param)]
             (file-service/save-file file filename true)))
  :handle-created (fn [_] (cheshire/generate-string (file-service/last-saved-file)))
  :handle-method-not-allowed "Method should be a POST")

(liberator/defresource post-product []
  :available-media-types ["application/json" "text/plain"]
  :allowed-methods [:post]
  :malformed? (fn [ctx]
                (let [body-params (get-in ctx [:request :body])
                      fileid (:fileId body-params)
                      name (:name body-params)
                      price (:price body-params)
                      description (:description body-params)
                      combined-params [fileid name price description]]
                  (some? (some (fn [param]
                                 (or
                                  (nil? param)
                                  (= "undefined" param)))
                               combined-params))))
  :post! (fn [ctx]
           (let [body (get-in ctx [:request :body])]
             (product-service/save-product body)))
  :handle-method-not-allowed "Method should be a POST")

(liberator/defresource list-files []
  :available-media-types ["text/plain"]
  :allowed-methods [:get]
  :handle-ok (file-service/list-files)
  :handle-method-not-allowed "Method should be a GET")

(liberator/defresource list-products []
  :available-media-types ["application/json" "text/plain"]
  :allowed-methods [:get]
  :handle-ok (product-service/list-products)
  :handle-method-not-allowed "Method should be a GET")

(liberator/defresource list-images []
  :available-media-types ["text/html"]
  :handle-ok (clojure.java.io/file "resources/public/list-images.html"))

(liberator/defresource get-image []
  :available-media-types ["image/jpeg" "image/png"]
  :handle-ok (fn [ctx]
               (let [path (get-in ctx [:request :params "path"])
                     file (clojure.java.io/file path)]
                 (println path file)
                 file)))

;; (liberator/defresource favicon []
;;   :available-media-types ["image/vnd.microsoft.icon"]
;;   :exists? (fn [ctx]
;;              (.exists (clojure.java.io/file "resources/favicon.ico")))
;;   :handle-ok (new java.io.File "resources/favicon.ico"))

(liberator/defresource not-found []
  :available-media-types ["text/html"]
  :exists? false
  :handle-not-found (clojure.java.io/file "resources/public/404.html"))
