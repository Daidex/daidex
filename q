[1mdiff --git a/.eslintrc b/.eslintrc[m
[1mindex 095960f..67ea8d2 100644[m
[1m--- a/.eslintrc[m
[1m+++ b/.eslintrc[m
[36m@@ -95,6 +95,10 @@[m
       0,[m
       "never"[m
     ],[m
[32m+[m[32m    "jsx-a11y/click-events-have-key-events": [[m
[32m+[m[32m      0,[m
[32m+[m[32m      "never"[m
[32m+[m[32m    ],[m
     "react/destructuring-assignment": [[m
       0,[m
       "never"[m
[1mdiff --git a/src/pages/Exchange/Exchange.js b/src/pages/Exchange/Exchange.js[m
[1mindex 9c5d16a..06d195a 100644[m
[1m--- a/src/pages/Exchange/Exchange.js[m
[1m+++ b/src/pages/Exchange/Exchange.js[m
[36m@@ -16,7 +16,8 @@[m [mimport {[m
 import Row from 'src/components/Atoms/Row'[m
 import Text from 'src/components/Atoms/Text'[m
 import Header from 'src/components/Organisms/Header'[m
[31m-import TradeForm from 'src/components/Organisms/TradeForm'[m
[32m+[m[32m// import TradeForm from 'src/components/Organisms/TradeForm'[m
[32m+[m[32mimport TradeTable from 'src/components/Organisms/TradeTable'[m
 import MetaMaskWithError from 'src/components/Organisms/MetaMaskWithError'[m
 [m
 import appStates from 'src/store/states/appStates'[m
[36m@@ -163,7 +164,8 @@[m [mclass Exchange extends Component {[m
     return ([m
       <Row>[m
         <Header />[m
[31m-        <TradeForm />[m
[32m+[m[32m        {/* <TradeForm /> */}[m
[32m+[m[32m        <TradeTable />[m
         {this.shouldShowMetaMaskError(view) ? <MetaMaskWithError view={view} /> : this.renderComingSoon()}[m
       </Row>[m
     )[m
[1mdiff --git a/src/styles/_globals.scss b/src/styles/_globals.scss[m
[1mindex 6dbbdcc..1c4be1c 100644[m
[1m--- a/src/styles/_globals.scss[m
[1m+++ b/src/styles/_globals.scss[m
[36m@@ -34,6 +34,7 @@[m [m$source_code_pro: 'Source Code Pro';[m
 // Font sizes[m
 $default-font-size: 16;[m
 $large-font-size: 18;[m
[32m+[m[32m$medium-font-size: 12.5;[m
 $small-font-size: 9;[m
 [m
 // Heading sizes[m
[36m@@ -71,6 +72,7 @@[m [m$px: .0625rem;[m
 [m
 body {[m
   font-family: $quicksand;[m
[32m+[m[32m  background-color: #1E1B32;[m
 }[m
 [m
 img:not([alt]) {[m
