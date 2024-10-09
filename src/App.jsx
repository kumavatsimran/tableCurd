import { BrowserRouter ,Routes,Route} from "react-router-dom";
import './App.css'
import Form from "./component/Form";
import Data from "./component/Data";
import Edit from "./component/Edit";

function App() {
  

  return (
   <>
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<Form/>}/> {/* 👈 Renders at /app/ */}
        <Route path="/Record" element={<Data/>}></Route>
        <Route path="/editData/:id" element={<Edit/>}></Route>

      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
