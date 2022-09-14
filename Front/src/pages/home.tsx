import { Grid } from "@mui/material";
import { useState } from "react";
import Product, { IProduct } from "../components/Product";

export default function Home() {
    const product1: IProduct = { id: 1, name: 'Nome do produto', price: '1.00' };
    const product2: IProduct = { id: 2, name: 'Nome do produto 2 muito longo...', price: '2.00' };

    const [productArray, setProductArray] = useState<IProduct[]>([product1, product2, product2, product2, product2, product2, product2, product2, product2, product2, product2, product2, product2, product2]);

    return (
        <div style={{ margin: '3%' }}>
            <Grid 
            container 
            spacing={2} 
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                    {productArray.map((p: IProduct) => 
                        <Grid key={p.id} item>
                            <Product key={p.id} {...p}/>
                        </Grid>)}
                
            </Grid>
        </div>
    );
    
}