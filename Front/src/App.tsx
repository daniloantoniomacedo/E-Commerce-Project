import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Rotas from "./Routes";

export default function App(){
    return (
    <>
        <header>
            <ResponsiveAppBar/>
        </header>
        <main className={ 'rotas' }>
            <Rotas/>
        </main>
    </>
    );
}