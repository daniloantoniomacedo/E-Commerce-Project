import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Rotas from "./Routes";

export default function App(){
    return (
    <>
        <header>
            <ResponsiveAppBar/>
        </header>
        <div className={ 'rotas' }>
            <Rotas/>
        </div>
    </>
    );
}