import './App.css';
import React from "react"
import BookTable from "./components/books/BooksDashboard";
import Missing from './components/shared/Missing';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path='/'
            element = {
              <BookTable />
            }
          />
          <Route 
            path='*'
            element = {<Missing/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
