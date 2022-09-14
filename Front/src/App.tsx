import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Rotas from "./Routes";

export default function App(){
    return (
    <>
        <header style={{ width: '100%' }}>
            <ResponsiveAppBar/>
        </header>
        <Rotas/>
    </>
    );
}