import { useState } from 'react'
import {Route, Switch} from 'wouter';
import ProductListPage from "@/pages/ProductListPage.jsx";
import ProductDetailPage from "@/pages/ProductDetailPage.jsx";
import Header from "@/components/Header.jsx";

function App() {

  return (
    <>
        <Header/>
        <main className="m-5">
            <Switch>
                <Route path="/" component={ProductListPage}></Route>
                <Route path="/product/:id" component={ProductDetailPage}></Route>
            </Switch>
        </main>

    </>
  )
}

export default App
