import  { useEffect, useState } from "react";

const Test = () => {

    const [name, setName] = useState();

    useEffect(() => {
                
        fetch('/api/hello').then(res => res.json())
        .then(data => {
            setName(data.name)
            
        }).catch(err => console.log(err)) 

        return () => {

        }

    });

    return (
        <div>
            <h1>Hello world</h1>
            <p>My name is { name }</p>
        </div>
    );
}

export default Test;
