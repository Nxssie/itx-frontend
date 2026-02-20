import { useState } from 'react'
import {Route, Switch} from 'wouter';
import ProductListPage from "@/pages/ProductListPage.jsx";
import ProductDetailPage from "@/pages/ProductDetailPage.jsx";

function App() {

  return (
    <>
        <Switch>
            <Route path="/" component={ProductListPage}></Route>
            <Route path="/product/:id" component={ProductDetailPage}></Route>
        </Switch>
    </>
  )
}

export default App
