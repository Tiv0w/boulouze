(defproject projet-gaelle-api "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :plugins [[lein-cljfmt "0.6.7"]
            [lein-instant-cheatsheet "2.2.2"]
            [lein-ring "0.12.5"]]
  :dependencies [[org.clojure/clojure "1.10.0"]
                 [liberator "0.15.3"]
                 [compojure "1.6.1"]
                 [ring/ring-core "1.8.0"]
                 [jumblerg/ring-cors "2.0.0"]
                 [net.mikera/imagez "0.12.0"]]
  :ring {:handler projet-gaelle-api.core/handler}
  :repl-options {:init-ns projet-gaelle-api.core})
