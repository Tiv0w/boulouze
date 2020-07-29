(ns boulouze.middleware)

(defn remove-trailing-slashes [handler]
  (fn [req]
    (let [uri (:uri req)
          not-root? (not= uri "/")
          ends-with-slash? (.endsWith ^String uri "/")
          subs-uri (subs uri 0 (dec (count uri)))
          fixed-uri (if (and not-root? ends-with-slash?)
                      subs-uri
                      uri)
          fixed-req (assoc req :uri fixed-uri)]
      (handler fixed-req))))
