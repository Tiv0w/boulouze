(defproject boulouze-api "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :plugins [[lein-cljfmt "0.6.7"]
            [lein-instant-cheatsheet "2.2.2"]
            [lein-ring "0.12.5"]]
  :dependencies [[cheshire "5.10.0"]
                 [compojure "1.6.1"]
                 [funcool/clojure.jdbc "0.9.0"]
                 [jumblerg/ring-cors "2.0.0"]
                 [liberator "0.15.3"]
                 [net.mikera/imagez "0.12.0"]
                 [org.clojure/clojure "1.10.0"]
                 [org.xerial/sqlite-jdbc "3.32.3.1"]
                 [ring/ring-core "1.8.0"]
                 [ring/ring-jetty-adapter "1.8.2"]
                 [ring/ring-json "0.5.0"]
                 [stch-library/sql "0.1.1"]]
  :profiles {:uberjar {:aot :all
                       :main boulouze-api.core}}
  :ring {:handler boulouze-api.core/handler}
  :repl-options {:init-ns boulouze-api.core})
